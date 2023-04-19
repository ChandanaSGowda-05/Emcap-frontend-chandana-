import axios from "axios";

const apiPath = "http://localhost:8000/manager";

class ManagerService{

    /* eslint-disable */
    getManagers(){
        return axios.get(apiPath + '/');
    }

    updateManagers(userId){
        return axios.put(apiPath + '/' + userId);
    }
}

export default new ManagerService;