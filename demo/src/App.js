import {useState} from 'react'
import Socket from './socket';


const InputControl = () => {

  const [inputValue, setInputValue] = useState('input text');

  return(

    <div>
      <h2>send text</h2>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(event) => {setInputValue(event.target.value)}} 
      />
      <br />
      <br />
      <Socket>
        {inputValue}
      </Socket>

    </div>

  );
}

export default InputControl;
