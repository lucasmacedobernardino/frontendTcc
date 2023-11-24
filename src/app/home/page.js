"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../components/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ip from '../ip';
export default function Home() {
    const semVidasNotify = () => toast.warning("Você está sem vidas!")
    const [loading, setLoading] = useState(true);
    const [vidaPonto, setVidaPonto] = useState({ vidas: 0, pontuacao_ano: 0 });
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");
        if (usuarioData) {
            const usuarioJSON = JSON.parse(usuarioData);
            setUsuario(usuarioJSON);
            vidasPontuacao(usuarioJSON.id);
        }
        setLoading(false);
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
                setVidaPonto({ vidas: data.vidas, pontuacao_ano: data.pontuacao_ano });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigation = (e, path) => {
        // Impede a ação padrão do Link
        e.preventDefault();

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
        loading ? <Loading /> :
            <div className='absolute'>
                <div className="flex h-full w-96 flex-col border px-4 py-8 bg-white ">
                    <header className="mb-4 flex items-center font-sans">
                        <div className="ml-3 mr-6 h-16 w-16 rounded-full">
                            <Image src="/assets/icon-person.svg" width={72} height={72} alt='personIcon' />
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col items-start justify-center'>
                                <h1 className="text-2xl font-bold text-black">Olá {primeiroNome(usuario.nome)}</h1>
                                <hr />
                                <h1 className="text-2xl font-bold text-[#f5ba3d]">Pontuação {vidaPonto.pontuacao_ano}</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center pl-20'>
                                <Image src="/assets/heartRed.svg" width={32} height={32} alt='RedHeart' />
                                <h2 className="text-lg font-bold text-black">{vidaPonto.vidas}</h2>
                            </div>
                        </div>

                    </header>
                    <hr className="mb-4" />
                    <div className='flex flex-col'>
                        <Link href="/home/portugues" onClick={(e) => handleNavigation(e, "/home/portugues")} className="mb-14 flex items-center font-sans">
                            <Image src="/assets/book-stack.svg" width={48} height={48} className='ml-3 mr-6' alt='Português' />
                            <h1 className="text-2xl font-bold text-black">Língua Portuguesa</h1>
                        </Link>
                        <Link href="/home/matematica" onClick={(e) => handleNavigation(e, "/home/matematica")} className="mb-14 flex items-center font-sans">
                            <Image src="/assets/equation.svg" width={48} height={48} className='ml-3 mr-6' alt='Matemática' />
                            <h1 className="text-2xl font-bold text-black">Matemática</h1>
                        </Link>
                        <Link href="/home/historia" onClick={(e) => handleNavigation(e, "/home/historia")} className="mb-14 flex items-center font-sans">
                            <Image src="/assets/history.svg" width={48} height={48} className='ml-3 mr-6' alt='História' />
                            <h1 className="text-2xl font-bold text-black">História</h1>
                        </Link>
                        <Link href="/home/ciencias" onClick={(e) => handleNavigation(e, "/home/ciencias")} className="mb-14 flex items-center font-sans">
                            <Image src="/assets/chemistry.svg" width={48} height={48} className='ml-3 mr-6' alt='Ciências' />
                            <h1 className="text-2xl font-bold text-black">Ciências</h1>
                        </Link>
                        <Link href="/home/geografia" onClick={(e) => handleNavigation(e, "/home/geografia")} className="mb-14 flex items-center font-sans">
                            <Image src="/assets/earth.svg" width={48} height={48} className='ml-3 mr-6' alt='Geografia' />
                            <h1 className="text-2xl font-bold text-black">Geografia</h1>
                        </Link>
                        <Link href="/home/aleatorio" onClick={(e) => handleNavigation(e, "/home/aleatorio")} className="mb-4 flex items-center font-sans">
                            <Image src="/assets/dice.svg" width={48} height={48} className='ml-3 mr-6' alt='Aleatório' />
                            <h1 className="text-2xl font-bold text-black">Aleatório</h1>
                        </Link>
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
    )
}
