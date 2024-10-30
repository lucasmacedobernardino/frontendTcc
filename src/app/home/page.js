"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../components/footerComponent';
import Desafio from '../components/desafio';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ip from '../ip';
export default function Home() {
    const semVidasNotify = () => toast.warning("Você está sem vidas!")
    const [vidaPonto, setVidaPonto] = useState({ vidas: 0, pontuacao: 0 });
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");
        if (usuarioData) {
            const usuarioJSON = JSON.parse(usuarioData);
            setUsuario(usuarioJSON);
            vidasPontuacao(usuarioJSON.id);
        }

    }, []);
    async function vidasPontuacao(userId) {
        try {
            const response = await fetch(`${ip}/usuarios/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setVidaPonto({ vidas: data.vidas, pontuacao: data.pontuacao });
            }
        } catch (error) {
            console.error(error);
        }
    }




    const handleNavigation = (path) => {
        if (vidaPonto.vidas > 0) {
            // Se o usuário tiver vidas, prossegue com a navegação
            router.push(path);
        } else {
            // Se não tiver vidas, exibe um alerta
            semVidasNotify()
        }
    };

    function primeiroNome(nomeCompleto) {
        return nomeCompleto.split(' ')[0];
    }
    return (
        <div className="flex items-center justify-center  ">
            <div className="w-[360px] h-[800px]">
                <div className="flex justify-evenly flex-col border bg-white ">
                    <header className="flex justify-around items-center p-3">
                        <div className="flex flex-col items-center">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" />
                            <h1 className="text-[20px] font-bold" style={{ color: '#735ED9' }}>
                                {usuario ? primeiroNome(usuario.nome) : ''}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src="/assets/points.svg" width={70} height={70} alt="Pontuação" />
                            <h1 className="text-[20px] font-bold text-[#FFD83B]" >
                                {vidaPonto ? vidaPonto.pontuacao : ''}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src="/assets/life.svg" width={70} height={70} alt="Vidas" />
                            <h1 className="text-[20px] font-bold text-[#FC6886]" >
                                {vidaPonto ? vidaPonto.vidas : ''}
                            </h1>
                        </div>
                    </header>
                    <hr className="mb-4" />
                    <div className='flex justify-center items-center flex-col gap-2'>
                        <Desafio numero="1" />
                        <Desafio numero="2" />
                        <Desafio numero="3" />
                        <Desafio numero="4" />
                        <Desafio numero="5" />
                        <Desafio numero="6" />
                        <Desafio numero="7" />
                    </div>
                </div>
                <Footer />
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    )
}
