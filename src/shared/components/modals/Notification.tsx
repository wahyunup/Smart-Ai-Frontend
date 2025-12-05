import { CircleCheck, CircleX, X } from "lucide-react";
import type { notificationProps } from "../../types/type";

const Notification = ({
  heading,
  subheading,
  type,
  onClose,
  setOnClose,
}: notificationProps) => {
  return (
    onClose && (
      <div className="fixed flex justify-center inset-0 items-center bg-black/20">
        <div
          className={`bg-white py-3 px-10 rounded-xl flex flex-col gap-2 items-center h-fit relative transition-all duration-300 origin-center ${
            onClose ? "scale-100" : "scale-0"
          }`}>
          <button
            className="absolute right-3 cursor-pointer"
            onClick={() => setOnClose?.(false)}>
            <X />
          </button>
          <div>
            {type === "error" ? (
              <CircleX size={50} color="#DB3726" />
            ) : type === "success" ? (
              <CircleCheck size={50} color="#00AA58" />
            ) : null}
          </div>
          <h1 className="font-semibold text-xl text-[#1B0E12]">{heading}</h1>
          <p className="text-[#1B0E12] text-sm">{subheading}</p>
        </div>
      </div>
    )
  );
};

export default Notification;
