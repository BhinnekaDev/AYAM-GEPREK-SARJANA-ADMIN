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
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalKonfirmasiHapusMinuman = ({
  terbuka,
  tertutup,
  minumanYangTerpilih,
  konfirmasiHapusMinuman,
  sedangMemuatHapusMinuman,
}) => {
  return (
    <Dialog
      open={terbuka}
      handler={() => tertutup(false)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      className="bg-[#fff] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <div className="absolute top-3 right-3">
        <IconButton variant="text" color="red" onClick={() => tertutup(false)}>
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">
        Konfirmasi Hapus Data Minuman
      </DialogHeader>
      <DialogBody className="text-black">
        <p>
          Apakah Anda yakin ingin menghapus minuman{" "}
          <strong className="font-bold">{minumanYangTerpilih}</strong>? Tindakan
          ini tidak dapat dibatalkan.
        </p>
      </DialogBody>

      <DialogFooter className="space-x-4">
        <Button
          onClick={() => konfirmasiHapusMinuman(minumanYangTerpilih)}
          variant="gradient"
          color="red"
          disabled={sedangMemuatHapusMinuman}
          className={`${
            sedangMemuatHapusMinuman
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatHapusMinuman ? <Memuat /> : "Hapus Minuman"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKonfirmasiHapusMinuman;
