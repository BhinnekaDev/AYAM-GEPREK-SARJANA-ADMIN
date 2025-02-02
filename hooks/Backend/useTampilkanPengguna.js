import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanPengguna = (batasHalaman = 5) => {
  const [sedangMemuatPengguna, setSedangMemuatPengguna] = useState(false);
  const [daftarPengguna, setDaftarPengguna] = useState([]);
  const [totalPengguna, setTotalPengguna] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPengguna = useCallback(async () => {
    const referensiPengguna = collection(database, "pengguna");
    try {
      setSedangMemuatPengguna(true);
      const snapshot = await getDocs(referensiPengguna);
      const penggunas = [];

      const totalDocs = snapshot.docs.length;
      setTotalPengguna(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const penggunaData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };

        penggunas.push(penggunaData);
      }

      setDaftarPengguna(penggunas);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data pengguna: " + error.message
      );
    } finally {
      setSedangMemuatPengguna(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPengguna();
  }, [ambilDaftarPengguna]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPengguna / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalPengguna,
    daftarPengguna,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengguna,
  };
};

export default useTampilkanPengguna;
