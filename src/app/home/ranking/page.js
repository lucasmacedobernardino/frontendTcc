"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
export default function Ranking() {
    const [rankingData, setRankingData] = useState([]);
    async function fetchRanking(periodo) {
        try {
            const response = await fetch(`http://3.17.204.62:3333/usuarioresposta/ranking/${periodo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar ranking');
            }
            const data = await response.json();
            if (periodo == "ano") {
                setRankingData(data[0])
            } else if (periodo == "mes") {
                setRankingData(data[0])
            } else if (periodo == "dia") {
                setRankingData(data[0])
            } else {
                setRankingData({})
            }
            // Atualizar o estado com os dados do ranking
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchRanking('ano'); // Busca o ranking anual por padrão ao carregar o componente
    }, []);
    return (
        <div>
            <div className='absolute'>
                <div className="flex h-full w-96 flex-col border px-4 py-8 bg-white ">
                    <header className="mb-4 flex items-center font-sans justify-center text-3xl flex-col">
                        <h1>Ranking</h1>
                        <div className="flex justify-around w-full mt-3">
                            <button onClick={() => fetchRanking('mes')} className="bg-yellow-500 text-white px-5 rounded-3xl text-lg">Mês</button>
                            <button onClick={() => fetchRanking('ano')} className="bg-yellow-500 text-white px-5 rounded-3xl text-lg">Ano</button>
                            <button onClick={() => fetchRanking('dia')} className="bg-yellow-500 text-white px-5 rounded-3xl text-lg">Dia</button>
                        </div>
                    </header>
                    <hr className="mb-4" />
                    <div className='flex flex-col'>
                        <div className="mb-6 flex items-center font-sans justify-center flex-col">
                            <div className="flex justify-center items-center">
                                <Image src="/assets/coroa.svg" width={96} height={96} className='ml-3 mr-6' alt='Português' />
                                <h1 className="text-2xl font-bold text-black">{rankingData[0] ? rankingData[0].nome : 'Carregando...'}</h1>
                            </div>
                            <h1 className="text-2xl font-bold text-white bg-purple-600 rounded-3xl p-4">
                                {
                                    rankingData[0]
                                        ? (rankingData[0].pontuacao_ano
                                            ? rankingData[0].pontuacao_ano
                                            : (rankingData[0].pontuacao_mes
                                                ? rankingData[0].pontuacao_mes
                                                : (rankingData[0].pontuacao_dia
                                                    ? rankingData[0].pontuacao_dia
                                                    : 'Carregando...')))
                                        : 'Carregando...'}</h1>
                        </div>
                        <div className="mb-6 flex items-center font-sans justify-center flex-col">
                            <div className="flex justify-center items-center">
                                <Image src="/assets/esmeralda.svg" width={84} height={84} className='ml-3 mr-6' alt='Português' />
                                <h1 className="text-2xl font-bold text-black">{rankingData[1] ? rankingData[1].nome : 'Carregando...'}</h1>
                            </div>
                            <h1 className="text-2xl font-bold text-white bg-purple-600 rounded-3xl p-4">{
                                rankingData[1]
                                    ? (rankingData[1].pontuacao_ano
                                        ? rankingData[1].pontuacao_ano
                                        : (rankingData[1].pontuacao_mes
                                            ? rankingData[1].pontuacao_mes
                                            : (rankingData[1].pontuacao_dia
                                                ? rankingData[1].pontuacao_dia
                                                : 'Carregando...')))
                                    : 'Carregando...'}</h1>
                        </div>
                        <div className="mb-6 flex items-center font-sans justify-center flex-col">
                            <div className="flex justify-center items-center">
                                <Image src="/assets/diamante.svg" width={76} height={76} className='ml-3 mr-6' alt='Português' />
                                <h1 className="text-2xl font-bold text-black">{rankingData[2] ? rankingData[2].nome : 'Carregando...'}</h1>
                            </div>
                            <h1 className="text-2xl font-bold text-white bg-purple-600 rounded-3xl p-4">{
                                rankingData[2]
                                    ? (rankingData[2].pontuacao_ano
                                        ? rankingData[2].pontuacao_ano
                                        : (rankingData[2].pontuacao_mes
                                            ? rankingData[2].pontuacao_mes
                                            : (rankingData[2].pontuacao_dia
                                                ? rankingData[2].pontuacao_dia
                                                : 'Carregando...')))
                                    : 'Carregando...'}</h1>
                        </div>

                        {
                            rankingData.length > 3 && rankingData.slice(3).map((item, index) => (
                                <div key={index} className="mb-6 flex items-center font-sans justify-center flex-col">
                                    <div className="flex justify-center items-center">
                                        <h1 className="text-2xl font-bold text-black">{item.nome}</h1>
                                        <h1 className="text-2xl font-bold text-white bg-purple-600 rounded-3xl p-4">
                                            {item.pontuacao_ano ? item.pontuacao_ano : (item.pontuacao_mes ? item.pontuacao_mes : (item.pontuacao_dia ? item.pontuacao_dia : 'Carregando...'))}
                                        </h1>
                                    </div>
                                </div>
                            ))
                        }

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
            </div>
        </div>
    )
}