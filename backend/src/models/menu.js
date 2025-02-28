const koneksi = require("./db");

const selectMenu = (callback) => {
    const q = "SELECT * FROM menu";
    koneksi.query(q, callback);
};
const insertMenu = (id_kategori,nama_makanan, deskripsi, harga, callback) => {
    const q = "INSERT INTO menu(id_kategori,nama_makanan, deskripsi, harga) VALUES (?, ?, ?, ?)";
    koneksi.query(q, [id_kategori,nama_makanan, deskripsi, harga], callback);
};
const selectMenuById = (id_menu, callback) => {
    const q = "SELECT * FROM menu WHERE id_menu = ?";
    koneksi.query(q, [id_menu], callback);
};
const updateMenu = (id_menu, nama_makanan, deskripsi, harga, callback) => {
    const q = "UPDATE menu SET nama_makanan = ?, deskripsi = ?, harga = ? WHERE id_menu = ?";
    koneksi.query(q, [nama_makanan, deskripsi, harga, id_menu], callback);
};
const deleteMenu = (id_menu, callback) => {
    const q = "DELETE FROM menu WHERE id_menu = ?";
    koneksi.query(q, [id_menu], callback);
};

module.exports = { selectMenu, insertMenu, selectMenuById, updateMenu, deleteMenu };