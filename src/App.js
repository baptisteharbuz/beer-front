import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BeersPage from './Pages/BeersPage'
import BeerDetailPage from './Pages/BeerDetailPage'
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const appElement = document.getElementById('root');
Modal.setAppElement(appElement);


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/beers"} element={<BeersPage />} />
          <Route path={"/beers/:id"} element={<BeerDetailPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        // style={{ width: '300px', height: 'auto' }}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;