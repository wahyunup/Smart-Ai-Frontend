import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useChatLogDetail } from "../../../hooks";

export const ChatLogDetailPage = () => {
  const { data } = useChatLogDetail();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white text-2xl">
          Log Aktivitas
        </h1>

        <div className="flex flex-col gap-4">
          <h2 className="font-syne font-bold text-white text-lg">
            Detail Log Chat Perusahaan
          </h2>

          {/* session info badge */}
          <div
            className="inline-flex items-center gap-2 font-dm text-sm text-[#6B8C80]
                        bg-[#16FF6E]/[.04] border border-[#16FF6E]/10
                        rounded-[10px] px-4 py-2.5 w-fit"
          >
            <span className="text-[#E8F4F0]">User: {data.username}</span>
            <span className="text-[#16FF6E]/30">|</span>
            <span>Waktu Sesi {data.conversation_created_at}</span>
          </div>

          <div className="flex gap-5 mt-2">
            {/* ── Chat timeline ── */}
            <div
              className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                          p-8 flex flex-col gap-5 w-[60%] rounded-[20px] overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

              <h2 className="font-syne font-bold text-white text-xl pb-4 border-b border-[#16FF6E]/[.07]">
                Timeline Percakapan
              </h2>

              <div className="flex flex-col w-full gap-4 overflow-auto h-[440px] pr-1">
                <div className="flex justify-end flex-col gap-4">
                  {data.chat_history.map(
                    (chat: { question: string; answer: string }, i: number) => {
                      const regexAnswer = chat.answer.replace(
                        /\*{1,2}\s?(.*?)\s?\*{1,2}/g,
                        "<strong>$1</strong>",
                      );
                      return (
                        <div key={i} className="flex flex-col gap-3">
                          {/* User question */}
                          <div className="flex justify-end">
                            <p
                              className="text-end text-sm text-[#040B0E] font-dm
                                         bg-[#16FF6E] w-fit px-5 py-3
                                         rounded-[16px] rounded-br-none max-w-[80%]"
                            >
                              {chat.question}
                            </p>
                          </div>
                          {/* Bot answer */}
                          <div className="flex justify-start">
                            <p
                              dangerouslySetInnerHTML={{ __html: regexAnswer }}
                              className="text-start text-sm font-dm text-[#E8F4F0]
                                         bg-[#0D1F27] border border-[#16FF6E]/[.07]
                                         w-fit px-5 py-3
                                         rounded-[16px] rounded-tl-none
                                         wrap-anywhere max-w-[80%]"
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* ── Analysis panel ── */}
            <div
              className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                          p-6 w-[40%] h-fit rounded-[20px] flex flex-col gap-5 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

              <h2 className="font-syne font-bold text-white text-xl">
                Data Analisis Jawaban Terakhir
              </h2>

              <div className="flex flex-col gap-5">
                {/* Match score */}
                <div className="bg-[#0D1F27] border border-[#16FF6E]/[.07] rounded-[14px] p-4 flex flex-col gap-1">
                  <p className="font-dm text-xs text-[#6B8C80] uppercase tracking-wider">
                    Kesamaan jawaban dengan dokumen
                  </p>
                  <span className="font-syne font-extrabold text-[#16FF6E] text-3xl">
                    {data.avg_match_score}%
                  </span>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#16FF6E] to-[#4BFFB8] rounded-full"
                      style={{ width: `${data.avg_match_score}%` }}
                    />
                  </div>
                </div>

                {/* Response time */}
                <div className="bg-[#0D1F27] border border-[#16FF6E]/[.07] rounded-[14px] p-4">
                  <p className="font-dm text-xs text-[#6B8C80] uppercase tracking-wider mb-1">
                    Waktu Response
                  </p>
                  <span className="font-syne font-bold text-[#E8F4F0] text-lg">
                    {data.avg_response_time_ms}
                  </span>
                </div>

                {/* Referenced docs */}
                <div className="flex flex-col gap-2">
                  <p className="font-dm text-xs text-[#6B8C80] uppercase tracking-wider">
                    Dokumen Sumber
                  </p>
                  <div className="flex flex-col gap-2">
                    {data.referenced_documents.length > 0 ? (
                      data.referenced_documents.map(
                        (doc: { title: string }, i: number) => (
                          <div
                            key={i}
                            className="py-2 px-4 font-dm text-sm
                                       bg-blue-400/10 text-blue-400
                                       border border-blue-400/20
                                       rounded-[10px] w-fit"
                          >
                            {doc.title}
                          </div>
                        ),
                      )
                    ) : (
                      <span
                        className="py-2 px-4 font-dm text-sm
                                   bg-[#6B8C80]/10 text-[#6B8C80]
                                   border border-white/[.06]
                                   rounded-[10px] w-fit"
                      >
                        Tidak Ada Referensi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
