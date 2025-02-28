import React from 'react';
import { NavLink } from 'react-router-dom';

    const Sidebar = () => {
    return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <NavLink to="index3.html" className="brand-link">
            <img 
            src="https://storage.googleapis.com/seo-cms/assets/large_Angkringan_Semanggi_Malang_eee7d9bd50/large_Angkringan_Semanggi_Malang_eee7d9bd50.jpg" 
            alt="AdminLTE Logo" 
            className="brand-image img-circle elevation-3" 
            style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">Angkringan CakJo</span>
        </NavLink>
        {/* Sidebar */}
        <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img 
                    src="https://nyatanya.com/wp-content/uploads/2023/10/9-ANGKRINGAN.jpg" 
                    className="img-circle elevation-2"
                     alt="User Image" />
                </div>
                <div className="info">
                    <a href="#" className="d-block">ANGKRINGAN CAKJO</a>
                </div>
            </div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
               
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
                <ul
                 className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview" 
                  role="menu" 
                  data-accordion="false">
                    
                    <li className="nav-item menu-open">
                        <ul className="nav nav-treeview">
                            <li className="nav-item">

                                <NavLink to="/admin/Dashboard" className="nav-link ">
                                    <i className="nav-icon fas fa-ellipsis-h" />
                                    <p>Dashboard </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink to="/admin/users" className="nav-link">
                                    <i className="nav-icon fas fa-users" />
                                   <p>User</p>
                               </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/admin/Menu" className="nav-link">
                                    <i className="nav-icon fas fa-file" />
                                    <p>Menu</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/Kategori" className="nav-link">
                                    <i className="nav-icon far fa-file" />
                                    <p>Kategori</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/Pelanggan" className="nav-link">
                                <i className="nav-icon fas fa-user-friends" />
                                    <p>Pelanggan</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/Penjualan" className="nav-link">
                                <i className="nav-icon fas fa-shopping-cart" />
                                <p>Penjualan</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/DetailTransaksi" className="nav-link">
                                <i className="nav-icon fas fa-file-invoice" />
                                <p>DetailTransaksi</p>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
    </aside>
    );
    };
    export default Sidebar
