import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
//MODAL
import ModalTambahMenuMakanan from "@/components/modalTambahMenuMakanan";
import ModalKonfirmasiHapusMakanan from "@/components/modalKonfirmasiHapusMakanan";
import ModalEditMakanan from "@/components/modalEditMakanan";
import ModalDetailMakanan from "@/components/modalDetailMakanan";

// KONSTANTA
import { formatRupiah } from "@/constants/formatRupiah";
// PENGAIT
import useTampilkanMakanan from "@/hooks/Backend/useTampilkanMakanan";
import useHapusMakanan from "@/hooks/Backend/useHapusMakanan";
const fotoMakanan = require("@/assets/images/LogoAyam.png");
const Konten = () => {
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua Kategori");
  const [menuBaru, setMenuBaru] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [modalEditTerbuka, setModalEditTerbuka] = useState(false);
  const [makananYangTerpilih, setMakananYangTerpilih] = useState(null);
  const [makananDipilih, setMakananDipilih] = useState(null);
  const [bukaModalHapusMakanan, setBukaModalHapusMakanan] = useState(false);
  const { hapusMakanan, sedangMemuatHapusMakanan } = useHapusMakanan();
  const [modalDetailTerbuka, setModalDetailTerbuka] = useState(false);

  const {
    halaman,
    totalMakanan,
    daftarMakanan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatMakanan,
  } = useTampilkanMakanan(5, kategoriDipilih);

  const konfirmasiHapus = (idMakanan) => {
    setMakananYangTerpilih(idMakanan);
    setBukaModalHapusMakanan(true);
  };
  const tampilkanDetailMakanan = (idMakanan) => {
    setMakananDipilih(idMakanan);
    setModalDetailTerbuka(true);
  };

  const tampilkanMakananDetial = (idMakanan) => {
    setMakananYangTerpilih(idMakanan);
    setModalDetailTerbuka(true);
  };

  const hapus = async () => {
    if (makananYangTerpilih) {
      await hapusMakanan(makananYangTerpilih);
      setBukaModalHapusMakanan(false);
      setMakananYangTerpilih(null);
    }
  };

  const itemsPerPage = 5;
  const menuPerHalaman = daftarMakanan.slice(
    (halaman - 1) * itemsPerPage,
    halaman * itemsPerPage
  );

  const bukaModal = () => setModalTerbuka(true);
  const tutupModal = () => setModalTerbuka(false);

  const ubahInputMenu = (e) => {
    const { name, value } = e.target;
    setMenuBaru((prev) => ({ ...prev, [name]: value }));
  };

  const tambahMenu = () => {};

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" className="text-black font-extrabold">
            Menu Makanan
          </Typography>
          <Button
            onClick={bukaModal}
            className="bg-blue-500 hover:bg-blue-700 shadow-lg text-white"
          >
            Tambah Menu
          </Button>
        </div>

        <p className="text-sm text-black mb-4">
          Pilih makanan favorit Anda dari daftar di bawah ini.
        </p>
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-blue-gray-900 text-sm "
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="Makanan Berat">Makanan Berat</option>
          <option value="Makanan Ringan">Makanan Ringan</option>
          <option value="Paket A">Paket A</option>
          <option value="Paket B">Paket B</option>
          <option value="Paket C">Paket C</option>
        </select>
      </Card>
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-black font-bold mb-6">
          Data Makanan
        </Typography>
        <div>
          {sedangMemuatMakanan ? (
            <p>Memuat data makanan...</p>
          ) : (
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100  py-3 px-4"></th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100  py-3 px-4 w-1">
                    Gambar
                  </th>

                  <th className="border-y border-blue-gray-100 text-center py-3 px-4">
                    Nama Makanan
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100  py-3 px-4">
                    Kategori
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100  py-3 px-4">
                    Harga
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100  py-3 px-4">
                    Deskripsi
                  </th>
                  <th className="border-y border-blue-gray-100  py-3 px-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuPerHalaman.map((makanan) => (
                  <tr key={makanan.id}>
                    <td>
                      <CiCircleInfo
                        className="h-7 w-7 m-auto text-blue-500 cursor-pointer hover:text-black duration-300"
                        onClick={() => tampilkanMakananDetial(makanan)}
                      />
                    </td>
                    <td className="hidden sm:table-cell p-4">
                      <Image
                        src={makanan.Gambar_Makanan || fotoMakanan}
                        alt={makanan.Nama_Makanan}
                        width={50}
                        height={50}
                        className="rounded-md shadow-md mx-auto"
                      />
                    </td>

                    <td className="p-4 max-w-[150px] truncate">
                      {makanan.Nama_Makanan}
                    </td>
                    <td className="p-4 hidden sm:table-cell max-w-[50px] truncate ">
                      {makanan.Kategori_Makanan}
                    </td>
                    <td className="p-4 hidden sm:table-cell ">
                      {formatRupiah(makanan.Harga_Makanan)}
                    </td>
                    <td className="p-4 hidden sm:table-cell ">
                      {makanan.Deskripsi_Makanan}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <Button
                          onClick={() => {
                            setMakananYangTerpilih(makanan.id);
                            setModalEditTerbuka(true);
                          }}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent flex items-center justify-center"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => konfirmasiHapus(makanan.id)}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent flex items-center justify-center"
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-center">
          <div className="order-2 sm:order-1 mt-2 sm:mt-0">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Halaman {halaman} dari {Math.ceil(totalMakanan / itemsPerPage)}
            </Typography>
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              onClick={ambilHalamanSebelumnya}
              variant="outlined"
              size="sm"
              disabled={halaman === 1}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={ambilHalamanSelanjutnya}
              variant="outlined"
              size="sm"
              disabled={halaman === Math.ceil(totalMakanan / itemsPerPage)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </Card>
      <ModalTambahMenuMakanan
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
        tambahMenu={tambahMenu}
      />
      <ModalEditMakanan
        terbuka={modalEditTerbuka}
        tertutup={setModalEditTerbuka}
        makananYangTerpilih={makananYangTerpilih}
      />
      <ModalKonfirmasiHapusMakanan
        terbuka={bukaModalHapusMakanan}
        tertutup={setBukaModalHapusMakanan}
        makananYangTerpilih={makananYangTerpilih}
        konfirmasiHapusMakanan={hapus}
        sedangMemuatHapus={sedangMemuatHapusMakanan}
      />
      <ModalDetailMakanan
        terbuka={modalDetailTerbuka}
        tertutup={setModalDetailTerbuka}
        makanan={makananYangTerpilih}
      />
    </div>
  );
};

export default Konten;
