import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditKategori = () => {
    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getKategori();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nama') setNama(value);
        if (name === 'deskripsi') setDeskripsi(value);
    }

    const getKategori = async () => {
        const response = await fetch(`http://localhost:3000/api/kategori/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNama(data.nama);
        setDeskripsi(data.deskripsi);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {
            nama,
            deskripsi
        };

        const response = await fetch(`http://localhost:3000/api/kategori/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.error("Error while updating category");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Update kategori berhasil",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/kategori'; 
            })
        }
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col">
                            <h1 className="m-0">Data Kategori</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Edit Kategori</li>
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
                                    <Link to="/admin/kategori" className="btn btn-primary float-start">Lihat Data</Link>
                                    <h2 className="text-center">Edit Kategori</h2>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama">Nama Kategori</label>
                                            <input
                                                type="text"
                                                value={nama}
                                                onChange={handleChange}
                                                name="nama"
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
}

export default EditKategori;
