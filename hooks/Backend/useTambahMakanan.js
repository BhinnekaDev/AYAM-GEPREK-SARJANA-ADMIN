import { useState } from "react";
import { storage, database } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const useTambahMakanan = () => {
  const [namaMakanan, setNamaMakanan] = useState("");
  const [kategoriMakanan, setKategoriMakanan] = useState("");
  const [hargaMakanan, setHargaMakanan] = useState("");
  const [deskripsiMakanan, setDeskripsiMakanan] = useState("");
  const [gambarMakanan, setGambarMakanan] = useState(null);
  const [sedangMemuatTambahMakanan, setSedangMemuatTambahMakanan] =
    useState(false);

  const tambahMakanan = async () => {
    if (
      !namaMakanan ||
      !kategoriMakanan ||
      !hargaMakanan ||
      !deskripsiMakanan
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    setSedangMemuatTambahMakanan(true);

    try {
      let gambarUrl = "";
      if (gambarMakanan) {
        const gambarRef = ref(storage, `Makanan/${gambarMakanan.name}`);
        await uploadBytes(gambarRef, gambarMakanan);
        gambarUrl = await getDownloadURL(gambarRef);
      }

      const makananCollection = collection(database, "makanan");
      await addDoc(makananCollection, {
        Nama_Makanan: namaMakanan,
        Kategori_Makanan: kategoriMakanan,
        Harga_Makanan: parseFloat(hargaMakanan),
        Deskripsi_Makanan: deskripsiMakanan,
        Gambar_Makanan: gambarUrl,
        dibuatPada: serverTimestamp(),
      });

      toast.success("Makanan berhasil ditambahkan!");

      setNamaMakanan("");
      setKategoriMakanan("");
      setHargaMakanan("");
      setDeskripsiMakanan("");
      setGambarMakanan(null);
    } catch (error) {
      console.error("Gagal menambahkan makanan:", error);
      toast.error("Terjadi kesalahan saat menambahkan makanan.");
    } finally {
      setSedangMemuatTambahMakanan(false);
    }
  };

  return {
    namaMakanan,
    setNamaMakanan,
    kategoriMakanan,
    setKategoriMakanan,
    hargaMakanan,
    setHargaMakanan,
    deskripsiMakanan,
    setDeskripsiMakanan,
    gambarMakanan,
    setGambarMakanan,
    sedangMemuatTambahMakanan,
    tambahMakanan,
  };
};

export default useTambahMakanan;
