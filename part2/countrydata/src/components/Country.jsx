const Country = ({countries, funct}) => {
  console.log(countries.length)
  if(countries.length === 1){
    return(
        <>
          <h1>{countries[0].name}</h1>
          <p>capital {countries[0].capital}</p>
          <p>area {countries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.entries(countries[0].languages).map(([key, value]) => {
              return <li key={key}>
                {value}
              </li>
            })}
          </ul>
          <img src={countries[0].flag} alt="dsa" />
        </>
      )
  } else if(countries.length <= 10 && countries.length > 1){
    return(
      <>
        {countries.map(ctr => {
          return (
                  <p>
                    {ctr.name}
                    <button onClick={()=>funct(ctr.name)}>Select Country</button>
                  </p>)
        })}
      </>
    )
  } else{
    return(
      <>
        <p>Too many</p>
      </>
    )
  }
}

export default Country