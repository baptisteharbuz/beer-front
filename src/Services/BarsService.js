import axios from 'axios'


function getAllBars() {
    return axios.get(`http://127.0.0.1:3000/bars`);
}

function getBarsById(id) {
    return axios.get(`http://127.0.0.1:3000/bars/${id}`);
}


export default {
    getAllBars,
    getBarsById
};