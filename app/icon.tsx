import fs from 'fs'
import path from 'path'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  const logoPath = path.join(process.cwd(), 'public/images/assets/icon.svg')
  
  return new Response(fs.readFileSync(logoPath), {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  })
}

