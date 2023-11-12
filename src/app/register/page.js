"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Register() {
    const router = useRouter();
    
    return (
        <div className="flex items-center justify-center h-screen bg-[#FFF] flex-col">
            <Image src="/assets/education-white.svg" width={120} height={120} className='bg-[#735ED9] align-middle' />
            <h1 className="text-center text-[#735ED9] text-5xl my-1 font-bold italic">duolfes</h1>
            <div className="spinner" />
            <form className='flex flex-col w-60 items-center'>
                <InputField label={"E-mail"} placeholder={"lucasmacedoes@gmail.com"} type={"email"}/>
                <InputField label={"Password"} placeholder={"*****"} type={"password"}/>
                <InputField label={"Confirm password"} placeholder={"*****"} type={"password"}/>
                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3'>
                    Criar conta
                </button>
                <Link href="/" className='text-xs text-[#777]'>Já tem uma conta? <span className='text-[#735ED9]'>Clique aqui</span></Link>
            </form>
        </div>

    )
}