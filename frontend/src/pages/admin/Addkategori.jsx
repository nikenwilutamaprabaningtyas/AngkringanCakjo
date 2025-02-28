import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddKategori = () => {
    const token = localStorage.getItem('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }

        const response = await fetch("http://localhost:3000/api/kategori", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Fixing the Authorization header
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log("Error while saving category.");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Kategori Berhasil Disimpan",
                timer: 1000,
            }).then(() => {
                window.location.href = '/admin/kategori';
            });
        }
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Input Kategori</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Kategori</li>
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
                                    <Link to="/admin/kategori" className="btn btn-primary float-start">Lihat data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama">Nama Kategori</label>
                                            <input type="text" name="nama" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deskripsi">Deskripsi</label>
                                            <textarea name="deskripsi" className="form-control" required></textarea>
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

export default AddKategori;
