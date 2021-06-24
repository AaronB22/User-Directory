import axios from "axios";

export default{
    search: function(search){
        return axios.get('https://randomuser.me/api/')
    }
}