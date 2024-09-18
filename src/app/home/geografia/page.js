"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ip from '@/app/ip';
import getToken from '@/util/token';

const TOKEN = getToken();

export default function Matematica() {
    const geografia = 4;
    const [questao, setQuestao] = useState({
        respostaCorreta: "",
        id: 0,
        enunciado: "",
        imagem: "",
        opcao1: "",
        opcao2: "",
        opcao3: "",
        opcao4: "",
        opcao5: "",
    });
    const [ultimaQuestaoId, setUltimaQuestaoId] = useState(null); // Armazena o ID da última questão
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const respostaSuccess = () => toast.success("Resposta Correta! Você ganhou 10 pontos!");
    const respostaFailed = () => toast.error("Resposta Incorreta! Você perdeu uma vida!");

    useEffect(() => {
        if (TOKEN) {
            fetchQuestoes(TOKEN.token);
        }
    }, []);

    const fetchQuestoes = async (token) => {
        if (loading) return; // Evitar requisições duplicadas
        setLoading(true);

        try {
            const response = await fetch(`${ip}/questoes/disciplinas/${geografia}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error('Erro na requisição: ' + data.error);
            }

            const data = await response.json();

            if (data.message === 'Nenhuma questão encontrada para esta disciplina.') {
                alert(data.message);
                router.push("/home");
                return;
            }

            if (data.data.id === ultimaQuestaoId) {
                // Se for a mesma questão, esperar 30 segundos antes de buscar uma nova
                setTimeout(() => {
                    fetchQuestoes(token);
                }, 30000);
            } else {
                // Se for uma nova questão, atualizar o estado
                setUltimaQuestaoId(data.data.id);
                setQuestao({
                    enunciado: data.data.enunciado,
                    id: data.data.id,
                    imagem: data.data.imagem,
                    opcao1: data.data.opcao1,
                    opcao2: data.data.opcao2,
                    opcao3: data.data.opcao3,
                    opcao4: data.data.opcao4,
                    opcao5: data.data.opcao5,
                    respostaCorreta: data.data.respostaCorreta,
                });
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        } finally {
            setLoading(false); // Garantir que o loading seja desativado
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;

        const token = JSON.parse(localStorage.getItem('tokenUser'));
        const respostaUsuario = event.target.opcao.value;

        const payload = {
            usuario: [{ id: token.user.id }],
            questao: [{ id: questao.id }],
            respostaUsuario,
            data: formattedDate
        };

        const endpoint = `${ip}/usuarioresposta`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': token.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.message === "Resposta Correta!") {
                    respostaSuccess();
                    setTimeout(() => {
                        router.push("/home");
                    }, 4000);
                } else {
                    respostaFailed();
                    setTimeout(() => {
                        router.push("/home");
                    }, 4000);
                }
            } else {
                const responseData = await response.json();
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    };

    const renderOpcoes = () => {
        let opcoes = [];
        for (let i = 1; i <= 5; i++) {
            const letra = String.fromCharCode(64 + i);
            opcoes.push(
                <label key={i} className="block mb-2 text-black">
                    <input
                        type="radio"
                        name="opcao"
                        value={letra}
                        className="mr-1 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border text-[#735ED9] transition-all checked:bg-[#735ED9] hover:before:opacity-10 text-black"
                    />
                    {letra}. {questao[`opcao${i}`]}
                </label>
            );
        }
        return opcoes;
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ToastContainer position="top-center" autoClose={2000} />
            <h1 className="text-xl font-bold mb-4 text-black">Questão</h1>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
                {questao.enunciado}
            </p>
            {questao.imagem && (
                <img src={`${questao.imagem}`} alt="Imagem da questão" />
            )}
            <form className='mt-4' onSubmit={handleSubmit}>
                {renderOpcoes()}
                <div className='flex items-center justify-center'>
                    <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md w-full mt-2">
                        Verificar
                    </button>
                </div>
            </form>
        </div>
    );
}
