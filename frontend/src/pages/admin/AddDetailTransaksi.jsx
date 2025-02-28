import React, { useState } from "react";
import Swal from "sweetalert2";

const AddDetailTransaksi = () => {
  const [form, setForm] = useState({
    id_pelanggan: "",
    id_menu: "",
    jumlah: "",
    harga_satuan: "",
  });

  // Handle perubahan input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi data
    if (!form.id_pelanggan || !form.id_menu || !form.jumlah || !form.harga_satuan) {
      Swal.fire({
        icon: "error",
        title: "Semua kolom harus diisi",
        text: "Pastikan semua kolom diisi dengan benar",
      });
      return;
    }

    // Hitung subtotal
    const subtotal = form.jumlah * form.harga_satuan;

    // Data yang akan dikirim ke API
    const data = {
      id_pelanggan: form.id_pelanggan,
      id_menu: form.id_menu,
      jumlah: form.jumlah,
      harga_satuan: form.harga_satuan,
      subtotal: subtotal,
    };

    try {
      // Kirim data ke backend menggunakan fetch
      const response = await fetch("http://localhost:3000/api/Detailtransaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Cek apakah response berhasil
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Gagal Menyimpan Data",
          text: errorData.error || "Terjadi kesalahan!",
        });
        return;
      }

      const result = await response.json();
      Swal.fire({
        icon: "success",
        title: "Data Disimpan",
        text: result.message,
      });
      setForm({
        id_pelanggan: "",
        id_menu: "",
        jumlah: "",
        harga_satuan: "",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat mengirim data!",
      });
    }
  };

  return (
    <div>
      <h2>Tambah Detail Transaksi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Pelanggan</label>
          <input
            type="text"
            name="id_pelanggan"
            value={form.id_pelanggan}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID Menu</label>
          <input
            type="text"
            name="id_menu"
            value={form.id_menu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Jumlah</label>
          <input
            type="number"
            name="jumlah"
            value={form.jumlah}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Harga Satuan</label>
          <input
            type="number"
            name="harga_satuan"
            value={form.harga_satuan}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default AddDetailTransaksi;
