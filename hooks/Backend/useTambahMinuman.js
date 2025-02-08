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

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z\s]/g, "").trim();
  const validateHarga = (harga) => /^[0-9]*\.?[0-9]+$/.test(harga);

  const resetForm = () => {
    setNamaMinuman("");
    setKategoriMinuman("");
    setHargaMinuman("");
    setDeskripsiMinuman("");
    setGambarMinuman(null);
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

    const sanitizedNamaMinuman = sanitizeInput(namaMinuman);
    const sanitizedDeskripsiMinuman = sanitizeInput(deskripsiMinuman);

    if (!sanitizedNamaMinuman || !sanitizedDeskripsiMinuman) {
      toast.error("Nama dan deskripsi minuman hanya boleh mengandung huruf!");
      return;
    }

    if (!validateHarga(hargaMinuman)) {
      toast.error(
        "Harga minuman hanya boleh berupa angka tanpa tanda + atau -!"
      );
      return;
    }

    setSedangMemuatTambahMinuman(true);

    try {
      const gambarUrl = gambarMinuman
        ? await resizeImage(gambarMinuman).then((resizedImage) => {
            const sanitizedFileName = `${sanitizedNamaMinuman.replace(
              /\s+/g,
              "_"
            )}.jpg`;
            const gambarRef = ref(storage, `Minuman/${sanitizedFileName}`);
            return uploadBytes(gambarRef, resizedImage).then(() =>
              getDownloadURL(gambarRef)
            );
          })
        : "";

      const minumanCollection = collection(database, "minuman");
      await addDoc(minumanCollection, {
        Nama_Minuman: sanitizedNamaMinuman,
        Kategori_Minuman: kategoriMinuman,
        Harga_Minuman: parseFloat(hargaMinuman),
        Deskripsi_Minuman: sanitizedDeskripsiMinuman,
        Gambar_Minuman: gambarUrl,
        Tanggal_Pembuatan: serverTimestamp(),
      });

      toast.success("Minuman berhasil ditambahkan!");
      resetForm();
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
