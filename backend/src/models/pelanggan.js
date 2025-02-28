const koneksi = require("./db");
const bcrypt = require("bcryptjs");

const selectPelanggan = (callback) => {
    const q = "SELECT * FROM pelanggan";
    koneksi.query(q, callback);
};
const insertPelanggan = (nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO pelanggan(nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password) VALUES (?, ?, ?, ?)";
        koneksi.query(q, [nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, hashedPassword], callback);
    } else {
        console.error("password harus diisi");
    }
};
const selectPelangganById = (id_pelanggan, callback) => {
    const q = "SELECT * FROM pelanggan WHERE id_pelanggan = ?";
    koneksi.query(q, [id_pelanggan], callback);
};
const updatePelanggan = (id_pelanggan, nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = " UPDATE pelanggan SET nama_pelanggan = ?, alamat_pelanggan = ?, no_tlpn_pelanggan = ?, password = ? WHERE id_pelanggan = ?";
        koneksi.query(q, [nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, hashedPassword, id_pelanggan], callback);
    } else {
        const q = "UPDATE pelanggan SET nama_pelanggan = ?, alamat_pelanggan = ?, no_tlpn_pelanggan = ? WHERE id_pelanggan = ?";
        koneksi.query(q, [nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, id_pelanggan], callback);
    }
};

const deletePelanggan = (id_pelanggan, callback) => {
    const q = "DELETE FROM pelanggan WHERE id_pelanggan = ?";
    koneksi.query(q, [id_pelanggan], callback);
};

module.exports = {deletePelanggan, insertPelanggan, selectPelangganById, selectPelanggan, updatePelanggan, deletePelanggan};