const menu = require("../models/menu");

const index = (req, res) => {
    menu.selectMenu((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "Menu kosong"
            });
        }
        res.status(200).json(result);
    });
};

const storeMenu = (req, res) => {
    const { id_kategori,nama_makanan, deskripsi, harga } = req.body;
    menu.insertMenu(id_kategori,nama_makanan, deskripsi, harga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Menu item berhasil disimpan", menuId: result.insertId });
    });
};

const showMenu = (req, res) => {
    const { id } = req.params;
    menu.selectMenuById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "Menu item tidak ditemukan"
            });
        }
        res.status(200).json(result[0]);
    });
};

const updateMenu = (req, res) => {
    const { id } = req.params;
    const { nama_makanan, deskripsi, harga } = req.body;
    menu.updateMenu(id, nama_makanan, deskripsi, harga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Menu item berhasil diubah" });
    });
};

const destroyMenu = (req, res) => {
    const { id } = req.params;
    menu.deleteMenu(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Menu item berhasil dihapus" });
    });
};

module.exports = { index, storeMenu, showMenu, updateMenu, destroyMenu };