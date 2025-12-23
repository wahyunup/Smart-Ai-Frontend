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
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePlanStore } from "../../../shared/store/useSubsStat";

const aiConversationPage = () => {
  const { conversationId } = useParams();
  const [chats, setChats] = useState<{ question: string; answer: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [value, setValue] = useState("");
  const { monthly_quota } = usePlanStore();
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
            answer: rx.answer.replace(/(\d+)\./g, "\n$1. "),
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

  // const formatAnswer = (text: string) => {
  //   return (
  //     text
  //     .replace(/(\d+)\./g, "\n$1.")

  //       // bold **text**
  //       .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  //       // italic *text*
  //       .replace(/\*(.*?)\*/g, "<em>$1</em>")

  //       // numbering list 1. item
  //       .replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>")

  //       // bullet list - item
  //       .replace(/^[\-\*]\s+(.*)$/gm, "<li>$1</li>")

  //       // ubah baris li menjadi <ul>...</ul>
  //       .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")

  //       // newline → <br/>
  //       .replace(/\n/g, "<br/>")
  //   );
  // };

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
          try {
            while (true) {
              const { done, value: chunkValue } = await reader.read();
              if (done) break;
              let chunk = decoder.decode(chunkValue, { stream: true });

              chunk = chunk
                .split("\n") // pecah per baris
                .filter(
                  (line) =>
                    line.startsWith("data:") && line.trim() !== "data: {}"
                ) // ambil baris data
                .map((line) => line.replace(/^data:\s*/, "")) // hapus "data:" dan spasi
                .join("\n")
                .replace(/(\d+)\./g, "\n$1. ");
              fullAnswer += chunk;

              // Update chat terakhir secara live
              setChats((prev) => {
                const updated = [...prev];
                updated[currentIndex].answer = fullAnswer;
                return updated;
              });
              scrollToBottom();
            }
          } catch (error) {
            console.log("stream error", error);
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
        className="flex flex-col h-full overflow-hidden md:px-20 px-5">
        <div className="flex flex-col gap-3 overflow-auto h-full  2xl:text-base md:text-sm">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
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
            chats.map((chat: { question: string; answer: string }, i) => (
              <>
                <div key={i} className="flex justify-end">
                  <p className="bg-[#1D8A45] p-3 rounded-3xl rounded-br-none text-white w-fit">
                    {chat.question}
                  </p>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#F2F2F2] p-3 rounded-3xl rounded-tl-none w-fit prose max-w-none wrap-anywhere">
                    <ReactMarkDown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold">{children}</h1>
                        ),
                        p: ({ children }) => (
                          <p className="my-2 leading-relaxed">{children}</p>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-6 mb-3">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        code: ({ children }) => (
                          <code className="px-1 py-0.5 bg-gray-200 rounded text-sm">
                            {children}
                          </code>
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}>
                      {chat.answer}
                    </ReactMarkDown>
                  </div>
                </div>
                <div ref={chatEndRef} />
              </>
            ))
          )}
        </div>
        <div className="bg-white py-5 sticky bottom-0 w-full 2xl:py-10 md:py-5">
          {monthly_quota > 0 ? (
            <Input
              icon={
                isLoadingSubmit ? (
                  <Icon icon="line-md:loading-loop" width="24" height="24" />
                ) : (
                  <button className="cursor-pointer" type="submit">
                    <CircleArrowUp color="#666666" />
                  </button>
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
          ) : (
           <div className="rounded-lg bg-[#F2F2F2] outline text-sm outline-[#E5E5E5] text-[#000000AB] 2xl:p-3 md:p-2 text-center">
            <p className="text-[#B2B2B2]">Kuota pertanyaan habis. <a href="https://api.whatsapp.com/send/?phone=6287790417767&text=Halo+saya+ingin+tambah+kuota&type=phone_number&app_absent=0" target="_blank" className="text-[#126F3D]">Hubungi Admin Perusahaan.</a></p>
           </div>
          )}
        </div>
      </form>
    </MainLayout>
  );
};

export default aiConversationPage;
