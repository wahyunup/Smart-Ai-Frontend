import MainLayout from "../../../shared/layouts/MainLayout";
import React from "react";
import Input from "../../../shared/components/ui/Input";
import { CircleAlert, CircleArrowUp } from "lucide-react";
import { Icon } from "@iconify/react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAIConversation } from "../hooks/useAIConversation";

export const AiConversationPage = () => {
  const {
    chatEndRef,
    chats,
    handleSubmit,
    isLoading,
    isLoadingSubmit,
    isStreaming,
    setValue,
    value,
    monthly_quota,
  } = useAIConversation();

  return (
    <MainLayout>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col h-full md:px-20 px-5"
      >
        {/* ── Chat messages ── */}
        <div className="flex flex-col gap-4 overflow-auto h-full 2xl:text-base md:text-sm md:mb-0 mb-22 py-6">
          {isLoading ? (
            /* Skeleton */
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex justify-end">
                    <div
                      className="h-11 md:w-[600px] w-48 rounded-[20px] rounded-br-none
                                  bg-[#16FF6E]/[.07] animate-pulse"
                    />
                  </div>
                  <div className="flex justify-start">
                    <div
                      className="h-11 md:w-[600px] w-48 rounded-[20px] rounded-tl-none
                                  bg-[#16FF6E]/[.04] animate-pulse"
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            chats.map((chat: { question: string; answer: string }, i) => (
              <React.Fragment key={i}>
                {/* User bubble */}
                <div className="flex justify-end">
                  <p
                    className="bg-green-950/50 border-green-700 border text-green-400
                               font-dm text-xs md:text-sm
                               px-5 py-3 rounded-[20px] rounded-br-none
                               max-w-[75%] w-fit h-fit"
                  >
                    {chat.question}
                  </p>
                </div>

                {/* Bot bubble */}
                <div className="flex justify-start">
                  {i === chats.length - 1 && isStreaming && !chat.answer ? (
                    /* Thinking indicator */
                    <div
                      className="flex items-center gap-2
                                  bg-[#0A1A20] border border-[#16FF6E]/[.07]
                                  px-4 py-2.5 rounded-[20px] rounded-tl-none"
                    >
                      <p className="font-dm text-sm text-[#6B8C80] animate-pulse">
                        Orbit sedang berfikir ✨
                      </p>
                    </div>
                  ) : chats.length > 0 && !chat.answer ? (
                    /* Error state */
                    <div
                      className="flex items-center gap-2
                                  bg-yellow-400/[.07] border border-yellow-400/20
                                  text-yellow-400
                                  font-dm text-sm
                                  py-2.5 px-4 rounded-[20px] rounded-tl-none"
                    >
                      <CircleAlert size={16} className="shrink-0" />
                      <p>
                        Mohon maaf, saya belum dapat menanggapi hal tersebut
                        untuk saat ini.
                      </p>
                    </div>
                  ) : (
                    /* Answer bubble */
                    <div
                      className="bg-[#0A1A20] border border-[#16FF6E]/[.07]
                                  font-dm text-xs md:text-sm
                                  px-5 py-3 rounded-[20px] rounded-tl-none
                                  max-w-[75%] prose prose-invert
                                  wrap-anywhere text-justify"
                    >
                      <ReactMarkDown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="md:text-2xl font-syne font-bold text-white">
                              {children}
                            </h1>
                          ),
                          p: ({ children }) => (
                            <p className="text-[#E8F4F0]">{children}</p>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal ml-6 mb-3 text-[#E8F4F0]">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1 text-[#E8F4F0]">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code
                              className="px-2 py-0.5 rounded text-sm
                                         bg-[#16FF6E]/[.08] text-[#16FF6E]
                                         border border-[#16FF6E]/15"
                            >
                              {children}
                            </code>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-[#16FF6E] font-semibold">
                              {children}
                            </strong>
                          ),
                        }}
                        remarkPlugins={[remarkGfm]}
                      >
                        {chat.answer}
                      </ReactMarkDown>
                    </div>
                  )}
                </div>
                <div ref={chatEndRef} />
              </React.Fragment>
            ))
          )}
        </div>

        {/* ── Input bar ── */}
        <div
          className="bg-[#040B0E] border-t border-[#16FF6E]/[.07]
                      py-4 px-5 md:sticky fixed bottom-0 right-0
                      w-full 2xl:py-6 md:py-4"
        >
          {monthly_quota > 0 ? (
            <Input
              icon={
                isLoadingSubmit ? (
                  <Icon
                    icon="line-md:loading-loop"
                    width="20"
                    height="20"
                    className="text-[#16FF6E]"
                  />
                ) : (
                  <button className="cursor-pointer" type="submit">
                    <CircleArrowUp
                      className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                      size={20}
                    />
                  </button>
                )
              }
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              classname="font-dm text-sm"
              iconPosition="right"
              type="text"
              variant="third"
              placeholder="Tanyakan apa saja terkait perusahaan"
            />
          ) : (
            /* Quota exhausted */
            <div
              className="bg-[#0A1A20] border border-[#16FF6E]/[.07]
                          rounded-[10px] px-5 py-3 text-center"
            >
              <p className="font-dm text-sm text-[#6B8C80]">
                Kuota pertanyaan habis.{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=6287790417767&text=Halo+saya+ingin+tambah+kuota&type=phone_number&app_absent=0"
                  target="_blank"
                  className="text-[#16FF6E] hover:underline underline-offset-2 transition-colors duration-200"
                >
                  Hubungi Admin Perusahaan.
                </a>
              </p>
            </div>
          )}
        </div>
      </form>
    </MainLayout>
  );
};
