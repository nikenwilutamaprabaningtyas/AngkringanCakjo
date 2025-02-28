import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Kategori from "./pages/admin/Kategori";
import AddKategori from "./pages/admin/Addkategori";
import EditKategori from "./pages/admin/Editkategori";
import Menu from "./pages/admin/Menu";
import AddMenu from "./pages/admin/AddMenu";
import EditMenu from "./pages/admin/EditMenu";
import Penjualan from "./pages/admin/Penjualan";
import Addpenjualan from "./pages/admin/AddPenjualan";
import EditPenjualan from "./pages/admin/EditPenjualan";
import Users from "./pages/admin/Users";
import Addusers from "./pages/admin/AddUsers";
import EditUsers from "./pages/admin/EditUsers";
import Pelanggan from "./pages/admin/Pelanggan";
import AddPelanggan from "./pages/admin/AddPelanggan";
import EditPelanggan from "./pages/admin/EditPelanggan";
import DetailTransaksi from "./pages/admin/DetailTransaksi";
import AddDetailTransaksi from "./pages/admin/AddDetailTransaksi";
import EditDetailTransaksi from "./pages/admin/EditDetailTransaksi";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="Kategori" element={< Kategori />} />
            <Route path="addkategori" element={<AddKategori />} />
            <Route path="editkategori/:id" element={<EditKategori />} />

            <Route path="menu" element={< Menu />} />
            <Route path="addMenu" element={< AddMenu />} />
            <Route path="editMenu/:id" element={<EditMenu />} />

            <Route path="penjualan" element={< Penjualan />} />
            <Route path="addpenjualan" element={<Addpenjualan />} />
            <Route path="editpenjualan/:id" element={<EditPenjualan />} />

            <Route path="users" element={<Users />} />
            <Route path="addusers" element={<Addusers />} />
            <Route path="editusers/:id" element={<EditUsers />} />

            <Route path="pelanggan" element={< Pelanggan />} />
            <Route path="addpelanggan" element={<AddPelanggan />} />
            <Route path="editpelanggan/:id" element={<EditPelanggan />} />

            <Route path="detailtransaksi" element={< DetailTransaksi />} />
            <Route path="adddetailtransaksi" element={<AddDetailTransaksi />} />
            <Route path="editdetailtransaksi/:id" element={<EditDetailTransaksi />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;