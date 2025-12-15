import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../../../shared/components/ui/Input";
import { Download, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { chatLog, downloadCsv } from "../../../services/admin/ChatLog";
import { Icon } from "@iconify/react";
import type { ChatLogProps } from "../../../../../shared/types/type";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const ChatLogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const initFilterParams = searchParams.get("filter") ?? "";

  const [value, setValue] = useState(initFilterParams);
  const [page, setPage] = useState(initParams);
  const navigate = useNavigate();
  const [data, setData] = useState<ChatLogProps[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [hoverEffect, setHoverEffect] = useState<number | boolean>(false);
  const [hoverType, setHoverType] = useState<"question" | "answer" | null>(
    null
  );

  useEffect(() => {
    const fetchChatLog = async () => {
      setIsLoadingDoc(true);
      try {
        const res = await chatLog(page, 4, value);
        setData(res.chatlogs);
        setTotalPage(res.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingDoc(false);
      }
    };
    fetchChatLog();
  }, [page, value]);

  const handleNextPage = () => {
    if (isLoadingDoc) return;
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (isLoadingDoc) return;
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
    const getChatLogId = data.find((chat: any) => chat.id === id);

    if (getChatLogId) {
      const conversation_id = getChatLogId.conversation_id;
      navigate(`/admin/chat-log/detail/${conversation_id}`);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(value) });
  }, [page, value]);

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
                value={value}
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
              isLoadingFetch={isLoadingDoc}
              onclickDelete={handleDeleteChatLog}
              onclickEdit={handleEditChatLog}
              canEdit={false}
              data={data}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              classname="grid grid-cols-6"
              page={page}
              tooltipe={(item, i) =>
                hoverEffect === i &&
                (hoverType === "question"
                  ? item.question.length > 40
                  : item.answer.length > 40) && (
                  <div className="transition-all duration-300 fixed 2xl:left-[50vw] wrap-anywhere w-[20vw] md:left-100 2xl:top-80 bg-orange-100 rounded-xl p-3 outline outline-orange-400 md:text-sm 2xl:text-base z-[5] ">
                    {hoverType === "question"
                      ? item.question.slice(0, 400)
                      : item.answer.slice(0, 400)}
                  </div>
                )
              }
              totalPage={totalPage}
              renderItem={(item, i) => {
                const uploadedAt = formatDate(item.created_at);

                const answerRegex = item.answer.replace(
                  /\*{1,2}\s?(.*?)\s?\*{1,2}/g,
                  "<strong>$1</strong>"
                );
                return (
                  <>
                    <span className="text-center">{item.id}</span>
                    <span className="text-center">{uploadedAt}</span>
                    <span className="text-center">{item.username}</span>

                    <div
                      className="relative text-center"
                      onMouseEnter={() => {
                        setHoverEffect(i);
                        setHoverType("question");
                      }}
                      onMouseLeave={() => setHoverEffect(false)}>
                      <span className="z-[2]">
                        {item.question.length > 40
                          ? item?.question.slice(0, 40) + "..."
                          : item?.question}
                      </span>
                    </div>
                    <div
                      className="relative text-center"
                      onMouseEnter={() => {
                        setHoverEffect(i);
                        setHoverType("answer");
                      }}
                      onMouseLeave={() => setHoverEffect(false)}>
                      <span
                        className="z-[2] wrap-anywhere"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.answer.length > 50
                              ? answerRegex.slice(0, 50) + "..."
                              : answerRegex,
                        }}></span>
                    </div>
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
