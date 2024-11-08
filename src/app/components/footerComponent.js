import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className={"flex justify-between gap-1 mt-3 bg-[#C2C2C2] items-center p-2 "}>
            <Link href={"/home"}>
                <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/casa_assombrada_svg.svg" width={32} height={32} alt='casa' priority />
                </div>
            </Link>
            <Link href={"/home/ranking"}>
                <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/podium.svg" width={32} height={32} alt='ranking' priority />
                </div>
            </Link>

            <Link href={"/home/medalhas"}>
                <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/coroa.svg" width={35} height={35} alt='medalhas' priority />
                </div>
            </Link>
            <Link href={"/home/questoesErradas"}>
                <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full relative">
                    <Image src="/assets/x_svg.svg" width={32} height={32} alt="Erradas" priority />
                </div>
            </Link>
        </footer >
    )
}