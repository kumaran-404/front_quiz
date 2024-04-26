

import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from "axios"
import CustomRouter from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import { jwtTokenHandler } from "./services/Auth.service"
import { Loader } from './components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [isLoading, changeLoading] = useState<Boolean>(true);

  const [isAuth, changeAuth] = useState<Boolean>(false);

  const [data, setData] = useState({ isAuth: false }) // for storing users data 

  useEffect(() => {

    (async () => {

      const res = await jwtTokenHandler()

      console.log(res)

      if (res[0]) {

        setData({ ...res[1], isAuth: true })
        changeAuth(true)
      }

      changeLoading(false)


    })()

  }, [])


  return (
    <div className="App">


      {

        isLoading ? <div className="main-loader">
          <Loader />
        </div> : <CustomRouter data={data} setData={setData} />

      }
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />

      <ToastContainer />
    </div>
  );
}

export default App;

