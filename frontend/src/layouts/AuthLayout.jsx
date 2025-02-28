// import React from 'react'

import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const AuthLayout = () => {
    useEffect(() => {
        // Menambahkan class 'my-body-class' ke body saat komponen di-mount
        document.body.classList.add("login-page");

        //Membersihkan (menghapus class) saat komponen di-unmount
        return () => {
            document.body.classList.remove("login-page");
        };
      }, []); // [] memastikan
      return (
        <>
        <Suspense fallback={<Loader />}>{<Outlet />}</Suspense>
        </>
      );
};

export default AuthLayout;
