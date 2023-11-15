"use client"
import Image from "next/image"
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-[#735ED9] flex-col">
            <Image src="/assets/education-purple.svg" width={120} height={120} className='bg-white' />
            <h1 className="text-center text-white text-5xl mb-1 font-semibold italic">duolfes</h1>
            <div className='flex items-center justify-center'>
                <div className="flex justify-center items-center">
                    <div className="animate-spin h-8 w-8 border-b-2 border-white rounded-full mt-3"></div>
                </div>
            </div>
        </div>
    )
}