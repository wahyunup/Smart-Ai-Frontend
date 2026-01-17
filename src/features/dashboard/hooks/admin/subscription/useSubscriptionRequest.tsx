import { useEffect, useState } from "react";

export const useSubscriptionRequest = () => {
  const [dataCompany, setDataCompany] = useState({
    companyName: "",
    companyEmail: "",
  });

  useEffect(() => {
    setDataCompany({
      companyEmail: "mycompany@example.com",
      companyName: "PT. myCompany",
    });
  }, []);
  return { dataCompany };
};
