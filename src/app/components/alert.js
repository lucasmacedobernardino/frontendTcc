"use client"
export default function Alert({ message, onClose }){
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <p>{message}</p>
                <button 
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
