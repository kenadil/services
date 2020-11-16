import React from "react";
import HomePageLayout from "../../Components/Layout/HomePage/HomePageLayout";
import "./HomePage.css";

const HomePage = () => {
  const generateData = () => {
    const users = [];
    for (var i = 0; i < 46; i++) {
      users.push({
        key: i,
        id: i < 10 ? "18011000" + i : "1801100" + i,
        name: "Naruto Uzumaki " + i,
        date: "Nov 15, 2020",
        enrollments: Math.round(Math.random() * (8 - 1) + 1),
        gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      });
    }
    for (i = 100; i < 500; i++) {
      users.push({
        key: i,
        id: "180110" + i,
        name: "Naruto Uzumaki " + i,
        date: "Nov 15, 2020",
        enrollments: Math.round(Math.random() * (8 - 1) + 1),
        gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      });
    }
    const data = {
      users: users
    }
    var json = JSON.stringify(data);
    var fs = require('fs');
    fs.writeFile('userTest.json', json, 'utf8');
  };
  return (
    <>
      <HomePageLayout name="I AM THE STORM THAT IS APPROACHING" onClick={generateData} />
    </>
  );
};

export default HomePage;
