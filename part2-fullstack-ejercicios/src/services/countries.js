import axios from 'axios';
const baseURl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(baseURl)
}

export default getAll;