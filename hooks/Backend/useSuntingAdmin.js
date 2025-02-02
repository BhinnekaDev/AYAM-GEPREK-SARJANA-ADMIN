import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const validasiInput = (input) => {
  const polaXSS = /<.*?>/g;
  return !polaXSS.test(input);
};

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

  const periksaSuperAdmin = async () => {
    const referensiAdmin = query(
      collection(database, "admin"),
      where("Peran_Admin", "==", "Super Admin")
    );
    const hasilKueri = await getDocs(referensiAdmin);
    return hasilKueri.empty ? false : true;
  };

  const validasiFormulir = () => {
    const fields = [
      { value: namaDepan, label: "Nama Depan" },
      { value: namaBelakang, label: "Nama Belakang" },
      { value: namaPengguna, label: "Nama Pengguna" },
      { value: email, label: "Email" },
      { value: jenisKelamin, label: "Jenis Kelamin" },
      { value: peranAdmin, label: "Peran Admin" },
    ];

    for (const field of fields) {
      if (!validasiInput(field.value)) {
        toast.error(
          `${field.label} tidak boleh mengandung karakter berbahaya!`
        );
        return false;
      }
      if (!field.value) {
        toast.error(`Masukkan ${field.label.toLowerCase()}`);
        return false;
      }
    }

    return true;
  };

  const suntingAdmin = async () => {
    setSedangMemuatSuntingAdmin(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingAdmin(false);
      return;
    }

    try {
      if (peranAdmin === "Super Admin" && (await periksaSuperAdmin())) {
        toast.error(
          "Tidak dapat mengubah admin ini menjadi Super Admin karena Super Admin sudah ada!"
        );
        setSedangMemuatSuntingAdmin(false);
        return;
      }

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
