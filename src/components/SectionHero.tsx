'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

interface SectionHeroProps {
    imageSrc: string
    titleKey: string
    subtitleKey: string
    children?: React.ReactNode
}

export default function SectionHero({ imageSrc, titleKey, subtitleKey, children }: SectionHeroProps) {
    const { t } = useLanguage()

    return (
        <section className="relative h-64 md:h-72 rounded-lg overflow-hidden mb-8">
            <Image
                src={imageSrc}
                alt={t(titleKey)}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
                        {t(titleKey)}
                    </h1>
                    <p className="text-xl drop-shadow-md mb-4">
                        {t(subtitleKey)}
                    </p>
                    {children}
                </div>
            </div>
        </section>
    )
}
