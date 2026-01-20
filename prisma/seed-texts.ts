import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
// NOTE: This seed script is deprecated. Texts are now managed in the database.
// import { DEFAULT_TEXTS } from '../lib/constants'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/bde_db'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

function flattenObject(obj: any, prefix = ''): { key: string, value: string }[] {
    return Object.keys(obj).reduce((acc: { key: string, value: string }[], k) => {
        const pre = prefix.length ? prefix + '.' : ''
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k))
        } else {
            acc.push({
                key: pre + k,
                value: JSON.stringify(obj[k])
            })
        }
        return acc
    }, [])
}

async function main() {
    console.log('This seed script is deprecated. Texts are now managed directly in the database.')
    console.log('To update texts, use the database admin interface or create a new migration.')
    
    // NOTE: Original seeding logic commented out as DEFAULT_TEXTS has been removed
    /*
    console.log('Start seeding texts...')

    // Process each section of DEFAULT_TEXTS
    for (const [section, content] of Object.entries(DEFAULT_TEXTS)) {
        console.log(`Processing section: ${section}`)
        const flattened = flattenObject(content)

        for (const item of flattened) {
            await prisma.siteContent.upsert({
                where: {
                    section_key: {
                        section,
                        key: item.key
                    }
                },
                update: {
                    value: item.value
                },
                create: {
                    section,
                    key: item.key,
                    value: item.value
                }
            })
        }
    }

    console.log('Seeding texts finished.')
    */
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
