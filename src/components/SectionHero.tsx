'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

interface SectionHeroProps {
    imageSrc: string
    titleKey: string
    subtitleKey: string
}

export default function SectionHero({ imageSrc, titleKey, subtitleKey }: SectionHeroProps) {
    const { t } = useLanguage()

    return (
        <section className="relative h-64 rounded-lg overflow-hidden mb-8">
            <Image
                src={imageSrc}
                alt={t(titleKey)}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
                        {t(titleKey)}
                    </h1>
                    <p className="text-xl drop-shadow-md">
                        {t(subtitleKey)}
                    </p>
                </div>
            </div>
        </section>
    )
}
