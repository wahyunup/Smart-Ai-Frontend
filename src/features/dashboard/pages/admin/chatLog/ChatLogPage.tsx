import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../../../../shared/components/ui/Input";
import { Download, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { chatLog, downloadCsv } from "../../../services/ChatLog";
import { Icon } from "@iconify/react";
import type { ChatLogProps } from "../../../../../shared/types/type";

const ChatLogPage = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState<ChatLogProps[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChatLog = async () => {
      const res = await chatLog(page, 4);
      console.log(res);
      setData(res.chatlogs);
      setTotalPage(res.total_pages);
    };
    fetchChatLog();
  }, [page]);

  const fillterChatLogs = data.filter((chatLog: any) =>
    chatLog.username.toLowerCase().includes(value)
  );

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const exportCsv = async () => {
    setIsLoading(true);
    try {
      const res = await downloadCsv();
      const blob = new Blob([res], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chat_log.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChatLog = (id: number) => {
    const getChatLogId = fillterChatLogs.find((chat: any) => chat.id === id);

    if (getChatLogId) {
      const conversation_id = getChatLogId.conversation_id
      navigate(`/admin/chat-log/detail/${conversation_id}`);
    }
  };

  const handleDeleteChatLog = () => {};
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl">Dashboard Admin Perusahaan</h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Log Chat Perusahaan</h3>
            <div className="flex gap-5 items-center">
              <Input
                onchange={(e) => setValue(e.target.value)}
                variant="secondary"
                placeholder="Cari (User ID/Keyword)"
                name="search"
                type="text"
                htmlFor="search"
                icon={<Search color="#2F2F2F" />}
              />
              <div className="flex gap-5">
                {isLoading ? (
                  <Button
                    classname="w-50 py-3 flex justify-center items-center gap-2 rounded-xl bg-blue-500"
                    variant="secondary">
                    <Icon icon="line-md:loading-loop" width="24" height="24" />
                  </Button>
                ) : (
                  <Button
                    onclick={exportCsv}
                    classname="w-50 py-3 flex justify-center items-center gap-2 rounded-xl bg-blue-500"
                    variant="secondary">
                    Export CSV <Download size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden">
            <TableHeaderList classname="grid bg-[#E3F9E8] grid-cols-6">
              <span>ID</span>
              <span>Tanggal</span>
              <span>Username</span>
              <span>Pertanyaan</span>
              <span>Jawaban Chat Bot</span>
            </TableHeaderList>
            <TableBody
              onclickDelete={handleDeleteChatLog}
              onclickEdit={handleEditChatLog}
              canEdit={false}
              data={fillterChatLogs}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              classname="grid grid-cols-6"
              page={page}
              totalPage={totalPage}
              renderItem={(item) => {
                const uploadedAt = new Date(item.created_at);
                const formattedDate = uploadedAt.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  dateStyle: "long",
                  timeStyle: "medium",
                });
                return (
                  <>
                    <span className="text-center">{item.id}</span>
                    <span className="text-center">{formattedDate}</span>
                    <span className="text-center">{item.username}</span>
                    {item.question.length > 60 ? (
                      <span className="text-center">
                        {item.question.slice(0, 60)} ...{" "}
                      </span>
                    ) : (
                      <span className="text-center">{item.question}</span>
                    )}
                    {item.answer.length > 60 ? (
                      <span className="text-center">
                        {item.answer.slice(0, 60)} ...{" "}
                      </span>
                    ) : (
                      <span className="text-center">{item.answer}</span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatLogPage;
