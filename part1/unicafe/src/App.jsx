import { useState } from 'react'

const Title = (props) => {
  return(
    <h2>{props.text}</h2>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.action}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    <tr><td>{props.text}</td><td>{props.amount}</td></tr>
  )
}

const Statistics = (props) => {
  if(props.total === 0){
    return(
      <tr><td>No feedback given</td></tr>
    )
  } else{
    const avg = (props.good-props.bad)/props.total;
    const pst = (props.good/props.total)*100;
    return(
      <>
        <tr><td>average</td><td>{avg}</td></tr>
        <tr><td>positive</td><td>{pst}%</td></tr>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () => {
    const currentGood = good+1;
    setGood(currentGood);
    setTotal(neutral+bad+currentGood);
  }

  const handleClickNeutral = () => {
    const currentNeutral = neutral +1;
    setNeutral(currentNeutral);
    setTotal(currentNeutral+bad+good);
  }

  const handleClickBad = () => {
    const currentBad = bad +1;
    setBad(currentBad);
    setTotal(neutral+currentBad+good);
  }
  return (
    <>
      <Title text='give feedback' />
      <Button action={handleClickGood} text="good" />
      <Button action={handleClickNeutral} text="neutral" />
      <Button action={handleClickBad} text="bad" />
      <Title text='statistics' />
      <table>
        <tbody>
          <StatisticLine text="good" amount={good}/>
          <StatisticLine text="neutral" amount={neutral}/>
          <StatisticLine text="bad" amount={bad}/>
          <StatisticLine text="all" amount={total}/>
          <Statistics good={good} bad={bad} neutral={neutral} total={total} />
        </tbody>
      </table>
    </>
  )
}

export default App