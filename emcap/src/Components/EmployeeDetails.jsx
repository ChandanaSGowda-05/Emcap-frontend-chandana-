import React from 'react'
import "../css/Employee.css"
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Rate } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
// import EmployeeService from '../Service/EmployeeService';


//Displaying the data
const EmployeeDetails = () => {
  const [data, setData] = useState({})
  const params = useParams();

  useEffect(() => {
    const getUsers = async () => {
      /*eslint-disable*/
      const result = await fetch(`http://localhost:8000/employee/${params.id}`);
      const data = await result.json();
      setData(data)
    }
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

  //Initializing the data
  const [empid, setEmpid] = useState("");
  const [userId, setUserId] = useState(null);
  

  const [review, setReview] = useState("");
  const [reviewer, setReviewerName] = useState("");
  const [reviewerdesignation, setReviewerDesignation] = useState("");
  const [rating, setRating] = useState();
  const [feedbacktimestamp, setFeedbackTimeStamp] = useState(Date().toLocaleString());


  const [code, setCode] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [assignmentname, setAssignmentName] = useState("");
  const [projectmanager, setProjectManager] = useState("");
  const [assignmenttype, setAssignmentType] = useState("");

  const [order, setOrder] = useState("DSC");


  //Populate data
  function selectUser(id) {
    let item = data[id - 1];
    setEmpid(data.empid)
    setUserId(data.id)
  }

  //Capturing value of status and converting it to string
  //const stat = data.status;

  //Capturing the value of empid
  const empnum = data.empid;

  //Modal popup
  const [modal, setmodal] = useState(false)
  const [modal2, setmodal2] = useState(false)

  //Fetching the user feedbacks
  function getUserFeedback() {
    EmployeeService.getFeedbacks.then((result) => {
      result.json().then((resp) => {
        //console.log("result",resp)
        setUserFeedback(resp)
        // setReview(resp[0].review)
        // setReviewerName(resp[0].reviewer)
        // setReviewerDesignation(resp[0].reviewerdesignation)
        // setUserId(resp[0].userId)
      })
    })
  }

  //Fetching the user projects
  function getUserProject() {
    EmployeeService.getProjects.then((result) => {
      result.json().then((resp) => {
        //console.log("result",resp)
        setUserProject(resp)
        // setCode(resp[0].code)
        // setAssignmentName(resp[0].assignmentname)
        // setStartDate(resp[0].startdate)
        // setAssignmentType(resp[0].assignmenttype)
        // setUserId(resp[0].userId)
        // setEndDate(resp[0].enddate)
        // setProjectManager(resp[0].projectmanager)
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
  const dojdate = data.doj
  var date2 = new Date(dojdate);
  // To calculate the time difference of two dates
  var Difference_In_Time = date1.getTime() - date2.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  var tenure = (Difference_In_Days / 360).toFixed(1)

  //Validation for project
  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';

    if (assignmenttype === null || assignmenttype === '') {
      isproceed = false;
      errormessage += ' Assignment Type';
    }
    if (code === null || code === '') {
      isproceed = false;
      errormessage += ' Code';
    }
    if (assignmentname === null || assignmentname === '') {
      isproceed = false;
      errormessage += ' Assignment Name';
    }
    if ( projectmanager === null || projectmanager === '') {
      isproceed = false;
      errormessage += ' Project Manager';
    }
    if (startdate === null || startdate === '') {
      isproceed = false;
      errormessage += ' Start Date';
    }
    if (enddate === null || enddate === '') {
      isproceed = false;
      errormessage += ' End Date';
    }

    if (!isproceed) {
      toast.error(errormessage)
    }
    else {
      if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{3}$/.test(code)) {

      } else {
        isproceed = false;
        toast('Please enter a valid code')
      }

      if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(assignmentname)) {

      } else {
        isproceed = false;
        toast('Please enter a valid assignmentname')
      }

      if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(projectmanager)) {

      } else {
        isproceed = false;
        toast('Please enter a valid projectmanager')
      }

    }
    return isproceed;
  }

  //Assigning the project
  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { empid, code, startdate, enddate, assignmenttype, assignmentname, projectmanager };
    if (IsValidate()) {
      //console.log(regobj);

      EmployeeService.getProjects.then((res) => {
        toast.success('Assigning successful')
        res.json().then((resp) => {
        })
        setTimeout(() => {
          setmodal(false)
        }, 5000);

      }).catch((err) => {
        toast('Failed :' + err.message);
      });
    }
}

//Validation for feedback
const IsValidatee = () => {
  let isproceed = true;
  let errormessage = 'Please enter the value in ';

  if (review === null || review === '') {
    isproceed = false;
    errormessage += ' Review';
  }
  if (reviewer === null || reviewer === '') {
    isproceed = false;
    errormessage += ' Reviewer';
  }
  if (reviewerdesignation === null || reviewerdesignation === '') {
    isproceed = false;
    errormessage += ' Reviewer Designation';
  }
  if (rating === null || rating === '' || rating === undefined) {
    isproceed = false;
    errormessage += ' Rating';
  }
  
  
  if (!isproceed) {
    toast.error(errormessage)
  }
  else {
    if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(reviewer)) {

    } else {
      isproceed = false;
      toast('Please enter a valid Reviewer')
    }

    if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(reviewerdesignation)) {

    } else {
      isproceed = false;
      toast('Please enter a valid Reviewer Designation')
    }
  }
  return isproceed;
}

//Posting the feedback
const handlesubmitt = (e) => {
  e.preventDefault();
  let regobj = { empid, review, reviewer, reviewerdesignation, rating, feedbacktimestamp};
  if (IsValidatee()) {
    //console.log(regobj);
    EmployeeService.getFeedbacks.then((res) => {
      toast.success('Feedback Posted')
        res.json().then((resp) => {
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
  <div className="container" style={{ backgroundColor: '#e6f5ff' }}>
    {/* background image */}
    <img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70, marginLeft: 400 }}></img>
    <div style={{ backgroundImage: `url(${require('../images/img4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <br /><br /><br />

      {/* profile card */}
      <div className="card" style={{ width: '17rem', marginBottom: -250, marginLeft: 70, alignSelf: 'center' }}>

        {/* Profile photo */}
        <img src={data.photo} alt="pp" className="userpp"></img>


        {/* Employee profile details */}
        <br /> <br /><br />
        <div style={{ alignSelf: 'center', marginBottom: 20 }}>

          <h5 className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
            <b>{data.name}</b>
          </h5>

          <h6 key="{data.designation}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
              integration_instructions
            </span>&nbsp;
            {data.designation}
          </h6>
          <h6 key="{data.phone}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
              call
            </span>&nbsp;
            {data.phone}
          </h6>
          <h6 key="{data.empid}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
              badge
            </span>&nbsp;
            {data.empid}
          </h6>
          <h6 key="{data.doj}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
              calendar_month
            </span>&nbsp;
            {data.doj}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            {tenure}y
          </h6>
          <h6 key="{data.location}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
              location_on
            </span>&nbsp;
            {data.location}
          </h6>

        </div>
        </div>
      <br />
    </div>


    {/* Skills and Trainings card */}
    <br /><br />
    <div className="card" style={{ width: '18rem', float: 'right', right: 70 }}>
      <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
        Trainings and Poc's
      </div>

      <p className="card-text" style={{ marginLeft: 10 }} key="{data.training}">{data.training}</p>

    </div>
    <div className="card" style={{ width: '18rem', float: 'right', right: 110 }}>
      <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
        Skill
      </div>
      <p className="card-text" style={{ marginLeft: 10, color: 'green' }} key="{data.primaryskill}">
        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, color: 'green', marginTop: 4 }}>
          priority
        </span>&nbsp;
        {data.primaryskill}
      </p>
      <p className="card-text" style={{ marginLeft: 10 }} key="{data.skill}">{data.skill}</p>

    </div>

    {/* Adjustments Required */}
    <br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br />

    <div className="form-group row">
      <div className="form-group col" style={{ marginLeft: 0 }}>
        </div>


      <div className="form-group col" style={{ marginTop: 33 }}>
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

      <div className="form-group col" style={{ marginLeft: 10 }}>
        {/* Assigning details */}
        <br /><br />
        <button className='btn btn-secondary' onClick={() => { setmodal(true); selectUser(data.id) }}>
          Assign
        </button>
        <br />
        <br />
        <button className='btn btn-secondary' onClick={() => { setmodal2(true); selectUser(data.id) }}>
          Feedback
        </button>
      </div>
    </div>
    <br /><br /><br />

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

          <p>LID : {data.empid}</p>
          <p>GID : {data.empid}</p>
          <p>DOJ : {data.doj}</p>
          <p>Local Grade : {data.localgrade}</p>
          <p>People Manager : {data.peoplemanager}</p>
          <p>Booking type : {data.bookingtype}</p>

        </div>

        <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>

          <p>Client : {data.client}</p>
          <p>Base Location : {data.baselocation}</p>
          <p>Segment Employee CT : {data.segmentemployee}</p>
          <p>EL Mapping : {data.elmapping}</p>
          <p>Skill Group : {data.skillgroup}</p>
          <p>Final Grade : {data.finalgrade}</p>
          <p>EGO : {data.ego}</p>

        </div>
      </div>
    </div>

    <br /><br />

    {/* Project Model */}
    <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
      <ModalHeader toggle={() => setmodal(!modal)}>
        Assign Project/Training
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
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Status</label>
            <div className="col-sm-9">
              <select id="cars" className="form-control" name="assignmenttype" onChange={(e) => { setAssignmentType(e.target.value) }} >
                <option defaultValue>Select</option>
                <option value="Project">Project</option>
                <option value="Shadow Project">Shadow Project</option>
                <option value="Training">Training</option>
              </select>
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Code</label>
            <div className="col-sm-9">
              <input type="text" name="code" onChange={(e) => { setCode(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Assignment Name</label>
            <div className="col-sm-9">
              <input type="text" name="assignmentname" onChange={(e) => { setAssignmentName(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Manager/Trainer</label>
            <div className="col-sm-9">
              <input type="text" name="projectmanager" onChange={(e) => { setProjectManager(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
            <div className="col-sm-9">
              <input type="date" name="startdate" onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
            <div className="col-sm-9">
              <input type="date" name="enddate" onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Assign</button>
        </form>
      </ModalBody>
    </Modal>

    {/* Feedback Details */}
    <Modal size='me' isOpen={modal2} toggle={() => setmodal2(!modal2)}>
      <ModalHeader toggle={() => setmodal2(!modal2)}>
        Your feedbacks are important!
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handlesubmitt}>
        <ToastContainer />
          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
            <div className="col-sm-9">
              <input disabled type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Review</label>
            <div className="col-sm-9">
              <input type="text" name="reviewname" onChange={(e) => { setReview(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Reviewer</label>
            <div className="col-sm-9">
              <input type="text" name="reviewername" onChange={(e) => { setReviewerName(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Reviewer Designation</label>
            <div className="col-sm-9">
              <input type="text" name="reviewerdesignation" onChange={(e) => { setReviewerDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Rating</label>
            <div className="col-sm-4">
              <Rate onChange={(value) => { setRating(value) }} value={rating} name="rating"/>
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Date time</label>
            <div className="col-sm-9">
              <input type="text" name="reviewerdesignation" disabled onChange={(e) => { setFeedbackTimeStamp(e.target.value) }} value={feedbacktimestamp} className="form-control" id="colFormLabel" />
            </div>
          </div>
          <br />


          <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Submit</button>
        </form>
      </ModalBody>
    </Modal>
  </div>

)
}

export default EmployeeDetails

