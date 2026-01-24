import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const dirPath = path.join(process.cwd(), 'public', 'carrusel')

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))

  const images = files.map((file) => ({
    id: file,
    url: `/carrusel/${file}`,
    alt: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
  }))

  return NextResponse.json(images)
}
