import type { InputProps } from "../../types/type";

const Input = ({
  label,
  name,
  type,
  placeholder,
  htmlFor,
  classname,
  value,
  onchange
}: InputProps) => {
  return (
    <>
      <div className={`flex flex-col gap-2 w-full ${classname}`}>
        <label htmlFor={htmlFor} className="font-semibold">
          {label}
        </label>
        <div className="flex p-3 border-[#3BC15254] border-2 bg-white rounded-lg">
          <input
            onChange={onchange}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full outline-none placeholder:text-black/65"
          />
        </div>
      </div>
    </>
  );
};

export default Input;
