import { useState } from "react";
import { toast } from "react-toastify";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async (id) => {
    if (typeof id !== "string" || !id.trim()) {
      return toast.error("ID tidak valid.");
    }

    setSedangMemuatHapusAdmin(true);

    try {
      const res = await fetch("/api/hapusAdmin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(
          `Gagal menghapus admin: ${
            errorData.error || "Kesalahan tidak diketahui."
          }`
        );
      }

      const data = await res.json();
      toast.success(data.message || "Admin berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan. Periksa koneksi internet Anda.");
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return { sedangMemuatHapusAdmin, hapusAdmin };
};

export default useHapusAdmin;
