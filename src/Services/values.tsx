import React from "react";
import MostPopularCourses from "../Components/Tables/MostPopularCourses";
import MostPopularTeachers from "../Components/Tables/MostPopularTeachers";

export const selectValues = [
    {
        value: "most_popular_courses",
        key: "most_popular_courses",
        label: "Find most popular courses",
        component: <MostPopularCourses />
    },
    {
        value: "most_popular_teachers",
        key: "most_popular_teachers",
        label: "Find most popular teachers",
        component: <MostPopularTeachers />
    },
];