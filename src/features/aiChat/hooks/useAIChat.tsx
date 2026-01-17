import { useState } from "react";
import { createConversationAxApi } from "../services/aiChat";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useAIChat = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDefaultValue, setIsLoadingDefaultValue] = useState<
    number | null
  >(null);
  const uuid = uuidv4();
  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const messageToSend = value;

    try {
      const res = await createConversationAxApi(messageToSend, uuid);

      if (res.status === 200) {
        navigate(`/chat/conversation/${uuid}`);
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    } finally {
      setIsLoading(false);
    }

    setValue("");
  };

  const handleSubmitDefaultValue = async (message: string, i: number) => {
    setIsLoadingDefaultValue(i);
    try {
      const res = await createConversationAxApi(message, uuid);
      if (res.status === 200) {
        navigate(`/chat/conversation/${uuid}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDefaultValue(null);
    }
  };
  return {
    handleSumbit,
    value,
    handleOnChange,
    isLoading,
    handleSubmitDefaultValue,
    isLoadingDefaultValue,
  };
};
