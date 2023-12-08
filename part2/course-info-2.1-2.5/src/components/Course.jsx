import Part from "./Part";
const Course = (props) => {
    console.log("props.parts", props.parts);
    const total = props.parts.reduce((s, p) => {
      console.log("s", s);
      console.log("p", p);
      return s + p.exercises;
    }, 0);
    console.log("total", total);
    return (
      <>
        {props.parts.map((part) => {
          console.log(part);
          return <Part key={part.id} props={part} />;
        })}
  
        <p>
          <b>Total Exercises: </b>
          {total}
        </p>
      </>
    );
  };

  export default Course;