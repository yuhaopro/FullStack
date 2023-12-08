import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Title = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

// display should take a text and computed value to display
const Display = ({ text, computedValue }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{computedValue}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackGiven, setfeedBackGiven] = useState(false)

  const handleClick = (func) => {
    if (!feedbackGiven) {
      setfeedBackGiven(true);
    }
    func;
  }

  const RenderStatistics = () => {
    console.log(feedbackGiven)
    if (!feedbackGiven) {
      return <p>No feedback given</p>;
    }
    return (
      <table>
        <Display text="good" computedValue={good} />
        <Display text="neutral" computedValue={neutral} />
        <Display text="bad" computedValue={bad} />
        <Display text="all" computedValue={good + neutral + bad} />
        <Display text="average" computedValue={(good - bad) / (good + neutral + bad)} />
        <Display text="positive" computedValue={good / (good + neutral + bad)} />
      </table>
    );
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={() => handleClick(setGood(good + 1))} text="good" />
      <Button onClick={() => handleClick(setNeutral(neutral + 1))} text="neutral" />
      <Button onClick={() => handleClick(setBad(bad + 1))} text="bad" />
      <Title text="statistics" />
      <RenderStatistics />

    </div>
  )
}

export default App