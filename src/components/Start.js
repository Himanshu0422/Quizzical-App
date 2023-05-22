import React from "react";

export default function Start(props){
    return(
        <div className="overlay">
            <h1>Quizzical App</h1>
            <button onClick={props.setFirstLoad}>Start Quiz</button>
        </div>
    )
}