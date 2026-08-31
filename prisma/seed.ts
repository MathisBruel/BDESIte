import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5433/bde_db?schema=public'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding ...')

    // 1. AcademicYear
    const year = await prisma.academicYear.upsert({
        where: { slug: "2025-2026" },
        update: { isCurrent: true },
        create: {
            label: "2025-2026",
            slug: "2025-2026",
            startDate: new Date("2025-09-01"),
            endDate: new Date("2026-08-31"),
            isCurrent: true,
        },
    })
    console.log(`✓ AcademicYear: ${year.label}`)

    // 2. Partners
    const partnersData = [
        {
            id: "cmtdlhrce0009mpwv733qzueg",
            name: "EFS - Établissement Français du Sang",
            category: "sante",
            city: "Rennes",
            logo: null,
            advantages: [
                "Organisation de collectes de sang sur le campus",
                "Sensibilisation au don du sang",
                "Possibilité de collecte à SDV (minimum 100 dons)"
            ],
            conditions: "Réservation de créneau à prévoir 2-3 semaines à l'avance",
            website: null,
            address: null,
            active: false,
        },
        {
            id: "cmtdlhrcm000ampwvq9x254lf",
            name: "Monsieur le Zinc",
            category: "bar",
            city: "Rennes",
            logo: "partners/MrZinc.png",
            advantages: [
                "Prix happy hour toute l'année sur Embuscade, Punch, Pinte blonde 'Le Zinc' et Limonade"
            ],
            conditions: "Tarifs réservés aux porteurs de la carte BDE 2025-2026",
            website: "https://www.monsieur-lezinc.com/rennes-michel",
            address: "12 Rue Saint-Michel, 35000 Rennes",
            active: true,
        },
        {
            id: "cmtdlhrco000bmpwvgg7cdh8p",
            name: "V&B Rennes (3 boutiques)",
            category: "bar",
            city: "Rennes",
            logo: "partners/v&b.png",
            advantages: [
                "Toute l'année, -1€ sur une sélection des deux premières bières blondes",
                "50cl de Kasteel Rouge : 6€",
                "50cl de Pils : 4€",
                "50cl de Punch / Embuscade : 4€",
                "Saucisson : 4€",
                "Softs (canettes de sodas, Coca, Orangina, etc.) : 2€"
            ],
            conditions: "Tarifs réservés aux porteurs de la carte BDE 2025-2026",
            website: "https://www.vandb.fr/",
            address: "1 Rue de la Sauvaie, 35200 Rennes",
            active: true,
        },
        {
            id: "cmtdlhrcp000cmpwvldhucwk3",
            name: "Boulangerie Ange (3 boutiques)",
            category: "alimentaire",
            city: "Rennes",
            logo: "partners/ange.png",
            advantages: ["-10% sur le montant total"],
            conditions: "Valable dans les 3 boutiques Ange de Rennes, toute l'année 2025-2026 sous présentation de la carte BDE",
            website: "https://www.boulangerie-ange.fr/stores/boulangerie-ange-rennes-chateaugiron/?utm_source=google&utm_medium=organic&utm_campaign=mybusiness-website",
            address: "BOULANGERIE ANGE, 171 Rue de Châteaugiron, 35000 Rennes",
            active: true,
        },
        {
            id: "cmtdlhrcq000dmpwvi54btbb2",
            name: "Amour de pizza",
            category: "alimentaire",
            city: "Chantepie",
            logo: "partners/adp.jpg",
            advantages: ["-10% sur le montant total"],
            conditions: "Tarifs réservés aux porteurs de la carte BDE 2025-2026",
            website: "https://www.amourdepizza.fr/",
            address: "2 Rue du Noyer, 35000 Rennes",
            active: true,
        },
    ]

    console.log(`Seeding ${partnersData.length} partners...`)
    for (const p of partnersData) {
        await prisma.partner.upsert({
            where: { id: p.id },
            update: p,
            create: p,
        })
    }

    // 3. Events
    const eventsData = [
        {
            slug: "soiree-integration-2025",
            title: "Soirée d'intégration 2025",
            date: new Date("2025-10-09T18:30:00"),
            endDate: new Date("2025-10-09T23:00:00"),
            place: "Rue Saint-Michel, 35000 Rennes | MrZinc",
            cover: "events/soiree-inte.jpg",
            tags: ["soirée", "campus", "intégration"],
            description: "La soirée incontournable de la rentrée ! Venez faire connaissance avec les nouveaux étudiants et profiter d'une ambiance de folie. Bar jusqu'à 01h, animations et surprises vous attendent ! Nous vous attendons avec impatience ! Les +1 sont autorisés !",
            ticketUrl: null,
            published: true,
            photosUrl: "https://drive.google.com/drive/folders/17f5qOYSQfhSdJbXxm6rYls4YZVf3ZFbk",
            academicYearId: year.id,
        },
        {
            slug: "halloween-deguise-2025",
            title: "Journée Halloween Déguisée",
            date: new Date("2025-10-31T08:00:00"),
            endDate: null,
            place: "Campus de l'école",
            cover: "events/Halloween.jpg",
            tags: ["campus", "halloween", "déguisement", "pédagogie"],
            description: "À l'occasion d'Halloween, tous les étudiant·e·s étaient invité·e·s à venir déguisé·e·s pour célébrer l'événement ! Nous avons eu quelques participant·e·s et l'équipe pédagogique a également joué le jeu, ajoutant une touche de fantaisie à cette journée d'apprentissage.",
            ticketUrl: null,
            published: true,
            photosUrl: "https://drive.google.com/drive/folders/1P9mnPmzjVTp-cKi_Vp6wcWKtZ9wijo7R?usp=sharing",
            academicYearId: year.id,
        },
        {
            slug: "futsal-orga-2025",
            title: "Futsal UrbanSoccer avec l'École & le BDE",
            date: new Date("2025-10-23T16:00:00"),
            endDate: new Date("2025-10-23T17:00:00"),
            place: "UrbanSoccer Rennes Vern, Le Bois de Soeuvres, Rue de Chantepie, 35770 Vern-sur-Seiche",
            cover: "events/terrain-indoor-de-foot.jpg",
            tags: ["sport", "futsal", "école", "BDE"],
            description: "Viens participer à une session Futsal organisée par Léna (responsable événements de l'école) et relayée par le BDE avec tout notre soutien ! Rendez-vous à UrbanSoccer Rennes à Vern-sur-Seiche pour une soirée sportive et conviviale entre étudiant·e·s. Ouvert à tous les niveaux, inscription bientôt disponible.",
            ticketUrl: null,
            published: true,
            photosUrl: "https://drive.google.com/drive/folders/1MM_8XzM8k2y6EvdE-s_mFRy9OB8VAUqB",
            academicYearId: year.id,
        },
        {
            slug: "don-du-sang-novembre-2025",
            title: "Don du sang - Session Novembre",
            date: new Date("2025-11-13T16:00:00"),
            endDate: null,
            place: "EFS Rennes",
            cover: "events/donsang-nov.jpg",
            tags: ["santé", "solidarité", "BDE"],
            description: "Le BDE est passé à l'EFS. 6 personnes se sont mobilisées et ont effectué 6 dons du sang le 13 novembre. Merci à eux !",
            ticketUrl: null,
            published: true,
            photosUrl: null,
            academicYearId: year.id,
        },
        {
            slug: "sensibilisation-don-sang-moelle-osseuse-2025",
            title: "Sensibilisation Don du Sang et Moelle Osseuse",
            date: new Date("2025-12-08T08:00:00"),
            endDate: null,
            place: "Campus de l'école",
            cover: "events/donsang.png",
            tags: ["santé", "EFS", "moelle osseuse", "sensibilisation", "engagement"],
            description: "Journée de sensibilisation au don du sang en collaboration avec l'EFS (Établissement Français du Sang) avec la venue d'une intervenante. Cet événement est mené en parallèle du projet de Marie-Sidonie pour le don de moelle osseuse. Suite à l'intervention, des voitures seront organisées à la fin des cours pour vous emmener à l'EFS afin de participer à cette action citoyenne essentielle. Votre engagement est important à nos yeux !",
            ticketUrl: null,
            published: false,
            photosUrl: null,
            academicYearId: year.id,
        },
        {
            slug: "futsal-decembre-2025",
            title: "Futsal UrbanSoccer - Session Décembre",
            date: new Date("2025-12-09T17:00:00"),
            endDate: new Date("2025-12-09T18:00:00"),
            place: "UrbanSoccer Rennes Vern, Le Bois de Soeuvres, Rue de Chantepie, 35770 Vern-sur-Seiche",
            cover: "events/terrain-indoor-de-foot.jpg",
            tags: ["sport", "futsal", "détente"],
            description: "Une nouvelle session de Futsal s'est déroulée le 9 décembre à l'UrbanSoccer. Un moment sportif idéal pour se retrouver et se défouler entre étudiant·e·s.",
            ticketUrl: null,
            published: true,
            photosUrl: "https://drive.google.com/drive/folders/1wgcQfphOS0TVXSEosEBs9u--DQ2vEH3T?usp=sharing",
            academicYearId: year.id,
        },
        {
            slug: "don-sang-et-plasma-decembre-2025",
            title: "Don de Sang et Plasma",
            date: new Date("2025-12-11T16:00:00"),
            endDate: null,
            place: "EFS Rennes",
            cover: "events/donsang.png",
            tags: ["santé", "plasma", "solidarité", "EFS"],
            description: "4 personnes de l'école ont fait un don à l'EFS : 2 dons de sang et 2 dons de plasma. Le don de plasma permet de prélever uniquement la partie liquide du sang qui contient des protéines vitales pour de nombreux malades (hémophiles, déficits immunitaires).",
            ticketUrl: null,
            published: true,
            photosUrl: null,
            academicYearId: year.id,
        },
        {
            slug: "soiree-noel-2025",
            title: "Soirée Noël",
            date: new Date("2025-12-11T20:00:00"),
            endDate: null,
            place: "Rue Saint-Michel, 35000 Rennes | MrZinc",
            cover: "events/soiree-inte2.jpg",
            tags: ["soirée", "noël", "convivialité", "partenariat"],
            description: "La soirée de Noël est l'occasion parfaite de se retrouver entre étudiant·e·s pour célébrer la fin de l'année dans une ambiance festive et conviviale. Au programme : Loterie, concours de Noël, ...",
            ticketUrl: null,
            published: true,
            photosUrl: null,
            academicYearId: year.id,
        },
        {
            slug: "soiree-chill-chawp",
            title: "Soirée chill",
            date: new Date("2026-03-17T00:00:00"),
            endDate: null,
            place: "Restaurant Chawp Shop 18 Pl. des Lices, 35000 Rennes",
            cover: "events/1778155842975-IMG_8229-5.jpg",
            tags: [],
            description: "Pour relâcher la pression après le hackathon, le BDE a prolongé l'afterwork de l'école en vous donnant rendez-vous au Chawp Shop (Place des Lices) ! L'occasion parfaite pour décompresser ensemble avec de quoi boire et manger à des tarifs négociés. Une belle soirée pour clôturer ces intenses journées de code dans la bonne humeur !",
            ticketUrl: null,
            published: true,
            photosUrl: "https://drive.google.com/drive/folders/1twhPjkXROgWWeif0yxhLVPjah5_tpCgN?usp=sharing",
            academicYearId: year.id,
        },
        {
            slug: "wed-avril-2026",
            title: "Week-end Étudiant (WED) 2026",
            date: new Date("2026-04-10T16:00:00"),
            endDate: new Date("2026-04-12T12:00:00"),
            place: "Domaine le 5B, Plélan-Le-Grand",
            cover: "events/wed-cover.jpg",
            tags: ["WED", "intégration", "week-end", "BDE"],
            description: "L'organisation du WED avance ! Ce week-end se passera au domaine le 5B à Plélan-Le-Grand (20 - 30 min de Rennes). Au programme : Des animations tout au long du week-end, des soirées, des boissons comprises dans le prix du week-end (entre 100€ et 130€) et plein de surprises. Remplissez le formulaire pour nous aider à prévoir ce week-end magique !\nhttps://docs.google.com/forms/d/e/1FAIpQLSdRCzwAfpvy5fhHnakgnbnEi33tooFfIxuaaGKorV1bCBVWzQ",
            ticketUrl: null,
            published: true,
            photosUrl: null,
            academicYearId: year.id,
        },
    ]

    console.log(`Seeding ${eventsData.length} events...`)
    for (const e of eventsData) {
        await prisma.event.upsert({
            where: { slug: e.slug },
            update: { academicYearId: year.id },
            create: e,
        })
    }

    // 4. Team members (IDs stables depuis le backup → TeamMembership possible)
    const teamData = [
        {
            id: "cmtdlhr800000mpwvcn9wbk04",
            name: "Mathis BRUEL",
            role: "Président",
            photo: "team/mathis.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/mathis-bruel/",
            instagram: "https://instagram.com/mathisbruel17",
            email: "mathis.bruel@suprennes.me",
            order: 0,
        },
        {
            id: "cmtdlhr820001mpwv920iy9wk",
            name: "Solenn COULON",
            role: "Trésorière",
            photo: "team/solenn.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/solenn-coulon-89408726b/",
            instagram: null,
            email: "solenn.coulon@suprennes.me",
            order: 1,
        },
        {
            id: "cmtdlhr840002mpwv1lztfppl",
            name: "Lucien GUIBOUT",
            role: "Vice-Président",
            photo: "team/lucien.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/lucien-guibout-44a551284/",
            instagram: "https://www.instagram.com/lucien.guibout/",
            email: "lucien.guibout@suprennes.me",
            order: 2,
        },
        {
            id: "cmtdlhr850003mpwvgqk7ebj4",
            name: "Titouan LE BRUN A VALI PATEL",
            role: "Vice-Trésorier",
            photo: "team/titouan.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/titouan-le-brun-8ab329223/",
            instagram: "https://www.instagram.com/titouan.lebrn/",
            email: "titouan.lebrun@suprennes.me",
            order: 3,
        },
        {
            id: "cmtdlhr860004mpwvkxjhi0yo",
            name: "Ivin HERNIO",
            role: "Responsable Événementiel",
            photo: "team/ivin.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/ivin-hernio-1b604b229/",
            instagram: "https://www.instagram.com/ivinhernio/",
            email: "ivin.hernio@suprennes.me",
            order: 4,
        },
        {
            id: "cmtdlhr870005mpwvd243xkw4",
            name: "Coline Treille",
            role: "Responsable Communication",
            photo: "team/coline.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/coline-treille-ab7836227/",
            instagram: null,
            email: "coline.treille@suprennes.me",
            order: 5,
        },
        {
            id: "cmtdlhr890006mpwvyjcsmuy7",
            name: "Yoann RENAT",
            role: "Chargé Partenariat",
            photo: "team/yoann.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/yoann-renat-431273230/",
            instagram: "https://instagram.com/_yoann_rnt_",
            email: "yoann.renat@suprennes.me",
            order: 6,
        },
        {
            id: "cmtdlhr8a0007mpwvhsvqhklq",
            name: "Jonathan PRIOUX",
            role: "Photographe",
            photo: "team/Jo.png",
            photoPosition: "top",
            linkedin: "https://www.linkedin.com/in/jonathan-prioux-45b13a206/",
            instagram: "https://www.instagram.com/jonathanprioux/",
            email: "jonathan.prioux@suprennes.me",
            order: 7,
        },
        {
            id: "cmtdlhr8b0008mpwvm18zdcqy",
            name: "Adam SICAUD",
            role: "Chargé Communication",
            photo: "team/Adam.jpg",
            photoPosition: "center",
            linkedin: "https://www.linkedin.com/in/adam-sicaud-1333bb38b/",
            instagram: "https://www.instagram.com/sic.adam/",
            email: "adam.sicaud@suprennes.me",
            order: 8,
        },
    ]

    console.log(`Seeding ${teamData.length} team members...`)
    for (const t of teamData) {
        const { order, ...memberData } = t
        await prisma.teamMember.upsert({
            where: { id: t.id },
            update: memberData,
            create: memberData,
        })
        await prisma.teamMembership.upsert({
            where: {
                teamMemberId_academicYearId: {
                    teamMemberId: t.id,
                    academicYearId: year.id,
                },
            },
            update: { role: t.role, order },
            create: {
                teamMemberId: t.id,
                academicYearId: year.id,
                role: t.role,
                order,
            },
        })
    }

    // 5. Products
    const productsData = [
        { id: "cmtdlhrcu000empwvh5vge7ik", name: "Caprisun", type: "boisson", quantity: 10, price: 0.7, active: true, order: 0 },
        { id: "cmtdlhrcv000fmpwvxpiaq2q3", name: "CocaCola Cherry", type: "boisson", quantity: 8, price: 0.9, active: true, order: 1 },
        { id: "cmtdlhrcw000gmpwvyyrs3rd9", name: "M&M's", type: "snack", quantity: 5, price: 0.8, active: true, order: 2 },
        { id: "cmtdlhrcy000hmpwvaa9681jj", name: "Crèpes Whaou", type: "dessert", quantity: 5, price: 0.5, active: true, order: 3 },
        { id: "cmtdlhrcz000impwvhlesp9zo", name: "Monster White", type: "boisson", quantity: 6, price: 1.9, active: true, order: 4 },
        { id: "cmtdlhrd0000jmpwvqvfcm3xi", name: "Monster Classic", type: "boisson", quantity: 4, price: 1.8, active: true, order: 5 },
    ]

    console.log(`Seeding ${productsData.length} products...`)
    for (const p of productsData) {
        await prisma.product.upsert({
            where: { id: p.id },
            update: p,
            create: p,
        })
    }

    // 6. Settings
    console.log('Seeding settings...')
    await prisma.settings.upsert({
        where: { id: 1 },
        update: {
            association: "BDE SUP'RNOVA",
            year: "2025-2026",
            email: "bureau@suprennes.me",
            shopUrl: "https://boutique.suprennes.me",
            instagram: "https://www.instagram.com/bde_sup_rnova/",
            discord: "https://discord.gg/kkApvPf5KB",
            facebook: null,
            linkedin: null,
        },
        create: {
            id: 1,
            association: "BDE SUP'RNOVA",
            year: "2025-2026",
            email: "bureau@suprennes.me",
            shopUrl: "https://boutique.suprennes.me",
            instagram: "https://www.instagram.com/bde_sup_rnova/",
            discord: "https://discord.gg/kkApvPf5KB",
            facebook: null,
            linkedin: null,
        },
    })

    console.log('✅ Seeding finished.')
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
