import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalKonfirmasiHapusTestimoni = ({
  terbuka,
  tertutup,
  testimoniTerpilih,
}) => {
  return (
    <Dialog
      open={terbuka}
      handler={() => tertutup && tertutup(false)}
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      size="md"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      {/* Tombol Tutup */}
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup && tertutup(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">
        Konfirmasi Hapus Testimoni
      </DialogHeader>
      <DialogBody className="text-black">
        <p>
          Apakah Anda yakin ingin menghapus testimoni dari
          <strong className="font-bold">
            {" "}
            {testimoniTerpilih?.Nama_Lengkap || "Pengguna"}
          </strong>
          ? Tindakan ini tidak dapat dibatalkan.
        </p>
      </DialogBody>

      <DialogFooter className="space-x-4">
        <Button
          onClick={() => alert("Fungsi hapus belum diimplementasikan!")}
          variant="gradient"
          color="red"
        >
          Hapus Testimoni
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKonfirmasiHapusTestimoni;
