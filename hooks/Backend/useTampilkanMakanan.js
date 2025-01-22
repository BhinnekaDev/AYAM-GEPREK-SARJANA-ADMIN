import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanMakanan = (
  batasHalaman = 5,
  kategoriDipilih = "Semua Kategori"
) => {
  const [sedangMemuatMakanan, setSedangMemuatMakanan] = useState(false);
  const [daftarMakanan, setDaftarMakanan] = useState([]);
  const [totalMakanan, setTotalMakanan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarMakanan = useCallback(async () => {
    const referensiMakanan = collection(database, "makanan");
    try {
      setSedangMemuatMakanan(true);
      const snapshot = await getDocs(referensiMakanan);
      const makanans = [];

      const totalDocs = snapshot.docs.length;
      setTotalMakanan(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const makananData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };

        makanans.push(makananData);
      }

      const menuDifilter =
        kategoriDipilih === "Semua Kategori"
          ? makanans
          : makanans.filter(
              (item) => item.Kategori_Makanan === kategoriDipilih
            );

      setDaftarMakanan(menuDifilter);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data makanan: " + error.message
      );
    } finally {
      setSedangMemuatMakanan(false);
    }
  }, [halaman, batasHalaman, kategoriDipilih]);

  useEffect(() => {
    ambilDaftarMakanan();
  }, [ambilDaftarMakanan]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalMakanan / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalMakanan,
    daftarMakanan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatMakanan,
  };
};

export default useTampilkanMakanan;
