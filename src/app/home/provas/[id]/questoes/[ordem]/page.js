'use client'
import { useEffect, useState } from "react"
import ip from "@/app/ip"
import Image from "next/image"
import { use } from 'react'

export default function Questao({ params }) {
    const resolvedParams = use(params);
    const [questao, setQuestao] = useState({})
    const [selectedOption, setSelectedOption] = useState(null)
    const token = JSON.parse(localStorage.getItem('tokenUser'))

    const fetchQuestao = async (id, ordem) => {
        const endpoint = `${ip}/provas/${id}/ordem/${ordem}`;
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
                setQuestao(data);
            } else {
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    };

    useEffect(() => {
        fetchQuestao(resolvedParams.id, resolvedParams.ordem);
    }, [resolvedParams.ordem]);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const verificarResposta = async () => {
        if (selectedOption === null) {
            console.error("Nenhuma opção selecionada.");
            return;
        }

        const opcoes = ["A", "B", "C", "D", "E"];
        const respostaSelecionada = opcoes[selectedOption];
        const usuario = token.user.id
        const questao1 = questao.id
        const endpoint = `${ip}/usuarioresposta`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    questao: questao1,
                    usuario: usuario,
                    respostaUsuario: respostaSelecionada
                }),
            });
            if (response.ok) {
                const resultado = await response.json();
                console.log("Resultado da verificação:", resultado);
            } else {
                console.error('Erro ao verificar resposta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    return (
        <div className="flex justify-start items-center flex-col">
            <div className="flex flex-col justify-center items-center w-[360px]">
                <div>Questão {resolvedParams.ordem}</div>
                <pre>{questao?.enunciado}</pre>
                {questao.imagem && <Image src={`${questao.imagem}`} width={600} height={600} alt="imagem da questão" priority />}

                {[questao.opcao1, questao.opcao2, questao.opcao3, questao.opcao4, questao.opcao5].map((opcao, index) => (
                    <button
                        key={index}
                        className={`flex border w-full items-center gap-2 p-2 ${selectedOption === index ? 'border-purple-600 bg-violet-100' : ''}`}
                        onClick={() => handleOptionClick(index)}
                    >
                        <div
                            className={`border w-5 h-5 rounded-full flex-shrink-0 ${selectedOption === index ? 'bg-violet-700' : ''}`}
                        ></div>
                        {opcao}
                    </button>
                ))}
                <button
                    className="bg-purple-600 text-white w-full my-5 rounded-full"
                    onClick={verificarResposta}
                >
                    Verificar
                </button>
            </div>
        </div>
    );
}
