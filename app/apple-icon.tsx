import fs from 'fs'
import path from 'path'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  const logoPath = path.join(process.cwd(), 'public/images/assets/Logo simple couleur.png')
  
  return new Response(fs.readFileSync(logoPath), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

