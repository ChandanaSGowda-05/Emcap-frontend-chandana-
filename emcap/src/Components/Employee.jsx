import React from 'react'
import "../css/Employee.css"
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Rate } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


//Displaying the data
const Employee = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])

    const [userfeedback, setUserFeedback] = useState([])
    useEffect(() => {
        getUserFeedback();
    }, [])

    const [userproject, setUserProject] = useState([])

    useEffect(() => {
        getUserProject();
    }, [])

    const [order, setOrder] = useState("DSC");


    //Initializing the data
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [doj, setDoj] = useState("");
    const [empid, setEmpid] = useState("");
    const empnum = empid;
    const [skill, setSkill] = useState("");
    const [primaryskill, setPrimarySkill] = useState("");
    const [training, setTraining] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [userId, setUserId] = useState(null);
    const [localgrade, setLocalGrade] = useState("");
    const [peoplemanager, setPeopleManager] = useState("");

    const [bookingtype, setBookingType] = useState("");
    const [client, setClient] = useState("");
    const [baselocation, setBaseLocation] = useState("");
    const [segmentemployee, setSegmentEmployee] = useState("");
    const [elmapping, setELMapping] = useState("");
    const [skillgroup, setSkillGroup] = useState("");
    const [finalgrade, setFinalGrade] = useState("");
    const [ego, setEGO] = useState("");
    const [status, setStatus] = useState("");

    const [review, setReview] = useState("");
    const [reviewer, setReviewerName] = useState("");
    const [reviewerdesignation, setReviewerDesignation] = useState("");
    const [reviewerphoto, setReviewerPhoto] = useState("");
    const [rating, setRating] = useState();
    const [feedbacktimestamp, setFeedbackTimeStamp] = useState(Date().toLocaleString());

    const [code, setCode] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [assignmentname, setAssignmentName] = useState("");
    const [projectmanager, setProjectManager] = useState("");
    const [assignmenttype, setAssignmentType] = useState("");

    //Fetching the data
    function getUsers() {
        fetch("http://localhost:8000/employee").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setData(resp)
                setName(resp[0].name)
                setDesignation(resp[0].designation)
                setDoj(resp[0].doj)
                setEmpid(resp[0].empid)
                setSkill(resp[0].skill)
                setPrimarySkill(resp[0].primaryskill)
                setTraining(resp[0].training)
                setUserId(resp[0].userId)
                setLocation(resp[0].location)
                setPhone(resp[0].phone)
                setPhoto(resp[0].photo)
                setLocalGrade(resp[0].localgrade)
                setPeopleManager(resp[0].peoplemanager)
                setStartDate(resp[0].startdate)
                setEndDate(resp[0].enddate)
                setBookingType(resp[0].bookingtype)
                setClient(resp[0].client)
                setBaseLocation(resp[0].baselocation)
                setSegmentEmployee(resp[0].segmentemployee)
                setELMapping(resp[0].elmapping)
                setSkillGroup(resp[0].skillgroup)
                setFinalGrade(resp[0].finalgrade)
                setEGO(resp[0].ego)
                setStatus(resp[0].status)
            })
        })
    }

    //capturing value of status and converting it to string
    //const stat = status.toString();

    //Modal popup
    const [modal, setmodal] = useState(false)

    //Populating the data
    function selectUser(id) {
        let item = data[id - 1];
        setName(item.name)
        setDesignation(item.designation)
        setDoj(item.doj)
        setEmpid(item.empid)
        setSkill(item.skill)
        setPrimarySkill(item.primaryskill)
        setTraining(item.training)
        setUserId(item.id)
        setLocation(item.location);
        setPhone(item.phone);
        setPhoto(item.photo);
    }

    //Converting image to base64 format
    const converttobase64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result.toString());
        };

        reader.readAsDataURL(file);
        console.log(reader)
    };

    //Fetching userfeedbacks
    function getUserFeedback() {
        fetch("http://localhost:8000/feedback").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserFeedback(resp)
                setReview(resp[0].review)
                setReviewerName(resp[0].reviewer)
                setReviewerDesignation(resp[0].reviewerdesignation)
                setUserId(resp[0].userId)
                setReviewerPhoto(resp[0].reviewerphoto)
                setRating(resp[0].rating)
                setFeedbackTimeStamp(resp[0].feedbacktimestamp)
            })
        })
    }

    //Fetching the user projects
    function getUserProject() {
        fetch("http://localhost:8000/project").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserProject(resp)
                setCode(resp[0].code)
                setAssignmentName(resp[0].assignmentname)
                setStartDate(resp[0].startdate)
                setAssignmentType(resp[0].assignmenttype)
                setUserId(resp[0].userId)
                setEndDate(resp[0].enddate)
                setProjectManager(resp[0].projectmanager)
            })
        })
    }

    //latest project first using the sort func
    const sorting = (col) => {

        if (order === "DSC") {
            const sorted = [...userproject].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setUserProject(sorted);
            setOrder("DSC")
        }
    };

    //Tenure calculation
    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    var date1 = new Date(currentdate);
    const dojdate = doj
    var date2 = new Date(dojdate);
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    var tenure = (Difference_In_Days / 360).toFixed(1)

    //Validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (doj === null || doj === '') {
            isproceed = false;
            errormessage += ' Date of Birth';
        }
        if (primaryskill === null || primaryskill === '') {
            isproceed = false;
            errormessage += ' Skill';
        }
        if (skill === null || skill === '') {
            isproceed = false;
            errormessage += ' Skill';
        }
        if (training === null || training === '') {
            isproceed = false;
            errormessage += ' Training';
        }
        if (phone === null || phone === '') {
            isproceed = false;
            errormessage += ' Contact';
        }
        if (location === null || location === '') {
            isproceed = false;
            errormessage += ' Location';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
              if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

              } else {
                isproceed = false;
                toast('Please enter a valid name')
              }
            //   if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(doj)) {

            //   } else {
            //     isproceed = false;
            //     toast('Please enter a valid date of birth')
            //   }
            if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(primaryskill)) {

            } else {
              isproceed = false;
              toast('Please enter a valid primary skill')
            }
              if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(skill)) {

              } else {
                isproceed = false;
                toast('Please enter a valid skill')
              }
              if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(training)) {

              } else {
                isproceed = false;
                toast('Please enter a valid training')
              }
               if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{4,4}$/.test(phone)){

               } else{
                 isproceed = false;
                 toast('Please enter a valid contact number')
               }
               if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(location)) {

               } else {
                 isproceed = false;
                 toast('Please enter a valid location')
               }
        }
        return isproceed;
    }

    //Updating the data
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { name, designation, doj, empid, skill, primaryskill, training, location, phone, photo,
            localgrade, peoplemanager, startdate, enddate, bookingtype,
            client, baselocation, segmentemployee, elmapping, skillgroup, finalgrade,
            ego, status, review, reviewer, reviewerdesignation, reviewerphoto, feedbacktimestamp,
            rating, code, assignmenttype, assignmentname, projectmanager };
        if (IsValidate()) {
            //console.log(regobj);

            fetch(`http://localhost:8000/employee/${userId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUsers()
                })
                setTimeout(() => {
                    setmodal(false)
               }, 5000);
                
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Code
    return (
        <div className="container" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            {/* background image */}
            <img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70, marginLeft: 400 }}></img>
            <div style={{ backgroundImage: `url(${require('../images/img2.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br /><br /><br />

                {/* profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -250, marginLeft: 70, alignSelf: 'center' }}>
                    {
                        data.map((item => (
                            <>
                                {/* Profile photo */}
                                <img src={item.photo} alt="pp" key="{item.photo}" className="userpp"></img>
                            </>
                        )))
                    }


                    {/* Employee profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>
                        {
                            data.map((item) => (
                                <>
                                    <h5 key="{item.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                        <b>{item.name}</b>
                                    </h5>

                                    {/* Status of the employee (1-Project, 2-Shadow, 3-Training, 4-Bench) */}
                                    {/* {stat === "1" ?
                                        <h6 key="{item.status}" className="card-text" style={{ color: '#00ff00', fontSize: 15 }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                work
                                            </span>&nbsp;
                                            Project
                                        </h6> : stat === "2" ?
                                            <h6 key="{item.status}" className="card-text" style={{ color: '#ffcc00', fontSize: 15 }}>
                                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                    work
                                                </span>&nbsp;
                                                Shadow
                                            </h6> : stat === "3" ?
                                                <h6 key="{item.status}" className="card-text" style={{ color: '#0000ff', fontSize: 15 }}>
                                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                        work
                                                    </span>&nbsp;
                                                    Training
                                                </h6> : <h6 key="{item.status}" className="card-text" style={{ color: '#ff0000', fontSize: 15 }}>
                                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                        work
                                                    </span>&nbsp;
                                                    Bench
                                                </h6>
                                    } */}

                                    <h6 key="{item.designation}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            integration_instructions
                                        </span>&nbsp;
                                        {item.designation}
                                    </h6>
                                    <h6 key="{item.phone}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            call
                                        </span>&nbsp;
                                        {item.phone}
                                    </h6>
                                    <h6 key="{item.empid}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            badge
                                        </span>&nbsp;
                                        {item.empid}
                                    </h6>
                                    <h6 key="{item.doj}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            calendar_month
                                        </span>&nbsp;
                                        {item.doj}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                        {tenure}y
                                    </h6>
                                    <h6 key="{item.location}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            location_on
                                        </span>&nbsp;
                                        {item.location}
                                    </h6>
                                </>
                            ))
                        }
                    </div>
                </div>


                {/* <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 23, height: 23, marginLeft: 185, cursor: 'pointer', zindex:-1, position:'relative' }} fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg> */}
                <br />
            </div>

            {/* Edit button */}
            {
                data.map((item) => (
                    <>
                        <br />
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setmodal(true); selectUser(item.id) }} style={{ width: 18, height: 18, float: 'right', cursor: 'pointer' }} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </>
                ))
            }

            {/* Skills and Trainings card */}
            <br />
            <div className="card" style={{ width: '18rem', float: 'right', right: 70 }}>
                <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                    Trainings and Poc's
                </div>
                {
                    data.map((item) => (
                        <>
                            <p className="card-text" style={{ marginLeft: 10 }} key="{item.training}">{item.training}</p>
                        </>
                    ))
                }
            </div>
            <div className="card" style={{ width: '18rem', float: 'right', right: 110 }}>
                <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                    Skill
                </div>
                {data.map((item) => (
                    <>
                        <p className="card-text" style={{ marginLeft: 10, color: 'green' }} key="{item.primaryskill}">
                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, color: 'green', marginTop: 4 }}>
                                priority
                            </span>&nbsp;
                            {item.primaryskill}
                        </p>
                        <p className="card-text" style={{ marginLeft: 10 }} key="{item.skill}">{item.skill}</p>
                    </>
                ))}
            </div>


            {/* Adjustments Required */}
            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br />

            <div className="form-group row">
                <div className="form-group col" style={{ marginLeft: 0 }}>
                    {/* Ongoing Activity details based on status of the employee */}
                    {/* <h5 style={{ marginLeft: 78 }}>Ongoing activity</h5> */}
                    {/*{stat === "1" ?
                        <div className="card" style={{ width: '20rem' }}>
                            <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                                Project Details
                            </div>
                            {
                                data.map((item) => (
                                    <>
                                        <p className="card-text" style={{ marginLeft: 10 }}><b>Project Code - </b>{item.projectcode}</p>
                                        <p className="card-text" style={{ marginLeft: 10 }}><b>Project Name - </b>{item.projectname}</p>
                                        <p className="card-text" style={{ marginLeft: 10 }}><b>Project Manager - </b>{item.projectmanager}</p>
                                        <p className="card-text" style={{ marginLeft: 10 }}><b>Project Start Date - </b>{item.startdate}</p>
                                        <p className="card-text" style={{ marginLeft: 10 }}><b>Project End Date - </b>{item.enddate}</p>
                                    </>
                                ))
                            }

                        </div> : stat === "2" ?
                            <div className="card" style={{ width: '20rem' }}>
                                <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                                    Shadow Project Details
                                </div>
                                {
                                    data.map((item) => (
                                        <>
                                            <p className="card-text" style={{ marginLeft: 10 }}><b>Project Code - </b>{item.projectcode}</p>
                                            <p className="card-text" style={{ marginLeft: 10 }}><b>Project Name - </b>{item.projectname}</p>
                                            <p className="card-text" style={{ marginLeft: 10 }}><b>Project Manager - </b>{item.projectmanager}</p>
                                            <p className="card-text" style={{ marginLeft: 10 }}><b>Project Start Date - </b>{item.startdate}</p>
                                            <p className="card-text" style={{ marginLeft: 10 }}><b>Project End Date - </b>{item.enddate}</p>
                                        </>
                                    ))
                                }

                            </div> : stat === "3" ?
                                <div className="card" style={{ width: '20rem' }}>
                                    <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                                        Training Details
                                    </div>
                                    {
                                        data.map((item) => (
                                            <>
                                                <p className="card-text" style={{ marginLeft: 10 }}><b>Training Name - </b>{item.trainingname}</p>
                                                <p className="card-text" style={{ marginLeft: 10 }}><b>Trainer - </b>{item.trainer}</p>
                                                <p className="card-text" style={{ marginLeft: 10 }}><b>Training Start Date - </b>{item.startdate}</p>
                                                <p className="card-text" style={{ marginLeft: 10 }}><b>Training End Date - </b>{item.enddate}</p>
                                            </>
                                        ))
                                    }

                                </div> : <div className="card" style={{ width: '20rem' }}>
                                    <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                                        No Ongoing Acitvities
                                    </div>
                                    <p className="card-text" style={{ marginLeft: 10 }}> - </p>
                                </div>
                    } */}
                </div>

                <div className="form-group col" style={{ marginRight: 350 }}>
                    {/* Feedback details */}
                    <div className="card" style={{ width: '25rem' }}>
                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {userfeedback.map((item) => {
                                    const str = item.reviewer[0];
                                    if (item.empid === empnum)
                                        return (
                                            <div className="carousel-item">
                                                <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 20, marginRight: 20 }}>
                                                    <h1 className="rounded-circle img-thumbnail" style={{ float: 'left', width: 60, height: 60, textAlign: 'center', backgroundColor: 'steelblue' }}>{str}</h1>
                                                    <h6 className="font-italic lead" style={{ marginLeft: 100 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                                                            <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                                                        </svg>
                                                        {item.review}
                                                        <br /><cite title="Source Title" style={{ fontSize: 12 }}>&nbsp;<Rate disabled onChange={(value) => {
                                                            setRating(value)
                                                        }} value={item.rating} /></cite><br /><br />
                                                        <footer className="blockquote-footer">{item.reviewer}&sbquo;
                                                            <cite title="Source Title">&nbsp;{item.reviewerdesignation}</cite>
                                                            <br /><br />
                                                            <cite title="Source Title" style={{ fontSize: 12 }}>&nbsp;{item.feedbacktimestamp}</cite>
                                                        </footer>
                                                    </h6>
                                                </div>
                                            </div>

                                        )
                                    return null
                                })
                                }
                                <div className="carousel-item active">
                                    <h5 style={{ backgroundColor: '#f0f0f5', textAlign: "center" }}><br /><br />Time for feedback!<br /><br /><br /></h5>
                                </div>

                            </div>


                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <br /><br />

            {/*Project details section */}
            <h5 style={{ textAlign: 'center' }}>Employee Project/Training Details</h5>
            <br />
            <div className="card" style={{ width: '61rem', marginLeft: 70 }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Assignment Type</th>
                            <th>Code</th>
                            <th>Assignment Name</th>
                            <th>Project Manager/Trainer</th>
                            <th onClick={() => sorting("startdate")} style={{ cursor: 'pointer' }}>
                                Start data
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, marginTop: 5 }}>
                                    filter_list
                                </span>
                            </th>
                            <th>End date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userproject.map((item) => {
                            if (item.empid === empnum)
                                return (
                                    <>
                                        <tr>
                                            <td>{item.assignmenttype}</td>
                                            <td>{item.code}</td>
                                            <td>{item.assignmentname}</td>
                                            <td>{item.projectmanager}</td>
                                            <td>{item.startdate}</td>
                                            <td>{item.enddate}</td>
                                        </tr>
                                    </>
                                )
                            return (null)
                        })}

                    </tbody>
                </table>
            </div>
            <br /><br />

            {/*More details section */}
            <h5 style={{ textAlign: 'center' }}>Additional Employee Details</h5>
            <br />
            <div className="card" style={{ width: '61rem', marginLeft: 70, backgroundColor: '#f0f0f5' }}>
                <div className="form-group row">
                    <div className="form-group col" style={{ marginLeft: 40, marginTop: 20, textAlign: 'justify' }}>
                        {
                            data.map((item) => (
                                <>
                                    <p>LID : {item.empid}</p>
                                    <p>GID : {item.empid}</p>
                                    <p>DOJ : {item.doj}</p>
                                    <p>Local Grade : {item.localgrade}</p>
                                    <p>People Manager : {item.peoplemanager}</p>
                                    <p>Booking type : {item.bookingtype}</p>
                                </>
                            ))
                        }
                    </div>

                    <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>
                        {
                            data.map((item) => (
                                <>
                                    <p>Client : {item.client}</p>
                                    <p>Base Location : {item.baselocation}</p>
                                    <p>Segment Employee CT : {item.segmentemployee}</p>
                                    <p>EL Mapping : {item.elmapping}</p>
                                    <p>Skill Group : {item.skillgroup}</p>
                                    <p>Final Grade : {item.finalgrade}</p>
                                    <p>EGO : {item.ego}</p>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>

            <br /><br />

            {/*Modal data */}
            <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Update your Profile
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input disabled type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input disabled type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">DOJ</label>
                            <div className="col-sm-9">
                                <input type="date" name="doj" value={doj} onChange={(e) => { setDoj(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Primary Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="primaryskill" value={primaryskill} onChange={(e) => { setPrimarySkill(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="skill" value={skill} onChange={(e) => { setSkill(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Trainings/POC</label>
                            <div className="col-sm-9">
                                <input type="text" name="training" value={training} onChange={(e) => { setTraining(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Contact</label>
                            <div className="col-sm-9">
                                <input type="number" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-9">
                                <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => converttobase64(e)} className="form-control" id="file1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="photo" value={photo} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
                            </div>
                        </div>

                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

        </div>
    )
}

export default Employee
