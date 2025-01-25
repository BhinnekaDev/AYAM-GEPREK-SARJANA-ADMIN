import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async (id) => {
    setSedangMemuatHapusAdmin(true);

    try {
      await deleteDoc(doc(database, "admin", id));
      toast.success("Admin berhasil dihapus!");
    } catch (error) {
      toast.error(`Terjadi kesalahan saat menghapus admin: ${error.message}`);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return { sedangMemuatHapusAdmin, hapusAdmin };
};

export default useHapusAdmin;
