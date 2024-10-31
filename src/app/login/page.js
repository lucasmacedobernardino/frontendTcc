"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ip from '../ip';

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(() => {
        localStorage.clear()
    }, [])
    const loginSuccess = () => toast.success("Login efetuado com Sucesso!");
    const loginFailed = () => toast.error("Senha Incorreta!");
    const emailNotFound = () => toast.error("Email não encontrado!");
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = `${ip}/usuarios/login`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.message == "Senha incorreta!") {
                    loginFailed()
                    return
                }
                localStorage.setItem("tokenUser", JSON.stringify(data))
                const token = JSON.parse(localStorage.getItem('tokenUser'))
                if (token.message === "Email não encontrado!") {
                    emailNotFound()
                    return
                }
                try {
                    const usuario = await fetch(`${ip}/usuarios/${token.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (usuario.ok) {
                        const data = await usuario.json();
                        localStorage.setItem("usuario", JSON.stringify(data))
                    }
                } catch (error) {
                    console.error(error)
                }
                if (localStorage.getItem("tokenUser") && localStorage.getItem("usuario")) {
                    loginSuccess()
                    setTimeout(() => {
                        router.push('/home')
                    }, 2000)
                }
            } else {
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            console.error('Falha ao fazer a requisição:', error);
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-[#FFF] flex-col">
            <Image src="/assets/chapeu-de-bruxa-white.svg" width={140} height={140} alt='chapéu de mago branco' />
            <h1 className="text-center text-[#735ED9] text-[48px] my-1 font-bold italic">magicIfes</h1>
            <div className="spinner" />
            <form className='flex flex-col w-60 items-center' onSubmit={handleSubmit}>
                <InputField label={"E-mail"} placeholder={"Seu email"} type={"email"} name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label={"Password"} placeholder={"Sua senha"} type={"password"} name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />


                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3'>
                    Entrar
                </button>
                <Link href="/register" className='text-xs text-[#777]'>Não tem uma conta? <span className='text-[#735ED9]'>Clique aqui</span></Link>
            </form>
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
        </div>

    )
}
