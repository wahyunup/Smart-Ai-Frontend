import { useParams } from "react-router-dom";
import MainLayout from "../../../shared/layouts/MainLayout";
import React, { useEffect, useRef, useState } from "react";
import {
  createConversationApi,
  fetchAllConversation,
  fetchConversationApi,
} from "../services/aiChat";
import Input from "../../../shared/components/ui/Input";
import { CircleArrowUp } from "lucide-react";
import { Icon } from "@iconify/react";

const aiConversationPage = () => {
  const { conversationId } = useParams();
  const [chats, setChats] = useState<{ question: string; answer: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [value, setValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  
  useEffect(() => {
    const fetchConversation = async () => {
      setIsLoading(true);
      try {
        if (conversationId) {
          const res = await fetchConversationApi(conversationId);
          const regex = res.map((rx: { answer: string }) => ({
            ...rx,
            answer: rx.answer.replace(
              /\*{1,2}\s?(.*?)\s?\*{1,2}/g,
              "<strong>$1</strong>"
            ),
          }));

          setChats(regex);
          scrollToBottom();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversation();
  }, [conversationId]);

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setIsLoadingSubmit(true);
  //     try {
  //       if (conversationId) {
  //         // const res = await createConversationApi(value, conversationId);
  //         // console.log(res);

  //     const response = await createConversationApi(value, conversationId)
  //       const reader = response.body.getReader();
  //       const decoder = new TextDecoder();
  //       let fullAnswer = "";

  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) break;

  //         const chunk = decoder.decode(value, { stream: true });
  //         fullAnswer += chunk;

  //         setChats((prev) => {
  //           const updated = [...prev];
  //           updated[currentIndex].answer = fullAnswer;
  //           return updated;
  //         });
  //       }
  //         alert("kekirim");
  //         setValue("");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoadingSubmit(false);
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    if (!value.trim()) return;

    setIsLoadingSubmit(true);

    try {
      if (conversationId) {
        // Tambahkan pertanyaan pengguna dulu
        const newChat = { question: value, answer: "" };
        setChats((prev) => [...prev, newChat]);
        const currentIndex = chats.length;

        const response = await createConversationApi(value, conversationId);
        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let fullAnswer = "";

          while (true) {
            const { done, value: chunkValue } = await reader.read();
            if (done) break;
            let chunk = decoder.decode(chunkValue, { stream: true });

            chunk = chunk
              .split("\n") // pecah per baris
              .filter(
                (line) => line.startsWith("data:") && line.trim() !== "data: {}"
              ) // ambil baris data
              .map((line) => line.replace(/^data:\s*/, "")) // hapus "data:" dan spasi
              .join("\n");

            chunk = chunk.replace(
              /\*{1,2}\s?(.*?)\s?\*{1,2}/g,
              "<strong>$1</strong>"
            );

            fullAnswer += chunk;

            // Update chat terakhir secara live
            setChats((prev) => {
              const updated = [...prev];
              updated[currentIndex].answer = fullAnswer;
              return updated;
            });
            scrollToBottom();
          }
        }
      }
      await fetchAllConversation();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <MainLayout>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-between h-full px-20">
        <div className="flex flex-col gap-3 overflow-auto 2xl:h-176 md:h-110 2xl:text-base md:text-sm">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 ">
                  <div className="flex justify-end">
                    <div className="bg-green-100 h-11 w-150 rounded-3xl rounded-br-none animate-pulse"></div>
                  </div>
                  <div className="flex justify-start ">
                    <div className="bg-gray-200 h-11 w-150 rounded-3xl rounded-tl-none animate-pulse"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            chats.map((chat: { question: string; answer: string }) => (
              <>
                <div className="flex justify-end">
                  <p className="bg-[#1D8A45] p-3 rounded-3xl rounded-br-none text-white w-fit">
                    {chat.question}
                  </p>
                </div>
                <div className="flex justify-start">
                  <p
                    dangerouslySetInnerHTML={{ __html: chat.answer }}
                    className="bg-[#F2F2F2] p-3 rounded-3xl rounded-tl-none w-fit "></p>
                </div>
                <div ref={chatEndRef} />
              </>
            ))
          )}
        </div>
        <div className="bg-white 2xl:py-10 md:py-5">
          <Input
            icon={
              isLoadingSubmit ? (
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              ) : (
                <CircleArrowUp color="#666666" />
              )
            }
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
            classname="text-[#666666] text-sm"
            iconPosition="right"
            type="text"
            variant="third"
            placeholder="Tanyakan apa saja terkait perusahaan"
          />
        </div>
      </form>
    </MainLayout>
  );
};

export default aiConversationPage;
