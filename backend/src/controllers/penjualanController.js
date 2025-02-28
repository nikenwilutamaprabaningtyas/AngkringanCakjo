const penjualan = require("../models/penjualan");

const index = (req, res) => {
    penjualan.selectPenjualan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(400).json({
                message: "No sales records found"
            });
        };
        res.status(200).json(result);
    });
};
const storePenjualan = (req, res) => {
    const { id_user, quantity, Total_harga } = req.body;
    penjualan.insertPenjualan(id_user, quantity, Total_harga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res
        .status(201)
        .json({ message: "Sale successfully recorded", penjualan: result.insertId});
    });
};

const showPenjualan = (req, res) => {
    const { id_penjualan } = req.params;
    penjualan.selectPenjualanById(id_penjualan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result[0]);
    });
};
const updatePenjualan = (req, res) => {
    const { id_penjualan } = req.params;
    const { id_user, quantity, Total_harga } = req. body;
    
    penjualan.updatePenjualan(id_penjualan, id_user, quantity, Total_harga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Sale data successfully updated");
    });
};
const destroyPenjualan = (req, res) => {
    const {id_penjualan} = req.params
    penjualan.deletePenjualan(id_penjualan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Sale data successfully deleted");
    });
};

module.exports = { index, storePenjualan, showPenjualan, updatePenjualan, destroyPenjualan };