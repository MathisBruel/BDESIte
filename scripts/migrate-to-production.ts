import { PrismaClient } from '@prisma/client';
import { Client } from 'minio';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const computeMinioConfig = () => {
  const endpointStr = process.env.MINIO_ENDPOINT || 'localhost';
  const minioPort = parseInt(process.env.MINIO_PORT || '9000');
  
  if (!endpointStr.includes('://') && !endpointStr.includes(':')) {
    return { endPoint: endpointStr, port: minioPort, useSSL: false };
  }
  try {
    const urlStr = endpointStr.startsWith('http') ? endpointStr : `http://${endpointStr}`;
    const url = new URL(urlStr);
    return {
      endPoint: url.hostname,
      port: url.port ? parseInt(url.port) : minioPort,
      useSSL: url.protocol === 'https:',
    };
  } catch {
    return { endPoint: 'localhost', port: minioPort, useSSL: false };
  }
};

const config = computeMinioConfig();
const minioClient = new Client({
  endPoint: config.endPoint,
  port: config.port,
  useSSL: config.useSSL,
  accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'bde-images';

const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function ensureBucketExists() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    console.log(`📦 Création du bucket: ${BUCKET_NAME}`);
    await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
      }],
    };
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
    console.log(`✅ Bucket ${BUCKET_NAME} créé et configuré`);
  } else {
    console.log(`✅ Bucket ${BUCKET_NAME} existe déjà`);
  }
}

async function uploadFileToMinio(localPath: string, minioPath: string): Promise<string> {
  const fullLocalPath = path.join(PUBLIC_DIR, localPath);
  if (!fs.existsSync(fullLocalPath)) {
    console.warn(`⚠️  Fichier non trouvé: ${fullLocalPath}`);
    return localPath;
  }
  
  const cleanPath = minioPath.replace(/^\//, '');
  
  try {
    const fileBuffer = fs.readFileSync(fullLocalPath);
    const ext = path.extname(localPath).toLowerCase();
    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }[ext] || 'application/octet-stream';

    await minioClient.putObject(BUCKET_NAME, cleanPath, fileBuffer, fileBuffer.length, {
      'Content-Type': contentType,
    });
    
    console.log(`  📤 Uploadé: ${cleanPath}`);
    
    // Return the path without 'images/' prefix for API endpoint
    // MinIO stores as: images/events/photo.jpg
    // API expects: /api/images/events/photo.jpg (it adds 'images/' prefix)
    const apiPath = cleanPath.replace(/^images\//, '');
    return apiPath;
  } catch (error) {
    console.error(`  ❌ Erreur upload ${localPath}:`, error);
    return localPath;
  }
}

async function uploadAllImages() {
  console.log('\n🖼️  Upload de toutes les images vers MinIO...\n');
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const uploadedPaths: Map<string, string> = new Map();
  
  function scanDirectory(dir: string, baseDir: string = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(baseDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
        const localPath = `/images/${relativePath.replace(/\\/g, '/')}`;
        const minioPath = `images/${relativePath.replace(/\\/g, '/')}`;
        uploadedPaths.set(localPath, minioPath);
      }
    }
  }
  
  const imagesDir = path.join(PUBLIC_DIR, 'images');
  if (fs.existsSync(imagesDir)) {
    scanDirectory(imagesDir);
  }
  
  const results: Map<string, string> = new Map();
  const entries = Array.from(uploadedPaths.entries());
  for (const [localPath, minioPath] of entries) {
    const apiPath = await uploadFileToMinio(localPath, minioPath);
    results.set(localPath, apiPath);
  }
  
  console.log(`\n✅ ${results.size} images uploadées\n`);
  return results;
}

