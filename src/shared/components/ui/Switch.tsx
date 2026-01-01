import type { SwitchProps } from "../../types/type";

const Switch = ({ checked, onChange }:SwitchProps) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        name="is_active"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      <div
        className="
          h-6 w-11 rounded-full bg-gray-300
          peer-checked:bg-[#00AA58]
          transition-colors
        "
      ></div>

      <div
        className="
          absolute left-1 top-1 h-4 w-4 rounded-full bg-white
          transition-transform
          peer-checked:translate-x-5
        "
      ></div>
    </label>
  );
};

export default Switch;
