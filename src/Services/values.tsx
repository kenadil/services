import React from "react";
import CalculateGPA from "../Components/Tables/CalculateGPA";
import FindExpenses from "../Components/Tables/FindExpenses";
import MissingStudents from "../Components/Tables/MissingStudents";
import MostPopularCourses from "../Components/Tables/MostPopularCourses";
import MostPopularTeachers from "../Components/Tables/MostPopularTeachers";
import TeacherSchedule from "../Components/Tables/TeacherSchedule";

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
    {
        value: "calculate_gpa",
        key: "calculate_gpa",
        label: "Calculate student's GPA and Total",
        component: <CalculateGPA />
    },
    {
        value: "missing_students",
        key: "missing_students",
        label: "Find unregistered students",
        component: <MissingStudents />
    },
    {
        value: "find_expenses",
        key: "find_expenses",
        label: "Calculate term and total retake expenses",
        component: <FindExpenses />
    },
    {
        value: "teacher_schedule",
        key: "teacher_schedule",
        label: "Design teacher schedule",
        component: <TeacherSchedule />
    },
];