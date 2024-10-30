import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="flex justify-between rounded-b-md bg-[#E8E8EA] p-2 bottom-0 gap-1">
            <Link href={"/home"}>
                <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/casa-assombrada.png" width={32} height={32} alt='casa' />
                </div>
            </Link>
            <Link href={"/home/ranking"}>
                <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/podium.svg" width={32} height={32} alt='ranking' />
                </div>
            </Link>

            <Link href={"/home/medalhas"}>
                <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/coroa.svg" width={32} height={32} alt='medalhas' />
                </div>
            </Link>
            <Link href={"/home/questoesErradas"}>
                <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/x.png" width={32} height={32} alt="Erradas" />
                </div>
            </Link>
            <Link href={"/home/conquistas"}>
                <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/anel.png" width={32} height={32} alt='conquistas' />
                </div>
            </Link>
        </footer >
    )
}