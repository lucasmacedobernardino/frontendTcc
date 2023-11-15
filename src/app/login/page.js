"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Login() {
    useEffect(()=>{
        localStorage.clear()
     }, [])
    const loginSuccess = () => toast.success("Login efetuado com Sucesso!");
    const loginFailed = () => toast.error("Senha Incorreta!");
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const ip = "http://3.17.204.62:3333"
        const email = event.target.email.value;
        const senha = event.target.senha.value;
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
                // Se a requisição for bem-sucedida, redireciona para outra página ou faz algo com os dados
                const data = await response.json();
                if(data.message == "Senha incorreta!"){
                    loginFailed()
                    setTimeout(()=>{
                        router.push('/login')
                    }, 2000)
                }
                localStorage.setItem("tokenUser", JSON.stringify(data))
                const token = JSON.parse(localStorage.getItem('tokenUser'))
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
                // Redirecionar para a dashboard, por exemplo
                if (localStorage.getItem("tokenUser") && localStorage.getItem("usuario")) {
                    loginSuccess()
                    setTimeout(() => {
                        router.push('/home')
                    }, 2000)
                }
            } else {
                // Tratar erros de resposta (como email ou senha incorretos)
                console.error('Falha na requisição:', response.statusText);
            }
        } catch (error) {
            // Tratar erros de requisição
            console.error('Falha ao fazer a requisição:', error);
        }
    }
    return (

        <div className="flex items-center justify-center h-screen bg-[#FFF] flex-col">
            <Image src="/assets/education-white.svg" width={120} height={120} className='bg-[#735ED9] align-middle' />
            <h1 className="text-center text-[#735ED9] text-5xl my-1 font-bold italic">duolfes</h1>
            <div className="spinner" />
            <form className='flex flex-col w-60 items-center' onSubmit={handleSubmit}>
                <InputField label={"E-mail"} placeholder={"lucasmacedoes@gmail.com"} type={"email"} name="email" />
                <InputField label={"Password"} placeholder={"*****"} type={"password"} name="senha" />
                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3' type="submit">
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