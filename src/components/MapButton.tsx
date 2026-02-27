'use client'

export default function MapButton({ url }: { url: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
                e.preventDefault();
                window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="relative z-10 mt-2 block w-full text-center bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors"
        >
            Ver en mapa
        </a>
    );
}
