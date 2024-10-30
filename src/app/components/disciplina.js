"use client"
import { useState } from 'react';
import Image from 'next/image';
import Modal from './modal';

export default function Disciplina({ src, alt, title, onConfirm }) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleConfirm = (numQuestions) => {
        setShowModal(false);
        onConfirm(numQuestions);
    }
    return (
        <div>
            <div onClick={handleClick} className="mb-14 flex items-center cursor-pointer">
                <Image src={src} width={48} height={48} className='ml-3 mr-6' alt={alt} />
                <h1 className="text-2xl font-bold text-black">{title}</h1>
            </div>
            {showModal && (
                <Modal onConfirm={handleConfirm} onCancel={() => setShowModal(false)} />
            )}
        </div>
    )
}