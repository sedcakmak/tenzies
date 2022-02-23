/* eslint-disable default-case */
import React from "react"

export default function Die(props) {
  function styleDice() {
    switch (props.value) {
      case 1:
        return (
          <div className="dice_one">
            <span className="dot"> </span>
          </div>
        )

      case 2:
        return (
          <div className="dice_two">
            <span className="dot"> </span>
            <span className="dot"> </span>
          </div>
        )

      case 3:
        return (
          <div className="dice_three">
            <span className="dot"> </span>
            <span className="dot"> </span>
            <span className="dot"> </span>
          </div>
        )

      case 4:
        return (
          <div className="dice_four">
            <div className="column">
              <span className="dot"> </span>
              <span className="dot"> </span>
            </div>
            <div className="column">
              <span className="dot"> </span>
              <span className="dot"> </span>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="dice_five">
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

            <div className="column">
              <span className="dot"></span>
            </div>

            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="dice_four">
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )
    }
  }
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  }
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {styleDice()}
    </div>
  )
}
