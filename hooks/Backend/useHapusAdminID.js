import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusAdminID = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);
  const pengarah = useRouter();

  const hapusAdmin = async (id) => {
    try {
      setSedangMemuatHapusAdmin(true);
      const referensiAdmin = doc(database, "admin", id);
      await deleteDoc(referensiAdmin);
      toast.success("Admin berhasil dihapus!");

      setTimeout(() => {
        pengarah.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return {
    sedangMemuatHapusAdmin,
    hapusAdmin,
  };
};

export default useHapusAdminID;
