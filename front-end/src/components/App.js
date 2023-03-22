import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import {
  MainDashBoard,
  MainProduct,
  MainCatalog,
  MainRate,
  MainBill,
  MainUser,
  MainEmployee,
  MainStatistic,
} from "../static/AdminData";

import { path } from "../static/Router";
import {
  HomePage,
  IntroducePage,
  GiftPage,
  MenuPage,
  LoginPage,
  SignUpPage,
  ProductPage,
  MenuItemPage,
  HistoryPage,
  AdminPage,
} from "../static/Pages";
import "./../assets/styles/App.scss";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="admin/dashboard"
          element={
            <AdminPage>
              <MainDashBoard />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-danh-muc"
          element={
            <AdminPage>
              <MainCatalog />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-san-pham"
          element={
            <AdminPage>
              <MainProduct />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-nguoi-dung"
          element={
            <AdminPage>
              <MainUser />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-don-hang"
          element={
            <AdminPage>
              <MainBill />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-danh-gia"
          element={
            <AdminPage>
              <MainRate />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-nhan-vien"
          element={
            <AdminPage>
              <MainEmployee />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-thong-ke"
          element={
            <AdminPage>
              <MainStatistic />
            </AdminPage>
          }
        />
        {Object.values(path).map((route) => (
          <Route
            key={route}
            path={route}
            element={
              <Layout className="h-full bg-white">
                <Header />
                {route === path.home ? <HomePage /> : null}
                {route === path.introduce ? <IntroducePage /> : null}
                {route === path.menu ? <MenuPage /> : null}
                {route === path.gift ? <GiftPage /> : null}
                {route === path.login ? <LoginPage /> : null}
                {route === path.signup ? <SignUpPage /> : null}
                {route === path.history ? <HistoryPage /> : null}
                <Footer />
              </Layout>
            }
          />
        ))}

        <Route
          path="thuc-don"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <MenuPage />
              <Footer />
            </Layout>
          }
        />

        {/* MENU ROUTE */}
        <Route
          path="thuc-don/:menuid"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <MenuItemPage />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="thuc-don/:menuid/:productid"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <ProductPage />
              <Footer />
            </Layout>
          }
        />

        {/* ANOTHER ROUTE */}
        <Route
          path="*"
          element={
            <Layout className="h-full">
              <Header />
              <HomePage />
              <Footer />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
