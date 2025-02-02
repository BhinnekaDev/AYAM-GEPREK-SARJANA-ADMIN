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

export default function useSuntingMakanan(idMakanan) {
  const [namaMakanan, setNamaMakanan] = useState("");
  const [kategoriMakanan, setKategoriMakanan] = useState("");
  const [hargaMakanan, setHargaMakanan] = useState("");
  const [deskripsiMakanan, setDeskripsiMakanan] = useState("");
  const [gambarMakanan, setGambarMakanan] = useState(null);
  const [sedangMemuatSuntingMakanan, setSedangMemuatSuntingMakanan] =
    useState(false);
  const [gambarLama, setGambarLama] = useState("");

  const ambilDataMakanan = async () => {
    if (!idMakanan) {
      toast.error("ID makanan tidak valid!");
      return;
    }

    try {
      const makananRef = doc(database, "makanan", idMakanan);
      const docSnap = await getDoc(makananRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaMakanan(data.Nama_Makanan);
        setKategoriMakanan(data.Kategori_Makanan);
        setHargaMakanan(data.Harga_Makanan);
        setDeskripsiMakanan(data.Deskripsi_Makanan);
        setGambarMakanan(data.Gambar_Makanan);
        setGambarLama(data.Gambar_Makanan);
      } else {
        toast.error("Data makanan tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Terjadi kesalahan saat mengambil data makanan");
    }
  };

  const validasiGambar = (file) => {
    if (!file) return true;
    const formatDiperbolehkan = ["image/png", "image/jpeg", "image/jpg"];
    const ukuranMaks = 2 * 1024 * 1024;
    return formatDiperbolehkan.includes(file.type) && file.size <= ukuranMaks;
  };

  const validasiFormulir = () => {
    const regexNamaDeskripsi = /^[a-zA-Z\s]+$/;
    const regexHarga = /^[0-9]+(\.[0-9]{1,2})?$/;

    return !namaMakanan || !regexNamaDeskripsi.test(namaMakanan)
      ? (toast.error("Nama makanan hanya boleh mengandung huruf dan spasi!"),
        false)
      : !kategoriMakanan
      ? (toast.error("Pilih kategori makanan!"), false)
      : !hargaMakanan || !regexHarga.test(hargaMakanan)
      ? (toast.error("Harga makanan harus berupa angka positif!"), false)
      : !deskripsiMakanan || !regexNamaDeskripsi.test(deskripsiMakanan)
      ? (toast.error(
          "Deskripsi makanan hanya boleh mengandung huruf dan spasi!"
        ),
        false)
      : gambarMakanan instanceof File && !validasiGambar(gambarMakanan)
      ? (toast.error("Format gambar tidak valid atau ukuran melebihi 2MB!"),
        false)
      : true;
  };

  const suntingMakanan = async () => {
    setSedangMemuatSuntingMakanan(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingMakanan(false);
      return;
    }

    try {
      let gambarUrl = gambarMakanan;

      if (gambarMakanan instanceof File) {
        if (gambarLama) {
          const storage = getStorage();
          const gambarLamaRef = ref(storage, gambarLama);
          await deleteObject(gambarLamaRef);
        }

        const storage = getStorage();
        const sanitizedNama = namaMakanan.replace(/[^a-zA-Z0-9]/g, "_");
        const gambarRef = ref(storage, `Makanan/${sanitizedNama}.jpg`);

        await uploadBytes(gambarRef, gambarMakanan);
        gambarUrl = await getDownloadURL(gambarRef);
      }

      const makananRef = doc(database, "makanan", idMakanan);
      await updateDoc(makananRef, {
        Nama_Makanan: namaMakanan,
        Kategori_Makanan: kategoriMakanan,
        Harga_Makanan: parseFloat(hargaMakanan),
        Deskripsi_Makanan: deskripsiMakanan,
        Gambar_Makanan: gambarUrl,
      });

      toast.success("Data makanan diperbarui!");
    } catch (error) {
      toast.error("Gagal menyunting data makanan: " + error.message);
    } finally {
      setSedangMemuatSuntingMakanan(false);
    }
  };

  useEffect(() => {
    if (idMakanan) ambilDataMakanan();
  }, [idMakanan]);

  return {
    namaMakanan,
    kategoriMakanan,
    suntingMakanan,
    hargaMakanan,
    deskripsiMakanan,
    gambarMakanan,
    setNamaMakanan,
    setKategoriMakanan,
    setHargaMakanan,
    setDeskripsiMakanan,
    setGambarMakanan,
    sedangMemuatSuntingMakanan,
  };
}
