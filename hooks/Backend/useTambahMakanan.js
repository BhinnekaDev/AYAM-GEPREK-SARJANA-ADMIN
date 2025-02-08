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

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 200;
          canvas.height = 200;
          ctx.drawImage(img, 0, 0, 200, 200);
          canvas.toBlob(resolve, "image/jpeg");
        };
      };
    });
  };

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

    const sanitizedNamaMakanan = sanitizeInput(namaMakanan);
    const sanitizedDeskripsiMakanan = sanitizeInput(deskripsiMakanan);

    if (!sanitizedNamaMakanan || !sanitizedDeskripsiMakanan) {
      toast.error("Nama dan deskripsi makanan hanya boleh mengandung huruf!");
      return;
    }

    if (!validateHarga(hargaMakanan)) {
      toast.error(
        "Harga makanan hanya boleh berupa angka tanpa tanda + atau -!"
      );
      return;
    }

    setSedangMemuatTambahMakanan(true);

    try {
      const gambarUrl = gambarMakanan
        ? await resizeImage(gambarMakanan).then((resizedImage) => {
            const sanitizedFileName = `${sanitizedNamaMakanan.replace(
              /\s+/g,
              "_"
            )}.jpg`;
            const gambarRef = ref(storage, `Makanan/${sanitizedFileName}`);
            return uploadBytes(gambarRef, resizedImage).then(() =>
              getDownloadURL(gambarRef)
            );
          })
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
