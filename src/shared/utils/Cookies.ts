const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const setCookie = (name: string, value: string, maxAge: number) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; secure; samesite=strict`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; secure; samesite=strict`;
};

export { getCookie, setCookie, removeCookie };
