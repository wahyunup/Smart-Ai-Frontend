const decodeJwt = (token: string) => {
  try {
    // Pisahkan token jadi 3 bagian
    const base64Url = token?.split(".")[1];
    if (!base64Url) throw new Error("Token tidak valid");

    // Ganti karakter base64Url ke format base64 biasa
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 → string JSON
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    // Parse ke object
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Gagal decode token:", err);
    return null;
  }
};

export {decodeJwt}