import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditPenjualan = () => {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const [idUser, setIdUser] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalHarga, setTotalHarga] = useState('');
    const [loading, setLoading] = useState(true);  // Menambahkan state loading
    const token = localStorage.getItem('token'); // Token untuk otentikasi

    useEffect(() => {
        if (id) {
            getPenjualan(); // Mengambil data penjualan berdasarkan ID
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'id_user') setIdUser(value);
        if (name === 'quantity') setQuantity(value);
        if (name === 'total_harga') setTotalHarga(value);
    };

    const getPenjualan = async () => {
        setLoading(true);  // Set loading menjadi true saat mengambil data
        const response = await fetch(`http://localhost:3000/api/penjualan/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch penjualan:", response.statusText);
            setLoading(false);
            return;
        }

        const data = await response.json();
        console.log(data);  // Menampilkan data di konsol untuk debug
        setIdUser(data.id_user);
        setQuantity(data.quantity);
        setTotalHarga(data.Total_harga);
        setLoading(false);  // Set loading menjadi false setelah data diterima
    };

    const handleUpdate = async (event) => {
        event.preventDefault(); // Mencegah form submit default
        const fData = {
            id_user: idUser,
            quantity,
            Total_harga: totalHarga
        };

        try {
            const response = await fetch(`http://localhost:3000/api/penjualan/${id}`, {
                method: "PUT", // Menggunakan metode PUT untuk update data
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fData),
            });

            if (response.ok) {
                // Reset state values setelah berhasil update
                setIdUser('');
                setQuantity('');
                setTotalHarga('');

                Swal.fire({
                    icon: "success",
                    text: "Update penjualan berhasil",
                    timer: 1000
                }).then(() => {
                    window.location.href = '/admin/penjualan'; // Arahkan kembali ke halaman penjualan
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    text: errorData.message || "Terjadi kesalahan saat memperbarui penjualan",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Terjadi kesalahan saat memperbarui penjualan",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Tampilkan loading jika data belum diterima
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col">
                            <h1 className="m-0">Edit Data Penjualan</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Edit Penjualan</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/penjualan" className="btn btn-primary float-start">Lihat Data</Link>
                                    <h2 className="text-center">Edit Penjualan</h2>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="id_user">ID Pengguna</label>
                                            <input
                                                type="number"
                                                value={idUser}
                                                onChange={handleChange}
                                                name="id_user"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="quantity">Jumlah</label>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={handleChange}
                                                name="quantity"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="total_harga">Total Harga</label>
                                            <input
                                                type="number"
                                                value={totalHarga}
                                                onChange={handleChange}
                                                name="total_harga"
                                                className="form-control"
                                                required
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

export default EditPenjualan;
