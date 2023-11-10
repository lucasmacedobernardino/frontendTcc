"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Login() {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        const endpoint = 'http://localhost:3333/usuarios/login';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            console.log(response)
            if (response.ok) {
                alert("Login Efetuado com sucesso!")
                // Se a requisição for bem-sucedida, redireciona para outra página ou faz algo com os dados
                const data = await response.json();
                localStorage.setItem(JSON.stringify(data))
                // Redirecionar para a dashboard, por exemplo

                router.push('/');
            } else {
                console.log(response)
                alert("E-mail ou senha incorretos!")
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
                <InputField label={"E-mail"} placeholder={"lucasmacedoes@gmail.com"} type={"email"} name="email"/>
                <InputField label={"Password"} placeholder={"*****"} type={"password"} name="senha"/>
                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3' type="submit">
                    Entrar
                </button>
                <Link href="/register" className='text-xs text-[#777]'>Não tem uma conta? <span className='text-[#735ED9]'>Clique aqui</span></Link>
            </form>
        </div>

    )
}