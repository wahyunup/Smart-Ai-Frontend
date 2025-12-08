import type { CaroselProps } from "../../types/type";

const Carosel = ({ logos }: CaroselProps) => {
  const infiniteScroll = [...logos, ...logos];
  return (
    <>
      <div className="flex gap-10 items-center w-max animate-scroll">
        {infiniteScroll.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex justify-center items-center">
            <img
              src={item.src}
              className="h-fit 2xl:max-w-45 md:max-w-35 max-w-20 grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Carosel;
