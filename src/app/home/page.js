"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
    const router = useRouter();
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    function primeiroNome(nomeCompleto) {
        return nomeCompleto.split(' ')[0];
    }
    return (
        <div className='absolute'>
            <div className="flex h-full w-96 flex-col border px-4 py-8 bg-white ">
                <header className="mb-4 flex items-center font-sans">
                    <div className="ml-3 mr-6 h-16 w-16 rounded-full">
                        <Image src="/assets/icon-person.svg" width={72} height={72} />
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col items-start justify-center'>
                            <h1 className="text-2xl font-bold">Olá {primeiroNome(usuario.nome)}</h1>
                            <hr/>
                            <h1 className="text-2xl font-bold text-[#eaf645]">Pontuação {usuario.pontuacao_ano}</h1>
                        </div>
                        <div className='flex flex-col items-center justify-center pl-20'>
                            <Image src="/assets/heartRed.svg" width={32} height={32} />
                            <h2 className="text-lg font-bold">{usuario.vidas}</h2>
                        </div>
                    </div>

                </header>
                <hr className="mb-4" />
                <div className='flex flex-col'>
                    <div className="mb-14 flex items-center font-sans">
                        <Image src="/assets/book-stack.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Língua Portuguesa</h1>
                    </div>
                    <div className="mb-14 flex items-center font-sans">
                        <Image src="/assets/equation.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Matemática</h1>
                    </div>
                    <div className="mb-14 flex items-center font-sans">
                        <Image src="/assets/history.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">História</h1>
                    </div>
                    <div className="mb-14 flex items-center font-sans">
                        <Image src="/assets/chemistry.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Ciências</h1>
                    </div>
                    <div className="mb-14 flex items-center font-sans">
                        <Image src="/assets/earth.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Geografia</h1>
                    </div>
                    <div className="mb-4 flex items-center font-sans">
                        <Image src="/assets/dice.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Aleatório</h1>
                    </div>
                </div>
            </div>
            <footer className="flex h-full w-full justify-between rounded-b-md bg-[#E8E8EA] p-4 relative bottom-0">
                <Image src="/assets/house_icon.svg" width={48} height={48} className='ml-3 mr-6' />
                <Image src="/assets/podium.svg" width={48} height={48} className='ml-3 mr-6' />
                <Image src="/assets/coroa.svg" width={48} height={48} className='ml-3 mr-6' />
            </footer>
        </div>
    )
}