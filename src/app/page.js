"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (

    <div className="flex items-center justify-center h-screen bg-[#735ED9] flex-col">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Image src="/assets/chapeu-de-bruxa.svg" width={221} height={221} alt='chapéu de mago' priority />
      <h1 className="text-center text-white text-[48px] mb-1 font-semibold italic">magicIfes</h1>
      <div className='flex items-center justify-center'>
        <div className="flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-white rounded-full mt-3"></div>
        </div>
      </div>
    </div>
  )
}
