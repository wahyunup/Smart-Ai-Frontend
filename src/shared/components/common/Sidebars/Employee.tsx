import {
  BellRing,
  ChevronDown,
  Ellipsis,
  FileText,
  LogOut,
  MessageCircleMore,
  PanelLeftClose,
  Search,
  SquarePen,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useSidebar } from "../../../hooks/sidebar/useSidebar";
import Button from "../../ui/Button";
import { Icon } from "@iconify/react";
import logo from "../../../../assets/icons/LOGO FIX.svg";

const Employee = () => {
  const {
    contentOverlayRef,
    contentRef,
    conversationList,
    conversationListSearch,
    handleConversation,
    handleDeleteConversation,
    handleEnter,
    handleHover,
    handleInfinitScroll,
    handleLeave,
    handlePlanStatusApi,
    isHidden,
    isLoading,
    isOpen,
    isVisibleConversation,
    isVisiblePlan,
    loginUser,
    logout,
    planStatus,
    setIsOpen,
    visibleAction,
    visibleActionProfile,
    visibleIcon,
    visibleSearchConversation,
    navigate,
    isloadingScroll,
    setIsVisibleConversation,
    setIsVisiblePlan,
    setVisibleAction,
    setVisibleSearchConversation,
    setVisibleActionProfile,
    setValue,
    value,
    location,
  } = useSidebar();

  return (
    <>
      {/* ─────────────────── DESKTOP ─────────────────── */}
      <div
        className={`${isOpen ? "2xl:w-80 md:w-70" : "w-[5%]"}
                    bg-[#040B0E] border-r border-[#16FF6E]/[.07]
                    top-0 md:flex flex-col
                    ${location.pathname === "/chat" ? "fixed h-screen" : "sticky h-screen"}
                    z-20 justify-between hidden relative overflow-hidden`}
      >
        {/* ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-[#16FF6E]/[.03] blur-[60px] rounded-full pointer-events-none" />

        {/* ── Top section ── */}
        <div
          className={`p-4 flex flex-col gap-4 w-full relative z-10 ${isOpen ? "" : "items-center"}`}
        >
          {/* Logo + toggle */}
          <div className="flex items-center justify-between">
            {isOpen ? (
              <img
                src={logo}
                className="2xl:w-12 md:w-9 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
                alt=""
              />
            ) : (
              <>
                <div>
                  <img
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    src={logo}
                    className={`w-9 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)] ${isHidden ? "hidden" : ""}`}
                    alt=""
                  />
                </div>
                <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                  <button
                    onClick={() => setIsOpen()}
                    className={`cursor-pointer transition-all duration-700 ${isHidden ? "" : "hidden"}`}
                  >
                    <PanelLeftClose className="text-[#16FF6E] size-[28px]" />
                  </button>
                </div>
              </>
            )}
            {isOpen && (
              <button
                onClick={() => setIsOpen()}
                className="cursor-pointer text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
              >
                <PanelLeftClose size={24} />
              </button>
            )}
          </div>

          {isOpen ? (
            <>
              {/* New chat button */}
              <button
                onClick={() => navigate("/chat")}
                className="group relative w-full flex items-center justify-center gap-2
                           font-syne font-bold text-[13px] text-[#040B0E]
                           bg-[#16FF6E] py-2.5 rounded-[10px] overflow-hidden
                           before:absolute before:inset-0
                           before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                           before:-translate-x-full before:transition-transform before:duration-500
                           hover:before:translate-x-full
                           hover:shadow-[0_0_24px_rgba(22,255,110,0.35)]
                           transition-all duration-[250ms]"
              >
                <SquarePen size={15} />
                Obrolan Baru
              </button>

              {/* Search */}
              <Button
                onclick={() => setVisibleSearchConversation(true)}
                variant="link"
                classname="text-start font-dm text-[#6B8C80] hover:text-[#16FF6E] 2xl:text-sm md:text-xs transition-colors duration-200"
              >
                Cari Obrolan
              </Button>

              {/* Conversation list */}
              <div className="flex flex-col gap-2 w-full">
                <Button
                  classname="flex items-center gap-1 font-dm text-[#6B8C80] hover:text-[#16FF6E] text-sm transition-colors duration-200"
                  variant="link"
                  onclick={() =>
                    setIsVisibleConversation(!isVisibleConversation)
                  }
                >
                  Obrolan <ChevronDown size={14} />
                </Button>

                {isVisibleConversation && (
                  <div
                    ref={contentRef}
                    onScroll={handleInfinitScroll}
                    className="flex flex-col gap-1 overflow-auto 2xl:max-h-[35vh] md:max-h-[30vh]"
                  >
                    {conversationList.map(
                      (conversation: { title: string; id: string }) => (
                        <div
                          key={conversation.id}
                          className={`font-dm 2xl:text-sm md:text-xs cursor-pointer w-full
                                    px-4 min-h-10 rounded-[10px] flex items-center justify-between
                                    transition-all duration-200
                                    ${
                                      location.pathname.startsWith(
                                        `/chat/conversation/${conversation.id}`,
                                      )
                                        ? "bg-[#16FF6E]/10 text-[#16FF6E]"
                                        : "text-[#6B8C80] hover:bg-[#16FF6E]/[.05] hover:text-[#E8F4F0]"
                                    }`}
                          onClick={() => handleConversation(conversation.id)}
                          onMouseEnter={() => handleHover(conversation.id)}
                          onMouseLeave={() => handleHover(!visibleIcon)}
                        >
                          <span className="w-full overflow-hidden truncate">
                            {conversation.title}
                          </span>
                          {visibleIcon === conversation.id && (
                            <>
                              <Ellipsis
                                onClick={() => setVisibleAction(true)}
                                className="2xl:size-6 md:size-5 shrink-0 text-[#16FF6E]"
                              />
                              {visibleAction && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                                  <div
                                    className="bg-[#0A1A20] border border-[#16FF6E]/[.12]
                                              p-2 w-48 flex flex-col gap-2 rounded-[14px]
                                              shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                                  >
                                    {isLoading ? (
                                      <div className="p-3 bg-red-400/10 rounded-xl flex justify-center">
                                        <Icon
                                          icon="line-md:loading-loop"
                                          width="20"
                                          height="20"
                                          className="text-red-400"
                                        />
                                      </div>
                                    ) : (
                                      <button
                                        className="flex items-center justify-center gap-2
                                                 font-dm text-sm text-red-400
                                                 hover:bg-red-400/[.07] p-3 rounded-[10px]
                                                 cursor-pointer w-full transition-colors duration-200"
                                        onClick={() =>
                                          handleDeleteConversation(
                                            conversation.id,
                                          )
                                        }
                                      >
                                        <Trash2 size={15} />
                                        Delete
                                      </button>
                                    )}
                                    <button
                                      className="font-dm text-sm text-[#6B8C80]
                                               hover:bg-[#16FF6E]/[.05] hover:text-[#E8F4F0]
                                               py-2.5 w-full rounded-[10px] cursor-pointer
                                               transition-colors duration-200"
                                      onClick={() => setVisibleAction(false)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ),
                    )}
                    {isloadingScroll && (
                      <div className="flex justify-center py-2">
                        <Icon
                          icon="line-md:loading-loop"
                          width="20"
                          height="20"
                          className="text-[#16FF6E]"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Plan status */}
              <button
                className="flex gap-2 items-center font-dm text-sm text-[#6B8C80]
                           hover:text-[#16FF6E] transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  setIsVisiblePlan(true);
                  handlePlanStatusApi();
                }}
              >
                <BellRing size={16} className="text-[#16FF6E]" />
                <span className="underline underline-offset-2">
                  Langganan & kuota
                </span>
              </button>

              {/* Support */}
              <div className="flex flex-col gap-2">
                <p className="font-dm text-[#6B8C80]/50 text-xs uppercase tracking-wider">
                  Dukungan
                </p>
                <Button
                  onclick={() => navigate("/chat/faq")}
                  variant="link"
                  classname={`flex font-dm text-sm px-4 py-2.5 rounded-[10px] transition-all duration-200
                               ${
                                 location.pathname.startsWith("/chat/faq")
                                   ? "bg-[#16FF6E]/10 text-[#16FF6E]"
                                   : "text-[#6B8C80] hover:bg-[#16FF6E]/[.05] hover:text-[#E8F4F0]"
                               }`}
                >
                  Bantuan & FAQ
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-8 mt-5">
              <button
                className="cursor-pointer text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                onClick={() => navigate("/chat")}
              >
                <SquarePen size={20} />
              </button>
              <button
                onClick={() => setVisibleSearchConversation(true)}
                className="cursor-pointer text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
              >
                <Search size={20} />
              </button>
            </div>
          )}
        </div>

        {/* ── Profile popup ── */}
        <div className="p-3 absolute md:bottom-15 2xl:bottom-19 w-full z-10">
          {visibleActionProfile && (
            <div
              onMouseLeave={() =>
                setVisibleActionProfile(!visibleActionProfile)
              }
              className="bg-[#0A1A20] border border-[#16FF6E]/[.12]
                         flex flex-col items-center gap-1
                         rounded-[14px] text-sm
                         shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            >
              <button
                onClick={logout}
                className={`flex text-red-400 items-center justify-center
                             ${isOpen ? "gap-2" : "gap-0"}
                             py-3 px-4 hover:bg-red-400/[.07] w-full
                             rounded-[14px] cursor-pointer
                             font-dm text-sm hover:text-red-300
                             transition-all duration-200`}
              >
                <LogOut size={15} />
                Keluar
              </button>
            </div>
          )}
        </div>

        {/* ── Profile row ── */}
        <div className="flex w-full flex-col 2xl:px-3 md:py-3 md:px-2 gap-3 relative z-10">
          <div
            onClick={() => setVisibleActionProfile(!visibleActionProfile)}
            className={`flex ${isOpen ? "justify-start" : "justify-center"}
                        gap-3 items-center 2xl:p-3 md:py-2
                        rounded-[10px]
                        hover:bg-[#16FF6E]/[.05]
                        cursor-pointer w-full
                        transition-all duration-200`}
          >
            {!loginUser.profile_picture_url ? (
              <div className="2xl:w-10 2xl:h-10 md:w-8 md:h-8 overflow-hidden flex justify-center rounded-full items-center bg-[#16FF6E]/10 border border-[#16FF6E]/20 shrink-0">
                <p className="font-syne font-bold text-[#16FF6E] uppercase text-sm">
                  {loginUser.username.slice(0, 1)}
                </p>
              </div>
            ) : (
              <div className="2xl:w-10 2xl:h-10 md:w-8 md:h-8 overflow-hidden flex justify-center rounded-full items-center bg-[#0A1A20] shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={loginUser.profile_picture_url}
                  alt="profile-picture"
                />
              </div>
            )}
            <div className={`${isOpen ? "" : "hidden"} min-w-0`}>
              <span className="font-dm text-[#E8F4F0] md:text-sm 2xl:text-base truncate block">
                {loginUser.username}
              </span>
              <p className="font-dm 2xl:text-xs md:text-[10px] text-[#6B8C80] truncate">
                {loginUser.division}
              </p>
            </div>
          </div>
        </div>

        {/* ── Search overlay ── */}
        {visibleSearchConversation && (
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[11]">
              <div
                className="bg-[#0A1A20] border border-[#16FF6E]/[.12]
                          absolute rounded-[20px] w-[500px]
                          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                          overflow-hidden"
              >
                {/* shimmer top */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/30 to-transparent" />

                <div className="flex justify-between items-center p-4 border-b border-[#16FF6E]/[.07]">
                  <input
                    placeholder="Cari Obrolan..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className="font-dm text-[#E8F4F0] placeholder:text-[#6B8C80]/60
                             bg-transparent outline-none w-full text-sm"
                  />
                  <X
                    className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200 cursor-pointer shrink-0"
                    size={18}
                    onClick={() => setVisibleSearchConversation(false)}
                  />
                </div>

                <div className="px-4 pt-5 pb-4 flex flex-col gap-5">
                  <button
                    className="flex items-center gap-2 font-dm font-medium text-sm text-[#6B8C80]
                             hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      navigate("/chat");
                      setIsOpen();
                      setVisibleSearchConversation(false);
                    }}
                  >
                    <SquarePen size={16} />
                    Chat Baru
                  </button>

                  <div
                    ref={contentOverlayRef}
                    onScroll={handleInfinitScroll}
                    className="flex flex-col gap-1 h-80 overflow-auto"
                  >
                    {conversationListSearch.map(
                      (
                        conv: {
                          title: string;
                          convertDate: string;
                          id: number;
                        },
                        i: number,
                      ) => {
                        const prevDate =
                          conversationListSearch[i - 1]?.convertDate;
                        const isSameDate = conv.convertDate === prevDate;
                        return (
                          <div key={conv.id} className="flex flex-col gap-1">
                            {!isSameDate && (
                              <p className="font-dm text-xs text-[#6B8C80]/50 mt-2">
                                {conv.convertDate}
                              </p>
                            )}
                            <button
                              className="font-dm text-sm text-start text-[#6B8C80]
                                       hover:bg-[#16FF6E]/[.05] hover:text-[#E8F4F0]
                                       py-2.5 px-4 rounded-[10px] cursor-pointer
                                       transition-all duration-200"
                              onClick={() => {
                                setVisibleSearchConversation(false);
                                navigate(`/chat/conversation/${conv.id}`);
                              }}
                            >
                              {conv.title}
                            </button>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bg-black/50 backdrop-blur-sm w-full h-full z-[10]" />
          </>
        )}
      </div>

      {/* ─────────────────── PLAN MODAL ─────────────────── */}
      {isVisiblePlan && (
        <>
          <div className="fixed z-30 inset-0 flex items-center justify-center">
            <div
              className="relative bg-[#0A1A20] border border-[#16FF6E]/[.12]
                          rounded-[20px] p-6 md:w-[480px] w-[90%] h-fit
                          shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* shimmer top */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/30 to-transparent" />

              {/* Close */}
              <div className="flex justify-end mb-4">
                <button
                  className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsVisiblePlan(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Plan header */}
              <div className="flex justify-between items-center border-b border-[#16FF6E]/[.07] pb-4 mb-5">
                <p className="font-dm font-medium text-[#E8F4F0] text-sm">
                  Paket Anda:{" "}
                  <span className="text-[#16FF6E]">{planStatus.plan_name}</span>
                </p>
                <span className="font-dm text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                  {planStatus.cd_exp_plan} Hari lagi
                </span>
              </div>

              {/* Quota chat */}
              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between items-center">
                  <p className="font-dm text-sm text-[#6B8C80] flex items-center gap-2">
                    <MessageCircleMore size={16} className="text-[#16FF6E]" />
                    Kuota Chat
                  </p>
                  <p className="font-dm text-xs text-[#6B8C80]">
                    <span className="text-[#E8F4F0]">
                      {planStatus?.current_question_quota}
                    </span>
                    {" / "}
                    <span>{planStatus?.total_question_quota}</span> Pertanyaan
                  </p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#16FF6E] to-[#4BFFB8] rounded-full transition-all duration-500"
                    style={{
                      width: `${planStatus?.remaining_quota_percentage}%`,
                    }}
                  />
                </div>
                <p className="font-dm text-xs text-[#6B8C80] text-right">
                  Tersisa {planStatus?.remaining_quota_percentage}%
                </p>
              </div>

              {/* Quota doc */}
              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between items-center">
                  <p className="font-dm text-sm text-[#6B8C80] flex items-center gap-2">
                    <FileText size={16} className="text-yellow-400" />
                    Dokumen
                  </p>
                  <p className="font-dm text-xs text-[#6B8C80]">
                    <span className="text-[#E8F4F0]">
                      {planStatus?.current_doc_quota}
                    </span>
                    {" / "}
                    <span>{planStatus?.total_doc_quota}</span> Dokumen
                  </p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400/80 rounded-full transition-all duration-500"
                    style={{
                      width: `${planStatus?.remaining_documents_percentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Quota users */}
              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between items-center">
                  <p className="font-dm text-sm text-[#6B8C80] flex items-center gap-2">
                    <Users size={16} className="text-blue-400" />
                    Pengguna (team)
                  </p>
                  <p className="font-dm text-xs text-[#6B8C80]">
                    <span className="text-[#E8F4F0]">
                      {planStatus?.current_users_quota}
                    </span>
                    {" / "}
                    <span>{planStatus?.total_users_quota}</span> Pengguna
                  </p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400/80 rounded-full transition-all duration-500"
                    style={{
                      width: `${planStatus?.remaining_users_percentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Expiry */}
              <div className="border-t border-[#16FF6E]/[.07] pt-4">
                <p className="font-dm text-xs text-[#6B8C80] text-center">
                  Masa Aktif Berakhir:{" "}
                  <span className="text-[#E8F4F0]">{planStatus?.exp_date}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm fixed inset-0 z-20" />
        </>
      )}

      {/* ─────────────────── MOBILE ─────────────────── */}
      {isOpen ? (
        <>
          <div className="bg-[#040B0E] border-r border-[#16FF6E]/[.07] h-full fixed z-30 md:hidden w-[80%] p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex justify-between items-center">
                <img
                  src={logo}
                  alt=""
                  className="w-9 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
                />
                <button
                  onClick={() => setIsOpen()}
                  className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="flex rounded-[10px] bg-[#0D1F27] border border-[#16FF6E]/[.10] px-4 py-2.5 gap-2 items-center">
                <Search size={16} className="text-[#6B8C80] shrink-0" />
                <input
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  className="font-dm text-sm text-[#E8F4F0] placeholder:text-[#6B8C80]/60 bg-transparent outline-none w-full"
                  placeholder="Cari"
                />
              </div>

              {/* New chat */}
              <button
                onClick={() => {
                  navigate("/chat");
                  setIsOpen();
                }}
                className="group relative w-full flex items-center justify-center gap-2
                           font-syne font-bold text-[13px] text-[#040B0E]
                           bg-[#16FF6E] py-2.5 rounded-[10px] overflow-hidden
                           hover:shadow-[0_0_24px_rgba(22,255,110,0.35)]
                           transition-all duration-[250ms]"
              >
                <SquarePen size={14} />
                Chat Baru
              </button>

              {/* Conversation list */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    setIsVisibleConversation(!isVisibleConversation)
                  }
                  className="flex font-dm text-sm items-center gap-1 text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
                >
                  <span>Obrolan</span>
                  <ChevronDown size={16} />
                </button>
                {isVisibleConversation && (
                  <div
                    ref={contentRef}
                    onScroll={handleInfinitScroll}
                    className="flex flex-col gap-1 max-h-48 overflow-auto"
                  >
                    {conversationList.map((conv) => (
                      <div
                        key={conv.id}
                        className="flex justify-between items-center px-3 rounded-[10px] hover:bg-[#16FF6E]/[.05]"
                      >
                        <span
                          onClick={() => {
                            navigate(`/chat/conversation/${conv.id}`);
                            setIsOpen();
                          }}
                          className="font-dm text-sm text-[#6B8C80] hover:text-[#E8F4F0] py-2.5 truncate w-full cursor-pointer transition-colors duration-200"
                        >
                          {conv.title}
                        </span>
                        <button
                          onClick={() => {
                            setVisibleAction(true);
                            setVisibleActionProfile(false);
                          }}
                        >
                          <Ellipsis size={20} className="text-[#16FF6E]" />
                        </button>
                        {visibleAction && (
                          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                            <div className="bg-[#0A1A20] border border-[#16FF6E]/[.12] p-2 w-48 flex flex-col gap-2 rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                              {isLoading ? (
                                <div className="p-3 bg-red-400/10 rounded-xl flex justify-center">
                                  <Icon
                                    icon="line-md:loading-loop"
                                    width="20"
                                    height="20"
                                    className="text-red-400"
                                  />
                                </div>
                              ) : (
                                <button
                                  className="flex items-center justify-center gap-2 font-dm text-sm text-red-400 hover:bg-red-400/[.07] p-3 rounded-[10px] cursor-pointer w-full transition-colors duration-200"
                                  onClick={() =>
                                    handleDeleteConversation(conv.id)
                                  }
                                >
                                  <Trash2 size={15} />
                                  Delete
                                </button>
                              )}
                              <button
                                className="font-dm text-sm text-[#6B8C80] hover:bg-[#16FF6E]/[.05] hover:text-[#E8F4F0] py-2.5 w-full rounded-[10px] cursor-pointer transition-colors duration-200"
                                onClick={() => setVisibleAction(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Plan */}
              <button
                onClick={() => {
                  setIsVisiblePlan(true);
                  handlePlanStatusApi();
                }}
                className="flex items-center gap-2 font-dm text-sm text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
              >
                <BellRing size={16} className="text-[#16FF6E]" />
                <span className="underline underline-offset-2">
                  Langganan & Kuota
                </span>
              </button>

              {/* Support */}
              <div className="flex flex-col gap-2 text-sm">
                <p className="font-dm text-[#6B8C80]/50 text-xs uppercase tracking-wider">
                  Dukungan
                </p>
                <button
                  onClick={() => {
                    navigate("/chat/faq");
                    setIsOpen();
                  }}
                  className="font-dm text-[#6B8C80] hover:text-[#16FF6E] text-start transition-colors duration-200 underline underline-offset-2"
                >
                  Bantuan & FAQ
                </button>
              </div>
            </div>

            {/* Profile */}
            <div className="relative">
              <div className="absolute bottom-20 w-full">
                {visibleActionProfile && (
                  <div
                    onMouseLeave={() =>
                      setVisibleActionProfile(!visibleActionProfile)
                    }
                    className="py-2 bg-[#0A1A20] border border-[#16FF6E]/[.12] flex-col flex items-center gap-2 rounded-[14px] text-sm shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                  >
                    <button
                      onClick={logout}
                      className="flex text-red-400 items-center justify-center gap-2 py-3 hover:bg-red-400/[.07] w-full rounded-[10px] cursor-pointer font-dm text-sm hover:text-red-300 transition-all duration-200"
                    >
                      <LogOut size={15} />
                      Keluar
                    </button>
                  </div>
                )}
              </div>

              <div
                className="flex gap-3 items-center rounded-[10px] p-3 hover:bg-[#16FF6E]/[.05] cursor-pointer transition-all duration-200"
                onClick={() => setVisibleActionProfile(!visibleActionProfile)}
              >
                {!loginUser.profile_picture_url ? (
                  <div className="w-10 h-10 overflow-hidden flex justify-center rounded-full items-center bg-[#16FF6E]/10 border border-[#16FF6E]/20 shrink-0">
                    <p className="font-syne font-bold text-[#16FF6E] uppercase text-sm">
                      {loginUser.username.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <div className="w-10 h-10 overflow-hidden flex justify-center rounded-full items-center bg-[#0A1A20] shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={loginUser.profile_picture_url}
                      alt="profile-picture"
                    />
                  </div>
                )}
                <div>
                  <p className="font-dm text-[#E8F4F0] text-sm">
                    {loginUser.username}
                  </p>
                  <p className="font-dm text-xs text-[#6B8C80]">
                    {loginUser.division}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm fixed inset-0 z-19" />
        </>
      ) : null}
    </>
  );
};

export default Employee;
