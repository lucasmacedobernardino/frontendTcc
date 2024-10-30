"use client"
import { useGlobalState } from '../context/GlobalStateContext';

const Modal = ({ onConfirm, onCancel }) => {
    const {qtdQuestoes, setQtdQuestoes} = useGlobalState()

    const handleConfirm = () => {
        onConfirm(qtdQuestoes);  
    };

    return (
        <div className="bg-black opacity-[0.9] fixed top-0 bottom-0 left-0 right-0 z-50 text-white flex items-center justify-center">
            <div className="bg-slate-600 p-5 rounded-lg flex flex-col gap-3 relative items-center justify-center">
                <div className='text-yellow-300 absolute right-1 top-1 cursor-pointer' onClick={onCancel}>x</div>
                <h2 className='mt-2'>Quantas questões você deseja responder?</h2>
                <input
                    type="number"
                    value={qtdQuestoes}
                    onChange={(e) => setQtdQuestoes(Number(e.target.value))}
                    min={1}
                    className="rounded-md text-white bg-slate-600 text-center"
                />
                <div className="flex justify-center">
                    <button onClick={handleConfirm} className="bg-purple-800 p-2 rounded-md">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
