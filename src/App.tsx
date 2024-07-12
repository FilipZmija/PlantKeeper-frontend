import React, { useEffect } from "react";
import Login from "./Auth/Login";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import MainView from "./Plants/MainView";
import NavBar from "./NavBar";
import axios from "axios";
import { login } from "./redux/authSlice";
import SpeedDialMenu from "./SpeedDail";
import BottomNavigation from "./BottomNavigation";
import { useWindowSize } from "./hooks/Size";
export default function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const exisitngToken = localStorage.getItem("token");
    if (exisitngToken)
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/data`,
            {
              headers: {
                Authorization: `Bearer ${exisitngToken}`,
              },
            }
          );
          const { id, name } = response.data;
          dispatch(login({ id, name, accessToken: exisitngToken }));
        } catch (e: any) {
          console.error(e);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      })();
    else setLoading(false);
  }, [dispatch]);

  return !loading ? (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="mt-16">
        {token ? <MainView /> : <Login />}
        <SpeedDialMenu className="hidden lg:block" />
      </div>
      <BottomNavigation className="block lg:hidden " />
    </div>
  ) : (
    <></>
  );
}
