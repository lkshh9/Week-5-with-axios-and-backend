// Page that shows admin all their courses they have created

import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {

        // function callback2(data) {
        //     setCourses(data.courses);
        // }
        // function callback1(res) {
        //     res.json().then(callback2)
        // }
        // fetch("http://localhost:3000/admin/courses/", {
        //     method: "GET",
        //     headers: {
        //         "Authorization": "Bearer " + localStorage.getItem("token")
        //     }
        // }).then(callback1)

        // USED  "axios - async and await" ⬇️ INSTEAD OF "⬆️ fetch and callback function"

        async function fetchCourses() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/admin/courses/", {
                    headers: {
                        "Authorization": `Bearer ${token}`   // "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }

        fetchCourses(); // Call the function

    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

export function Course({course}) {  // course destructuring instead of using props
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id); // why _id, bcoz mongodb defaults to _id for every unique id
            }}>Edit</Button>
        </div>
    </Card>

}



export default Courses;