import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusMakanan = () => {
  const [sedangMemuatHapusMakanan, setSedangMemuatHapusMakanan] =
    useState(false);

  const hapusMakanan = async (idMakanan) => {
    try {
      setSedangMemuatHapusMakanan(true);

      const storage = getStorage();
      const gambarRef = ref(storage, `Makanan/${idMakanan}`);
      await deleteObject(gambarRef);

      const referensiMakanan = doc(database, "makanan", idMakanan);
      await deleteDoc(referensiMakanan);

      toast.success("Makanan berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus makanan: " + error.message);
    } finally {
      setSedangMemuatHapusMakanan(false);
    }
  };

  return {
    sedangMemuatHapusMakanan,
    hapusMakanan,
  };
};

export default useHapusMakanan;
