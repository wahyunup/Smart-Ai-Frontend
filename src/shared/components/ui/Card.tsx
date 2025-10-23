import type { CardProps } from "../../types/type";

const Card = ({
  icon,
  heading,
  subheading,
  classname,
  iconLayout,
}: CardProps) => {
  return (
    <div
      className={`${classname} flex flex-col rounded-2xl gap-3`}>
      {iconLayout === "left" ? (
        <div className="flex justify-start w-full">
          <div className="bg-[#1D8A45B2] rounded-full p-3 flex justify-center items-center">
            {icon}
          </div>
        </div>
      ) : iconLayout === "right" ? (
        <div className="flex justify-end w-full">
          {icon}
          </div>
      ) : iconLayout === "center" ? (
        <div className="flex justify-center w-full">
          {icon}
          </div>
      ) : (
        ""
      )}
      <h2 className="text-lg font-bold font-manrope">{heading}</h2>
      <p className="text-[#5A5A5A] font-inter">{subheading}</p>
    </div>
  );
};

export default Card;
