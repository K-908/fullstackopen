const Message = ({message, bad}) => {
  const styleGood = {
    color:'green',
    border: '2px solid green',
    backgroundColor:'white'
  }
  const styleBad = {
    color:'red',
    border: '2px solid red',
    backgroundColor:'white'
  }
  if(message === null) {
    return null;
  }
  return(
    <div style={bad ? styleBad : styleGood} >
      <p>{message}</p>
    </div>
  )
}

export default Message