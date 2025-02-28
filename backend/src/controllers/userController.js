const User = require("../models/user");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// Menampilkan semua pengguna
const indexUser = (req, res) => {
    User.selectUsers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {  // Perbaiki typo dari "lenght" menjadi "length"
            return res.status(404).json({
                message: "Tidak ada pengguna"
            });
        }
        res.status(200).json(result);
    });
};

// Menambahkan pengguna baru
const storeUser = (req, res) => {
    const { nama, email, password } = req.body;  
    
    // Meng-hash password sebelum disimpan
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 adalah jumlah salt rounds
    
    User.insertUser(nama, email, hashedPassword, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Pengguna berhasil disimpan", userId: result.insertId });
    });
};

// Menampilkan pengguna berdasarkan ID
const showUser = (req, res) => {
    const { id_user } = req.params;
    User.selectUsersById(id_user, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) { // Periksa jika hasilnya kosong
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }
        res.status(200).json(result[0]);
    });
};

// Mengupdate data pengguna
const updateUser = (req, res) => {
    const { id_user } = req.params;
    const { nama, email, password } = req.body; 
    
    // Jika password diubah, maka harus di-hash terlebih dahulu
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    
    User.updateUser(id_user, nama, email, hashedPassword, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Data pengguna berhasil diperbarui");
    });
};

// Menghapus pengguna
const destroyUser = (req, res) => {
    const { id_user } = req.params;
    User.deleteUser(id_user, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Pengguna berhasil dihapus");
    });
};

// Login pengguna
const Login = (req, res) => {
    const { email, password } = req.body;
    
    User.selectUsersByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length === 0) {
            return res.status(400).json({ message: "Email tidak terdaftar" });
        }
        
        const user = result[0];
        
        // Memeriksa kecocokan password
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Password salah" });
        }
        
        // Membuat token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'rahasia', { // Disarankan untuk menggunakan environment variable untuk JWT secret
            expiresIn: 86400 // Token akan kedaluwarsa dalam 24 jam
        });
        
        res.status(200).json({ auth: true, token });
    });
};

// Logout pengguna
const Logout = (req, res) => {
    res.status(200).json({ auth: false, token: null });
};

module.exports = {
    indexUser,
    storeUser,
    showUser,
    updateUser,
    destroyUser,
    Login,
    Logout
};
