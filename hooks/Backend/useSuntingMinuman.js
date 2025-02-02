import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingMinuman(idMinuman) {
  const [namaMinuman, setNamaMinuman] = useState("");
  const [kategoriMinuman, setKategoriMinuman] = useState("");
  const [hargaMinuman, setHargaMinuman] = useState("");
  const [deskripsiMinuman, setDeskripsiMinuman] = useState("");
  const [gambarMinuman, setGambarMinuman] = useState(null);
  const [sedangMemuatSuntingMinuman, setSedangMemuatSuntingMinuman] =
    useState(false);
  const [gambarLama, setGambarLama] = useState("");

  const validasiGambar = (file) => {
    if (!file) return true;
    const formatDiperbolehkan = ["image/png", "image/jpeg", "image/jpg"];
    const ukuranMaks = 2 * 1024 * 1024; // 2MB
    return formatDiperbolehkan.includes(file.type) && file.size <= ukuranMaks;
  };

  const ambilDataMinuman = async () => {
    if (!idMinuman) {
      toast.error("ID minuman tidak valid!");
      return;
    }

    try {
      const minumanRef = doc(database, "minuman", idMinuman);
      const docSnap = await getDoc(minumanRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaMinuman(data.Nama_Minuman);
        setKategoriMinuman(data.Kategori_Minuman);
        setHargaMinuman(data.Harga_Minuman);
        setDeskripsiMinuman(data.Deskripsi_Minuman);
        setGambarMinuman(data.Gambar_Minuman);
        setGambarLama(data.Gambar_Minuman);
      } else {
        toast.error("Data minuman tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Terjadi kesalahan saat mengambil data minuman");
    }
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
      : gambarMinuman instanceof File && !validasiGambar(gambarMinuman)
      ? (toast.error("Format gambar tidak valid atau ukuran melebihi 2MB!"),
        false)
      : true;
  };

  const suntingMinuman = async () => {
    setSedangMemuatSuntingMinuman(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingMinuman(false);
      return;
    }

    try {
      let gambarUrl = gambarMinuman;

      if (gambarMinuman instanceof File) {
        if (gambarLama) {
          const storage = getStorage();
          const gambarLamaRef = ref(storage, gambarLama);
          await deleteObject(gambarLamaRef);
        }

        const storage = getStorage();
        const sanitizedNama = namaMinuman.replace(/[^a-zA-Z0-9]/g, "_");
        const gambarRef = ref(storage, `Minuman/${sanitizedNama}.jpg`);

        await uploadBytes(gambarRef, gambarMinuman);
        gambarUrl = await getDownloadURL(gambarRef);
      }

      const minumanRef = doc(database, "minuman", idMinuman);
      await updateDoc(minumanRef, {
        Nama_Minuman: namaMinuman,
        Kategori_Minuman: kategoriMinuman,
        Harga_Minuman: parseFloat(hargaMinuman),
        Deskripsi_Minuman: deskripsiMinuman,
        Gambar_Minuman: gambarUrl,
      });

      toast.success("Data minuman diperbarui!");
    } catch (error) {
      toast.error("Gagal menyunting data minuman: " + error.message);
    } finally {
      setSedangMemuatSuntingMinuman(false);
    }
  };

  useEffect(() => {
    if (idMinuman) ambilDataMinuman();
  }, [idMinuman]);

  return {
    namaMinuman,
    kategoriMinuman,
    suntingMinuman,
    hargaMinuman,
    deskripsiMinuman,
    gambarMinuman,
    setNamaMinuman,
    setKategoriMinuman,
    setHargaMinuman,
    setDeskripsiMinuman,
    setGambarMinuman,
    sedangMemuatSuntingMinuman,
  };
}
