import { useState } from "react";
import Socket from './SocketConnect'
import Create from "./Create";

const Home = () => {

    const [msg, setMsg] = useState([]);

    
    return (
        <div  >
            <h2 className="bg-dark text-light py-3 text-center">Receive Client</h2>


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
                    <div className="text-dark mt-3 text-center"><h2>No message</h2></div>
                    :
                    msg.map(item => (

                        <li key={item[0]} className=" bg-dark text-light p-1 mt-1">{item[1]}</li>
                        

                    ))


            }
        </div>
    )
}


export default Home;