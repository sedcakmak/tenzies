import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [numberOfRolls, setNumberOfRolls] = React.useState(0)
  const [timerIsActive, setTimerIsActive] = React.useState(true)
  const [timer, setTimer] = React.useState(0)
  const timerRef = React.useRef(null)
  const [bestTime, setBestTime] = React.useState("")
  const [hideInfo, setHideInfo] = React.useState(false)

  React.useEffect(() => {
    if (tenzies) {
      if (bestTime) {
        const best = Number(bestTime)
        if (timer < best) {
          localStorage.setItem("bestTime", timer.toString())
          setBestTime(timer)
        } else {
          const best = localStorage.getItem("bestTime")
          best && setBestTime(best)
        }
      } else {
        localStorage.setItem("bestTime", timer.toString())
        setBestTime(timer)
      }
    }
  }, [tenzies])

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      setTimerIsActive(false)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  React.useEffect(() => {
    if (timerIsActive) {
      timerRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
  }, [timerIsActive])

  function countRolls() {
    if (!tenzies) {
      setNumberOfRolls((prevCount) => {
        return prevCount + 1
      })
    } else {
      setNumberOfRolls(0)
    }
  }

  function rollDice() {
    countRolls()
    setHideInfo(true)
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setTimer(0)
      setTimerIsActive(true)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))
  const hideInstruction = {
    visibility: hideInfo ? "hidden" : "visible",
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <div className="instructions-container" style={hideInstruction}>
        <h1 className="title">Tenzies</h1>

        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h3>Timer: {timer} seconds</h3>

      <h3>{bestTime ? `Your best score is: ${bestTime} seconds` : ""}</h3>

      {tenzies && (
        <p>
          You won after rolling the dice <span>{numberOfRolls}</span> times!
        </p>
      )}
    </main>
  )
}
