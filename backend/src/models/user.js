const koneksi = require("./db");
const bcrypt = require("bcryptjs");

const selectUsers = (callback) => {
    const q = "SELECT * FROM users";
    koneksi.query(q, callback);
};

const insertUser = (nama, email, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO users(nama,email,password) VALUES(?,?,?)";
        koneksi.query(q, [nama, email, hashedPassword], callback);
    } else {
        console.error("Password harus diisi");
    }
};

const selectUsersById = (id, callback) => {
    const q = "SELECT id, nama, email, password FROM users WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const selectUsersByEmail = (email, callback) => {
    const q = "SELECT id, nama, email, password FROM users WHERE email = ?";
    koneksi.query(q, [email], callback);
};

const updateUser = (id, nama, email, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "UPDATE users SET nama=?, email=?, password=? WHERE id=?";
        koneksi.query(q, [nama, email, hashedPassword, id], callback);
    } else {
        const q = "UPDATE users SET nama=?, email=? WHERE id=?";
        koneksi.query(q, [nama, email, id], callback);
    }
};

const deleteUser = (id, callback) => {
    const q = "DELETE FROM users WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = { selectUsers, insertUser, selectUsersById, selectUsersByEmail, updateUser, deleteUser };
