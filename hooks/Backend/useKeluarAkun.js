import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseConfig";

const hapusSemuaCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
};

const useKeluarAkun = () => {
  const tanganiKeluarAkun = useCallback(async () => {
    try {
      const adminId = localStorage.getItem("ID_Admin");
      await signOut(auth);
      if (adminId) {
        localStorage.removeItem(adminId);
      }
      localStorage.removeItem("ID_Admin");
      hapusSemuaCookies();
      toast.success("Anda telah berhasil keluar.", { autoClose: 3000 });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error(`Gagal keluar: ${error.message}`, { autoClose: 3000 });
    }
  }, []);

  return tanganiKeluarAkun;
};

export default useKeluarAkun;
