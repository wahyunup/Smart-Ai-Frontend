import { create } from "zustand";
import { getCookie } from "../utils/Cookies";
import { decodeJwt } from "../utils/Decode";

const token = getCookie("accesstoken");
const decode = token ? decodeJwt(token) : null;

interface UserInfo {
  role?: string;
  name?: string;
  company?: string;
  logo_s3_path?: string;
}

interface AuthState {
  accessToken: string | undefined;
  decoded: UserInfo;
  initialized: boolean;
  initAuth: () => void;
  setAccessToken: (token: string) => void;
}

interface DecodedToken {
  sub: string;
  role: string;
  name: string;
  company_id: number;
  logo_s3_path: string;
  exp: number;
}
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: token,
  initialized: false,
  decoded: decode
    ? {
        role: decode?.role,
        name: decode?.name,
        logo_s3_path: decode?.logo_s3_path,
        company: decode?.company_name,
      }
    : { role: "", name: "", company: "", logo_s3_path: "" },

  setAccessToken: (token: string) => {
    const decoded = token ? (decodeJwt(token) as DecodedToken) : null;
    set({
      accessToken: token,
      decoded: decoded
        ? {
            role: decoded?.role,
            name: decoded?.name,
            company: decode?.company_name,
            logo_s3_path: decode?.logo_s3_path,
          }
        : { role: "", name: "", company: "", logo_s3_path: "" },
      initialized: true,
    });
  },

  initAuth: () => {
    const token = getCookie("accesstoken");
    const decoded = token ? (decodeJwt(token) as DecodedToken) : null;
    set({
      accessToken: token || "",
      decoded: decoded
        ? {
            role: decoded?.role,
            name: decoded?.name,
            company: decode?.company_name,
            logo_s3_path: decode?.logo_s3_path,
          }
        : { role: "", name: "", company: "", logo_s3_path: "" },
      initialized: true,
    });
  },
}));
