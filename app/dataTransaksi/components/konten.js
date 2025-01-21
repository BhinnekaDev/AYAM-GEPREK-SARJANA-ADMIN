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
import {
  IoEyeOutline,
  IoTrashOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
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

  const tanganiSunting = () => {
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
    <div>
      <Card className=" bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography variant="h5">Total Transaksi</Typography>
            <Typography className="text-xl">1</Typography>
          </div>
          <div className="flex items-center">
            <Button
              size="sm"
              onClick={() => setBukaModalTambahAdmin(true)}
              className="items-center gap-2 focus:ring-0 bg-blue-500 w-40 h-8 justify-center"
            >
              <p className="text-white mx-auto">Tambah Admin</p>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center text-center justify-between mx-2">
            <Typography variant="h5" color="blue-gray">
              Tabel Data Transaksi
            </Typography>
            <div className="">
              <Menu>
                <MenuHandler>
                  <Button className="flex items-center gap-4 tracking-wider bg-transparent text-black border border-gray-500 shadow-md hover:shadow-md">
                    Filter
                    <LuListFilter
                      className="text-xl bg-transparent"
                      color="black"
                    />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>1 Bulan</MenuItem>
                  <MenuItem>1 Tahun</MenuItem>
                </MenuList>
              </Menu>
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
                <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                  Produk Pemesanan
                </th>
                <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
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
                <td className="text-center">Ayam Goyeng</td>

                <td className="text-center">18 18 18</td>
                <td className="flex justify-center">
                  <Button
                    color="green"
                    size="sm"
                    onClick={() => tanganiSunting()}
                  >
                    <IoEyeOutline className="w-5 h-5" />
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    className="ml-2"
                    onClick={() => konfirmasiHapus()}
                  >
                    <IoTrashOutline className="w-5 h-5" />
                  </Button>
                  <Button
                    color="blue"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDownload()}
                  >
                    <IoDownloadOutline className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman 1 dari 5
          </Typography>
          <div className="flex items-center gap-2">
            <Button variant="outlined" size="sm">
              Sebelumnya
            </Button>
            <Button variant="outlined" size="sm">
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
