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
import { format } from "date-fns";

// Components
import ModalSuntingAdmin from "@/components/modalSuntingAdmin";
import ModalKonfirmasiHapusAdmin from "@/components/modalKonfirmasiHapusAdmin";
import Memuat from "@/components/memuat";
import ModalTambahAdmin from "@/components/modalTambahAdmin";

// Hooks
import useTampilkanAdmin from "@/hooks/Backend/useTampilkanAdmin";
import useHapusAdmin from "@/hooks/Backend/useHapusAdmin";
import useSuntingAdmin from "@/hooks/Backend/useSuntingAdmin";

const profilAdmin = require("@/assets/images/profil.jpg");

function Konten() {
  const {
    totalAdmin,
    daftarAdmin,
    sedangMemuatTampilkanAdmin,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  } = useTampilkanAdmin();

  const { sedangMemuatHapusAdmin, hapusAdmin } = useHapusAdmin();
  const { suntingAdmin, sedangMemuatSuntingAdmin } = useSuntingAdmin();

  const [bukaModalTambahAdmin, setBukaModalTambahAdmin] = useState(false);
  const [adminYangTerpilih, setAdminYangTerpilih] = useState(null);
  const [bukaModalSuntingAdmin, setBukaModalSuntingAdmin] = useState(false);
  const [bukaModalHapusAdmin, setBukaModalHapusAdmin] = useState(false);

  const tanganiSunting = (admin) => {
    setAdminYangTerpilih(admin);
    setBukaModalSuntingAdmin(true);
  };

  const konfirmasiHapus = (idAdmin) => {
    setAdminYangTerpilih(idAdmin);
    setBukaModalHapusAdmin(true);
  };

  const hapus = async () => {
    if (adminYangTerpilih) {
      await hapusAdmin(adminYangTerpilih);
      setBukaModalHapusAdmin(false);
      setAdminYangTerpilih(null);
    }
  };

  return (
    <div>
      <Card className="max-screen bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography variant="h5">Total Admin</Typography>
            <Typography className="text-xl">{totalAdmin}</Typography>
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
              Tabel Data Admin
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
          {sedangMemuatTampilkanAdmin ? (
            <Memuat />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 py-3 px-4">
                    Admin
                  </th>
                  <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                    Fungsi
                  </th>
                  <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                    Status
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
                {daftarAdmin.map((admin) => (
                  <tr key={admin.id} className="border-b border-blue-gray-50">
                    <td className="p-5 flex items-center gap-3">
                      <Image
                        src={profilAdmin}
                        alt={admin.Nama_Pengguna}
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
                          {admin.Nama_Pengguna}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {admin.Email}
                        </Typography>
                      </div>
                    </td>
                    <td className="text-center">{admin.Peran_Admin}</td>
                    <td className="text-center">
                      <span
                        className={(() => {
                          const adminIdInStorage = localStorage.getItem(
                            admin.id
                          );
                          if (adminIdInStorage) {
                            return "bg-green-500 bg-opacity-15 text-green-500 text-xs px-4 py-2 uppercase font-bold rounded-lg tracking-wider inline-block";
                          } else {
                            return "bg-red-500 bg-opacity-15 text-red-500 text-xs px-4 py-2 uppercase font-bold tracking-wider rounded-lg inline-block";
                          }
                        })()}
                      >
                        {(() => {
                          const adminIdInStorage = localStorage.getItem(
                            admin.id
                          );
                          return adminIdInStorage ? "Aktif" : "Tidak Aktif";
                        })()}
                      </span>
                    </td>

                    <td className="text-center">
                      {admin.Tanggal_Pembuatan_Akun
                        ? format(
                            new Date(
                              admin.Tanggal_Pembuatan_Akun.seconds * 1000
                            ),
                            "yyyy-MM-dd"
                          )
                        : "Tidak Diketahui"}
                    </td>
                    <td className="flex justify-center">
                      <Button
                        color="green"
                        size="sm"
                        onClick={() => tanganiSunting(admin.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => konfirmasiHapus(admin.id)}
                        className="ml-2"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalAdmin / 5)}
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              onClick={ambilHalamanSebelumnya}
              variant="outlined"
              size="sm"
              disabled={sedangMemuatTampilkanAdmin || halaman === 1}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={ambilHalamanSelanjutnya}
              variant="outlined"
              size="sm"
              disabled={
                sedangMemuatTampilkanAdmin ||
                halaman === Math.ceil(totalAdmin / 5)
              }
            >
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ModalTambahAdmin
        terbuka={bukaModalTambahAdmin}
        tertutup={setBukaModalTambahAdmin}
      />
      <ModalSuntingAdmin
        terbuka={bukaModalSuntingAdmin}
        tertutup={setBukaModalSuntingAdmin}
        adminYangTerpilih={adminYangTerpilih}
        suntingAdmin={suntingAdmin}
        sedangMemuatSuntingAdmin={sedangMemuatSuntingAdmin}
      />

      <ModalKonfirmasiHapusAdmin
        terbuka={bukaModalHapusAdmin}
        tertutup={setBukaModalHapusAdmin}
        adminYangTerpilih={adminYangTerpilih}
        konfirmasiHapusAdmin={hapus}
        sedangMemuatHapusAdmin={sedangMemuatHapusAdmin}
      />
    </div>
  );
}

export default Konten;
