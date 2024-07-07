import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";

// This Course component handles fetching and displaying data for a specific course, 
// updating the UI based on the state of the data fetch operation.
// The Course function is a React component that displays detailed information about a specific course. 
// It uses the useEffect hook to fetch course data from an API when the component mounts or when the courseId changes.

function Course() {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);
    
    useEffect(() => {

        // not used async await, just simple axios - let's try converting it to async, await

        axios.get("http://localhost:3000/admin/course/" + courseId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data.course);
        });

        // We can use async inside useEffect by declaring an async function within the useEffect hook and then calling it. 
        // This approach avoids directly passing an async function to useEffect, which is not supported.

        // const fetchCourse = async () => {
        //     try {
        //         const token = localStorage.getItem("token");
        //         const response = await axios.get(`http://localhost:3000/admin/course/${courseId}`, {
        //             headers: {
        //                 "Authorization": `Bearer ${token}`
        //             }
        //         });
        //         setCourse(response.data.course);
        //     } catch (error) {
        //         console.error("Error fetching course:", error);
        //     }
        // };

        // fetchCourse(); // Call the async function

    }, [courseId]); // Dependency array to re-fetch data if courseId changes

    if (!course) {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} /> // parent component setCourse passed down as a prop to its child component
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper({title}) {
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({course, setCourse}) {
    const [title, setTitle] = useState(course.title); // this course.title in useState enables the input box have the current value as the initial value rather than input box being empty
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value) // whenver someone changes the content of textfield onChange will be called and setTitle is updated with new target which will then update the state
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <Button
                variant="contained"
                onClick={async () => {
                    axios.put("http://localhost:3000/admin/courses/" + course._id, {
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        _id: course._id,
                        title: title,
                        description: description,
                        imageLink: image,
                        price
                    };
                    setCourse(updatedCourse);
                }}
            > Update course</Button>
        </div>
    </Card>
</div>
}

function CourseCard(props) {
    const course = props.course;
    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={course.imageLink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {course.price} </b>
            </Typography>
        </div>
    </Card>
    </div>
}

export default Course;