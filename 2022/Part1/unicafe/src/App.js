import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Statistics = ({ good, neutral, bad, totalValue, averageValue }) => {
  if (!(good || neutral || bad)) {
    return <div>No Feedback given </div>;
  }
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <StatisticLine text='Good:' value={good} />
        </tr>
        <tr>
          <StatisticLine text='Neutral:' value={neutral} />
        </tr>
        <tr>
          <StatisticLine text='Bad:' value={bad} />
        </tr>
        <tr>
          <StatisticLine text='All:' value={totalValue} />
        </tr>
        <tr>
          <StatisticLine text='Average:' value={averageValue} />
        </tr>
        <tr>
          <StatisticLine text='Positive:' value={`${(good / totalValue) * 100} %`} />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodValue = () => {
    setGood(good + 1);
  };
  const neutralValue = () => {
    setNeutral(neutral + 1);
  };
  const badValue = () => {
    setBad(bad + 1);
  };
  const totalValue = () => {
    return good + neutral + bad;
  };

  const averageValue = () => {
    return (good - bad) / totalValue();
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={goodValue} text='Good' />
      <Button handleClick={neutralValue} text='Neutral' />
      <Button handleClick={badValue} text='Bad' />
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} totalValue={totalValue()} averageValue={averageValue()} />
    </div>
  );
};

export default App;

