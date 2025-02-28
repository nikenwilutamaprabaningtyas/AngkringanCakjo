// authJWT.js (di folder middleware)
const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Simpan informasi user dalam request
        next();  // Panggil next untuk melanjutkan ke middleware berikutnya
    } catch (err) {
        return res.status(400).json({ message: 'Token tidak valid' });
    }
};

module.exports = authJWT;
