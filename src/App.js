import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
//Helper functions to display the time left in the correct format and set up the progress bar
import {
  getSessionMinutes,
  getSessionSeconds,
  getBreakMinutes,
  getBreakSeconds,
  setWidth,
  setBackground
} from './helperFunctions'
import React from 'react'

function App() {
  const [sessionLength, setSessionLength] = React.useState(25)
  const [breakLength, setBreakLength] = React.useState(5)
  const [timer, setTimer] = React.useState((sessionLength + breakLength) * 60)
  const [toggleTimer, setToggleTimer] = React.useState(false)


  //Timer functionality
  React.useEffect(() => {
    let timerInterval;
    function startTimer() {
      setTimer(prev => prev - 1)
    }
    if (toggleTimer) {
      if (timer < 0) {
        setTimer((sessionLength + breakLength) * 60)
      }
      else {
        timerInterval = setInterval(startTimer, 1000)
      }
    }
    return function cleanup() {
      clearInterval(timerInterval)
    }
  }, [toggleTimer, timer, sessionLength, breakLength])

  //Timer controls functions
  function startPauseTimer() {
    setToggleTimer(prev => !prev)
  }

  //If the session or break length changes, the timer changes
  React.useEffect(() => {
    setTimer((sessionLength + breakLength) * 60)
  }, [sessionLength, breakLength])

  //Session And break Length controls
  function handleChange(event) {
    const { name, value } = event.target
    if (name === "sessionRange") {
      setSessionLength(Number(value))
    }
    else if (name === "breakRange") {
      setBreakLength(Number(value))
    }
  }

  function resetTimer() {
    setToggleTimer(false)
    setTimer((sessionLength + breakLength) * 60)
  }

  const progressBarStyles = {
    width: `${setWidth(timer, sessionLength, breakLength)}%`,
    background: setBackground(timer, breakLength)
  }

  return (
    <div className="App">
      <div style={{ position: "relative" }}>
        <div className="timer-container progress">
          <div className="progress-bar" role="progressbar" aria-label="Progress Bar"
            style={progressBarStyles} aria-valuenow={setWidth()} aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
        <div className='battery-front'></div>
        <p className='timer'>{timer >= breakLength * 60 ?
          `${getSessionMinutes(timer, breakLength)}:${getSessionSeconds(timer, breakLength)}` :
          `${getBreakMinutes(timer, breakLength)}:${getBreakSeconds(timer, breakLength)}`}
        </p>
      </div>
      {
        <p className="percentage-display">
          {`${setWidth(timer, sessionLength, breakLength)}%`}
        </p>
      }
      <div className='control-icons'>
        {
          toggleTimer ?
            <FontAwesomeIcon icon={faPause} size="2xl" className='controls' onClick={startPauseTimer} /> :
            <FontAwesomeIcon icon={faPlay} size="2xl" className='controls' onClick={startPauseTimer} />
        }
        <FontAwesomeIcon icon={faArrowsRotate} size="2xl" className='controls' onClick={resetTimer} />
      </div>
      <div className="length-container">
        <div className="rangePicker">
          <label htmlFor="customRange1" className="form-label">Session <span className="length-num">{sessionLength}</span></label>
          <input type="range" className="form-range" min="10" max="60" id="customRange1" value={sessionLength} name="sessionRange" onChange={handleChange} disabled={toggleTimer ? true : false}></input>
        </div>
        <div className="rangePicker">
          <label htmlFor="customRange2" className="form-label">Break <span className="length-num">{breakLength}</span></label>
          <input type="range" className="form-range" min="3" max="30" id="customRange2" value={breakLength} name="breakRange" onChange={handleChange} disabled={toggleTimer ? true : false}></input>
        </div>
      </div>

    </div>
  );
}

export default App;
