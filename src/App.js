import { useEffect, useState } from 'react';
import './App.css';
// utils
import findAll from './utils/findAll'
import cookie from './utils/cookie'
// data
import words from './data/words.json'

const keys = [
  'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L',
  'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'
];

const App = () => {
  const word = cookie.get('word') ? cookie.get('word') : cookie.set('word', words[Math.floor(Math.random() * words.length)]);
  const [oldGuess, setOldGuess] = useState([]); // guess history
  const [guess, setGuess] = useState(cookie.get('guess') ? cookie.get('guess').split(',') : []); // current guess
  const [count, setCount] = useState(0); // guess count
  const [completed, setCompleted] = useState(cookie.get('complete') > 0); // game status

  function control() {
    if (guess.length === 5) {
      const inputs = document.querySelector('.active').children;
      if (word === guess.toString().replaceAll(',', '')) setCompleted(true);
      else {
        if (count < 5) {
          guess.map((g) => {
            let correctCount = 0;
            const wordIndex = findAll(word.split(''), g);
            const guessIndex = findAll(guess, g);
            wordIndex.map(ind => {
              if (guess[ind] === g) {
                inputs[ind].classList.add('animate');
                inputs[ind].classList.add('correct');
                correctCount++;
              }
            });
            guessIndex.map(ind => {
              if (wordIndex.length > correctCount) {
                if (!inputs[ind].classList.contains('correct')) {
                  inputs[ind].classList.add('animate');
                  inputs[ind].classList.add('finded');
                  correctCount++;
                }
              }
            });
          });
          setGuess([]);
          cookie.set('guess', guess);
          setCount(count + 1);
          setOldGuess([...oldGuess, guess]);
        } else {
          alert('Game Over');
        }
      }
    }
    else alert('Fill in the guess');
  }

  useEffect(() => {
    console.log('Guessing');
  }, [guess]);

  useEffect(() => {
    if (completed) {
      cookie.set('complete', 1);
      cookie.set('guess', guess);
    } else {
      cookie.set('complete', 0);
    }
  }, [completed]);

  return (
    <div className="App">
      <div className={completed ? 'grid completed' : 'grid'}>
        {[...Array(6)].map((x, i) =>
          <ul key={`list-${i}`} className={count === i ? 'active' : ''}>
            {[...Array(5)].map((val, ind) =>
              <li key={`list-${i}-child-${ind}`}>
                {count === i ? guess.length >= ind ? guess[ind] : '' : count > i ? oldGuess[i][ind] : ''}
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="keyboard">
        {keys.map((key, i) =>
          <button style={{ order: i }} key={key} onClick={() => {
            if (key && guess.length < 5) setGuess([...guess, key]);
          }}>{key}</button>
        )}
        <button className="remove" onClick={() => {
          let g = [...guess];
          g.pop();
          setGuess(g);
        }}>DELETE</button>
        <button className="enter" onClick={() => { control() }}>ENTER</button>
      </div>
    </div>
  );
}

export default App;
