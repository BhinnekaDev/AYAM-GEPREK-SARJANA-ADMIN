import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseConfig";

const useKeluarAkun = () => {
  const tanganiKeluarAkun = useCallback(async () => {
    try {
      await signOut(auth);
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
