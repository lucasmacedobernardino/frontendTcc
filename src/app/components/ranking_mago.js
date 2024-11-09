"use client"

import Image from "next/image"
import Link from "next/link"

export default function RankingMago({ src, alt, title, href, translate }) {
    return (
        <Link href={href ? href : ''} className={href ? "cursor-pointer" : "cursor-default"}>
            <div className={'text-black flex flex-col items-center justify-center' + ` ${translate}`}>
                <Image src={src} width={62} height={62} alt={alt} priority />
                <p className='text-[10px] font-bold'>
                    {title}
                </p>
            </div>
        </Link>
    )
}