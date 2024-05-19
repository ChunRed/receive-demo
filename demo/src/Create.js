import {useState} from 'react'

const Create = ({ list, setList }) => {
    
    const [value, setValue] = useState('');

    const onAdd = () => {
        // const timestamp = (new Date).getTime();
        // setList([...list, { index: `${timestamp}`, text: value }]);
        setValue('');
    }

    return(
        <div>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => { 
                    setValue(e?.target?.value);
                    const timestamp = (new Date).getTime();
                    setList([`${timestamp}`, e?.target?.value ]);
                    
                    
                }}
            />

            {/* <button 
                type="button" 
                onClick={onAdd}
            >send</button> */}


        </div>
    )
}


export default Create;