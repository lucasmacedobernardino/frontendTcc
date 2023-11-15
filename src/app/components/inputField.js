// components/InputField.js
const InputField = ({ id, label, type, placeholder, value, onChange, name }) => {
    return (
      <div className="mb-4 flex flex-col justify-start">
        {label && <label htmlFor={id} className="block text-sm mb-2 my-8 text-[#777]">
          {label}
        </label>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-b text-sm text-black"
          name={name}
        />
      </div>
    );
  };
  
  export default InputField;
  