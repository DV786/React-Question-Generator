import React, { useEffect, useState, Ref } from "react";
import { useTimer } from "react-timer-hook";
import "./App.css";

export default function App() {
  const [Question, setQuestion] = useState([]);
  const questions = [];
  const ans = [];
  const [numberQuestion, setnumberQuestion] = useState();
  const [operator, setoperator] = useState();
  const [value, setvalue] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [finalans, setfinalans] = useState();
  const [showScore, setShowScore] = useState(false);
  // const [score, setScore] = useState(0);

  console.log("this is final ans-->", Question);

  let textInput = React.createRef();
  const onChangeValue = (event) => {
    setoperator(event.target.value);
  };

  const asset = (e) => {
    setnumberQuestion(e.target.value);
  };
  const onvalue = (event) => {
    setvalue(event.target.value);
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const nextbutton = () => {
    const xop = { ansss: textInput.current.value };

    ans.push(xop);
    setfinalans(ans);

    setCurrentQuestion(currentQuestion + 1);
    setAnswer("");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Below piece of code generate Random number for questions
  // i learn this code from https://codepen.io/enigma777/pen/dMwabj

  const minimum = 1;
  const maximum = value;

  const Questiongenrate = () => {
    for (let index = 0; index < numberQuestion; index++) {
      const int1 =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const int2 =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

      const que = { number1: `${int1} ${operator} ${int2}` };

      // const ans = `${int1} ${operator} ${int2}`
      // console.log("this is correct anser",ans)

      questions.push(que);
    }
    setQuestion(questions);
    setCurrentQuestion(0);
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <div className="number1">
            {Question.map((xop) => {
              return (
                <>
                  <tr>{xop.number1}</tr>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="question">
            select number of question
            <select onChange={asset}>
              <option>--</option>

              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="Operator">
            select maths operator
            <select onChange={onChangeValue}>
              <option>--</option>

              <option>+</option>
              <option>-</option>
              <option>*</option>
              <option>/</option>
            </select>
          </div>
          <div className="values">
            select value
            <select onChange={onvalue}>
              <option>--</option>

              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
            </select>
          </div>
          <button
            name="btn"
            onClick={Questiongenrate}
            disabled={
              numberQuestion === undefined ||
              value === undefined ||
              operator === undefined
            }
          >
            start quiz
          </button>
          {Question.length === 0 ? (
            <></>
          ) : (
            <div className="questionss">
              {/* Timer:{seconds} */}
              <span>Question {currentQuestion + 1}</span>/{Question.length}
              <h2>{Question && Question[currentQuestion].number1}</h2>
              <div className="input">
                <input
                  type="text"
                  placeholder="Please enter correct value"
                  value={answer}
                  onChange={handleChange}
                  ref={textInput}
                />
              </div>
              <button onClick={nextbutton}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
