import axios from "axios";
import { useEffect, useState } from "react"

export default function JuegoTrivial(){

    const [questions, setQuestions] = useState([]);
    const [amountQuestions, setAmountQuestions] = useState(0);

    //Elegimos el número de preguntas que queremos
    const handleAmoutChange = (e) => {
        setAmountQuestions(e.target.value)
    }

    //Añadimos las preguntas
    const addQuestions = () => {
        axios.get(`https://opentdb.com/api.php?amount=${amountQuestions}`).then( res => {
            console.log(res.data.results);
            setQuestions(res.data.results)
        })
    }

    //Mezclamos las respuestas
    const mixAnswers = (answers) => {
        const mixedAnswers = [...answers].sort(() => Math.random() - 0.5);
        return mixedAnswers;
    }

    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=50").then(res => {
            console.log(res.data.results);
            // console.log(res);
            setQuestions(res.results)
        })
    }, [])

    return(
        <div>
            <input type="number" name="amount" value={amountQuestions} onChange={handleAmoutChange}/>
            <button onClick={addQuestions}>Añade el número de preguntas</button>
            {questions && questions.map((question, index) => {
                
                const answers = [ ...question.incorrect_answers, question.correct_answer];
                
                const mixedAnswers = mixAnswers(answers)

                return (
                    <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {mixedAnswers.map((answers, i) => (
                            <li key={i}>{answers}</li>
                        ))}
                    </ul>
                </div>
                )
                
            })}
            
        </div>
    )
}