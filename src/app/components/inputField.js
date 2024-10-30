// components/InputField.js
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

const InputField = ({ id, label, type, value, onChange, name, children }) => {
  const [inputType, setInputType] = useState(type);
  const [showIcon, setShowIcon] = useState(<FaEye/>)
  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
    setShowIcon(inputType === 'password' ? <RiEyeCloseLine/> : <FaEye/>)
  };
  
  const typeEmail = "border-b-2 text-sm text-black font-bold p-2 border-[#777777] focus:outline-none";
  const typePassword = "border-b-2 text-sm text-black font-bold p-2 border-[#777777] focus:outline-none";
  const placeholderEmail = "Seu email"
  const placeholderPassword = "Sua senha"
  const password = type === "password"
  return (
    <div className="mb-4 flex flex-col justify-start relative">
      {label && (
        <label htmlFor={id} className="block text-sm mb-2 my-8 text-[#777] font-bold">
          {label}
        </label>
      )}
      <div className="relative w-full h-full">
        <input
          type={inputType} 
          id={id}
          placeholder={password ? placeholderPassword : placeholderEmail}
          value={value}
          onChange={onChange}
          className={password ? typePassword : typeEmail}
          name={name}
        />
        {/* Renderiza os children ao lado direito do input */}
        {type== "password" && (
          <div className="absolute right-[0] top-[0] mt-2 mr-2">
            <button type="button" onClick={togglePasswordVisibility} className="text-[15px] text-[#735ED9]">{showIcon}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
