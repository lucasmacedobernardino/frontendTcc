import Link from "next/link"
export default function Desafio({ numero }) {
    return (
        <Link href={`/home/provas/${numero}`}>
            <style jsx>{`
                @keyframes rotateBounce {
                    0%, 100% {
                        transform: rotate(45deg) translateY(0);
                    }
                    50% {
                        transform: rotate(45deg) translateY(-10%);
                    }
                }
            `}</style>

            <div className="bg-purple-300 w-20 h-20 flex justify-center items-center my-4 border border-black animate-[rotateBounce_1s_infinite]">
                <div className="-rotate-45">{numero}</div>
            </div>
        </Link>
    )
}
