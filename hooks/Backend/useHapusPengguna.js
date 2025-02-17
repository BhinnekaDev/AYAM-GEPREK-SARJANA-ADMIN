import { useState } from "react";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
// Konfigurasi Firebase
import { database } from "@/lib/firebaseConfig";

const useHapusPengguna = () => {
  const [sedangMemuatHapusPengguna, setSedangMemuatHapusPengguna] =
    useState(false);

  const hapusPengguna = async (id) => {
    if (!id || typeof id !== "string" || !id.trim()) {
      return toast.error("ID pengguna tidak valid.");
    }

    setSedangMemuatHapusPengguna(true);

    try {
      const referensiPengguna = doc(database, "pengguna", id);
      const snapshot = await getDoc(referensiPengguna);

      if (!snapshot.exists()) {
        return toast.error("Data pengguna tidak ditemukan.");
      }

      const dataPengguna = snapshot.data();
      const fotoUrl = dataPengguna.Foto_Pengguna;

      if (fotoUrl) {
        const storage = getStorage();
        const fotoRef = ref(storage, fotoUrl);

        try {
          await deleteObject(fotoRef);
          toast.success("Foto profil berhasil dihapus.");
        } catch (error) {
          console.error("Gagal menghapus foto dari storage:", error);
          toast.warn(
            "Foto tidak dapat dihapus, tetapi data pengguna tetap akan dihapus."
          );
        }
      } else {
        toast.warn("Pengguna tidak memiliki foto profil.");
      }

      const res = await fetch("/api/hapusAdmin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(`Gagal menghapus pengguna: ${data.error}`);
      }

      toast.success(data.message);
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus pengguna.");
      console.error("Error:", error);
    } finally {
      setSedangMemuatHapusPengguna(false);
    }
  };

  return { sedangMemuatHapusPengguna, hapusPengguna };
};

export default useHapusPengguna;
