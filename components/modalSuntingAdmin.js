import React, { useEffect } from "react";
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
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useSuntingAdmin from "@/hooks/Backend/useSuntingAdmin";

const ModalSuntingAdmin = ({ terbuka, tertutup, adminYangTerpilih }) => {
  useEffect(() => {
    if (!adminYangTerpilih) {
      tertutup(false);
    }
  }, [adminYangTerpilih, tertutup]);

  const {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    namaPengguna,
    setNamaPengguna,
    email,
    setEmail,
    jenisKelamin,
    setJenisKelamin,
    peranAdmin,
    setPeranAdmin,
    suntingAdmin,
    sedangMemuatSuntingAdmin,
  } = useSuntingAdmin(adminYangTerpilih);

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup(false)}
          className="text-red-500 hover:bg-transparent"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">Sunting Admin</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Nama Depan
          </Typography>
          <Input
            label="Masukkan Nama Depan"
            size="lg"
            value={namaDepan}
            onChange={(e) => setNamaDepan(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Nama Belakang
          </Typography>
          <Input
            label="Masukkan Nama Belakang"
            size="lg"
            value={namaBelakang}
            onChange={(e) => setNamaBelakang(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Nama Pengguna
          </Typography>
          <Input
            label="Masukkan Nama Pengguna"
            size="lg"
            value={namaPengguna}
            onChange={(e) => setNamaPengguna(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Email
          </Typography>
          <Input
            type="email"
            label="Masukkan Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Jenis Kelamin
          </Typography>
          <Select
            label="Pilih Jenis Kelamin"
            size="lg"
            value={jenisKelamin}
            onChange={(value) => setJenisKelamin(value)}
          >
            <Option value="Pria">Pria</Option>
            <Option value="Wanita">Wanita</Option>
          </Select>

          <Typography className="-mb-2" variant="h6">
            Peran Admin
          </Typography>
          <Select
            label="Pilih Peran Admin"
            size="lg"
            value={peranAdmin}
            onChange={(value) => setPeranAdmin(value)}
          >
            <Option value="Super Admin">Super Admin</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingAdmin();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingAdmin}
          className={`${
            sedangMemuatSuntingAdmin
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingAdmin ? <Memuat /> : "Sunting Admin"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingAdmin;
