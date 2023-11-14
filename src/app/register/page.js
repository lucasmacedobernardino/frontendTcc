"use client"
import Image from 'next/image';
import InputField from '../components/inputField';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Register() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const ip = "http://3.17.204.62:3333"
        const nome = event.target.nome.value
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        const senhaConfirm = event.target.senhaConfirm.value;
        const endpoint = `${ip}/usuarios`;
        if(senha != senhaConfirm){
            alert("Digite a mesma senha !")
        }else{
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha, nome}),
                });
                if (response.ok) {
                    const sucessData = await response.json()
                    alert(sucessData.message)
                    console.log(sucessData.message)
                    if (sucessData.message == "Email já cadastrado"){
                        return
                    }
                    router.push('/login')
                } else {
                    const errorData = await response.json()
                    alert(errorData.message)
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
            <Image src="/assets/education-white.svg" width={120} height={120} className='bg-[#735ED9] align-middle' />
            <h1 className="text-center text-[#735ED9] text-5xl my-1 font-bold italic">duolfes</h1>
            <div className="spinner" />
            <form className='flex flex-col w-60 items-center' onSubmit={handleSubmit}>
                <InputField label={"Name"} placeholder={"João da Silva"} type={"text"} name={"nome"}/>
                <InputField label={"E-mail"} placeholder={"exemple@gmail.com"} type={"email"} name={"email"}/>
                <InputField label={"Password"} placeholder={"*****"} type={"password"} name={"senha"}/>
                <InputField label={"Confirm password"} placeholder={"*****"} type={"password"} name={"senhaConfirm"}/>
                <button className='border p-1 bg-[#735ED9] rounded-md text-white mt-5 text-xs shadow-md py-1 px-16 mb-3' type='submit'>
                    Criar conta
                </button>
                <Link href="/" className='text-xs text-[#777]'>Já tem uma conta? <span className='text-[#735ED9]'>Clique aqui</span></Link>
            </form>
        </div>

    )
}