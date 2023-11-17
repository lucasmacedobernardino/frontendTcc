"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Home() {
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);
    const [qtdConquista, SetQtdConquista] = useState([])
    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");
        if (usuarioData) {
            const usuarioJSON = JSON.parse(usuarioData);
            setUsuario(usuarioJSON);
            getQtdConquistaUsuario(usuarioJSON.id);
        }
    }, []);
    const ip = "http://18.217.102.209:3333";
    async function getQtdConquistaUsuario(userId) {
        try {
            const response = await fetch(`${ip}/usuarioconquista/quantidade/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                SetQtdConquista(data[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='absolute'>
            <div className="flex h-full w-96 flex-col border px-4 py-8 bg-white ">
                <header className="mb-4 flex items-center font-sans text-3xl">
                    <h1 className="text-black">Conquistas</h1>
                </header>
                <hr className="mb-4" />
                <div className='flex flex-col'>
                    <div className="my-14 flex items-center font-sans justify-center">
                        <h1 className="text-2xl font-bold text-black">{qtdConquista[0] ? (qtdConquista[0].quantidade_total + "x") : "0x"}</h1>
                        <Image src="/assets/coroa.svg" width={48} height={48} className='ml-3 mr-6' alt='Coroa' />
                    </div>
                    <div className="mb-14 flex items-center font-sans justify-center">
                        <h1 className="text-2xl font-bold text-black">{qtdConquista[1] ? (qtdConquista[1].quantidade_total + "x") : "0x"}</h1>
                        <Image src="/assets/esmeralda.svg" width={48} height={48} className='ml-3 mr-6' alt='Esmeralda' />
                    </div>
                    <div className="mb-14 flex items-center font-sans justify-center">
                        <h1 className="text-2xl font-bold text-black">{qtdConquista[2] ? (qtdConquista[2].quantidade_total + "x") : "0x"}</h1>
                        <Image src="/assets/diamante.svg" width={48} height={48} className='ml-3 mr-6' alt='Diamante' />
                    </div>
                </div>
            </div>
            <footer className="flex h-full w-full justify-between rounded-b-md bg-[#E8E8EA] p-4 relative bottom-0">
                <Link href={"/home"}>
                    <Image src="/assets/house_icon.svg" width={48} height={48} className='ml-3 mr-6' alt='House' />
                </Link>
                <Link href={"/home/ranking"}>
                    <Image src="/assets/podium.svg" width={48} height={48} className='ml-3 mr-6' alt='Podium' />
                </Link>
                <Link href={"/home/conquistas"}>
                    <Image src="/assets/coroa.svg" width={48} height={48} className='ml-3 mr-6' alt='Crown' />
                </Link>
            </footer>
        </div>
    )
}
