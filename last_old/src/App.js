import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Collections from "./pages/collections";
import ItemCollcetions from "./pages/item-collections";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header/Header";
import Account from "./pages/Account";
import { useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAction } from "./store/Slices/RegisterSlice";

const App = (props) => {
   useLayoutEffect(() => {
      const getToken = localStorage.getItem("token");
      const getImage = localStorage.getItem("image");
      if (getToken) {
         console.log(getImage);
         dispatch(SignUpAction({ token: getToken, userImage: getImage }));
      }
   }, []);

   const { token } = useSelector((state) => state.register);
   const dispatch = useDispatch();

   return (
      <>
         {/*header*/}
         <Toaster />

         {/* main content */}
         {/*token not found*/}
         {!token && (
            <main>
               <Routes>
                  <Route
                     path="/signup"
                     element={
                        <>
                           <Signup />
                        </>
                     }
                  />
                  <Route
                     path="/signin"
                     element={
                        <>
                           <Signin />
                        </>
                     }
                  />
                  <Route path="*" element={<Navigate to={"/signup"} />} />
               </Routes>
            </main>
         )}
         {/*token found*/}
         {token && (
            <>
               <main className="main">
                  <Routes>
                     <Route
                        path="/"
                        element={
                           <Navigate to={"/collections"} replace={true} />
                        }
                        exact
                     ></Route>
                     <Route
                        path="/collections"
                        element={
                           <>
                              <Header />
                              <Collections />
                           </>
                        }
                        exact
                     />
                     <Route
                        path="/collections/:id"
                        element={
                           <>
                              <ItemCollcetions />
                           </>
                        }
                     />

                     <Route
                        path="/account"
                        element={
                           <>
                              <Header />
                              <Account />
                           </>
                        }
                        exact
                     />

                     <Route
                        path="/wishlist"
                        element={
                           <>
                              <Header />
                              <div>news wishlist</div>
                           </>
                        }
                     />
                     <Route
                        path="*"
                        element={<Navigate to={"/collections"} />}
                     />
                  </Routes>
               </main>
            </>
         )}
      </>
   );
};

export default App;
