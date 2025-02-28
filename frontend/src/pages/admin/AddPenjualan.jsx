import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddPenjualan = () => {
    const [users, setUsers] = useState([]);  // Assuming you fetch users for reference.
    const [quantity, setQuantity] = useState('');
    const [totalHarga, setTotalHarga] = useState('');
    const [idUser, setIdUser] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getUsers();  // Fetch users for user dropdown selection
    }, []);

    const getUsers = async () => {
        const response = await fetch("http://localhost:3000/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setUsers(data);  // Set users in state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {
            id_user: idUser,
            quantity: parseInt(quantity),
            Total_harga: parseFloat(totalHarga),
        };

        const response = await fetch("http://localhost:3000/api/penjualan", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log("Error while saving penjualan.");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Penjualan Berhasil Disimpan",
                timer: 1000,
            }).then(() => {
                window.location.href = '/admin/penjualan';
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Input Penjualan</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Penjualan</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/penjualan" className="btn btn-primary float-start">Lihat Data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="id_user">Pilih Pengguna</label>
                                            <select
                                                name="id_user"
                                                value={idUser}
                                                onChange={(e) => setIdUser(e.target.value)}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Pengguna</option>
                                                {users.map((user) => (
                                                    <option key={user.id_user} value={user.id_user}>
                                                        {user.nama}  {/* Assuming the user object has 'nama' */}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="quantity">Jumlah</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                className="form-control"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                                min="1"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="totalHarga">Total Harga</label>
                                            <input
                                                type="number"
                                                name="totalHarga"
                                                className="form-control"
                                                value={totalHarga}
                                                onChange={(e) => setTotalHarga(e.target.value)}
                                                required
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddPenjualan;
