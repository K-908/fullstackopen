import Part from "./Part"
const Content = (props) =>{
    return(
      <div>
        {props.course.map(prt =>
          <Part part={prt.name} exercises={prt.exercises} key={prt.exercises*Math.random()} />
          )}
      </div>
    )
}

export default Content