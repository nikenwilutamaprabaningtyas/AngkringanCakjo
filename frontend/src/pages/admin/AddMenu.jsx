import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddMenu = () => {
    const [kategori, setKategori] = useState([]);
    const [namaMakanan, setNamaMakanan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [harga, setHarga] = useState('');
    const [idKategori, setIdKategori] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getKategori();  // Fetch categories for the category dropdown
    }, []);

    const getKategori = async () => {
        const response = await fetch("http://localhost:3000/api/kategori", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setKategori(data);  // Set categories in state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {
            id_kategori: idKategori,
            nama_makanan: namaMakanan,
            deskripsi,
            harga: parseFloat(harga),
        };

        const response = await fetch("http://localhost:3000/api/menu", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log("Error while saving menu.");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Menu Berhasil Disimpan",
                timer: 1000,
            }).then(() => {
                window.location.href = '/admin/menu';
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Input Menu</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Menu</li>
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
                                    <Link to="/admin/menu" className="btn btn-primary float-start">Lihat Data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="id_kategori">Kategori</label>
                                            <select
                                                name="id_kategori"
                                                value={idKategori}
                                                onChange={(e) => setIdKategori(e.target.value)}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {kategori.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nama_makanan">Nama Makanan</label>
                                            <input
                                                type="text"
                                                name="nama_makanan"
                                                className="form-control"
                                                value={namaMakanan}
                                                onChange={(e) => setNamaMakanan(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deskripsi">Deskripsi</label>
                                            <textarea
                                                name="deskripsi"
                                                className="form-control"
                                                value={deskripsi}
                                                onChange={(e) => setDeskripsi(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga">Harga</label>
                                            <input
                                                type="number"
                                                name="harga"
                                                className="form-control"
                                                value={harga}
                                                onChange={(e) => setHarga(e.target.value)}
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

export default AddMenu;
