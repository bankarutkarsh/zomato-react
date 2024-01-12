import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Details from './Details';
import Filters from "./Filters";
import Navbar from "./navbar";
import { useEffect, useState } from "react";

const Router = () =>{

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("https://zomato-apivercel.vercel.app/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
            })
            .then((response) => {
                if(response.status === 200) return response.json();
                throw new Error("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
        };

        getUser();
    }, []);

    return (
        <BrowserRouter>
        <Navbar user= {user} />
            <Routes>
                <Route path="/" element= {< Home/>} />
                <Route path="/Details" element= {< Details/>} />
                <Route path="/Filters" element= {< Filters/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;