'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../components/footerComponent';
import Desafio from '../components/desafio';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ip from '../ip';
import Link from 'next/link';

export default function Home() {
    const [vidaPonto, setVidaPonto] = useState({ vidas: 0, pontuacao: 0 });
    const [showDialog, setShowDialog] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const router = useRouter();

    const mensagensCarrossel = [
        { texto: "Você é um mago e precisa evoluir!", imagem: "/assets/mago_iniciante.webp" },
        { texto: "Por enquanto você tem 7 desafios para cumprir!", imagem: "/assets/desafio.png" },
        { texto: "Cada desafio possui diversos enigmas!", imagem: "/assets/enigma.png" },
        { texto: "Ao completar um enigma você ganha 10 pontos de experiência!", imagem: "/assets/nivel.png" },
        { texto: "Você é classificado em um ranking de acordo com a sua experiência!", imagem: "/assets/ranking.png" },
        { texto: "Também existe um ranking de cada disciplina!", imagem: "/assets/ranking_disciplinas.png" },
        { texto: "Se esforce e se torne o melhor mago de todos os tempos!", imagem: "/assets/mago_poderoso.webp" }
    ];

    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");
        if (usuarioData) {
            const usuarioJSON = JSON.parse(usuarioData);
            setUsuario(usuarioJSON);
            setNomeUsuario(usuarioJSON.nome)
            vidasPontuacao(usuarioJSON.id);
        }
    }, [router]);

    async function adicionarUmEntradaUsuario() {
        try {
            const response = await fetch(`${ip}/usuarios/adicionarUmEntradaUsuario/${usuario.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setShowDialog(true);
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function vidasPontuacao(userId) {
        try {
            const response = await fetch(`${ip}/usuarios/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.entrada === 0) {
                    setShowDialog(true);
                }
                setVidaPonto({ vidas: data.vidas, pontuacao: data.pontuacao });
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function closeDialog() {
        await adicionarUmEntradaUsuario()
        setShowDialog(false);
    }

    function nextMessage() {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % mensagensCarrossel.length);
    }

    function prevMessage() {
        setCurrentMessageIndex((prevIndex) =>
            prevIndex === 0 ? mensagensCarrossel.length - 1 : prevIndex - 1
        );
    }

    return (
        <div className="flex items-center justify-center">
            <div className=" bg-[#EAF4F9]">
                <div className="flex justify-evenly flex-col p-7">
                    <div>
                        <Link href='/login'>
                            <Image src='/assets/exit_svg.svg' width={25} height={25} alt='Exit' />
                        </Link>
                    </div>
                    <header className="flex justify-around items-center p-3">
                        <div className="flex flex-col items-center">
                            <Image src="/assets/mago.svg" width={70} height={70} alt="avatar" priority />
                            <h1 className="text-[20px] font-bold" style={{ color: '#735ED9' }}>
                                {nomeUsuario}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src="/assets/points.svg" width={70} height={70} alt="Pontuação" priority />
                            <h1 className="text-[20px] font-bold text-[#FFD83B]">
                                {vidaPonto ? vidaPonto.pontuacao : ''}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src="/assets/life.svg" width={70} height={70} alt="Vidas" priority />
                            <h1 className="text-[20px] font-bold text-[#FC6886]">
                                {vidaPonto ? vidaPonto.vidas : ''}
                            </h1>
                        </div>
                    </header>
                    <hr className="mb-4" />
                    <div className="flex justify-center items-center flex-col gap-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <Desafio key={num} numero={num} vidas={vidaPonto ? vidaPonto.vidas : ''} />
                        ))}
                    </div>
                </div>
                <Footer />
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} theme="light" />
                {showDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg shadow-lg text-center w-[300px]">
                            {mensagensCarrossel[currentMessageIndex].imagem ? <Image src={mensagensCarrossel[currentMessageIndex].imagem} width={200} height={200} alt="Imagem do diálogo" className='w-full' /> : <div className='hidden'></div>}

                            <p className="mt-4">{mensagensCarrossel[currentMessageIndex].texto}</p>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevMessage} className="bg-gray-300 text-gray-700 p-2 rounded-full">
                                    Anterior
                                </button>
                                <button onClick={nextMessage} className="bg-gray-300 text-gray-700 p-2 rounded-full">
                                    Próximo
                                </button>
                            </div>
                            <button
                                className="bg-purple-600 text-white mt-4 p-2 rounded-full w-full"
                                onClick={closeDialog}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
