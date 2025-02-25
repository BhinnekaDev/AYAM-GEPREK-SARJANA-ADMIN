import { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { toast } from "react-toastify";
import { database, auth } from "@/lib/firebaseConfig";

const useTambahAdmin = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    const validasiHanyaHuruf = (teks, namaField) => {
      const pola = /^[a-zA-Z\s]+$/;
      if (!teks || !pola.test(teks)) {
        sesuai = false;
        pesanKesalahan += `Silakan masukkan ${namaField} yang valid. `;
      }
    };

    const validasiEmail = (email) => {
      const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        sesuai = false;
        pesanKesalahan += "Email harus diisi. ";
      } else if (!polaEmail.test(email)) {
        sesuai = false;
        pesanKesalahan += "Format email tidak sesuai. ";
      }
    };

    validasiHanyaHuruf(namaDepan, "Nama Depan");
    validasiHanyaHuruf(namaBelakang, "Nama Belakang");
    validasiHanyaHuruf(namaPengguna, "Nama Pengguna");
    validasiEmail(email);

    if (!jenisKelamin) pesanKesalahan += "Jenis Kelamin harus dipilih. ";
    if (!peranAdmin) pesanKesalahan += "Peran Admin harus dipilih. ";

    if (pesanKesalahan) {
      toast.error(pesanKesalahan.trim());
      return false;
    }

    return true;
  };

  const periksaSuperAdmin = async () => {
    const kueri = query(
      collection(database, "admin"),
      where("Peran_Admin", "==", "Super Admin")
    );
    const hasilKueri = await getDocs(kueri);
    return !hasilKueri.empty;
  };

  const periksaEmailTerdaftar = async (emailBaru) => {
    const kueri = query(
      collection(database, "admin"),
      where("Email_Lower", "==", emailBaru.toLowerCase())
    );
    const hasilKueri = await getDocs(kueri);
    return !hasilKueri.empty;
  };

  const periksaNamaTerdaftar = async (namaDepanBaru, namaBelakangBaru) => {
    const kueri = query(
      collection(database, "admin"),
      where("Nama_Depan_Lower", "==", namaDepanBaru.toLowerCase()),
      where("Nama_Belakang_Lower", "==", namaBelakangBaru.toLowerCase())
    );
    const hasilKueri = await getDocs(kueri);
    return !hasilKueri.empty;
  };

  const periksaNamaPenggunaTerdaftar = async (namaPenggunaBaru) => {
    const kueri = query(
      collection(database, "admin"),
      where("Nama_Pengguna_Lower", "==", namaPenggunaBaru.toLowerCase())
    );
    const hasilKueri = await getDocs(kueri);
    return !hasilKueri.empty;
  };

  const tambahAdmin = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahAdmin(true);

    try {
      if (peranAdmin === "Super Admin" && (await periksaSuperAdmin())) {
        toast.error("Tidak dapat menambahkan super admin karena sudah ada!");
        setSedangMemuatTambahAdmin(false);
        return;
      }

      if (await periksaEmailTerdaftar(email)) {
        toast.error("Email ini sudah digunakan oleh admin lain!");
        setSedangMemuatTambahAdmin(false);
        return;
      }

      if (await periksaNamaTerdaftar(namaDepan, namaBelakang)) {
        toast.error("Admin dengan nama yang sama sudah ada!");
        setSedangMemuatTambahAdmin(false);
        return;
      }

      if (await periksaNamaPenggunaTerdaftar(namaPengguna)) {
        toast.error("Nama pengguna ini sudah digunakan oleh admin lain!");
        setSedangMemuatTambahAdmin(false);
        return;
      }

      const kataSandi = "123456";
      const penggunaSekarang = auth.currentUser;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        kataSandi
      );
      const userBaru = userCredential.user;

      if (penggunaSekarang) {
        await updateCurrentUser(auth, penggunaSekarang);
      }

      const dataAdmin = {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nama_Pengguna: namaPengguna,
        Email: email,
        Email_Lower: email.toLowerCase(),
        Nama_Depan_Lower: namaDepan.toLowerCase(),
        Nama_Belakang_Lower: namaBelakang.toLowerCase(),
        Nama_Pengguna_Lower: namaPengguna.toLowerCase(),
        Jenis_Kelamin: jenisKelamin,
        Peran_Admin: peranAdmin,
        Tanggal_Pembuatan_Akun: serverTimestamp(),
      };

      await setDoc(doc(collection(database, "admin"), userBaru.uid), dataAdmin);
      toast.success("Admin berhasil ditambahkan!");

      aturUlangFormulir();
      window.location.reload();
    } catch (error) {
      toast.error("Terjadi kesalahan: " + error.message);
    } finally {
      setSedangMemuatTambahAdmin(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaDepan("");
    setNamaBelakang("");
    setNamaPengguna("");
    setEmail("");
    setJenisKelamin("");
    setPeranAdmin("");
  };

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
    tambahAdmin,
    aturUlangFormulir,
    sedangMemuatTambahAdmin,
  };
};

export default useTambahAdmin;
