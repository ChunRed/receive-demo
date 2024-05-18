import { useState } from "react";
import Socket from './Socket'
import Create from "./Create";

const Home = () => {

    const [msg, setMsg] = useState([]);


    return (
        <div>
            <h2>Receive Client</h2>

            <Socket
                msg={msg}
                setMsg={setMsg}
            />

            {/* <Create
                list={list}
                setList={setList}
            /> */}

            {
                msg.length === 0
                    ?
                    <div><h2>No message</h2></div>
                    :
                    msg.map(item => (
                        <li key={item[0]}>{item[1]}</li>

                    ))


            }
        </div>
    )
}


export default Home;