import { Building2, CircleDollarSign, CircleUser, ClipboardClock, Files, House, MessageCircleMore, UserCog } from "lucide-react";

export const navListSuperAdmin = [
    {
      icon: <House className="2xl:size-[27px]" />,
      lable: "Dashboard",
      link: "/superadmin/dashboard",
      category: "Manajemen Klien",
    },
    {
      icon: <Building2 className="2xl:size-[27px]" />,
      lable: "Kelola Perusahaan",
      link: "/superadmin/manage-company",
      category: "Manajemen Klien",
    },
    {
      icon: <CircleDollarSign className="2xl:size-[27px]" />,
      lable: "Manajemen Transaksi",
      link: "/superadmin/manage-transaction",
      category: "Manajemen Klien",
    },
    {
      icon: <ClipboardClock className="2xl:size-[27px]" />,
      lable: "Audit Log & Aktivitas",
      link: "/superadmin/log-audit",
      category: "Sistem & Keamanan",
    },
    {
      icon: <UserCog className="2xl:size-[27px]" />,
      lable: "Pengaturan Sistem Dasar",
      link: "/superadmin/settings",
      category: "Sistem & Keamanan",
    },
  ];

 export const navlist = [
    {
      icon: <House className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: <Files className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Kelola Dokumen",
      link: "/admin/manage-documents",
    },
    {
      icon: <MessageCircleMore className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Log Chat/Riwayat",
      link: "/admin/chat-log",
    },
    {
      icon: <UserCog className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Kelola Staff",
      link: "/admin/manage-staff",
    },
    {
      icon: <CircleUser className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Profil Perusahaan",
      link: "/admin/company-profile",
    },
    {
      icon: <CircleDollarSign className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Subcription",
      link: "/admin/subcription",
    },
  ];