'use client'

import { useEffect, useState } from "react"
import ip from "@/app/ip"
import Footer from "@/app/components/footerComponent"
import Link from "next/link"

export default function Prova({ params }) {
    const resolvedParams = params;
    const [prova, setProva] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProva() {
            try {
                const response = await fetch(`${ip}/provas/${resolvedParams.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if (!response.ok) throw new Error('Failed to fetch data')

                const data = await response.json()
                setProva(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProva()
    }, [resolvedParams.id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border border-gray-300 rounded-lg w-[330px] bg-white">
                <div className="flex flex-col items-center gap-4">
                    {prova?.questoes?.map((questao, index) => {
                        const marginLeft = index % 2 === 0 ? 'ml-8' : 'mr-5';
                        const marginTop = index === 0 ? 'mt-10' : '';
                        const className = questao.marcada ? "s-bubble" : "s-not-bubble";

                        return (
                            questao.marcada ? (
                                <Link href={`/home/provas/${resolvedParams.id}/questoes/${index + 1}`} key={index}>
                                    <div className={`${className} ${marginLeft} ${marginTop}`}>
                                        {index + 1}
                                    </div>
                                </Link>
                            ) : (
                                <div key={index} className={`${className} ${marginLeft} ${marginTop}`}>
                                    {index + 1}
                                </div>
                            )
                        );
                    })}
                    <Footer />
                </div>
            </div>
        </div>
    )
}
