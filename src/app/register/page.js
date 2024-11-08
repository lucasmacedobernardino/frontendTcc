"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ip from '../ip';
import Link from 'next/link';
export default function Register() {
    const usuarioCriado = () => toast.success("Usuário criado com Sucesso!")
    const mesmaSenha = () => toast.warning("Digite a mesma senha!")
    const emailJaCadastrado = () => toast.warning("Email já cadastrado!")
    const emailInvalido = () => toast.warning("Email Inválido!")
    const handleSubmit = async (event) => {
        event.preventDefault();
        const nome = event.target.nome.value
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        const senhaConfirm = event.target.senhaConfirm.value;
        const endpoint = `${ip}/usuarios`;
        if (senha != senhaConfirm) {
            mesmaSenha()
        } else {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha, nome }),
                });
                if (response.ok) {
                    const sucessData = await response.json()
                    if (sucessData.message == "Email já cadastrado") {
                        emailJaCadastrado()
                        return
                    }
                    usuarioCriado()
                    setTimeout(() => {
                        router.push('/login')
                    }, 4000)

                } else {
                    const errorData = await response.json()
                    if (errorData.message == "Email inválido!") {
                        emailInvalido()
                        return
                    }
                    // Tratar erros de resposta (como email ou senha incorretos)
                    console.error('Falha na requisição:', response.statusText);
                }
            } catch (error) {
                // Tratar erros de requisição
                console.error('Falha ao fazer a requisição:', error);
            }
        }

    }
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen bg-[#FFF] flex-col">
            <Image src="/assets/chapeu-de-bruxa-white.svg" width={140} height={140} alt='chapéu de mago branco' priority />
            <h1 className="text-center text-[#735ED9] text-[48px] my-1 font-bold italic">magicIfes</h1>
            <div className="spinner" />
            <form className='flex flex-col w-60 items-center' onSubmit={handleSubmit}>
                <InputField label={"Name"} placeholder={"João da Silva"} type={"text"} name={"nome"} />
                <InputField label={"E-mail"} placeholder={"exemple@gmail.com"} type={"email"} name={"email"} />
                <InputField label={"Password"} placeholder={"Sua senha"} type={"password"} name={"senha"} />
                <InputField label={"Confirm password"} placeholder={"*****"} type={"password"} name={"senhaConfirm"} />
                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3' type='submit'>
                    Criar conta
                </button>
                <Link href="/login" className='text-xs text-[#777]'>Já tem uma conta? <span className='text-[#735ED9]'>Clique aqui</span></Link>
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
