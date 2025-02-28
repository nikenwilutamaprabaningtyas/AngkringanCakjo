const pelanggan = require ("../models/pelanggan");


const index = (req,res) => {
    pelanggan.selectPelanggan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0)
        {
            return res.status(404).json({
                message: "pelanggan kosong"
            });
        }
        res.status(200).json(result);
    });
};

const storePelanggan = (req, res) => {
    const { nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password } = req.body;
    pelanggan.insertPelanggan(nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res
        .status(201)
        .json({message: "Berhasil disimpan", pelangganId: result.insertId });
    });
};

const showPelanggan = (req, res) => {
    const { id_pelanggan } = req.params;

    // Ensure that id_pelanggan is provided and is valid (e.g., number, or valid format)
    if (!id_pelanggan) {
        return res.status(400).json({ message: 'id_pelanggan is required' });
    }

    // Call the function to fetch the customer (pelanggan) from the database
    pelanggan.selectPelangganById(id_pelanggan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Check if the result is empty (no matching customer found)
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Pelanggan not found' });
        }

        // Return the first result (since SELECT * might return multiple rows)
        res.status(200).json(result[0]);
    });
};


const updatePelanggan = (req, res) => {
    const { id_pelanggan } = req.params;
    const { nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password } = req.body;
    pelanggan.updatePelanggan(id_pelanggan, nama_pelanggan, alamat_pelanggan, no_tlpn_pelanggan, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Data berhasil dirubah");
    });
};
const destroyPelanggan = (req, res) => {
    const { id_pelanggan } = req.params;
    pelanggan.deletePelanggan(id_pelanggan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

module.exports = { index, storePelanggan, showPelanggan, updatePelanggan, destroyPelanggan,};