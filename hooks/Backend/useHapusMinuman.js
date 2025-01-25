import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusMinuman = () => {
  const [sedangMemuatHapusMinuman, setSedangMemuatHapusMinuman] =
    useState(false);

  const hapusMinuman = async (idMinuman) => {
    try {
      setSedangMemuatHapusMinuman(true);

      const referensiMinuman = doc(database, "minuman", idMinuman);
      const snapshot = await getDoc(referensiMinuman);

      snapshot.exists()
        ? (async () => {
            const dataMinuman = snapshot.data();
            const gambarUrl = dataMinuman.Gambar_Minuman;

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
              : toast.warn("Tidak ada gambar yang terkait dengan minuman ini.");

            await deleteDoc(referensiMinuman);
            toast.success("Minuman berhasil dihapus!");
          })()
        : toast.error("Data minuman tidak ditemukan!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus minuman: " + error.message);
    } finally {
      setSedangMemuatHapusMinuman(false);
    }
  };

  return {
    sedangMemuatHapusMinuman,
    hapusMinuman,
  };
};

export default useHapusMinuman;
