import {useState} from 'react'

const InputControl = () => {

  const [inputValue, setInputValue] = useState('');

  return(

    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(event) => {setInputValue(event.target.value)}} 
      />

      <button onClick={() => {
        console.log(inputValue);
        
      }}>send</button>

      <br />
      <h1>{inputValue}</h1>
    </div>

  );
}

export default InputControl;
