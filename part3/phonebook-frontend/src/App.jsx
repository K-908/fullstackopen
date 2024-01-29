import { useEffect, useState } from 'react'
import Person from './components/Person'
import phoneBook from './services/phoneBook'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)
  const [isBad, setIsBad] = useState(false)

useEffect(() => {
  phoneBook
  .getAll()
  .then(newData => {
    setPersons(newData)
  })
}, [phoneBook])

//Add users
const handleClickAddButton = (event) => {
  event.preventDefault();
  let isNewName = true;
  let isNewPhone = true;
  let updatingPhoneId = 0;
  //Inputs can't be empty
  if(newName === '' || newPhone === ''){
    setMessage('Name and phone can\'t be left blank')
    setIsBad(true)
  } else{
    //Check if the name or the number are already on the list
    persons.forEach(nm => {
      if(nm.name === newName && nm.number != newPhone) {
        updatingPhoneId = nm.id
      }
      if(nm.name === newName){
        isNewName = false
      }
      if(nm.number === newPhone){
        isNewPhone = false
      }
    })
    //If the data is new
    if(isNewName && isNewPhone){
      phoneBook.create({name: newName, number: newPhone})
    } else if(!isNewName && isNewPhone){
      if(confirm(`${newName} is alredy in the phonebook. Replace the old number with a new one?`)){
        phoneBook.update(updatingPhoneId, {name: newName, number: newPhone})
      }
    }
    else{
      if(!isNewName){
        setMessage(`${newName} is already added to phonebook`);
        setIsBad(true)
      } else if(!isNewPhone){
        setMessage(`${newPhone} is already being used`)
        setIsBad(true)
      }
    }
    //Erase data in inputs.
    setMessage(`Added ${newName} to the phonebook`)
    setIsBad(false)
    setNewName('')
    setNewPhone('')
  }
}

const handleTypeNewName = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
  setMessage(null)
}

const handleTypeNumber = (event) => {
  console.log(event.target.value)
  setNewPhone(event.target.value)
  setMessage(null)
}

const handleTypeSearch = (event) => {
  console.log(event.target.value)
  setSearchText(event.target.value)
  setMessage(null)
}

const handleClickDelete = (id, name) => {
  if(window.confirm(`Delete ${name}?`)){
    phoneBook.erase(id)
  }
  setMessage(`Information on ${name} has been deleted`)
  setIsBad(true)
}

const showFilteredPerson = (prs) => {
  if(
    prs.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
    || prs.number.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
    || searchText === ''){
    return (<Person key={prs.id} person = {prs} func={() => handleClickDelete(prs.id, prs.name)}/>)
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} bad={isBad} />
      <form>
        <div>
          filter shown with <input value={searchText} onChange={handleTypeSearch} />
          <br /><br />
        </div>
        <div>
          name: <input value={newName} onChange={handleTypeNewName} />
          <br /><br />
          phone: <input value={newPhone} onChange={handleTypeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleClickAddButton}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(prs => 
        showFilteredPerson(prs)
        )}
    </div>
  )
}

export default App