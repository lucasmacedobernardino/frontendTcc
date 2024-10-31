'use client'
import { useEffect, useState } from "react"
import ip from "@/app/ip"
import Image from "next/image"


export default function Questao({ params }) {
    const resolvedParams = params;
    const [questao, setQuestao] = useState({})
    const [selectedOption, setSelectedOption] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState("")
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
            setDialogMessage("Por favor, selecione uma opção para responder.");
            setShowDialog(true);
            return;
        }

        const opcoes = ["A", "B", "C", "D", "E"];
        const respostaSelecionada = opcoes[selectedOption];
        const usuario = token.user.id;
        const questao1 = questao.id;
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
                    respostaUsuario: respostaSelecionada,
                }),
            });

            if (response.ok) {
                const resultado = await response.json();
                console.log("Resultado da verificação:", resultado);

                // Controle do dialogMessage conforme a tentativa
                if (resultado.tentativa === 0) {
                    setDialogMessage(resultado.message || "Tentativa esgotada.");
                } else if (resultado.tentativa === 1) {
                    setDialogMessage(resultado.message || "Resposta incorreta. Tente novamente.");
                } else {
                    setDialogMessage("Resposta Correta");
                }
            } else {
                const erroMsg = await response.text();
                console.error('Erro na resposta:', erroMsg);
                setDialogMessage("Erro ao enviar resposta.");
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            setDialogMessage("Erro de conexão ao verificar a resposta.");
        }

        // Exibir o dialog após definir a mensagem
        setShowDialog(true);
    };


    const closeDialog = () => {
        setShowDialog(false);
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

            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center w-[300px]">
                        <p>{dialogMessage}</p>
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
    );
}
