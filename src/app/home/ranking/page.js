"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image"
import RankingMago from '@/app/components/ranking_mago';
import Footer from '@/app/components/footerComponent';
import { useEffect, useState } from 'react';
import ip from '@/app/ip';
export default function Ranking() {
    const [ranking, setRanking] = useState([{}])
    const router = useRouter();
    const fetchRanking = async () => {
        try {

            const response = await fetch(`${ip}/usuarioresposta/rankingTotal/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json();
                setRanking(data)
                console.log(`este é o state ${ranking}`)
                console.log(data)

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
            <div className="w-[360px] h-[800px] p-2">
                <header className="flex justify-around items-center">
                    <div onClick={() => router.push('/home')} className='cursor-pointer'>
                        <Image src="/assets/voltar.png" height={20} width={20} alt="Voltar" priority />
                    </div>
                    <div className="text-[20px] cursor-default">Ranking</div>
                    <div></div>
                </header>
                <div className='mt-3'>
                    <div className='flex justify-center items-center '>
                        <RankingMago src='/assets/mago_historia_svg.svg' alt='Mago de história' title='História' href='/home' />
                    </div>
                    <div className='flex items-center justify-around'>
                        <RankingMago src='/assets/mago_matematica_svg.svg' alt='Mago de matemática' title='Matemática' translate="translate-x-5 -translate-y-[3.60rem]" />
                        <RankingMago src='/assets/mago_geografia_svg.svg' alt='Mago de geografia' title='Geografia' translate="-translate-y-[3.60rem] -translate-x-[1rem]" />
                    </div>

                    <div className='flex items-center justify-between '>
                        <RankingMago src='/assets/mago_portugues_svg.svg' alt='Mago de português' title='Português' translate="-translate-y-[5rem]" />
                        <RankingMago src='/assets/mago_ciencias_svg.svg' alt='Mago de ciências' title='Ciência' translate="-translate-y-[5.1rem]" />
                    </div>
                </div>
                <div className="flex items-end justify-center -translate-y-[5rem]">
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Image src="/assets/esmeralda.svg" width={28} height={28} alt="avatar" priority className='translate-x-[85%] translate-y-[.7rem]' />
                        <div className="w-24 h-24 bg-[#00F1A5] rounded-full translate-y-4 translate-x-6 border-[.2rem] border-[#1770457f]">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[15%] translate-y-[10%]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#00F1A5] rounded-full text-[8px] flex justify-center translate-y-2 translate-x-6'>2</div>
                        <div className='flex flex-col items-center justify-center translate-x-[51%] translate-y-2'>
                            <p className='text-[8px]'>{ranking[1]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{ranking[1]?.pontuacao}</p>
                        </div>
                    </div>
                    <div className='z-20 flex flex-col justify-center items-center'>
                        <Image src="/assets/coroa.svg" width={48} height={48} alt='medalhas' priority />
                        <div className="w-28 h-28 bg-[#E0D81F] rounded-full border-[#FFF50D] border-[.2rem] relative">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[25%] translate-y-[.9rem]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#E0D81F] rounded-full text-[8px] flex justify-center -translate-y-2'>1</div>
                        <div className='flex flex-col items-center justify-center -translate-y-2'>
                            <p className='text-[8px]'>{ranking[0]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{ranking[0]?.pontuacao}</p>
                        </div>
                    </div>
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Image src="/assets/diamante.svg" width={24} height={24} alt='medalhas' priority className='-translate-x-[85%] translate-y-[.7rem]' />
                        <div className="w-24 h-24 bg-[#2FC0F0] rounded-full translate-y-4 -translate-x-6 border-[.2rem] border-[#1e7998]">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority className='translate-x-[15%] translate-y-[.7rem]' />
                        </div>
                        <div className='text-white w-3 h-3 bg-[#2FC0F0] rounded-full text-[8px] flex justify-center translate-y-2 -translate-x-6'>3</div>
                        <div className='flex flex-col items-center justify-center -translate-x-6 translate-y-2'>
                            <p className='text-[8px]'>{ranking[2]?.nome}</p>
                            <p className='text-[16px] -translate-y-1 text-[#EF0202]'>{ranking[2]?.pontuacao}</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>

    )
}
/** 
 <div class="flex flex-col items-center">
  <!-- Header de título -->
  <h2 class="text-2xl font-semibold mb-4">Ranking</h2>
  
  <!-- Layout dos Magos em parábola invertida -->
  <div class="relative flex justify-center items-end">
    <!-- Mago de Português -->
    <div class="absolute left-0 transform translate-y-8">
      <img src="path/to/wizard-portugues.png" alt="Português" class="w-16 h-16 mb-2 mx-auto">
      <p class="text-center">Português</p>
    </div>

    <!-- Mago de Matemática -->
    <div class="absolute left-1/4 transform translate-y-4">
      <img src="path/to/wizard-matematica.png" alt="Matemática" class="w-16 h-16 mb-2 mx-auto">
      <p class="text-center">Matemática</p>
    </div>

    <!-- Mago de História (Central) -->
    <div class="absolute transform -translate-y-0">
      <img src="path/to/wizard-historia.png" alt="História" class="w-16 h-16 mb-2 mx-auto">
      <p class="text-center">História</p>
    </div>

    <!-- Mago de Geografia -->
    <div class="absolute right-1/4 transform translate-y-4">
      <img src="path/to/wizard-geografia.png" alt="Geografia" class="w-16 h-16 mb-2 mx-auto">
      <p class="text-center">Geografia</p>
    </div>

    <!-- Mago de Ciências -->
    <div class="absolute right-0 transform translate-y-8">
      <img src="path/to/wizard-ciencias.png" alt="Ciências" class="w-16 h-16 mb-2 mx-auto">
      <p class="text-center">Ciências</p>
    </div>
  </div>
  
  <!-- Coroa abaixo dos magos -->
  <div class="mt-8">
    <img src="path/to/crown.png" alt="Coroa" class="w-12 h-12 mx-auto">
  </div>
</div>

 * 
 * 
*/
