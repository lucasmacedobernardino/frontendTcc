"use client"
import Image from "next/image"
import Link from "next/link"
import Footer from '@/app/components/footerComponent';
import { useEffect, useState } from 'react';
import ip from '@/app/ip';
export default function RankingCiencia() {
    const [ranking, setRanking] = useState([{}])
    const [top3, setTop3] = useState([{}])
    const fetchRanking = async () => {
        try {

            const response = await fetch(`${ip}/usuarioresposta/rankingCiencia/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json();
                const top3 = data.splice(0, 3)
                setTop3(top3)
                setRanking(data)
                console.log(data)
                console.log(top3)

            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    }



    useEffect(() => {
        fetchRanking()
    }, [])
    return (
        <div className="flex items-center justify-center">
            <div className="p-7 bg-[#D8B2EC] h-auto w-auto">
                <header className="flex justify-between items-center pl-3 pt-5">
                    <Link href='/home/ranking' className='z-20'>
                        <Image src="/assets/voltar.png" height={20} width={20} alt="Voltar" priority />
                    </Link>
                    <div></div>
                </header>

                <div className='flex justify-center items-center translate-x-2 mt-1 -translate-y-10'>
                    <Image src='/assets/mago_ciencias_svg.svg' alt='Mago de ciências' height={169} width={169} />
                </div>

                <div className="flex items-end justify-center ">
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Image src="/assets/esmeralda.svg" width={28} height={28} alt="avatar" priority className='translate-x-[85%] translate-y-[.7rem]' />
                        <div className="w-24 h-24 bg-[#00F1A5] rounded-full translate-y-4 translate-x-6 border-[.2rem] border-[#1770457f]">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[15%] translate-y-[10%]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#00F1A5] rounded-full text-[8px] flex justify-center translate-y-2 translate-x-6'>2</div>
                        <div className='flex flex-col items-center justify-center translate-x-[51%] translate-y-2'>
                            <p className='text-[8px]'>{top3[1]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{top3[1]?.pontuacao}</p>
                        </div>
                    </div>
                    <div className='z-20 flex flex-col justify-center items-center'>
                        <Image src="/assets/coroa.svg" width={48} height={48} alt='medalhas' priority />
                        <div className="w-28 h-28 bg-[#E0D81F] rounded-full border-[#FFF50D] border-[.2rem] relative">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[25%] translate-y-[.9rem]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#E0D81F] rounded-full text-[8px] flex justify-center -translate-y-2'>1</div>
                        <div className='flex flex-col items-center justify-center -translate-y-2'>
                            <p className='text-[8px]'>{top3[0]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{top3[0]?.pontuacao}</p>
                        </div>
                    </div>
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Image src="/assets/diamante.svg" width={24} height={24} alt='medalhas' priority className='-translate-x-[85%] translate-y-[.7rem]' />
                        <div className="w-24 h-24 bg-[#2FC0F0] rounded-full translate-y-4 -translate-x-6 border-[.2rem] border-[#1e7998]">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[15%] translate-y-[.7rem]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#2FC0F0] rounded-full text-[8px] flex justify-center translate-y-2 -translate-x-6'>3</div>
                        <div className='flex flex-col items-center justify-center -translate-x-6 translate-y-2'>
                            <p className='text-[8px]'>{top3[2]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{top3[2]?.pontuacao}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='flex flex-col items-start justify-center my-2'>
                        {ranking?.map((element, index) => <div key={index} className='bg-[#f8f8ff] mb-2 rounded-r-full rounded-l-full p-1 w-[20rem] border-black border-2'>
                            <div className='flex items-center justify-between gap-4'>
                                <div className='w-12 h-12 bg-white border-[.2rem] border-[#8e8d8d] rounded-full flex justify-center'>
                                    <Image src="/assets/mago.svg" width={33} height={33} alt="avatar" priority />
                                </div>
                                <p className='text-[12px]'>{element.nome}</p>
                                <p className='text-[#EF0202] pr-2'>{element.pontuacao}</p>
                            </div>
                        </div>)}
                    </div>
                </div>

                <Footer />
            </div>
        </div>

    )
}
