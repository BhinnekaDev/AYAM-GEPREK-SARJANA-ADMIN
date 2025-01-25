import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMakanan from "@/components/modalTambahMenuMakanan";
import ModalKonfirmasiHapusMakanan from "@/components/modalKonfirmasiHapusMakanan";
import ModalEditMakanan from "@/components/modalEditMakanan";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const fotoMakanan = require("@/assets/images/LogoAyam.png");
// KONSTANTA
import { formatRupiah } from "@/constants/formatRupiah";
// PENGAIT
import useTampilkanMakanan from "@/hooks/Backend/useTampilkanMakanan";
import useHapusMakanan from "@/hooks/Backend/useHapusMakanan";

const TABLE_HEAD = ["Gambar", "Nama", "Kategori", "Harga", "Deskripsi", "Aksi"];

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
  const [bukaModalHapusMakanan, setBukaModalHapusMakanan] = useState(false);
  const { hapusMakanan, sedangMemuatHapusMakanan } = useHapusMakanan();

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
              <thead className="text-center">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menuPerHalaman.map((makanan) => (
                  <tr key={makanan.id}>
                    <td className="p-4 flex items-center justify-center">
                      <Image
                        src={makanan.Gambar_Makanan || fotoMakanan}
                        alt={makanan.Nama_Makanan}
                        width={50}
                        height={50}
                        className="rounded-md shadow-md flex items-center justify-center"
                      />
                    </td>
                    <td className="p-4">{makanan.Nama_Makanan}</td>
                    <td className="p-4">{makanan.Kategori_Makanan}</td>
                    <td className="p-4">
                      {formatRupiah(makanan.Harga_Makanan)}
                    </td>
                    <td className="p-4">{makanan.Deskripsi_Makanan}</td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          onClick={() => {
                            setMakananYangTerpilih(makanan.id);
                            setModalEditTerbuka(true);
                          }}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => konfirmasiHapus(makanan.id)}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent"
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

        <div className="flex justify-between items-center mt-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalMakanan / itemsPerPage)}
          </Typography>
          <div className="flex items-center gap-2">
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
    </div>
  );
};

export default Konten;
