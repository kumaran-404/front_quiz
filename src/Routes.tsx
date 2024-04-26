import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { } from "react-router"
import Create from "./pages/Admin/Create";
import Fetch from "./pages/Admin/Fetch";
import Admin from "./pages/Admin";
const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"))


function CustomRouter({ data, setData }: { data: any, setData: any }) {

    if (data.isAuth) {


        return (

            <div >
                {data.isAdmin ? 
                <div className="flex items-center gap-10 p-10 ">
                 <BrowserRouter>
                    <Admin></Admin>
                    <Routes>
                        <Route path="/create" element={<Create></Create>}></Route>
                        <Route path="/fetch" element={<Fetch></Fetch>}></Route>
                        <Route path="*" element={<Navigate to="/create"></Navigate>}></Route>
                    </Routes>
                </BrowserRouter>
                </div>
                :
                    <BrowserRouter>
                        <Suspense >
                            <Routes>
                                <Route path="/" element={<HomePage data_={data} />}></Route>
                                <Route path="*" element={<Navigate to={"/"}></Navigate>} ></Route>
                            </Routes>
                        </Suspense>
                    </BrowserRouter>}
            </div>

        )

    }


    return (
        <BrowserRouter>
            <Suspense >
                <Routes>
                    <Route path="/" element={<Login admin={false} />}></Route>
                    <Route path="/admin" element={<Login admin={true} />}></Route>
                    <Route path="*" element={<Navigate to={"/"}></Navigate>} ></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}




export default CustomRouter;