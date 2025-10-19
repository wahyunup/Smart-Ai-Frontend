import type { CardProps } from "../../types/type";

const Card = ({ icon, heading, subheading, classname }: CardProps) => {
  return (
    <div
      className={`${classname}  outline-[#3BC152] bg-white text-center p-15 flex flex-col justify-center items-center rounded-2xl gap-3`}>
      <img src={icon} alt="" />
      <h2 className="text-lg font-medium">{heading}</h2>
      <p className="text-[#5A5A5A]">{subheading}</p>
    </div>
  );
};

export default Card;
