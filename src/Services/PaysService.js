import axios from "axios";

function getCountry() {
    return axios.get(`http://127.0.0.1:3000/countries`);
}

function getCountriesById(id) {
    return axios.get(`http://127.0.0.1:3000/countries/${id}`);
}

export default {
    getCountry,
    getCountriesById
}