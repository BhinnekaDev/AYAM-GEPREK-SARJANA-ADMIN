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

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z\s]/g, "").trim();

  const validateHarga = (harga) => /^[0-9]*\.?[0-9]+$/.test(harga);

  const resetForm = () => {
    setNamaMakanan("");
    setKategoriMakanan("");
    setHargaMakanan("");
    setDeskripsiMakanan("");
    setGambarMakanan(null);
  };

  const tambahMakanan = async () => {
    !namaMakanan || !kategoriMakanan || !hargaMakanan || !deskripsiMakanan
      ? toast.error("Semua field wajib diisi!")
      : null;

    const sanitizedNamaMakanan = sanitizeInput(namaMakanan);
    const sanitizedDeskripsiMakanan = sanitizeInput(deskripsiMakanan);

    !sanitizedNamaMakanan || !sanitizedDeskripsiMakanan
      ? toast.error("Nama dan deskripsi makanan hanya boleh mengandung huruf!")
      : null;

    !validateHarga(hargaMakanan)
      ? toast.error(
          "Harga makanan hanya boleh berupa angka tanpa tanda + atau -!"
        )
      : null;

    if (
      !namaMakanan ||
      !kategoriMakanan ||
      !hargaMakanan ||
      !deskripsiMakanan ||
      !sanitizedNamaMakanan ||
      !sanitizedDeskripsiMakanan ||
      !validateHarga(hargaMakanan)
    ) {
      return;
    }

    setSedangMemuatTambahMakanan(true);

    try {
      const gambarUrl = gambarMakanan
        ? await (() => {
            const sanitizedFileName = `${sanitizedNamaMakanan.replace(
              /\s+/g,
              "_"
            )}.jpg`;
            const gambarRef = ref(storage, `Makanan/${sanitizedFileName}`);
            return uploadBytes(gambarRef, gambarMakanan).then(() =>
              getDownloadURL(gambarRef)
            );
          })()
        : "";

      const makananCollection = collection(database, "makanan");
      await addDoc(makananCollection, {
        Nama_Makanan: sanitizedNamaMakanan,
        Kategori_Makanan: kategoriMakanan,
        Harga_Makanan: parseFloat(hargaMakanan),
        Deskripsi_Makanan: sanitizedDeskripsiMakanan,
        Gambar_Makanan: gambarUrl,
        Tanggal_Pembuatan: serverTimestamp(),
      });

      toast.success("Makanan berhasil ditambahkan!");
      resetForm();
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
