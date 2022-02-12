import { useEffect, useState } from 'react';
import './App.css';

function findAll(array, letter) {
  let arr = [];
  array.forEach((el, ind) => {
    if (el === letter) {
      arr.push(ind);
    }
  })
  return arr;
}
const words = ['KURGU', 'YARIŞ', 'SARMA', 'EKSİK']

const word = words[Math.floor(Math.random() * words.length)];

const keys = [
  'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L',
  'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'
];


const App = () => {
  console.log(word);
  const [oldGuess, setOldGuess] = useState([]);
  const [guess, setGuess] = useState([]);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  function update(letter) {
    if (letter && guess.length < 5) setGuess([...guess, letter]);
  }
  function remove() {
    let g = [...guess];
    g.pop();
    setGuess(g);
  }

  function control() {
    const inputs = document.querySelector('.active').children;
    if (guess.length === 5)
      if (word === guess.toString().replaceAll(',', '')) setCompleted(true);
      else {
        if (count < 5) {
          let wordArr = word.split('');
          guess.forEach((g, i) => {
            let c = 0;
            const wInd = findAll(wordArr, g);
            const gInd = findAll(guess, g);
            wInd.forEach(n => {
              if (guess[n] === g) {
                inputs[n].classList.add('animate');
                inputs[n].classList.add('correct');
                c++;
              }
            });
            gInd.forEach(el => {
              if (wInd.length > c) {
                if (!inputs[el].classList.contains('correct')) {
                  inputs[el].classList.add('animate');
                  inputs[el].classList.add('finded');
                  c++;
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
          <button style={{ order: i }} key={key} onClick={() => { update(key) }}>{key}</button>
        )}
        <button className="remove" onClick={() => { remove() }}>DELETE</button>
        <button className="enter" onClick={() => { control() }}>ENTER</button>
      </div>
    </div>
  );
}

export default App;
