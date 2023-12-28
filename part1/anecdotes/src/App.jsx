import { useState } from 'react'

const Title = (props) => {
  return(
    <h2>{props.text}</h2>
  )
}

const Anecdote = (props) => {
  return(
    <p>{props.anecdote}</p>
  )
}

const App = () => {
    const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
    ]
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [selected, setSelected] = useState(0)
    const [max, setMax] = useState(0);

    const handleButtonSelectAnectode = () => {
      const rnd = Math.floor(Math.random() * (8))
      console.log(rnd)
      setSelected(rnd)
    }

    const handleVoteAnecdote = (selected) => {
      const newVotes = {...votes}
      newVotes[selected]+=1;
      setVotes(newVotes);
      if(newVotes[selected]>votes[max]){
        setMax(selected)
      }
    }


  return (
    <div>
      <Title text="Anecdote of the day"/>
      <Anecdote anecdote = {anecdotes[selected]} />
      <p>votes: {votes[selected]}</p>
      <button onClick={handleButtonSelectAnectode}>next anecdote</button>
      <button onClick={()=> {handleVoteAnecdote(selected)}}>vote</button>
      <Title text="Anecdote of the day"/>
      <Anecdote anecdote = {anecdotes[max]} />
      <p>has {votes[max]} votes</p>
    </div>
  )
}

export default App