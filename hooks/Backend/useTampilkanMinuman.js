import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanMinuman = (
  batasHalaman = 5,
  kategoriDipilih = "Semua Kategori"
) => {
  const [sedangMemuatMinuman, setSedangMemuatMinuman] = useState(false);
  const [daftarMinuman, setDaftarMinuman] = useState([]);
  const [totalMinuman, setTotalMinuman] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarMinuman = useCallback(async () => {
    const referensiMinuman = collection(database, "minuman");
    try {
      setSedangMemuatMinuman(true);
      const snapshot = await getDocs(referensiMinuman);
      const minumans = [];

      const totalDocs = snapshot.docs.length;
      setTotalMinuman(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const minumanData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };

        minumans.push(minumanData);
      }

      const menuDifilter =
        kategoriDipilih === "Semua Kategori"
          ? minumans
          : minumans.filter(
              (item) => item.Kategori_Minuman === kategoriDipilih
            );

      setDaftarMinuman(menuDifilter);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data minuman: " + error.message
      );
    } finally {
      setSedangMemuatMinuman(false);
    }
  }, [halaman, batasHalaman, kategoriDipilih]);

  useEffect(() => {
    ambilDaftarMinuman();
  }, [ambilDaftarMinuman]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalMinuman / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalMinuman,
    daftarMinuman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatMinuman,
  };
};

export default useTampilkanMinuman;
