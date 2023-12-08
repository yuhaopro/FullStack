const Header = (props) => {
  return (
    <>
      <h1>
        {props.title}
      </h1>
    </>

  )
}
const Part = ({props}) => {
  let {part, title, exercise, content} = props;
  console.log(props);
  return (
    <>
      <p>part: {part} <br></br>title: {title} <br></br>exercise: {exercise} <br></br>content: {content}</p>
    </>
  )
}

const Content = (props) => {
  console.log("dog", props.parts);
  return (
    <>
    {props.parts.map((part) => {
      console.log(part);
      return <Part props={part}/> 
    })}
    <button onClick={()=>{console.log("clicked")}}>Click and check Log</button>
    </>
  )
}



const Total = (props) => {
  const num = props.e1 + props.e2 + props.e3;
  return (
    <>
      <p>Number of exercises: {num}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = [
    {part: 1, title: part1, exercise: 1, content: 10},
    {part: 2, title: part2,  exercise: 2, content: 7},
    {part: 3, title: part3, exercise: 3, content: 14}
  ];

  return (
    <div>
      <Header title={course} />
      <Content parts={content} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </div>
  )
}

export default App