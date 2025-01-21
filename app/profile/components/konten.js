import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Image from "next/image";

// HOOKS
import useTampilkanAdminSesuaiID from "@/hooks/Backend/useTampilkanAdminSesuaiID";
import useHapusAdminID from "@/hooks/Backend/useHapusAdminID";

// COMPONENTS
import ModalKonfirmasiHapusAdminID from "@/components/modalKonfirmasiHapusAdminID";
import Memuat from "@/components/memuat";

function Konten() {
  const gambarBawaan = require("@/assets/images/profil.jpg");

  const [isEditable, setIsEditable] = useState(false);
  const [bukaModalHapusAdmin, setBukaModalHapusAdmin] = useState(false);

  const [adminYangTerpilih, setAdminYangTerpilih] = useState(null);

  const { sedangMemuatHapusAdmin, hapusAdmin } = useHapusAdminID();

  const { adminData, memuatTampilkanAdminSesuaiID } =
    useTampilkanAdminSesuaiID();

  const tanganiInput = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const toggleEdit = () => setIsEditable(!isEditable);

  const konfirmasiHapus = (idAdmin) => {
    setAdminYangTerpilih(idAdmin);
    setBukaModalHapusAdmin(true);
  };

  const hapus = async (id) => {
    console.log(id);
    if (id) {
      await hapusAdmin(id);
      setBukaModalHapusAdmin(false);
      setAdminYangTerpilih(null);
    }
  };

  if (memuatTampilkanAdminSesuaiID) {
    return <Memuat />;
  }

  return (
    <>
      <Card className="h-full w-full p-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-center gap-x-8 pb-8 border-b border-gray-300">
          <div className="relative w-32 h-32">
            <Image
              src={adminData?.Foto ? adminData.Foto : gambarBawaan}
              className="w-full h-full object-cover rounded-lg border-4 border-gray-300"
              alt="Profil"
            />
          </div>
          <div>
            <Typography variant="h5" className="font-bold text-gray-900">
              {adminData?.Nama_Depan} {adminData?.Nama_Belakang}
            </Typography>
            <Typography className="text-sm text-gray-500">
              {adminData?.Email}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {[
            {
              label: "Nama Depan",
              name: "NamaDepan",
              value: adminData?.id,
            },
            {
              label: "Nama Belakang",
              name: "NamaBelakang",
              value: adminData?.Nama_Belakang,
            },
            {
              label: "Email",
              name: "Email",
              value: adminData?.Email,
            },
            {
              label: "Jenis Kelamin",
              name: "JenisKelamin",
              value: adminData?.Jenis_Kelamin,
              component: isEditable ? (
                <Select
                  name="JenisKelamin"
                  value={adminData?.Jenis_Kelamin}
                  onChange={(e) =>
                    setAdminData({ ...adminData, Jenis_Kelamin: e })
                  }
                  className="mt-1"
                >
                  <Option value="Pria">Pria</Option>
                  <Option value="Wanita">Wanita</Option>
                </Select>
              ) : (
                <Input
                  value={adminData?.Jenis_Kelamin}
                  disabled
                  className="mt-1"
                />
              ),
            },
            {
              label: "Nama Pengguna",
              name: "NamaPengguna",
              value: adminData?.Nama_Pengguna,
            },
            {
              label: "Peran",
              name: "Peran",
              value: adminData?.Peran_Admin,
            },
          ].map((field, index) => (
            <div key={index}>
              {field.component ? (
                field.component
              ) : (
                <Input
                  label={field.label}
                  name={field.name}
                  value={field.value}
                  onChange={tanganiInput}
                  disabled={!isEditable}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6 gap-x-4">
          <Button color="blue" className="w-28" onClick={toggleEdit}>
            {isEditable ? "Simpan" : "Edit"}
          </Button>
          <Button
            color="red"
            className="w-28"
            onClick={() => konfirmasiHapus(adminData.id)}
            disabled={sedangMemuatHapusAdmin}
          >
            Hapus
          </Button>
        </div>
      </Card>

      <ModalKonfirmasiHapusAdminID
        terbuka={bukaModalHapusAdmin}
        tertutup={setBukaModalHapusAdmin}
        adminYangTerpilih={`${adminData?.Nama_Depan} ${adminData?.Nama_Belakang}`}
        konfirmasiHapusAdmin={hapus}
        sedangMemuatHapusAdmin={sedangMemuatHapusAdmin}
        adminId={adminYangTerpilih}
      />
      <ToastContainer />
    </>
  );
}

export default Konten;
