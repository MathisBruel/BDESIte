import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
export const runtime = 'nodejs'
 
export default async function Icon() {
  try {
    const logoPath = path.join(process.cwd(), 'public/images/assets/Logo simple couleur.png')
    const logoBuffer = fs.readFileSync(logoPath)
    const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
          <img src={logoBase64} alt="Logo" width="32" height="32" />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Failed to generate icon:', error)
    // Return a simple colored square fallback for Windows compatibility
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#CC3533',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#f8cf0e',
            }}
          >
            S
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }
}

