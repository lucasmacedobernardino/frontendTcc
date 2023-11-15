"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../components/loading';
export default function Home() {
    const [loading, setLoading] = useState(true)
    const handleNavigation = (e, path) => {
        // Impede a ação padrão do Link
        e.preventDefault();

        if (vidaPonto.vidas > 0) {
            // Se o usuário tiver vidas, prossegue com a navegação
            router.push(path);
        } else {
            // Se não tiver vidas, exibe um alerta
            alert('Você está sem vidas.');
        }
    };


    useEffect(() => {
        // Certifique-se de que o usuário esteja definido antes de fazer a chamada
        if (usuario && usuario.id) {
            vidasPontuacao();
        }
        setLoading(false)
    }, []);
    const [vidaPonto, setVidaPonto] = useState({"vidas": 0, "pontuacao_ano": 0})
    const ip = "http://3.17.204.62:3333"
    const router = useRouter();
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    async function vidasPontuacao(){
        try {
            const response = await fetch(`${ip}/usuarios/${usuario.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setVidaPonto({"vidas": data.vidas, "pontuacao_ano": data.pontuacao_ano});
            }
        } catch (error) {
            console.error(error);
        }
    }
    function primeiroNome(nomeCompleto) {
        return nomeCompleto.split(' ')[0];
    }
    return (
        loading ? <Loading/> :
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
                            <h1 className="text-2xl font-bold text-[#f5ba3d]">Pontuação {vidaPonto.pontuacao_ano}</h1>
                        </div>
                        <div className='flex flex-col items-center justify-center pl-20'>
                            <Image src="/assets/heartRed.svg" width={32} height={32} />
                            <h2 className="text-lg font-bold">{vidaPonto.vidas}</h2>
                        </div>
                    </div>

                </header>
                <hr className="mb-4" />
                <div className='flex flex-col'>
                    <Link href="/home/portugues" onClick={(e) => handleNavigation(e, "/home/portugues")} className="mb-14 flex items-center font-sans">
                        <Image src="/assets/book-stack.svg" width={48} height={48} className='ml-3 mr-6' />
                        <h1 className="text-2xl font-bold">Língua Portuguesa</h1>
                    </Link>
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