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
// PERPUSTAKAAN KAMI
import { database, auth } from "@/lib/firebaseConfig";

const useTambahAdmin = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);

  const validasiInput = (input) => {
    const polaXSS = /<.*?>/g;
    return !polaXSS.test(input);
  };

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    const validasiXSS = (teks, namaField) => {
      const polaXSS = /<.*?>/g;
      if (polaXSS.test(teks)) {
        sesuai = false;
        pesanKesalahan += `${namaField} mengandung karakter berbahaya atau tag HTML. `;
      }
    };

    const validasiHanyaHuruf = (teks, namaField) => {
      const pola = /^[a-zA-Z\s]+$/;
      if (!teks || !pola.test(teks)) {
        sesuai = false;
        pesanKesalahan += `Silakan masukkan ${namaField} yang valid (hanya huruf dan spasi diperbolehkan). `;
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

    const fields = [
      { value: namaDepan, label: "Nama Depan" },
      { value: namaBelakang, label: "Nama Belakang" },
      { value: namaPengguna, label: "Nama Pengguna" },
      { value: email, label: "Email" },
      { value: jenisKelamin, label: "Jenis Kelamin" },
      { value: peranAdmin, label: "Peran Admin" },
    ];

    fields.forEach(({ value, label }) => {
      validasiXSS(value, label);
      if (!validasiInput(value)) {
        sesuai = false;
        pesanKesalahan += `${label} tidak boleh mengandung karakter berbahaya. `;
      }
    });

    validasiHanyaHuruf(namaDepan, "Nama Depan");
    validasiHanyaHuruf(namaBelakang, "Nama Belakang");
    validasiHanyaHuruf(namaPengguna, "Nama Pengguna");

    validasiEmail(email);

    if (!jenisKelamin) {
      sesuai = false;
      pesanKesalahan += "Jenis Kelamin harus dipilih. ";
    }

    if (!peranAdmin) {
      sesuai = false;
      pesanKesalahan += "Peran Admin harus dipilih. ";
    }

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const periksaSuperAdmin = async () => {
    const referensiAdmin = collection(database, "admin");
    const kueri = query(
      referensiAdmin,
      where("Peran_Admin", "==", "Super Admin")
    );
    const hasilKueri = await getDocs(kueri);
    return hasilKueri.empty ? false : true;
  };

  const tambahAdmin = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahAdmin(true);

    try {
      if (peranAdmin === "Super Admin" && (await periksaSuperAdmin())) {
        toast.error(
          "Tidak dapat menambahkan super admin karena super admin sudah ada!"
        );
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

      const referensiAdmin = collection(database, "admin");
      const dataAdmin = {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nama_Pengguna: namaPengguna,
        Email: email,
        Jenis_Kelamin: jenisKelamin,
        Peran_Admin: peranAdmin,
        Tanggal_Pembuatan_Akun: serverTimestamp(),
      };

      await setDoc(doc(referensiAdmin, userBaru.uid), dataAdmin);
      toast.success("Admin berhasil ditambahkan!");

      aturUlangFormulir();
      window.location.reload();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan admin: " + error.message);
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
