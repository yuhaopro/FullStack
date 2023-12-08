const Part = ({ props }) => {
    let { name, exercises, id } = props;
    console.log(props);
    return (
      <>
        <p>
          <b>PartID: </b>
          {id} <b>Name: </b>
          {name} <b>Exercises: </b> {exercises}
        </p>
      </>
    );
  };

  export default Part;