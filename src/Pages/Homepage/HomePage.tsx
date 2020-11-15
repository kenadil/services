import React from "react";
import Header from "../../Components/Header/Header";
import Home from "../../Components/Home/Home";
import "./HomePage.css";

const HomePage = () => {
    return (
        <>
            <Header>
                <span>Analytics</span>
            </Header>
            <Home />
        </>
    )
}

export default HomePage;