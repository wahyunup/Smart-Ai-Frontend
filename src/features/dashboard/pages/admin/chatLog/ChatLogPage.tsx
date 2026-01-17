import MainLayout from "../../../../../shared/layouts/MainLayout";
import Input from "../../../../../shared/components/ui/Input";
import { Download, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { Icon } from "@iconify/react";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import { useChatLog } from "../../../hooks/admin/chatLog/useChatLog";

const ChatLogPage = () => {
  const {
    data,
    handleDeleteChatLog,
    value,
    setValue,
    page,
    handleNextPage,
    handlePrevPage,
    isLoading,
    totalPage,
    exportCsv,
    handleEditChatLog,
    isLoadingDoc,
  } = useChatLog();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="2xl:text-3xl md:text-2xl font-semibold">
          Dashboard Admin Perusahaan
        </h1>

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
              totalPage={totalPage}
              renderItem={(item) => {
                const uploadedAt = formatDate(item.created_at);

                return (
                  <>
                    <span className="text-center">{item.id}</span>
                    <span className="text-center">{uploadedAt}</span>
                    <span className="text-center">{item.username}</span>

                    <Tooltip label={item.question}>
                      <span className="inline-block 2xl:w-50 md:w-30 truncate text-start">
                        {item.question}
                      </span>
                    </Tooltip>
                    <div className="flex justify-center">
                      <span className="block 2xl:w-60 md:w-30 text-center truncate">
                        {item.answer}
                      </span>
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
