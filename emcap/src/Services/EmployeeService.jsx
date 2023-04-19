import axios from "axios";

const apiPath = "http://localhost:8000/employee";
const apiPath1 = "http://localhost:8000/feedback";
const apiPath2 = "http://localhost:8000/project";

class EmployeeService{

    /* eslint-disable */
    getEmployees(){
        return axios.get(apiPath + '/');
    }

    updateEmployees(userId){
        return axios.put(apiPath + '/' + userId);
    }

    getFeedbacks(){
        return axios.get(apiPath1 + '/');
    }

    getProjects(){
        return axios.get(apiPath2 + '/');
    }
}

export default new EmployeeService;