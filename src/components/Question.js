import React from "react";

function Question(props){

    function handleClick(event){
        props.changeSelected(props.id, event.target.innerText);
    }

    function matchCorrect(buttonText){
        var classString = "option"
        if (props.gameOver){
            classString = " option optionGameOver"
            classString = classString + `${props.selectedOption === buttonText ? " incorrect" : ""}${props.correctOption === buttonText ? " correct" : ""}`;
        }else{
            classString = classString + `${props.selectedOption === buttonText ? " selected" : ""}`;
        }
        return classString;
    }

    return(
        <div className="question">
            <h1>{props.question}</h1>
            <div className="options">
                <button className={matchCorrect(props.options[0])} disabled={props.gameOver ? true : false} onClick={handleClick}>{props.options[0]}</button>
                <button className={matchCorrect(props.options[1])} disabled={props.gameOver ? true : false} onClick={handleClick} >{props.options[1]}</button>
                <button className={matchCorrect(props.options[2])} disabled={props.gameOver ? true : false} onClick={handleClick}>{props.options[2]}</button>
                <button className={matchCorrect(props.options[3])} disabled={props.gameOver ? true : false} onClick={handleClick}>{props.options[3]}</button>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question;