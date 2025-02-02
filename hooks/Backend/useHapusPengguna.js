import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusPengguna = () => {
  const [sedangMemuatHapusPengguna, setSedangMemuatHapusPengguna] =
    useState(false);

  const hapusPengguna = async (idPengguna) => {
    try {
      setSedangMemuatHapusPengguna(true);

      const referensiPengguna = doc(database, "pengguna", idPengguna);
      const snapshot = await getDoc(referensiPengguna);

      snapshot.exists()
        ? (async () => {
            const dataPengguna = snapshot.data();
            const fotoProfilUrl = dataPengguna.profileImage;

            fotoProfilUrl
              ? (async () => {
                  const storage = getStorage();
                  const fotoRef = ref(storage, fotoProfilUrl);

                  try {
                    await deleteObject(fotoRef);
                  } catch (error) {
                    console.error(
                      "Gagal menghapus gambar profil dari storage:",
                      error
                    );
                    toast.error(
                      "Foto profil tidak dapat dihapus, tetapi data lainnya tetap dihapus."
                    );
                  }
                })()
              : toast.warn(
                  "Tidak ada foto profil yang terkait dengan pengguna ini."
                );

            await deleteDoc(referensiPengguna);
            toast.success("Pengguna berhasil dihapus!");
          })()
        : toast.error("Data pengguna tidak ditemukan!");
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus pengguna: " + error.message
      );
    } finally {
      setSedangMemuatHapusPengguna(false);
    }
  };

  return {
    sedangMemuatHapusPengguna,
    hapusPengguna,
  };
};

export default useHapusPengguna;
