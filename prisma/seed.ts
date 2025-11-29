import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bde_db',
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding ...')

    // 1. Seed Partners
    const partnersPath = path.join(process.cwd(), 'data', 'partners.json')
    const partnersData = JSON.parse(fs.readFileSync(partnersPath, 'utf8'))

    console.log(`Seeding ${partnersData.length} partners...`)
    for (const p of partnersData) {
        await prisma.partner.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                name: p.name,
                category: p.category,
                city: p.city,
                logo: p.logo,
                advantages: p.advantages,
                conditions: p.conditions,
                website: p.website,
                address: p.address,
                active: p.active,
            },
        })
    }

    // 2. Seed Events
    const eventsPath = path.join(process.cwd(), 'data', 'events.json')
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'))

    console.log(`Seeding ${eventsData.length} events...`)
    for (const e of eventsData) {
        await prisma.event.upsert({
            where: { slug: e.slug },
            update: {},
            create: {
                slug: e.slug,
                title: e.title,
                date: new Date(e.date),
                endDate: e.endDate ? new Date(e.endDate) : null,
                place: e.place,
                cover: e.cover,
                tags: e.tags,
                description: e.description,
                ticketUrl: e.ticketUrl,
                published: e.published,
                photosUrl: e.photosUrl,
            },
        })
    }

    // 3. Seed Team
    const teamPath = path.join(process.cwd(), 'data', 'team.json')
    const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf8'))

    console.log(`Seeding ${teamData.length} team members...`)
    // Clear existing team members to avoid duplicates since we don't have stable IDs in JSON
    await prisma.teamMember.deleteMany()

    for (const t of teamData) {
        await prisma.teamMember.create({
            data: {
                name: t.name,
                role: t.role,
                photo: t.photo,
                photoPosition: t.photoPosition,
                linkedin: t.links?.linkedin,
                instagram: t.links?.instagram,
                email: t.links?.email,
            },
        })
    }

    // 4. Seed Settings
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json')
    const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))

    console.log('Seeding settings...')
    await prisma.settings.upsert({
        where: { id: 1 },
        update: {
            association: settingsData.association,
            year: settingsData.year,
            email: settingsData.email,
            shopUrl: settingsData.shopUrl,
            instagram: settingsData.instagram,
            discord: settingsData.discord,
            facebook: settingsData.facebook,
            linkedin: settingsData.linkedin,
        },
        create: {
            id: 1,
            association: settingsData.association,
            year: settingsData.year,
            email: settingsData.email,
            shopUrl: settingsData.shopUrl,
            instagram: settingsData.instagram,
            discord: settingsData.discord,
            facebook: settingsData.facebook,
            linkedin: settingsData.linkedin,
        },
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
