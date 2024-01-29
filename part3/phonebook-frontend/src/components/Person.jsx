const Person = ({person, func}) => {

  return(
    <p id={person.id}>{person.name}---{person.number} <button onClick={func}>Delete</button></p>
  )
}

export default Person