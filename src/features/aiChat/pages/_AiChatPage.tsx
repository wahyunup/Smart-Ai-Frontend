import { CircleArrowUp, Sparkles } from "lucide-react";
import Input from "../../../shared/components/ui/Input";
import MainLayout from "../../../shared/layouts/MainLayout";
import { Icon } from "@iconify/react";
import { useAIChat } from "../hooks";
import { defaultMessage } from "../config/messageConfig";

export const AiChatPage = () => {
  const {
    handleOnChange,
    handleSubmitDefaultValue,
    handleSumbit,
    isLoading,
    isLoadingDefaultValue,
    value,
  } = useAIChat();

  return (
    <MainLayout>
      <div className="md:flex md:justify-center md:items-center fixed md:w-screen h-full">
        <form
          onSubmit={handleSumbit}
          className="2xl:w-[1000px] md:w-[800px] flex flex-col md:justify-center h-full px-5"
        >
          <div className="flex flex-col items-center gap-8 md:mt-0 mt-60">
            {/* ── Brand badge ── */}
            <div
              className="inline-flex items-center gap-2 font-dm
                         bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                         rounded-full px-4 py-1.5
                         text-[#16FF6E] text-[12px]"
            >
              <Sparkles size={12} />
              ORBIT — SmartAI Assistant
            </div>

            {/* ── Heading ── */}
            <h1
              className="font-syne font-extrabold text-white text-center
                         2xl:text-4xl md:text-3xl text-xl leading-tight"
            >
              Apa yang sedang anda pikirkan hari ini?
            </h1>

            {/* ── Desktop input ── */}
            <div className="w-full md:block hidden">
              <Input
                variant="third"
                type="text"
                htmlFor="message"
                name="message"
                value={value}
                onchange={handleOnChange}
                icon={
                  isLoading ? (
                    <Icon
                      icon="line-md:loading-loop"
                      width="20"
                      height="20"
                      className="text-[#16FF6E]"
                    />
                  ) : (
                    <button type="submit">
                      <CircleArrowUp
                        className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                        size={20}
                      />
                    </button>
                  )
                }
                placeholder="Tanyakan apa saja terkait perusahaan"
                classname="font-dm text-sm"
                iconPosition="right"
              />
            </div>

            {/* ── Quick topic pills ── */}
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="font-dm text-sm text-[#6B8C80]">
                Topik Cepat Sesuai Peran Anda:
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center max-w-[640px]">
                {defaultMessage.map((message, i) =>
                  isLoadingDefaultValue === i ? (
                    <button
                      key={i}
                      className="flex items-center justify-center
                                 bg-[#16FF6E]/10 border border-[#16FF6E]/20
                                 px-5 py-2.5 rounded-full cursor-pointer"
                    >
                      <Icon
                        icon="line-md:loading-loop"
                        width="18"
                        height="18"
                        className="text-[#16FF6E]"
                      />
                    </button>
                  ) : (
                    <button
                      key={message.id}
                      type="button"
                      onClick={() =>
                        handleSubmitDefaultValue(message.message, i)
                      }
                      className="font-dm 2xl:text-sm text-xs text-[#6B8C80]
                                 bg-[#0A1A20] border border-[#16FF6E]/[.07]
                                 px-5 py-2.5 rounded-full cursor-pointer
                                 hover:border-[#16FF6E]/25 hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05]
                                 transition-all duration-200 text-wrap text-center"
                    >
                      {message.message}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ── Mobile input bar ── */}
          <div
            className="w-full md:hidden p-4 fixed bottom-0 left-0 right-0
                        bg-[#040B0E] border-t border-[#16FF6E]/[.07]"
          >
            <Input
              variant="third"
              type="text"
              htmlFor="message"
              name="message"
              value={value}
              onchange={handleOnChange}
              icon={
                isLoading ? (
                  <Icon
                    icon="line-md:loading-loop"
                    width="18"
                    height="18"
                    className="text-[#16FF6E]"
                  />
                ) : (
                  <CircleArrowUp
                    className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                    size={18}
                  />
                )
              }
              placeholder="Tanyakan apa saja terkait perusahaan"
              classname="font-dm text-sm"
              iconPosition="right"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
