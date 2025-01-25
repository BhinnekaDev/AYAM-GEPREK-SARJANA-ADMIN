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

  const validasiFormulir = () =>
    !namaMinuman
      ? (toast.error("Masukkan nama minuman"), false)
      : !kategoriMinuman
      ? (toast.error("Pilih kategori minuman"), false)
      : !hargaMinuman
      ? (toast.error("Masukkan harga minuman"), false)
      : !deskripsiMinuman
      ? (toast.error("Masukkan deskripsi minuman"), false)
      : true;

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
        const gambarRef = ref(storage, `Minuman/${gambarMinuman.name}`);
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
    if (idMinuman) {
      ambilDataMinuman();
    }
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
