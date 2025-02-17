import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
// Konfigurasi Firebase
import { database } from "@/lib/firebaseConfig";

const useHapusAdminID = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);
  const pengarah = useRouter();

  const hapusAdmin = async (id) => {
    if (!id || typeof id !== "string" || !id.trim()) {
      return toast.error("ID tidak valid.");
    }

    setSedangMemuatHapusAdmin(true);

    try {
      const referensiAdmin = doc(database, "admin", id);
      const snapshot = await getDoc(referensiAdmin);

      if (!snapshot.exists()) {
        return toast.error("Data admin tidak ditemukan.");
      }

      const dataAdmin = snapshot.data();
      const fotoUrl = dataAdmin.Foto_Profil;

      if (fotoUrl) {
        const storage = getStorage();
        const fotoRef = ref(storage, fotoUrl);

        try {
          await deleteObject(fotoRef);
          toast.success("Foto profil berhasil dihapus.");
        } catch (error) {
          console.error("Gagal menghapus foto dari storage:", error);
          toast.warn(
            "Foto tidak dapat dihapus, tetapi data admin tetap akan dihapus."
          );
        }
      } else {
        toast.warn("Admin tidak memiliki foto profil.");
      }

      const res = await fetch("/api/hapusAdmin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(`Gagal menghapus admin: ${data.error}`);
      }

      toast.success(data.message || "Admin berhasil dihapus!");

      setTimeout(() => {
        pengarah.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin.");
      console.error("Error:", error);
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
