import { useState } from "react";
import { storage, database } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const useTambahMinuman = () => {
  const [namaMinuman, setNamaMinuman] = useState("");
  const [kategoriMinuman, setKategoriMinuman] = useState("");
  const [hargaMinuman, setHargaMinuman] = useState("");
  const [deskripsiMinuman, setDeskripsiMinuman] = useState("");
  const [gambarMinuman, setGambarMinuman] = useState(null);
  const [sedangMemuatTambahMinuman, setSedangMemuatTambahMinuman] =
    useState(false);

  const validasiGambar = (file) => {
    if (!file) return true;
    const formatDiperbolehkan = ["image/png", "image/jpeg", "image/jpg"];
    const ukuranMaks = 2 * 1024 * 1024;
    return formatDiperbolehkan.includes(file.type) && file.size <= ukuranMaks;
  };

  const validasiFormulir = () => {
    const regexNamaDeskripsi = /^[a-zA-Z\s]+$/;
    const regexHarga = /^[0-9]+(\.[0-9]{1,2})?$/;

    return !namaMinuman || !regexNamaDeskripsi.test(namaMinuman)
      ? (toast.error("Nama minuman hanya boleh mengandung huruf dan spasi!"),
        false)
      : !kategoriMinuman
      ? (toast.error("Pilih kategori minuman!"), false)
      : !hargaMinuman || !regexHarga.test(hargaMinuman)
      ? (toast.error("Harga minuman harus berupa angka positif!"), false)
      : !deskripsiMinuman || !regexNamaDeskripsi.test(deskripsiMinuman)
      ? (toast.error(
          "Deskripsi minuman hanya boleh mengandung huruf dan spasi!"
        ),
        false)
      : gambarMinuman && !validasiGambar(gambarMinuman)
      ? (toast.error("Format gambar tidak valid atau ukuran melebihi 2MB!"),
        false)
      : true;
  };

  const tambahMinuman = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahMinuman(true);

    try {
      let gambarUrl = "";
      if (gambarMinuman) {
        const sanitizedNama = namaMinuman.replace(/[^a-zA-Z0-9]/g, "_");
        const gambarRef = ref(storage, `Minuman/${sanitizedNama}.jpg`);
        await uploadBytes(gambarRef, gambarMinuman);
        gambarUrl = await getDownloadURL(gambarRef);
      }

      const minumanCollection = collection(database, "minuman");
      await addDoc(minumanCollection, {
        Nama_Minuman: namaMinuman,
        Kategori_Minuman: kategoriMinuman,
        Harga_Minuman: parseFloat(hargaMinuman),
        Deskripsi_Minuman: deskripsiMinuman,
        Gambar_Minuman: gambarUrl,
        dibuatPada: serverTimestamp(),
      });

      toast.success("Minuman berhasil ditambahkan!");

      setNamaMinuman("");
      setKategoriMinuman("");
      setHargaMinuman("");
      setDeskripsiMinuman("");
      setGambarMinuman(null);
    } catch (error) {
      console.error("Gagal menambahkan minuman:", error);
      toast.error("Terjadi kesalahan saat menambahkan minuman.");
    } finally {
      setSedangMemuatTambahMinuman(false);
    }
  };

  return {
    namaMinuman,
    setNamaMinuman,
    kategoriMinuman,
    setKategoriMinuman,
    hargaMinuman,
    setHargaMinuman,
    deskripsiMinuman,
    setDeskripsiMinuman,
    gambarMinuman,
    setGambarMinuman,
    sedangMemuatTambahMinuman,
    tambahMinuman,
  };
};

export default useTambahMinuman;
