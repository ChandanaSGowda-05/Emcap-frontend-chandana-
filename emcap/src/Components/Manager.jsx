import React from 'react'
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


//Displaying the manager data
const Manager = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getManagers();
    }, [])

    const [userdata, setUserData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])


    //Initializing the data
    const [name, setName] = useState("");
    const [empid, setEmpid] = useState("");
    const [photo, setPhoto] = useState("");
    const [userId, setUserId] = useState(null);
    const [inputt, setInput] = useState("");


    //Fetching the manager data
    function getManagers() {
        fetch("http://localhost:8000/manager").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setData(resp)
                setName(resp[0].name)
                setEmpid(resp[0].empid)
                setUserId(resp[0].userId)
                setPhoto(resp[0].photo)
            })
        })
    }

    //Modal popup
    const [modal, setmodal] = useState(false)

    //Populating the data
    function selectUser(id) {
        let item = data[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
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

    //Fetching the Employee data
    function getUsers() {
        fetch("http://localhost:8000/employee").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserData(resp)
                setName(resp[0].name)
                setEmpid(resp[0].empid)
                setUserId(resp[0].userId)
                setPhoto(resp[0].photo)
            })
        })
    }

    //Validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
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

        }
        return isproceed;
    }

    //Updating the data
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { name, empid, photo };
        if (IsValidate()) {
            //console.log(regobj);

            fetch(`http://localhost:8000/manager/${userId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getManagers()
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

            {/* Background image */}
            <img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70, marginLeft: 400 }}></img>
            <div style={{ backgroundImage: `url(${require('../images/img4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br />

                {/* Search button */}
                <div className="input-group" style={{ marginLeft: 290 }}>
                    <div className="form-outline col-sm-10">
                        <input type="search" value={inputt} onChange={(e) => setInput(e.target.value)} id="form1" className="form-control" placeholder="Search" />
                    </div>
                    <button id="search-button" type="button" className="btn btn-dark">
                        <FaSearch id="search-icon" />
                    </button>
                </div>
                <br /><br />

                {/* Profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -180, marginLeft: 70, alignSelf: 'center' }}>
                    {
                        data.map((item => (
                            <>
                                {/* Profile photo */}
                                <img src={item.photo} alt="pp" key="{item.photo}" className="userpp"></img>
                            </>
                        )))
                    }

                    {/* Manager profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>
                        {
                            data.map((item) => (
                                <>


                                    <h5 key="{item.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                        <b>{item.name}</b>
                                    </h5>

                                    <h6 key="{item.empid}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                            badge
                                        </span>&nbsp;
                                        {item.empid}
                                    </h6>
                                </>
                            ))
                        }
                    </div>
                </div>
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

            {/* Adjustments Required */}
            <br /><br /><br /><br /><br /><br />
            <br />

            {/* Search Component */}
            <h5 style={{ textAlign: 'center' }}>Employee Data</h5>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Empid</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Primary Skill</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.filter((item) => {
                        return inputt.toLowerCase() === '' ? item : item.name.toLowerCase().includes(inputt);
                    }).map((item) => (
                        <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.designation}</td>
                                <td>{item.primaryskill}</td>
                                <td>{item.location}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <button className="btn btn-light btn-sm">
                                        <Link to={`/employeedetails/${item.id}`}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                info
                                            </span>
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

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
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
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

export default Manager
