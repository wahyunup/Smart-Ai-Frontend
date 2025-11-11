import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { chatLogDetail } from "../../../services/admin/ChatLog";
import { useParams } from "react-router-dom";

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
  });
  // const [userIsLogin, setUserIsLogin] = useState({
  //   id: 0,
  // });

  // useEffect(() => {
  //   const getUserIsLogin = () => {
  //     const cookie = getCookie("accesstoken");
  //     if (cookie) {
  //       const decode = decodeJwt(cookie);
  //       setUserIsLogin(decode.company_id);
  //     }
  //   };
  //   getUserIsLogin();
  // }, []);

  useEffect(() => {
    const fetchChatLogDetail = async () => {
      try {
        if (conversationId) {
          const res = await chatLogDetail(conversationId);
          console.log(res);
          setData({
            chat_history: res.chat_history,
            conversation_created_at: res.conversation_created_at,
            conversation_id: res.conversation_id,
            conversation_title: res.conversation_title,
            division_name: res.division_name,
            referenced_documents: res.referenced_documents,
            username: res.username,
          });
        }
      } catch (error) {}
    };

    fetchChatLogDetail();
  }, []);
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl">Dashboard Admin Perusahaan</h1>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg">Detail Log Chat Perusahaan</h1>
          <p className="text-lg">{data.conversation_title}</p>
          <div className="flex flex-col gap-4 mt-5">
            <span className="text-xl">
              User: {data.username} | Waktu Sesi {data.conversation_created_at}
            </span>
            <div className="flex gap-3">
              <div className="bg-[#F2F2F2] p-10 flex flex-col gap-5 w-[60%] rounded-4xl">
                <h2 className="border-b-1 font-semibold text-2xl">
                  Timeline Percakapan
                </h2>

                <div className="flex flex-col gap-3 overflow-y-scroll h-110 ">
                  <div className=" flex justify-end flex-col gap-3">
                    {data.chat_history.map(
                      (chat: { question: string; answer: string }) => (
                        <>
                          <div className="flex justify-end">
                            <p className="text-end text-white bg-[#1D8A45] w-fit p-5 rounded-3xl rounded-br-none">
                              {chat.question}
                            </p>
                          </div>

                          <div>
                            <p className="text-start bg-[#E5E5E5] text-black w-fit p-5 rounded-3xl rounded-tl-none">
                              {chat.answer}
                            </p>
                          </div>
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[#F2F2F2] p-10 w-[40%] h-fit rounded-4xl flex flex-col gap-5">
                <h1 className="font-semibold text-2xl">
                  Data Analisis Jawaban Terakhir
                </h1>
                <div className="bg-white rounded-4xl py-5 px-8 flex flex-col gap-2">
                  <p>Dokumen Sumber</p>

                  {data.referenced_documents.length > 0 ? (
                    data.referenced_documents.map((doc:{title:string}) => (
                      <div className="py-2 px-5 text-center bg-[#6AB7EE] rounded-full w-fit">
                        <span className="text-sm">{doc.title}</span>
                      </div>
                    ))
                  ) : (
                    <span className="py-2 px-5 bg-[#6AB7EE] rounded-full w-fit">
                      Tidak Ada Reverensi
                    </span>
                  )}
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
