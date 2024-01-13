import { useEffect, useState } from 'react'
import restCountries from './services/restcountries'
import Country from './components/Country'


function App() {
const [parsedCountries, setParsedCountries] = useState(null)
const [searchCountry, setSearchCountry] = useState('')
const [countriesToShow, setCountriesToShow] = useState([])

useEffect(()=> {
  console.log("Starting useEffect")
  if(!parsedCountries || parsedCountries === null){
    restCountries
    .getAll()
    .then(response => {
      console.log("RESPONSE")
      console.log(response)
      const countries = Array(...response)
      console.log(countries)
      setParsedCountries(countries.map(ct => {
        const Country =
        {
          name: ct.name.common,
          capital: ct.capital,
          area: ct.area,
          languages: ct.languages,
          flag: ct.flags.png
        }
        return Country
      }))
    })
    .catch(error => {
      console.log("Something went wrong: ",error)
    })
  } else{
    handleChangeFindCountry({target: {value: searchCountry}})
  }
  },[searchCountry])
  //END OF USEEFFECT

  console.log(parsedCountries)


const handleChangeFindCountry = (event) => {
  const newSearch = event.target.value
  const foundCountries = []
  setSearchCountry((oldSearchCountry) => {

    console.log("SEARCHING")
    parsedCountries.map((ctr) => {
      if(checkCountry(ctr, newSearch)){
        foundCountries.push(ctr)
      }
    })
    console.log("COUNTRIES TO SHOW")
    console.log(foundCountries)
    setCountriesToShow(foundCountries)
    return newSearch
  })
  }

const checkCountry = (count, newSearch) => {
  if(count.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()) || newSearch === '' || !newSearch){
    console.log("SEARCH VALUE")
    console.log(newSearch)
    console.log("FOUND")
    console.log(count)
    return(true)
  }
  return false
}

const handleSelectCountry = (country) => {
  setSearchCountry(country)
}

return(
  <>
    <h1>DSadsa</h1>
    <p>Searching: {searchCountry}</p>
    find countries: <input type="text" value={searchCountry} onChange={handleChangeFindCountry} />
    <Country countries={countriesToShow} funct={handleSelectCountry}/>

  </>
)
  }

export default App