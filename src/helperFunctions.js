function formatFunction(time) {
  if (time / 10 < 1) {
    return "0" + time
  } else {
    return time
  }
}
function getSessionMinutes(timer, breakLength) {
  const sessionMinutes = Math.trunc((timer - breakLength * 60) / 60)
  return formatFunction(sessionMinutes)
}
function getSessionSeconds(timer, breakLength) {
  const sessionSeconds = (timer - breakLength * 60) % 60
  return formatFunction(sessionSeconds)
}
function getBreakMinutes(timer, breakLength) {
  const breakMinutes = Math.trunc(timer / 60)
  return formatFunction(breakMinutes)
}
function getBreakSeconds(timer, breakLength) {
  const breakSeconds = timer % 60
  return formatFunction(breakSeconds)
}
function setWidth(timer, sessionLength, breakLength) {
  if(timer >= breakLength * 60) {
    const initialSessionTime = sessionLength * 60
    const sessionTimeLeft = Math.ceil((timer - breakLength * 60) * 100 / initialSessionTime)
    return sessionTimeLeft.toString();
  } else {
    const initialBreakTime = breakLength * 60
    const breakTimeLeft = Math.ceil((breakLength * 60 - timer) * 100 / initialBreakTime)
    return breakTimeLeft.toString()
  }
}
function setBackground(timer, breakLength) {
  if (timer >= breakLength * 60) {
    if (Number(getSessionMinutes(timer, breakLength)) < 1) {
      return "red"
    }
    else {
      return "#66CC00"
    }
  }
  else {
    return "#0080FF"
  }
}

export {getSessionMinutes, getSessionSeconds, getBreakMinutes, getBreakSeconds, setWidth, setBackground}