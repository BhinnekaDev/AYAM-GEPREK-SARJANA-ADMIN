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

  const tambahMinuman = async () => {
    if (
      !namaMinuman ||
      !kategoriMinuman ||
      !hargaMinuman ||
      !deskripsiMinuman
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    setSedangMemuatTambahMinuman(true);

    try {
      let gambarUrl = "";
      if (gambarMinuman) {
        const gambarRef = ref(storage, `Minuman/${gambarMinuman.name}`);
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
