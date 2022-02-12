import { useEffect, useState } from 'react';
import './App.css';
import findAll from './utils/findAll'

const words = ['KURGU', 'YARIŞ', 'SARMA', 'EKSİK']

const word = words[Math.floor(Math.random() * words.length)];

const keys = [
  'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L',
  'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'
];

const App = () => {
  console.log(word);
  const [oldGuess, setOldGuess] = useState([]); // guess history
  const [guess, setGuess] = useState([]); // current guess
  const [count, setCount] = useState(0); // guess count
  const [completed, setCompleted] = useState(false); // game status

  function control() {
    if (guess.length === 5) {
      const inputs = document.querySelector('.active').children;
      if (word === guess.toString().replaceAll(',', '')) setCompleted(true);
      else {
        if (count < 5) {
          guess.forEach((g) => {
            let correctCount = 0;
            const wordIndex = findAll(word.split(''), g);
            const guessIndex = findAll(guess, g);
            wordIndex.forEach(ind => {
              if (guess[ind] === g) {
                inputs[ind].classList.add('animate');
                inputs[ind].classList.add('correct');
                correctCount++;
              }
            });
            guessIndex.forEach(ind => {
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
