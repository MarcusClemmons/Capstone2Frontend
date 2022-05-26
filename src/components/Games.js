import React from 'react';

import WordsQuiz from '../wordsQuiz/wordsQuiz';
import HangMan from '../hangMan/hangMan';
import TicTacToe from '../tictacToe/tictacToe';
import RPS from '../rpS/rpS'

import './Games.css';
function Games() {
   

    return(
        
        <body className="">
     <div className='container1'>
     <div className="Game1"> <WordsQuiz/> </div>
    
     </div>
     
     <div className='container2'> 
     <div className="Game3"> <HangMan/> </div>
     <div className="Game2"><TicTacToe/></div>
     <div className="Game4"> <RPS/> </div>
     </div>
    </body>
    );
}

export default Games;