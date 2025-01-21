import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingAdmin(idAdmin) {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");
  const [sedangMemuatSuntingAdmin, setSedangMemuatSuntingAdmin] =
    useState(false);

  const ambilDataAdmin = async () => {
    try {
      const adminRef = doc(database, "admin", idAdmin);
      const docSnap = await getDoc(adminRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaDepan(data.Nama_Depan || "");
        setNamaBelakang(data.Nama_Belakang || "");
        setNamaPengguna(data.Nama_Pengguna || "");
        setEmail(data.Email || "");
        setJenisKelamin(data.Jenis_Kelamin || "");
        setPeranAdmin(data.Peran_Admin || "");
      } else {
        toast.error("Data admin tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal mengambil data admin: " + error.message);
    }
  };

  const validasiFormulir = () =>
    !namaDepan
      ? (toast.error("Masukkan nama depan"), false)
      : !namaBelakang
      ? (toast.error("Masukkan nama belakang"), false)
      : !namaPengguna
      ? (toast.error("Masukkan nama pengguna"), false)
      : !email
      ? (toast.error("Masukkan email"), false)
      : !jenisKelamin
      ? (toast.error("Pilih jenis kelamin"), false)
      : !peranAdmin
      ? (toast.error("Pilih peran admin"), false)
      : true;

  const suntingAdmin = async () => {
    setSedangMemuatSuntingAdmin(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingAdmin(false);
      return;
    }

    try {
      const adminRef = doc(database, "admin", idAdmin);
      await updateDoc(adminRef, {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nama_Pengguna: namaPengguna,
        Email: email,
        Jenis_Kelamin: jenisKelamin,
        Peran_Admin: peranAdmin,
      });

      toast.success("Data admin berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting data admin: " + error.message);
      console.error("Error menyunting data admin:", error);
    } finally {
      setSedangMemuatSuntingAdmin(false);
    }
  };

  useEffect(() => {
    if (idAdmin) {
      ambilDataAdmin();
    }
  }, [idAdmin]);

  return {
    namaDepan,
    namaBelakang,
    namaPengguna,
    email,
    jenisKelamin,
    peranAdmin,
    setNamaDepan,
    setNamaBelakang,
    setNamaPengguna,
    setEmail,
    setJenisKelamin,
    setPeranAdmin,
    sedangMemuatSuntingAdmin,
    suntingAdmin,
  };
}
