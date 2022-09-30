import React, { useEffect, useState } from "react";

function QuizForm() {
  const [question, setQuestion] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [operator, setOperator] = useState("");

  const [userQuestion, setUserQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState("");

  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [timer, setTimer] = useState(0);
  const [stop, setStop] = useState(true);

  /********************************Timer In Question********************************************* */
  useEffect(() => {
    if (timer === 0) return handleSubmitQuestion(userInput);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(20);
  }, [currentQuestion]);

  /*********************For Submit and next Button Method************************************ */

  const handleSubmitQuestion = (userInput) => {
    if (
      userQuestion.length > 0 &&
      userQuestion[currentQuestion].answer == userInput
    ) {
      setScore(score + 1);
      userQuestion[currentQuestion].isValid = true;
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < userQuestion.length) {
      setCurrentQuestion(nextQuestion);
      setUserInput("");
    } else {
      if (userQuestion.length > 0) {
        setShowScore(true);
        setStop(false);
        setTimer(0);
        setOperator("");
        setMaxValue("");
        setQuestion("");
      }
    }
  };

  /***********************************OnChange Method ****************************************************** */

  const handleChangeUserInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    setUserInput(value);
  };

  const QuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const OperatorChange = (e) => {
    setOperator(e.target.value);
  };
  const MaxValueChange = (e) => {
    setMaxValue(e.target.value);
  };

  //*****************************Switch Opreator for Opreator ********************************************************* */

  const switchOperator = (operator, operands1, operands2) => {
    switch (operator) {
      case "+":
        return operands1 + operands2;
        break;
      case "-":
        return operands1 - operands2;
        break;
      case "x":
        return operands1 * operands2;
        break;
      case "÷":
        return Math.floor(operands1 / operands2);
        break;
      default:
        break;
    }
  };

  //****************************Equation Generater**************************************** */

  const handleSubmit = (e) => {
    setTimer(20);
    setShowScore(false);
    setStop(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserInput("");
    randomEquation({ maxValue, operator, question });
  };

  const randomEquation = (props) => {
    const { maxValue, operator, question } = props;
    let QuestionArray = [];
    for (let i = 0; i < question; i++) {
      let min = 1;
      let max = maxValue;
      let operands1 = Math.floor(Math.random() * (max - min + 1)) + min;
      let operands2 = Math.floor(Math.random() * (max - min + 1)) + min;
      let equation = operands1 + " " + operator + " " + operands2 + " " + "=";
      let answer = switchOperator(operator, operands1, operands2);
      let id = i;
      let isValid = false;
      QuestionArray[i] = { id, equation, answer, isValid };
    }
    setUserQuestion(QuestionArray);
  };

  return (
    <div className="Quiz-App">
      <div className="select-form">
        <div className="selec-menu">
          <div className="dropdown">
            <label className="select-label">Amount Of Questions:</label>
            <select
              name="question"
              id="question"
              value={question}
              onChange={QuestionChange}
              className="select-input input1"
            >
              <option value="" disabled>
                select option
              </option>
              <option value="5">5 Question</option>
              <option value="10">10 Question</option>
              <option value="15">15 Question</option>
              <option value="20">20 Question</option>
            </select>
          </div>
          <div className="dropdown">
            <label className="select-label">Select Operater:</label>
            <select
              name="operater"
              id="operater"
              value={operator}
              onChange={OperatorChange}
              className="select-input input3"
            >
              <option value="" disabled>
                select option
              </option>
              <option value="+">Addition(+)</option>
              <option value="-">Subtraction(-)</option>
              <option value="x">Multiplication(x)</option>
              <option value="÷">Division(÷)</option>
            </select>
          </div>
          <div className="dropdown">
            <label className="select-label">Operand Value :</label>
            <select
              name="maxvalue"
              id="maxvalue"
              value={maxValue}
              onChange={MaxValueChange}
              className="select-input input2"
            >
              <option value="" disabled>
                select option
              </option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="btn">
            <button
              className="start-btn"
              disabled={question === "" || operator === "" || maxValue === ""}
              onClick={handleSubmit}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
      <div>
        {stop && userQuestion.length > 0 ? (
          <div className="question">
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/
                {userQuestion.length}
              </div>
              <div className="qusetion-timer-score">
                <span className="question-timer">timer: {timer}</span>
                <span className="question">Score: {score}</span>
              </div>
              <div className="question-detail">
                <div className="question-text">
                  <span>Q.</span>
                  {userQuestion.length > 0 &&
                    userQuestion[currentQuestion].equation}
                </div>
                <input
                  className="answer-input"
                  name="answer"
                  value={userInput}
                  onChange={handleChangeUserInput}
                  autoFocus
                />
                <div className="answer-section">
                  <button onClick={() => handleSubmitQuestion(userInput)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {showScore ? (
          <div className="dashboard">
            <div className="table-header">
              <h3>Your Result</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {userQuestion.length > 0 &&
                  userQuestion.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.equation}</td>
                      <td>{item.answer}</td>
                      <td className={item.isValid ? "" : "error-false"}>
                        {item.isValid ? "true" : "false"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="score">
              Your Score: <span>{score}</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default QuizForm;
