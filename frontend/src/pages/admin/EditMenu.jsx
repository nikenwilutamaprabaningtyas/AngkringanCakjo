import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditMenu = () => {
    const { id } = useParams();
    const [namaMakanan, setNamaMakanan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [harga, setHarga] = useState('');
    const [kategori, setKategori] = useState([]);
    const [idKategori, setIdKategori] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getKategori();  // Fetch all categories
        getMenu();      // Fetch the menu details
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nama_makanan') setNamaMakanan(value);
        if (name === 'deskripsi') setDeskripsi(value);
        if (name === 'harga') setHarga(value);
        if (name === 'id_kategori') setIdKategori(value);
    };

    const getKategori = async () => {
        const response = await fetch('http://localhost:3000/api/kategori', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setKategori(data);  // Set the categories for the dropdown
    };

    const getMenu = async () => {
        const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNamaMakanan(data.nama_makanan);
        setDeskripsi(data.deskripsi);
        setHarga(data.harga);
        setIdKategori(data.id_kategori);  // Pre-select the category
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {
            nama_makanan: namaMakanan,
            deskripsi: deskripsi,
            harga: harga,
            id_kategori: idKategori
        };

        const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.error("Error while updating menu");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Update menu berhasil",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/menu';  // Redirect to the menu list
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Edit Menu</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Edit Menu</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/menu" className="btn btn-primary float-start">Lihat Data</Link>
                                    <h2 className="text-center">Edit Menu</h2>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama_makanan">Nama Makanan</label>
                                            <input
                                                type="text"
                                                value={namaMakanan}
                                                onChange={handleChange}
                                                name="nama_makanan"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deskripsi">Deskripsi</label>
                                            <textarea
                                                value={deskripsi}
                                                onChange={handleChange}
                                                name="deskripsi"
                                                className="form-control"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga">Harga</label>
                                            <input
                                                type="number"
                                                value={harga}
                                                onChange={handleChange}
                                                name="harga"
                                                className="form-control"
                                                required
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_kategori">Kategori</label>
                                            <select
                                                name="id_kategori"
                                                value={idKategori}
                                                onChange={handleChange}
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

export default EditMenu;
