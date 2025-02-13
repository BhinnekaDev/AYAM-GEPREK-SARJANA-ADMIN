import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

const ModalDetailPengguna = ({ terbuka, tertutup, pengguna }) => {
  return (
    <Dialog
      open={terbuka}
      handler={() => tertutup(false)}
      size="md"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <DialogHeader className="text-black">Detail Pengguna</DialogHeader>
      <DialogBody className="text-black">
        {pengguna ? (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={pengguna.profileImage || "/profile.jpg"}
              alt={
                `${pengguna.Nama_Depan} ${pengguna.Nama_Belakang}` ||
                "Gambar Profil Pengguna"
              }
              width={80}
              height={80}
              className="rounded-full"
            />
            <Typography variant="h6">
              {pengguna.Nama_Depan} {pengguna.Nama_Belakang}
            </Typography>
            <Typography variant="small">Email: {pengguna.Email}</Typography>
            <Typography variant="small">
              No HP: {pengguna.No_Telepon}
            </Typography>
            <Typography variant="small">
              Alamat:{" "}
              {pengguna.Alamat ? (
                <span
                  title={`${pengguna.Alamat.Alamat_Jalan} ${pengguna.Alamat.Alamat_Detail}, RT${pengguna.Alamat.RT}/RW${pengguna.Alamat.RW}, 
                ${pengguna.Alamat.Kecamatan}, ${pengguna.Alamat.Kota}, ${pengguna.Alamat.Provinsi}, ${pengguna.Alamat.Kode_Pos}`}
                >
                  {`${pengguna.Alamat.Alamat_Jalan} ${pengguna.Alamat.Alamat_Detail}, RT${pengguna.Alamat.RT}/RW${pengguna.Alamat.RW}, 
                ${pengguna.Alamat.Kecamatan}, ${pengguna.Alamat.Kota}, ${pengguna.Alamat.Provinsi}, ${pengguna.Alamat.Kode_Pos}`}
                </span>
              ) : (
                "-"
              )}
            </Typography>
          </div>
        ) : (
          <Typography className="text-center">
            Data pengguna tidak ditemukan.
          </Typography>
        )}
      </DialogBody>

      <DialogFooter>
        <Button
          onClick={() => tertutup(false)}
          variant="gradient"
          color="blue-gray"
        >
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalDetailPengguna;
