import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const result = axios.get(`${baseUrl}all`)
  return result.then(response => {
    return response.data
  }).catch(error => {
    console.log("Error getting data: ", error)
  })
}

const getSingleCountry = (name) => {
  const result = axios.get(`${baseUrl}name/${name}`)
  return result.then(response => {
    return response.data
  }).catch(error => {
    console.log("Error getting single country: ", error)
  })
}

export default { getAll, getSingleCountry }