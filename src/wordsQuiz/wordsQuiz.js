import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './wordsQuiz.css';
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


function WordsQuiz() {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  
  const getRandomWords = () => {
  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {level: chosenLevel, area: 'sat'},
    headers: {
      'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com',
      'X-RapidAPI-Key': '6aa16b8fa0msh560654902d5b05bp137002jsn4fdd4dd52fd2'
    }
  
  }
  
  axios.request(options).then(function (response) {
    console.log(response.data)
    setLoading(true);
    setWords(response.data)
  
  }).catch(function (error) {
    console.error(error)
  })  
 }
  console.log( words && words.quizlist)
  
  useEffect(() => {
    if (chosenLevel) getRandomWords()
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer)
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    } else {
      setScore((score) => score - 1)
    }
    setClicked([...clicked, option])
    
  }
    
  
   console.log('correctAnswers', correctAnswers)
    console.log('clicked', clicked)

    return  (
        <div className="app">
       {loading ? chosenLevel : <ReactBootStrap.Spinner animation="grow" variant="dark"/> }
      {!chosenLevel && <div className='levelselector'>
      
        <div className='Big'><h1><b>Word Association Quiz</b></h1></div>
        <div className='Big'> <p><b>Select Your Level To Start</b></p></div>
      
      <select name="levels" id="levels" value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
      
      <option value={null}>Select a Level</option>
     
        <option value='1'>Level 1</option> 
        <option value='2'>Level 2</option>
        <option value='3'>Level 3</option>
        <option value='4'>Level 4</option> 
        <option value='5'>Level 5</option>
        <option value='6'>Level 6</option>
        <option value='7'>Level 7</option> 
        <option value='8'>Level 8</option>
        <option value='9'>Level 9</option>
        <option value='10'>Level 10</option>
      
      </select>
      
      </div>}
      
      {chosenLevel && words && <div className='questionarea' >
        
        <h1>Welcome to level: {chosenLevel}</h1>
       
        <h3>Your score is: {score}</h3>
       
      <div className='questions'>
      
      {words.quizlist.map((question, _questionIndex) => (
      <div key={_questionIndex} className='questionbox'>
      {question.quiz.map((tip, _index)=> (
        <p key={_index} >{tip}</p>
      ))}
    
    <div  className={"questionbuttons"}>
          {question.option.map(( option, optionIndex) => (
            <div key={optionIndex} className='questionbutton'> 
           <Button variant="primary"
            disabled={clicked.includes(option)}
            onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}>
              {option} </Button>{' '}
              {correctAnswers.includes(option) && <p>Correct!</p>}
            </div>
          ))}
    </div>

   </div>
      ))} 
   </div>
     
   <Button variant="primary" onClick={ () => setChosenLevel(null)}> Go Back </Button>{' '}
      
   </div>}
       
    </div>
  );
}

export default WordsQuiz;