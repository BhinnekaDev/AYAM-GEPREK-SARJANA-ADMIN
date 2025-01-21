import React from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// HOOKS
import useTambahAdmin from "@/hooks/Backend/useTambahAdmin";
// COMPONENTS
import Memuat from "@/components/memuat";

const ModalTambahAdmin = ({ terbuka, tertutup }) => {
  const {
    namaDepan,
    namaBelakang,
    namaPengguna,
    email,
    jenisKelamin,
    peranAdmin,
    setNamaDepan,
    setNamaBelakang,
    setNamaPengguna,
    setEmail,
    setJenisKelamin,
    setPeranAdmin,
    tambahAdmin,
    sedangMemuatTambahAdmin,
  } = useTambahAdmin();

  const tanganiTambahAdmin = async () => {
    await tambahAdmin();
    if (!sedangMemuatTambahAdmin) {
      tertutup();
    }
  };

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1.1, opacity: 1 },
        unmount: { scale: 0.95, opacity: 0 },
      }}
      size="lg"
      className="bg-white text-gray-800 rounded-xl shadow-lg mx-4"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="gray"
          onClick={tertutup}
          className="text-gray-800 hover:bg-transparent"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-2xl font-semibold text-gray-800">
        Tambah Admin Baru
      </DialogHeader>
      <DialogBody divider className="space-y-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Typography className="mb-2" variant="h6">
                Nama Depan
              </Typography>
              <Input
                label="Masukkan Nama Depan"
                size="lg"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
                className="w-full bg-gray-100 text-gray-800"
              />
            </div>
            <div>
              <Typography className="mb-2" variant="h6">
                Nama Belakang
              </Typography>
              <Input
                label="Masukkan Nama Belakang"
                size="lg"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
                className="w-full bg-gray-100 text-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Typography className="mb-2" variant="h6">
                Nama Pengguna
              </Typography>
              <Input
                label="Masukkan Nama Pengguna"
                size="lg"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                className="w-full bg-gray-100 text-gray-800"
              />
            </div>
            <div>
              <Typography className="mb-2" variant="h6">
                Email
              </Typography>
              <Input
                label="Masukkan Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 text-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Typography className="mb-2" variant="h6">
                Jenis Kelamin
              </Typography>
              <Select
                label="Pilih Jenis Kelamin"
                size="lg"
                value={jenisKelamin}
                onChange={(value) => setJenisKelamin(value)}
                className="w-full bg-gray-100 text-gray-800"
              >
                <Option value="Pria">Pria</Option>
                <Option value="Wanita">Wanita</Option>
              </Select>
            </div>
          </div>
          <div>
            <Typography className="mb-2" variant="h6">
              Peran Admin
            </Typography>
            <Select
              label="Pilih Peran"
              size="lg"
              value={peranAdmin}
              onChange={(value) => setPeranAdmin(value)}
              className="w-full bg-gray-100 text-gray-800"
            >
              <Option value="Super Admin">Super Admin</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </div>
        </form>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button
          color="orange"
          onClick={tanganiTambahAdmin}
          disabled={sedangMemuatTambahAdmin}
          className="w-full bg-blue-700 hover:bg-blue-900 transition duration-300 flex justify-center items-center"
        >
          {sedangMemuatTambahAdmin ? <Memuat /> : "Tambah Admin"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahAdmin;
