import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY
    if (!apiKey) {
      console.warn('Falta GOOGLE_DRIVE_API_KEY en las variables de entorno.')
      return NextResponse.json([])
    }

    const folderId = '1Xaj3N28CRtU1xTxITOJGFndoTYjXZBdW'
    const q = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'image/' and trashed = false`)
    const fields = encodeURIComponent('files(id, name)')

    // Solicitud a la API REST de Google Drive
    const driveApiUrl = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${apiKey}`

    const res = await fetch(driveApiUrl)

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Error en la API de Google Drive:', res.status, errorText)
      return NextResponse.json([])
    }

    const data = await res.json()
    const files = data.files || []

    const images = files.map((file: { id: string; name: string }) => {
      // Remover extensión y guiones para crear un texto alt amigable
      const altText = file.name
        ? file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        : 'Carrusel de imagenes'

      return {
        id: file.id,
        // Usamos lh3.googleusercontent.com que suele funcionar muy bien para imágenes de Drive
        url: `https://lh3.googleusercontent.com/d/${file.id}=s1600`,
        alt: altText,
      }
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error al obtener imágenes del carrusel desde Drive:', error)
    // En caso de error, siempre devolver un arreglo vacío
    return NextResponse.json([])
  }
}
