import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
} from "@material-tailwind/react";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
// import { format } from "date-fns";

// Components
import ModalLihatTransaksi from "@/components/modalLihatTransaksi";
import ModalKonfirmasiHapusTransaksi from "@/components/modalKonfirmasiHapusTransaksi";

// Hooks
// import useHapusTransaksi from "@/hooks/Backend/useHapusTransaksi";

const profilAdmin = require("@/assets/images/profil.jpg");

function Konten() {
  const [transaksiYangTerpilih, setTransaksiYangTerpilih] = useState(null);
  const [bukaModalLihatTransaksi, setBukaModalLihatTransaksi] = useState(false);
  const [bukaModalHapusTransaksi, setBukaModalHapusTransaksi] = useState(false);
  //   const { sedangMemuatHapusTransaksi, hapusTransaksi } = useHapusTransaksi();

  const tanganiLihat = () => {
    setBukaModalLihatTransaksi(true);
  };

  const konfirmasiHapus = () => {
    setBukaModalHapusTransaksi(true);
  };

  const hapus = async () => {
    if (transaksiYangTerpilih) {
      await hapusAdmin(transaksiYangTerpilih);
      setBukaModalHapusTransaksi(false);
      setTransaksiYangTerpilih(null);
    }
  };

  return (
    <div className=" bg-gray-100">
      <Card className=" bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography variant="h5">Total Transaksi</Typography>
            <Typography className="text-xl">1</Typography>
          </div>
          <div className="flex items-center"></div>
        </div>
      </Card>
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col sm:flex-row items-center text-center sm:justify-between mx-2 gap-4 sm:gap-4">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-base sm:text-lg"
            >
              Tabel Data Transaksi
            </Typography>

            <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-4">
              <Menu>
                <MenuHandler>
                  <Button className="flex px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm items-center gap-2 tracking-wider bg-transparent text-black border border-gray-500 shadow-md hover:shadow-md">
                    Bulanan
                    <LuListFilter
                      className="text-lg sm:text-xl bg-transparent"
                      color="black"
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-32 overflow-y-auto scrollbar-hidden p-1">
                  <MenuItem>Januari</MenuItem>
                  <MenuItem>Februari</MenuItem>
                  <MenuItem>Maret</MenuItem>
                  <MenuItem>April</MenuItem>
                  <MenuItem>Mei</MenuItem>
                  <MenuItem>Juni</MenuItem>
                  <MenuItem>Juli</MenuItem>
                  <MenuItem>Agustus</MenuItem>
                  <MenuItem>September</MenuItem>
                  <MenuItem>Oktober</MenuItem>
                  <MenuItem>November</MenuItem>
                  <MenuItem>Desember</MenuItem>
                </MenuList>
              </Menu>

              {/* Dropdown Tahunan */}
              <Menu>
                <MenuHandler>
                  <Button className="flex px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm items-center gap-2 tracking-wider bg-transparent text-black border border-gray-500 shadow-md hover:shadow-md">
                    Tahunan
                    <LuListFilter
                      className="text-lg sm:text-xl bg-transparent"
                      color="black"
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-32 overflow-y-auto scrollbar-hidden p-1">
                  <MenuItem>2024</MenuItem>
                  <MenuItem>2023</MenuItem>
                  <MenuItem>2022</MenuItem>
                  <MenuItem>2021</MenuItem>
                </MenuList>
              </Menu>

              <Button className="flex p-2 sm:px-4 sm:py-2 items-center bg-transparent text-black border border-gray-500 shadow-md hover:shadow-md">
                <span className="hidden sm:inline">Unduh Dokumen</span>
                <IoDocumentTextOutline
                  className="text-xl sm:text-xl bg-transparent"
                  color="black"
                />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 py-3 px-4">
                  Nama Pembeli
                </th>
                <th className="hidden sm:table-cell border-y border-blue-gray-100 py-2 px-4 text-center">
                  Produk Pemesanan
                </th>
                <th className="hidden sm:table-cell border-y border-blue-gray-100 py-2 px-4 text-center">
                  Tanggal Pembuatan Akun
                </th>
                <th className="border-y border-blue-gray-100 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-gray-50">
                <td className="p-5 flex items-center gap-3">
                  <Image
                    src={profilAdmin}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Nama Pembeli
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      Email Pembeli
                    </Typography>
                  </div>
                </td>

                <td className="hidden sm:table-cell text-center">
                  Ayam Goyeng
                </td>

                <td className="hidden sm:table-cell text-center">18 18 18</td>

                <td className="p-4">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Button
                      color="green"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700 bg-transparent"
                      onClick={() => tanganiLihat()}
                    >
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button
                      color="green"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700 bg-transparent"
                      onClick={() => konfirmasiHapus()}
                    >
                      <FaRegTrashAlt className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal text-xs sm:text-sm"
          >
            Halaman 1 dari 5
          </Typography>
          <div className="flex items-center gap-2">
            <Button variant="outlined" size="sm" className="text-xs sm:text-sm">
              Sebelumnya
            </Button>
            <Button variant="outlined" size="sm" className="text-xs sm:text-sm">
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ModalLihatTransaksi
        terbuka={bukaModalLihatTransaksi} // luruskan
        tertutup={setBukaModalLihatTransaksi}
        transaksiYangTerpilih={transaksiYangTerpilih}
      />

      <ModalKonfirmasiHapusTransaksi
        terbuka={bukaModalHapusTransaksi} //
        tertutup={setBukaModalHapusTransaksi}
        transaksiYangTerpilih={transaksiYangTerpilih}
        konfirmasiHapusTransaksi={hapus}
        // sedangMemuatHapusTransaksi={sedangMemuatHapusTransaksi}
      />
    </div>
  );
}

export default Konten;
