import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
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

      const referensiMakanan = doc(database, "makanan", idMakanan);
      const snapshot = await getDoc(referensiMakanan);

      snapshot.exists()
        ? (async () => {
            const dataMakanan = snapshot.data();
            const gambarUrl = dataMakanan.Gambar_Makanan;

            gambarUrl
              ? (async () => {
                  const storage = getStorage();
                  const gambarRef = ref(storage, gambarUrl);

                  try {
                    await deleteObject(gambarRef);
                  } catch (error) {
                    console.error(
                      "Gagal menghapus gambar dari storage:",
                      error
                    );
                    toast.error(
                      "Gambar tidak dapat dihapus, tetapi data lainnya tetap dihapus."
                    );
                  }
                })()
              : toast.warn("Tidak ada gambar yang terkait dengan makanan ini.");

            await deleteDoc(referensiMakanan);
            toast.success("Makanan berhasil dihapus!");
          })()
        : toast.error("Data makanan tidak ditemukan!");
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
