"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();
    return (
        <div>
        <div className="flex h-full w-96 flex-col border px-4 py-8 bg-white">
            <header className="mb-4 flex items-center font-sans">
                <div className="ml-3 mr-6 h-16 w-16 rounded-full">
                    <Image src="/assets/icon-person.svg" width={72} height={72} />
                </div>
                <h1 className="text-2xl font-bold">Olá Lucas</h1>
            </header>
            <hr className="mb-4" />
            <div className='flex flex-col'>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/pilha-de-livros.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">Língua Portuguesa</h1>
                </div>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/matematica.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">Matemática</h1>
                </div>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/historia.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">História</h1>
                </div>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/geografia.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">Geografia</h1>
                </div>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/ciencia.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">Ciências</h1>
                </div>
                <div className="mb-14 flex items-center font-sans">
                    <Image src="/assets/dados.png" width={48} height={48} className='ml-3 mr-6' />
                    <h1 className="text-2xl font-bold">Aleatório</h1>
                </div>
            </div> 
        </div>
        <footer className="flex h-full w-96 justify-between rounded-md bg-slate-400 p-4">
                <div className=" h-16 w-16 rounded-full bg-green-400"></div>
                <div className=" h-16 w-16 rounded-full bg-green-400"></div>
                <div className=" h-16 w-16 rounded-full bg-green-400"></div>
            </footer>
        </div>
        
    )
}