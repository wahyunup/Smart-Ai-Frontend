import { CircleArrowUp } from "lucide-react";
import Input from "../../../shared/components/ui/Input";
import MainLayout from "../../../shared/layouts/MainLayout";
import {useState } from "react";
import { createConversationAxApi } from "../services/aiChat";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const aiChatPage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDefaultValue, setIsLoadingDefaultValue] = useState<
    number | null
  >(null);
  const uuid = uuidv4();
  const defaultMessage = [
    {
      id: 1,
      message: "Laporan Anggaran Campaign",
    },
    {
      id: 2,
      message: "Prosedur Data Lead",
    },
    {
      id: 3,
      message: "Timeline Proyek",
    },
    {
      id: 4,
      message: "Dokumen Media Vendor",
    },
    {
      id: 5,
      message: "Kebijakan Diskon Reseller",
    },
  ];

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
  return (
    <MainLayout>
      <div className="md:flex md:justify-center md:items-center fixed md:w-screen h-full">
       
        {/* chat section */}
        <form
          onSubmit={handleSumbit}
          className="2xl:w-250 md:w-200 flex flex-col  md:justify-center h-full ">
          <div className="md:hidden"></div>
          <div className="flex flex-col items-center gap-10 md:mt-0 mt-60">
            <h1 className="2xl:text-4xl md:text-3xl text-lg font-semibold">
              Apa yang sedang anda pikirkan hari ini?
            </h1>
            <Input
              variant="third"
              type="text"
              htmlFor="message"
              name="message"
              value={value}
              onchange={handleOnChange}
              icon={
                isLoading ? (
                  <Icon icon="line-md:loading-loop" width="24" height="24" />
                ) : (
                  <CircleArrowUp color="#666666" />
                )
              }
              placeholder="Tanyakan apa saja terkait perusahaan"
              classname="rounded-full 2xl:text-sm md:text-xs md:inline hidden"
              iconPosition="right"
            />

            <div className="flex flex-col items-center gap-4">
              <p className="2xl:text-sm text-sm text-[#666666]">
                Topik Cepat Sesuai Peran Anda:
              </p>
              <div className="flex w-full md:flex-row gap-3 md:w-160 flex-wrap justify-center">
                {defaultMessage.map((message, i) =>
                  isLoadingDefaultValue === i ? (
                    <button className="bg-[#F2F2F2] px-5 py-3 rounded-full text-sm cursor-pointer text-[#666666]">
                      <Icon
                        icon="line-md:loading-loop"
                        width="24"
                        height="24"
                      />
                    </button>
                  ) : (
                    <button
                      key={message.id}
                      type="button"
                      onClick={() => {
                        handleSubmitDefaultValue(message.message, i);
                      }}
                      className="bg-[#F2F2F2] px-5 py-3 text-wrap rounded-full 2xl:text-sm text-xs cursor-pointer text-[#666666]">
                      {message.message}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:hidden p-5 fixed bottom-0 bg-white border-t border-gray-200">
            <Input
              variant="third"
              type="text"
              htmlFor="message"
              name="message"
              value={value}
              onchange={handleOnChange}
              icon={
                isLoading ? (
                  <Icon icon="line-md:loading-loop" width="24" height="24" />
                ) : (
                  <CircleArrowUp color="#666666" />
                )
              }
              placeholder="Tanyakan apa saja terkait perusahaan"
              classname="rounded-full 2xl:text-sm md:text-xs"
              iconPosition="right"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default aiChatPage;
