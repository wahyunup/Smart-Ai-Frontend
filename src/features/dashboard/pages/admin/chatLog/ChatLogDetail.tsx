import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { chatLogDetail } from "../../../services/admin/ChatLog";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const ChatLogDetail = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [data, setData] = useState({
    chat_history: [],
    conversation_created_at: "",
    conversation_id: "",
    conversation_title: "",
    division_name: "",
    referenced_documents: [],
    username: "",
    avg_response_time_ms: "",
    avg_match_score: 0,
  });

  useEffect(() => {
    const fetchChatLogDetail = async () => {
      try {
        if (conversationId) {
          const res = await chatLogDetail(conversationId);
          const dateConvert = formatDate(res.conversation_created_at, true);
          const milisecond = res.avg_response_time_ms;
          const totalSecond = Math.floor(milisecond / 1000);
          const minute = Math.floor(totalSecond / 60);
          const sec = totalSecond % 60;

          const similarityPercent = Math.floor(res.avg_match_score);

          setData({
            chat_history: res.chat_history,
            conversation_created_at: dateConvert,
            conversation_id: res.conversation_id,
            conversation_title: res.conversation_title,
            division_name: res.division_name,
            referenced_documents: res.referenced_documents,
            username: res.username,
            avg_match_score: similarityPercent,
            avg_response_time_ms: `${minute} Menit ${sec} Detik`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatLogDetail();
  }, []);
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Log Aktivitas</h1>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg">Detail Log Chat Perusahaan</h1>
          <div className="flex flex-col gap-4 mt-5">
            <span className="text-lg">
              User: {data.username} | Waktu Sesi {data.conversation_created_at}
            </span>
            <div className="flex gap-3">
              <div className="bg-white border border-gray-200 p-10 flex flex-col gap-5 w-[60%] rounded-4xl shadow-xl/8">
                <h2 className="border-b-1 font-semibold text-2xl pb-5">
                  Timeline Percakapan
                </h2>

                <div className="flex flex-col w-full gap-3 overflow-auto h-110 ">
                  <div className=" flex justify-end flex-col gap-3">
                    {data.chat_history.map(
                      (chat: { question: string; answer: string }) => {
                        const regexAnswer = chat.answer.replace(
                          /\*{1,2}\s?(.*?)\s?\*{1,2}/g,
                          "<strong>$1</strong>"
                        );
                        return (
                          <>
                            <div className="flex justify-end">
                              <p className="text-end text-sm text-white bg-[#1D8A45] w-fit p-5 rounded-3xl rounded-br-none">
                                {chat.question}
                              </p>
                            </div>

                            <div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: regexAnswer,
                                }}
                                className="text-start text-sm bg-gray-100 text-black w-fit p-5 rounded-3xl rounded-tl-none wrap-anywhere"></p>
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-5 w-[40%] h-fit rounded-4xl flex flex-col gap-3 shadow-xl/8">
                <h1 className="font-semibold text-2xl">
                  Data Analisis Jawaban Terakhir
                </h1>
                <div className="bg-white py-5 px-5 flex flex-col gap-6">
                  <p>Dokumen Sumber</p>
                  <div className="text-sm">
                    <p>Kesamaan jawaban dengan dokumen</p>
                    <span className="text-[#13D376] text-2xl font-bold">
                      {data.avg_match_score}%
                    </span>
                  </div>

                  <div className="text-sm">
                    <p>
                      Waktu response : <span>{data.avg_response_time_ms}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {data.referenced_documents.length > 0 ? (
                      data.referenced_documents.map(
                        (doc: { title: string }) => (
                          <div className="py-2 px-5 text-center bg-[#6AB7EE] rounded-xl text-white w-fit">
                            <span className="text-sm">{doc.title}</span>
                          </div>
                        )
                      )
                    ) : (
                      <span className="py-2 px-5 bg-[#6AB7EE] rounded-xl text-white w-fit">
                        Tidak Ada Reverensi
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

export default ChatLogDetail;
