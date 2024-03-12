import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

// App.js에 있는 Routes안에 있는 Route를 띄우려면 Outlet태그를 main 태그로 감싸준다 ==> 각각의 주소 '/', '/login', '/join'에 맞게 Layout이 표출됨
const Layout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