async function migrateSettings() {
  console.log('⚙️  Migration des paramètres...');
  const settingsPath = path.join(DATA_DIR, 'settings.json');
  if (!fs.existsSync(settingsPath)) {
    console.log('  ⚠️  settings.json non trouvé');
    return;
  }
  
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      association: settings.association,
      year: settings.year,
      email: settings.email,
      shopUrl: settings.shopUrl || null,
      instagram: settings.instagram || null,
      discord: settings.discord || null,
      facebook: settings.facebook || null,
      linkedin: settings.linkedin || null,
    },
    create: {
      id: 1,
      association: settings.association,
      year: settings.year,
      email: settings.email,
      shopUrl: settings.shopUrl || null,
      instagram: settings.instagram || null,
      discord: settings.discord || null,
      facebook: settings.facebook || null,
      linkedin: settings.linkedin || null,
    },
  });
  
  console.log('  ✅ Paramètres migrés');
}

async function migrateTeam(imageMap: Map<string, string>) {
  console.log('👥 Migration de l\'équipe...');
  const teamPath = path.join(DATA_DIR, 'team.json');
  if (!fs.existsSync(teamPath)) {
    console.log('  ⚠️  team.json non trouvé');
    return;
  }
  
  const team = JSON.parse(fs.readFileSync(teamPath, 'utf-8'));
  
  await prisma.teamMember.deleteMany({});
  
  for (const member of team) {
    // Get the API path from the image map, or use the original path
    const photoPath = imageMap.get(member.photo) || member.photo.replace(/^\/images\//, '');
    
    await prisma.teamMember.create({
      data: {
        name: member.name,
        role: member.role,
        photo: photoPath,
        photoPosition: member.photoPosition || 'center',
        linkedin: member.links?.linkedin || null,
        instagram: member.links?.instagram || null,
        email: member.links?.email || null,
      },
    });
  }
  
  console.log(`  ✅ ${team.length} membres migrés`);
}

async function migrateEvents(imageMap: Map<string, string>) {
  console.log('📅 Migration des événements...');
  const eventsPath = path.join(DATA_DIR, 'events.json');
  if (!fs.existsSync(eventsPath)) {
    console.log('  ⚠️  events.json non trouvé');
    return;
  }
  
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
  
  for (const event of events) {
    // Get the API path from the image map, or use the original path
    const coverPath = event.cover ? (imageMap.get(event.cover) || event.cover.replace(/^\/images\//, '')) : null;
    
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        title: event.title,
        date: new Date(event.date),
        endDate: event.endDate ? new Date(event.endDate) : null,
        place: event.place || '',
        cover: coverPath,
        tags: event.tags || [],
        description: event.description,
        ticketUrl: event.ticketUrl || null,
        published: event.published ?? false,
        photosUrl: event.photosUrl || null,
      },
      create: {
        slug: event.slug,
        title: event.title,
        date: new Date(event.date),
        endDate: event.endDate ? new Date(event.endDate) : null,
        place: event.place || '',
        cover: coverPath,
        tags: event.tags || [],
        description: event.description,
        ticketUrl: event.ticketUrl || null,
        published: event.published ?? false,
        photosUrl: event.photosUrl || null,
      },
    });
  }
  
  console.log(`  ✅ ${events.length} événements migrés`);
}

async function migratePartners(imageMap: Map<string, string>) {
  console.log('🤝 Migration des partenaires...');
  const partnersPath = path.join(DATA_DIR, 'partners.json');
  if (!fs.existsSync(partnersPath)) {
    console.log('  ⚠️  partners.json non trouvé');
    return;
  }
  
  const partners = JSON.parse(fs.readFileSync(partnersPath, 'utf-8'));
  
  await prisma.partner.deleteMany({});
  
  for (const partner of partners) {
    // Get the API path from the image map, or use the original path
    const logoPath = partner.logo ? (imageMap.get(partner.logo) || partner.logo.replace(/^\/images\//, '')) : null;
    
    await prisma.partner.create({
      data: {
        name: partner.name,
        category: partner.category,
        city: partner.city,
        logo: logoPath,
        advantages: partner.advantages || [],
        conditions: partner.conditions || null,
        website: partner.website || null,
        address: partner.address || null,
        active: partner.active ?? true,
      },
    });
  }
  
  console.log(`  ✅ ${partners.length} partenaires migrés`);
}

async function migrateStock() {
  console.log('🍬 Migration du stock...');
  const stockPath = path.join(DATA_DIR, 'stock.json');
  if (!fs.existsSync(stockPath)) {
    console.log('  ⚠️  stock.json non trouvé');
    return;
  }
  
  const stockData = JSON.parse(fs.readFileSync(stockPath, 'utf-8'));
  const products = stockData.products || stockData;
  
  await prisma.product.deleteMany({});
  
  let order = 0;
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        type: product.type,
        quantity: product.quantity || 0,
        price: product.price,
        image: product.image || null,
        active: true,
        order: order++,
      },
    });
  }
  
  console.log(`  ✅ ${products.length} produits migrés`);
}

