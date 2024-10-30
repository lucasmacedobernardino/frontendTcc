"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalState } from '../../context/GlobalStateContext.js';
import 'react-toastify/dist/ReactToastify.css';
import ip from '@/app/ip';
export default function Portugues() {
    const {qtdQuestoes} = useGlobalState()
    const respostaSuccess = () => toast.success("Resposta Correta! Você ganhou 10 pontos!");
    const respostaFailed = () => toast.error("Resposta Incorreta! Você perdeu uma vida!");
    const router = useRouter();
    const portugues = 1;
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
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('tokenUser'));
        if (token) {
            if (qtdQuestoes === 1){
                fetchQuestao(token.token);
            }else{
                console.log("é maior que 1")
            }
        }
    }, []);
    const fetchQuestao = async (token) => {
        try {
            const response = await fetch(`${ip}/questoes/disciplinas/${portugues}/limit/${qtdQuestoes}`, {
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
            setQuestao({ "enunciado": data.data[0].enunciado, "id": data.data[0].id, "imagem": data.data[0].imagem, "opcao1": data.data[0].opcao1, "opcao2": data.data[0].opcao2, "opcao3": data.data[0].opcao3, "opcao4": data.data[0].opcao4, "opcao5": data.data[0].opcao5, "respostaCorreta": data.data[0].respostaCorreta, });
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Formatar a data no formato MM-DD-AAAA
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
        
        // Acessar o token e outros dados necessários
        const token = JSON.parse(localStorage.getItem('tokenUser'));
        const respostaUsuario = event.target.opcao.value;
        
        // Preparar o objeto de dados para corresponder ao formato esperado pela API
        const payload = {
            usuario: [{ id: token.user.id }],
            questao: [{ id: questao.id }],
            respostaUsuario, // Supondo que 'event.target.opcao.value' retorne "D", "A", "B", etc.
            data: formattedDate
        };
        
        // Endpoint da API
        const endpoint = `${ip}/usuarioresposta`;
        
        // Realizar a requisição POST
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
                if(responseData.message == "Resposta Correta!"){
                respostaSuccess()
                setTimeout(()=>{
                    router.push("/home")
                }, 4000)
            }else {
                respostaFailed()
                setTimeout(()=>{
                    router.push("/home")
                }, 4000)
            }

            } else {
                const responseData = await response.json();
                alert(responseData.message);
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    };

    const renderOpcoes = () => {
        let opcoes = [];
        for (let i = 1; i <= 5; i++) {
            // Convertendo 1-5 para A-E usando ASCII values (65 é 'A' em ASCII)
            const letra = String.fromCharCode(64 + i); // 64 + 1 = 65 -> 'A', etc.
            opcoes.push(
                <label key={i} className="block mb-2 text-black">
                    <input
                        type="radio"
                        name="opcao"
                        value={letra}
                        className="mr-1 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#735ED9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#735ED9] checked:before:bg-[#735ED9] hover:before:opacity-10 text-black"
                    />
                    {letra}. {questao[`opcao${i}`]}
                </label>
            );
        }
        return opcoes;
    }

    if (qtdQuestoes === 1) {
        return (
            <div className="max-w-2xl mx-auto p-4">
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
                <h1 className="text-xl font-bold mb-4">Questão</h1>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                    {questao.enunciado}
                </p>
                {questao.imagem && (
                    <img src={`${questao.imagem}`} alt="Image Description" />
                )}
                <form className='mt-4' onSubmit={handleSubmit}>
                    {renderOpcoes()}
                    <div className='flex items-center justify-center'>
                        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 w-full mt-2">
                            Verificar
                        </button>
                    </div>
                </form>
            </div>
        )
    }else{
        return (
            <div>Questão maiores</div>
        )
    }
}





