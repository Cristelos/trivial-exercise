import axios from "axios";
import { useEffect, useState } from "react"

export default function JuegoTrivial(){

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10&type=multiple").then(res => {
            console.log(res);
        })
    }, [])

    return(
        <div>
            su puta madre
        </div>
    )
}