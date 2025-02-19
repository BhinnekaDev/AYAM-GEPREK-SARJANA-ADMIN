import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { auth } from "@/lib/firebaseConfig";

const useLupaKataSandiAdmin = () => {
  const [sedangMemuat, setSedangMemuat] = useState(false);

  const kirimEmailReset = async (email) => {
    setSedangMemuat(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email reset kata sandi telah dikirim!");
    } catch (error) {
      toast.error("Gagal mengirim email. Periksa kembali alamat email Anda.");
    } finally {
      setSedangMemuat(false);
    }
  };

  return { kirimEmailReset, sedangMemuat };
};

export default useLupaKataSandiAdmin;
