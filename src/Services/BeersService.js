import axios from 'axios'


function getBeers() {
    return axios.get(`http://127.0.0.1:3000/beers`);
}

function getBeersById(id) {
    return axios.get(`http://127.0.0.1:3000/beers/${id}`);
}

function addBeer(newbeer) {
    return axios.post(`http://127.0.0.1:3000/beers/`, newbeer);
}

function modifyBeer(id, newdata) {
    return axios.put(`http://127.0.0.1:3000/beers/${id}/`, newdata);
}

function deleteBeerById(id) {
    return axios.delete(`http://127.0.0.1:3000/beers/${id}`);
}

export default {
    getBeers,
    getBeersById,
    addBeer,
    modifyBeer,
    deleteBeerById
};