import { useState } from "react";
import { faq } from "../config/faqConfig";

export const useFAQ = () => {
  const [value, setValue] = useState("");

  const filter = faq.filter((f) =>
    f.heading.toLowerCase().includes(value.toLowerCase())
  );
  return {
    setValue,
    filter,
  };
};
