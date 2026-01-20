import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5433/bde_db?schema=public'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding ...')

    // 1. Seed Partners
    const partnersData = [
        {
            "id": "efs",
            "name": "EFS - Établissement Français du Sang",
            "category": "sante",
            "city": "Rennes",
            "advantages": [
                "Organisation de collectes de sang sur le campus",
                "Sensibilisation au don du sang",
                "Possibilité de collecte à SDV (minimum 100 dons)"
            ],
            "conditions": "Réservation de créneau à prévoir 2-3 semaines à l'avance",
            "active": false
        },
        {
            "id": "monsieur-le-zinc",
            "name": "Monsieur le Zinc",
            "category": "bar",
            "city": "Rennes",
            "logo": "/images/partners/MrZinc.png",
            "advantages": [
                "Prix happy hour toute l'année sur Embuscade, Punch, Pinte blonde 'Le Zinc' et Limonade"
            ],
            "conditions": "Tarifs réservés aux porteurs de la carte BDE 2025-2026",
            "website": "https://www.monsieur-lezinc.com/rennes-michel",
            "address": "12 Rue Saint-Michel, 35000 Rennes",
            "active": true
        },
        {
            "id": "vandb-rennes",
            "name": "V&B Rennes (3 boutiques)",
            "category": "bar",
            "city": "Rennes",
            "logo": "/images/partners/v&b.png",
            "address": "1 Rue de la Sauvaie, 35200 Rennes",
            "website": "https://www.vandb.fr/",
            "advantages": [
                "Toute l’année, -1€ sur une sélection des deux premières bières blondes",
                "50cl de Kasteel Rouge : 6€",
                "50cl de Pils : 4€",
                "50cl de Punch / Embuscade : 4€",
                "Saucisson : 4€",
                "Softs (canettes de sodas, Coca, Orangina, etc.) : 2€"
            ],
            "conditions": "Tarifs réservés aux porteurs de la carte BDE 2025-2026",
            "active": true
        },
        {
            "id": "boulangerie-ange",
            "name": "Boulangerie Ange (3 boutiques)",
            "category": "alimentaire",
            "city": "Rennes",
            "logo": "/images/partners/ange.png",
            "address": "BOULANGERIE ANGE, 171 Rue de Châteaugiron, 35000 Rennes",
            "website": "https://www.boulangerie-ange.fr/stores/boulangerie-ange-rennes-chateaugiron/?utm_source=google&utm_medium=organic&utm_campaign=mybusiness-website",
            "advantages": [
                "-10% sur le montant total",
                "Priorité sur les grosses réservations"
            ],
            "conditions": "Valable dans les 3 boutiques Ange de Rennes, toute l'année 2025-2026 sous présentation de la carte BDE",
            "active": true
        }
    ]

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
    const eventsData = [
        {
            "slug": "soiree-integration-2025",
            "title": "Soirée d'intégration 2025",
            "date": "2026-10-09T20:30:00+02:00",
            "endDate": "2026-10-10T01:00:00+02:00",
            "place": "Rue Saint-Michel, 35000 Rennes | MrZinc",
            "cover": "/images/events/soiree-inte.jpg",
            "tags": ["soirée", "campus", "intégration"],
            "description": "La soirée incontournable de la rentrée ! Venez faire connaissance avec les nouveaux étudiants et profiter d'une ambiance de folie. Bar jusqu'à 01h, animations et surprises vous attendent ! Nous vous attendons avec impatience ! Les +1 sont autorisés !",
            "published": true,
            "photosUrl": "https://drive.google.com/drive/u/5/folders/17f5qOYSQfhSdJbXxm6rYls4YZVf3ZFbk"
        },
        {
            "slug": "futsal-orga-2025",
            "title": "Futsal UrbanSoccer avec l'École & le BDE",
            "date": "2026-10-23T18:00:00+02:00",
            "endDate": "2026-10-23T19:00:00+02:00",
            "place": "UrbanSoccer Rennes Vern, Le Bois de Soeuvres, Rue de Chantepie, 35770 Vern-sur-Seiche",
            "cover": "/images/events/terrain-indoor-de-foot.jpg",
            "tags": ["sport", "futsal", "école", "BDE"],
            "description": "Viens participer à une session Futsal organisée par Léna (responsable événements de l'école) et relayée par le BDE avec tout notre soutien ! Rendez-vous à UrbanSoccer Rennes à Vern-sur-Seiche pour une soirée sportive et conviviale entre étudiant·e·s. Ouvert à tous les niveaux, inscription bientôt disponible.",
            "published": true,
            "ticketUrl": null,
            "photosUrl": null
        }
    ]

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
    const teamData = [
        {
            "name": "Mathis BRUEL",
            "role": "Président",
            "photo": "/images/team/mathis.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/mathis-bruel/",
                "instagram": "https://instagram.com/mathisbruel17",
                "email": "mathis.bruel@suprennes.me"
            }
        },
        {
            "name": "Solenn COULON",
            "role": "Trésorière",
            "photo": "/images/team/solenn.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/solenn-coulon-89408726b/",
                "email": "solenn.coulon@suprennes.me"
            }
        },
        {
            "name": "Lucien GUIBOUT",
            "role": "Vice-Président",
            "photo": "/images/team/lucien.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/lucien-guibout-44a551284/",
                "instagram": "https://www.instagram.com/lucien.guibout/",
                "email": "lucien.guibout@suprennes.me"
            }
        },
        {
            "name": "Titouan LE BRUN A VALI PATEL",
            "role": "Vice-Trésorier",
            "photo": "/images/team/titouan.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/titouan-le-brun-8ab329223/",
                "instagram": "https://www.instagram.com/titouan.lebrn/",
                "email": "titouan.lebrun@suprennes.me"
            }
        },
        {
            "name": "Ivin HERNIO",
            "role": "Responsable Événementiel",
            "photo": "/images/team/ivin.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/ivin-hernio-1b604b229/",
                "instagram": "https://www.instagram.com/ivinhernio/",
                "email": "ivin.hernio@suprennes.me"
            }
        },
        {
            "name": "Coline Treille",
            "role": "Responsable Communication",
            "photo": "/images/team/coline.png",
            "photoPosition": "top",
            "links": {
                "linkedin": "https://www.linkedin.com/in/coline-treille-ab7836227/",
                "email": "coline.treille@suprennes.me"
            }
        },
        {
            "name": "Yoann RENAT",
            "role": "Chargé Partenariat",
            "photo": "/images/team/yoann.png",
            "photoPosition": "top",
            "links": {
                "instagram": "https://instagram.com/_yoann_rnt_",
                "email": "yoann.renat@suprennes.me"
            }
        }
    ]

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
    const settingsData = {
        "association": "BDE Sup'RNova",
        "year": "2025-2026",
        "email": "bureau@suprennes.me",
        "shopUrl": "https://boutique.suprennes.me",
        "instagram": "https://www.instagram.com/bde_sup_rnova/",
        "discord": "https://discord.gg/kkApvPf5KB",
        "facebook": undefined,
        "linkedin": undefined
    }

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