async function migrateAcademicYears() {
  console.log('🎓 Migration des années académiques...');

  const existing = await prisma.academicYear.count();
  if (existing > 0) {
    console.log('  ℹ️  Années déjà présentes, skip');
    return;
  }

  const teamPath = path.join(DATA_DIR, 'team.json');
  if (!fs.existsSync(teamPath)) {
    console.log('  ⚠️  team.json non trouvé');
    return;
  }
  const team = JSON.parse(fs.readFileSync(teamPath, 'utf-8'));

  const year = await prisma.academicYear.create({
    data: {
      label: '2025-2026',
      slug: '2025-2026',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-08-31'),
      isCurrent: false,
      teamBackgroundImage: 'team/groupe.jpg',
    },
  });

  const members = await prisma.teamMember.findMany({});
  const memberMap = new Map(members.map((m) => [m.name, m]));

  let order = 0;
  for (const t of team) {
    const member = memberMap.get(t.name);
    if (!member) continue;
    await prisma.teamMembership.create({
      data: {
        academicYearId: year.id,
        teamMemberId: member.id,
        role: t.role,
        order: order++,
      },
    });
  }

  console.log(`  ✅ Année 2025-2026 créée avec ${order} membres`);
}

async function createAdminUser() {
  console.log('👤 Création de l\'utilisateur admin...');
  
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  
  if (!email || !password) {
    console.log('  ⚠️  ADMIN_EMAIL ou ADMIN_PASSWORD non défini');
    return;
  }
  
  const bcryptModule = await import('bcryptjs');
  const bcrypt = bcryptModule.default || bcryptModule;
  const hashedPassword = await bcrypt.hash(password, 12);
  
  await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  
  console.log(`  ✅ Utilisateur admin créé/mis à jour: ${email}`);
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     🚀 MIGRATION VERS PRODUCTION - BDE Sup\'RNova 🚀    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  console.log('📋 Configuration:');
  console.log(`   MinIO: ${config.endPoint}:${config.port}`);
  console.log(`   Bucket: ${BUCKET_NAME}`);
  console.log('');
  
  try {
    await ensureBucketExists();
    
    const imageMap = await uploadAllImages();
    
    await migrateSettings();
    await migrateTeam(imageMap);
    await migrateAcademicYears();
    await migrateEvents(imageMap);
    await migratePartners(imageMap);
    await migrateStock();
    await createAdminUser();
    
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║              ✅ MIGRATION TERMINÉE !                    ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 Résumé:');
    const [settings, team, years, memberships, events, partners, products, users] = await Promise.all([
      prisma.settings.count(),
      prisma.teamMember.count(),
      prisma.academicYear.count(),
      prisma.teamMembership.count(),
      prisma.event.count(),
      prisma.partner.count(),
      prisma.product.count(),
      prisma.user.count(),
    ]);

    console.log(`   • Paramètres: ${settings}`);
    console.log(`   • Membres équipe: ${team}`);
    console.log(`   • Années académiques: ${years} (${memberships} membres/année)`);
    console.log(`   • Événements: ${events}`);
    console.log(`   • Partenaires: ${partners}`);
    console.log(`   • Produits: ${products}`);
    console.log(`   • Utilisateurs: ${users}`);
    console.log(`   • Images uploadées: ${imageMap.size}`);
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
