import React, { useEffect, useState } from "react";
import data from '../defaultData';
import { shuffle } from "../helperFunctions";
import Question from "./Question";

export default function Questions() {
    const [playCount, setPlayCount] = useState(1);
    const [questions, setQuestions] = useState(data);
    const [gameOver, setGameOver] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function solve(data) {
        var questions = data.results.map((item) => {
            return {
                'id': Math.random(),
                'question': item.question,
                'options': shuffle([
                    item.correct_answer,
                    item.incorrect_answers[0],
                    item.incorrect_answers[1],
                    item.incorrect_answers[2],
                ]),
                'correctOption': item.correct_answer,
                'selectedOption': null,
            };
        });
            console.log(questions);
            setQuestions(questions);
            setIsLoading(false);
        }
        setIsLoading(true);
        setGameOver(false);
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => solve(data));
    }, [playCount]);

    function checkSubmission(){
        setGameOver(true);
    }

    function playAgain(){
        setQuestions(data)
        setPlayCount((prev)=>{
            return prev + 1;
        })
    }

    function changeSelected(id, optionString){
        setQuestions((currentState)=>{
            return currentState.map((item)=>{
                var newObj = (item.id === id) ? item.selectedOption === optionString ? { ...item, selectedOption: null } : { ...item, selectedOption : optionString } : item;
                return newObj;
            });
        })
    }

    var elementArray = questions.map((item)=>{
        return(
            <Question
                key = {item.id}
                {...item}
                changeSelected = {changeSelected} 
                gameOver = {gameOver}
            />
        )
    })

    function updateFooter(){
        var correctArray = questions.filter((item)=>{
            return item.selectedOption === item.correctOption;
        })
        return <>
            <p className="footerText">You Scored {correctArray.length}/5 correct answers</p>
            <button className="submit" onClick={playAgain}>Play Again</button>
        </>
    }

    var content;
    if (isLoading) {
        content = (
        <div className="loaderCon">
            <div className="loader">
            <div className="spinner" aria-hidden="true"></div>
            </div>
        </div>
        );
    } else {
        content = (
        <>
            {elementArray}
            <div className="footer">
            {gameOver ? (updateFooter()) : (<button className="submit" onClick={checkSubmission}>Check Answers</button>)}
            </div>
        </>
        );
    }

    return (
        <div className="questions">{content}</div>
    )
}
