const koneksi = require("./db");

const selectKategori = (callback) => {
    const q = "SELECT * FROM kategori";
    koneksi.query(q, callback);
};

const insertKategori = (nama, deskripsi, callback) => {
    if (nama && deskripsi) {
        const q = "INSERT INTO kategori (nama, deskripsi) VALUES (?, ?)";
        koneksi.query(q, [nama, deskripsi], callback);
    } else {
        console.error("Nama dan deskripsi harus diisi");
    }
};

const selectKategoriById = (id_kategori, callback) => {
    const q = "SELECT * FROM kategori WHERE id = ?";
    koneksi.query(q, [id_kategori], callback);
};
const updateKategori = (id_kategori, nama, deskripsi, callback) => {
    if (nama && deskripsi) {
        const q = "UPDATE kategori SET nama = ?, deskripsi = ? WHERE id = ?";
        koneksi.query(q, [nama, deskripsi, id_kategori], callback);
    } else {
        console.error("Nama dan deskripsi harus diisi");
    }
};
const deleteKategori = (id_kategori, callback) => {
    const q = "DELETE FROM kategori WHERE id = ?";
    koneksi.query(q, [id_kategori], callback);
};

module.exports = {selectKategori, insertKategori, selectKategoriById, updateKategori, deleteKategori }