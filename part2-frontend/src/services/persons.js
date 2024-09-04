import axios from 'axios'
const baseURl ='/api/persons'

const getAll = () => {
    return axios.get(baseURl)
}

const create = (personObject) => {
    return axios.post(baseURl, personObject)
}

const update = (id, personObject) => {
    return axios.put(`${baseURl}/${id}`, personObject)
}   

const deletePerson = (id) => {
    return axios.delete(`${baseURl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    deletePerson
}
