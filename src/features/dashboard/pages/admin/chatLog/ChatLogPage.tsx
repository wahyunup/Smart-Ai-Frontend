import MainLayout from "../../../../../shared/layouts/MainLayout";
import Input from "../../../../../shared/components/ui/Input";
import { Download, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { Icon } from "@iconify/react";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import { useChatLog } from "../../../hooks";

export const ChatLogPage = () => {
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
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl">
          Dashboard Admin Perusahaan
        </h1>

        <div className="flex flex-col gap-5">
          <h3 className="font-syne font-bold text-white text-lg">
            Log Chat Perusahaan
          </h3>

          {/* Toolbar */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 max-w-sm">
              <Input
                value={value}
                onchange={(e) => setValue(e.target.value)}
                variant="primary"
                placeholder="Cari (User ID/Keyword)"
                name="search"
                type="text"
                htmlFor="search"
                icon={<Search size={16} className="text-[#6B8C80]" />}
              />
            </div>
            {isLoading ? (
              <Button
                variant="info"
                classname="px-6 py-3 rounded-[10px] flex items-center gap-2 opacity-75 cursor-not-allowed pointer-events-none"
              >
                <Icon icon="line-md:loading-loop" width="18" height="18" />
                Exporting...
              </Button>
            ) : (
              <Button
                onclick={exportCsv}
                variant="info"
                classname="group px-6 py-3 rounded-[10px] flex items-center gap-2"
              >
                Export CSV
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px] overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <TableHeaderList classname="grid grid-cols-6">
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
                    <span className="font-dm text-[#6B8C80] text-sm text-center">
                      {item.id}
                    </span>
                    <span className="font-dm text-[#6B8C80] text-sm text-center">
                      {uploadedAt}
                    </span>
                    <span className="font-dm text-[#E8F4F0] text-sm text-center">
                      {item.username}
                    </span>
                    <Tooltip label={item.question}>
                      <span className="font-dm text-[#6B8C80] text-sm inline-block 2xl:w-48 md:w-28 truncate text-start">
                        {item.question}
                      </span>
                    </Tooltip>
                    <div className="flex justify-center">
                      <span className="font-dm text-[#6B8C80] text-sm block 2xl:w-56 md:w-28 text-center truncate">
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
