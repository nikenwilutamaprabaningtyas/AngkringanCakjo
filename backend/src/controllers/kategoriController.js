 const kategori = require("../models/kategori");

 const index = (req, res) => {
    kategori.selectKategori((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "kategori kosong"
            });
        }
        res.status(200).json(result);
    });
 };
 const storeKategori = (req, res) => {
    const { nama, deskripsi } = req.body;
    kategori.insertKategori(nama, deskripsi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(201)
        .json({ message: "kategori berhasil disimpan", kategoriId: result.insertId });
    });
 };
const showKategori = (req, res) => {
    const { id_kategori } = req.params;
    kategori.selectKategoriById(id_kategori, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "kategori tidak ditemukan"
            });
        }
        res.status(200).json(result[0]);
    });
};
const updateKategori = (req, res) => {
    const { id_kategori } = req.params;
    const { nama, deskripsi } = req.body;
    kategori.updateKategori(id_kategori, nama, deskripsi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Kategori berhasil diperbarui" });
    });
};

const destroyKategori = (req, res) => {
    const { id_kategori } = req.params;
    kategori.deleteKategori(id_kategori, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Kategori berhasil dihapus" });
    });
};

module.exports = { index, storeKategori, showKategori, updateKategori, destroyKategori };