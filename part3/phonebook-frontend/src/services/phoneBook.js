import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
    .catch(error => {
      console.log(`Error retrieving data: ${error}`)
    })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
    .catch(error => {
      console.log(`Error inserting new dara: ${error}`)
    })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => {
    return response.data
  })
    .catch(error => {
      console.log(`Error updating data: ${error}`)
    })
}

const erase = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(`Error deleting data: ${error}`)
    })
}

export default { create, update, getAll, erase }