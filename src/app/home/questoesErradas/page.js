'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import Image from "next/image";
import ip from "@/app/ip";
import Footer from "@/app/components/footerComponent";


export default function questoesErradas() {
    const [QuestaoErrada, setQuestaoErrada] = useState([{}])
    const token = JSON.parse(localStorage.getItem('tokenUser'))
    const router = useRouter();
    async function fecthQuestaoErrada(id) {
        const endpoint = `${ip}/questaoErrada/${id}`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setQuestaoErrada(data);
            } else {
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    }

    useEffect(() => {
        fecthQuestaoErrada(token.user.id)
    }, [])

    function getBackgroundColor(disciplinaId) {
        switch (disciplinaId) {
            case 1:
                return "#B2DCEC";
            case 2:
                return "#ECB2B2";
            case 3:
                return "#E6EDAD";
            case 4:
                return "#B2ECB8";
            case 5:
                return "#D8B2EC";
            default:
                return "#FFFFFF";
        }
    }

    return (
        <div className="flex justify-center flex-col">
            <div className="flex flex-col items-center border p-4">
                <header className="flex items-center w-full justify-between">
                    <div onClick={() => router.push('/home')} className='cursor-pointer'>
                        <Image src="/assets/voltar.png" height={20} width={20} alt="Voltar" priority />
                    </div>
                    <div className="text-[20px] cursor-default">Questões Erradas</div>
                    <div></div>
                </header>
                <div className="bg-[#735ED9] border rounded-3xl border-black p-4 ">
                    {QuestaoErrada?.map((elemento, index) => {
                        const bg_color = getBackgroundColor(elemento.disciplinaId);
                        return (
                            <div
                                key={index}
                                style={{ backgroundColor: bg_color }}
                                className="p-2  mb-2 border border-black rounded-2xl"
                            >
                                <pre>
                                    <p className="text-[10px]">
                                        {`Desafio ${elemento?.provaId !== undefined ? elemento.provaId : ''}`}
                                    </p>
                                    <p className="text-[10px]">
                                        {`Enigma ${elemento?.questao?.ordem !== undefined ? elemento.questao.ordem : ''}`}
                                    </p>
                                    <p className="text-[10px]">
                                        {`${elemento?.disciplina?.nome !== undefined ? elemento.disciplina.nome : ''}`}
                                    </p>
                                    <p className="text-[10px]">
                                        {`${elemento?.categoria?.nome !== undefined ? elemento.categoria.nome : ''}`}
                                    </p>
                                </pre>

                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div>
        </div>
    )
}
