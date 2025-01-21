import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import useEditAdmin from "@/hooks/Backend/useEditAdmin";

function ModalEditAdmin({ terbuka, tertutup, admin, reloadData }) {
  const [namaDepan, setNamaDepan] = useState(admin?.namaDepan || "");
  const [namaBelakang, setNamaBelakang] = useState(admin?.namaBelakang || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [jenisKelamin, setJenisKelamin] = useState(
    admin?.jenisKelamin || "Pria"
  );
  const [peranAdmin, setPeranAdmin] = useState(admin?.peran || "Admin");
  const [status, setStatus] = useState(admin?.status || "Aktif");

  const { updateAdmin, loading } = useEditAdmin();

  const handleUpdate = async () => {
    const updatedAdmin = {
      namaDepan,
      namaBelakang,
      email,
      jenisKelamin,
      peran: peranAdmin,
      status,
    };

    try {
      await updateAdmin(admin.id, updatedAdmin);
      reloadData(); // Refresh daftar admin
      tertutup(); // Tutup modal
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <Dialog open={terbuka} handler={tertutup} size="sm">
      <DialogHeader>Edit Admin</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <Input
            label="Nama Depan"
            value={namaDepan}
            onChange={(e) => setNamaDepan(e.target.value)}
          />
          <Input
            label="Nama Belakang"
            value={namaBelakang}
            onChange={(e) => setNamaBelakang(e.target.value)}
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
          </div>

          <Select
            label="Status"
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Option value="Aktif">Aktif</Option>
            <Option value="Tidak Aktif">Tidak Aktif</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={tertutup} className="mr-2">
          Batal
        </Button>
        <Button color="green" onClick={handleUpdate} disabled={loading}>
          {loading ? "Memperbarui..." : "Simpan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalEditAdmin;
