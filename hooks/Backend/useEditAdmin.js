import { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import app from "@/lib/firebaseConfig";
import { toast } from "react-toastify"; // Import toast

function useEditAdmin() {
  const [loading, setLoading] = useState(false);

  const updateAdmin = async (adminId, updatedData) => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const adminRef = doc(db, "admin", adminId);

      // Membuat objek untuk pembaruan, filter nilai yang tidak terdefinisi
      const updateData = {
        Nama_Depan: updatedData.namaDepan || null,
        Nama_Belakang: updatedData.namaBelakang || null,
        Email: updatedData.email || null,
        Jenis_Kelamin: updatedData.jenisKelamin || null,
        Peran_Admin: updatedData.peranAdmin || null,
        Status: updatedData.status || null,
      };

      // Menghapus semua tombol dengan nilai nol
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === null) {
          delete updateData[key];
        }
      });

      await updateDoc(adminRef, updateData);

      // Tampilkan peringatan keberhasilan setelah pembaruan berhasil
      toast.success("Admin data successfully updated!");

      // Refresh halaman setelah toast success
      window.location.reload();
    } catch (error) {
      console.error("Error updating admin data:", error);
      toast.error("Error updating admin data: " + error.message); // Error alert
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateAdmin, loading };
}

export default useEditAdmin;
