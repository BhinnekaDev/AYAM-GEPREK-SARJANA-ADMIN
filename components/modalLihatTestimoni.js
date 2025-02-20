import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Button,
  Card,
} from "@material-tailwind/react";
import Image from "next/image";

const ModalLihatTestimoni = ({ terbuka, tertutup, testimoni }) => {
  if (!testimoni) return null;

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      size="sm"
      className="bg-white max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden"
    >
      <DialogHeader className="text-black font-semibold text-lg bg-gray-100 py-3 px-4 border-b border-gray-200">
        Detail Testimoni
      </DialogHeader>

      <DialogBody className="p-6 flex flex-col items-center text-center">
        <Card className="flex flex-col items-center p-4 w-full bg-gray-50 rounded-lg shadow-sm">
          <Image
            src={testimoni.Foto}
            alt={testimoni.Nama_Lengkap}
            width={90}
            height={90}
            className="rounded-full border-2 border-gray-300 shadow-sm"
          />
          <Typography variant="h6" className="text-black mt-3 font-semibold">
            {testimoni.Nama_Lengkap}
          </Typography>
          <Typography className="text-gray-600 text-sm font-medium">
            {testimoni.Nama_Menu}
          </Typography>
          <Typography className="text-yellow-500 text-lg font-semibold mt-2">
            ⭐ {testimoni.Rating}/5
          </Typography>
          <Typography className="text-gray-800 text-sm mt-4 italic leading-relaxed">
            "{testimoni.Komentar}"
          </Typography>
        </Card>
      </DialogBody>

      {/* Footer */}
      <DialogFooter className="flex justify-end pb-4">
        <Button
          onClick={() => tertutup(false)}
          variant="outlined"
          color="gray"
          className="hover:bg-gray-200 transition duration-200"
        >
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalLihatTestimoni;
