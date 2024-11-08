'use client'
import Footer from "@/app/components/footerComponent";
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import ip from "@/app/ip";

export default function Medalhas() {
    const router = useRouter();
    const [token, setToken] = useState(null); // Definindo um estado para o token
    const [medalhas, setMedalhas] = useState([{}]);

    // Função para buscar medalhas
    const fetchMedalhas = async (id) => {
        const endpoint = `${ip}/usuarioconquista/${id}`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMedalhas(data);
            } else {
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    };

    // Carregar o token após o componente ser montado
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('tokenUser'));
        if (storedToken) {
            setToken(storedToken); // Atualizando o estado com o token
            fetchMedalhas(storedToken.user.id); // Passando o ID do usuário para a função de busca
        }
    }, []); // Executa uma vez quando o componente é montado

    if (!token) {
        return <div>Carregando...</div>; // Exibe algo enquanto o token não for carregado
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center border">
                <header className="flex items-center w-full justify-between">
                    <div onClick={() => router.push('/home')} className='cursor-pointer translate-x-5'>
                        <Image src="/assets/voltar.png" height={20} width={20} alt="Voltar" priority />
                    </div>
                    <div className="text-[20px] cursor-default">Medalhas</div>
                    <div></div>
                </header>
                <div className="h-[1px] bg-slate-300 w-full my-8"></div>
                <div className="flex flex-col justify-between items-center gap-5 ">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-[24px] text-[#FFDB57] translate-y-9">{medalhas[0]?.quantidade}x</p>
                        <Image src='/assets/coroa.svg' height={181} width={181} />
                    </div>
                    <div className="flex flex-col justify-center items-center mb-10">
                        <p className="text-[24px] text-[#00F1A5] translate-y-1">{medalhas[1]?.quantidade}x</p>
                        <Image src='/assets/esmeralda.svg' height={126} width={126} />
                    </div>
                    <div className="flex flex-col justify-center items-center mb-5">
                        <p className="text-[24px] text-[#2FC0F0] translate-y-2">{medalhas[2]?.quantidade}x</p>
                        <Image src='/assets/diamante.svg' height={89} width={89} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
