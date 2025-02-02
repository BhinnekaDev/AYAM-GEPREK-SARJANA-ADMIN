import React, { useState, useEffect } from "react";
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
import useSuntingAdmin from "@/hooks/Backend/useSuntingAdmin";
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
    sedangMemuatSuntingAdmin,
    suntingAdmin,
  } = useSuntingAdmin(adminData?.id);

  const tanganiInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "NamaDepan":
        setNamaDepan(value);
        break;
      case "NamaBelakang":
        setNamaBelakang(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "NamaPengguna":
        setNamaPengguna(value);
        break;
      case "JenisKelamin":
        setJenisKelamin(value);
        break;
      case "Peran":
        setPeranAdmin(value);
        break;
      default:
        break;
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      suntingAdmin();
    }
    setIsEditable(!isEditable);
  };

  const konfirmasiHapus = (idAdmin) => {
    setAdminYangTerpilih(idAdmin);
    setBukaModalHapusAdmin(true);
  };

  const hapus = async (id) => {
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
              {namaDepan} {namaBelakang}
            </Typography>
            <Typography className="text-sm text-gray-500">{email}</Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {[
            {
              label: "Nama Depan",
              name: "NamaDepan",
              value: namaDepan,
            },
            {
              label: "Nama Belakang",
              name: "NamaBelakang",
              value: namaBelakang,
            },
            {
              label: "Email",
              name: "Email",
              value: email,
            },
            {
              label: "Jenis Kelamin",
              name: "JenisKelamin",
              value: jenisKelamin,
              component: isEditable ? (
                <Select
                  name="JenisKelamin"
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e)}
                  className="mt-1"
                >
                  <Option value="Pria">Pria</Option>
                  <Option value="Wanita">Wanita</Option>
                </Select>
              ) : (
                <Input value={jenisKelamin} disabled className="mt-1" />
              ),
            },
            {
              label: "Nama Pengguna",
              name: "NamaPengguna",
              value: namaPengguna,
            },
            {
              label: "Peran",
              name: "Peran",
              value: peranAdmin,
              component: isEditable ? (
                <Select
                  name="Peran"
                  value={peranAdmin}
                  onChange={(e) => setPeranAdmin(e)}
                  className="mt-1"
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="Super Admin">Super Admin</Option>
                </Select>
              ) : (
                <Input value={peranAdmin} disabled className="mt-1" />
              ),
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
        adminYangTerpilih={`${namaDepan} ${namaBelakang}`}
        konfirmasiHapusAdmin={hapus}
        sedangMemuatHapusAdmin={sedangMemuatHapusAdmin}
        adminId={adminYangTerpilih}
      />
      <ToastContainer />
    </>
  );
}

export default Konten;
