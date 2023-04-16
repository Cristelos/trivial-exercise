import axios from "axios";
import { useEffect, useState } from "react"

export default function JuegoTrivial(){

    const [questions, setQuestions] = useState([]);
    const [amountQuestions, setAmountQuestions] = useState(0);
    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);

    const handleAmoutChange = (e) => {
        setAmountQuestions(e.target.value)
    }

    // const handleSelect = (answer, correctAnswer) =>{
    //     if(!selectedAnswer){
    //         if(answer === correctAnswer){
    //             console.log("ACERTASTE");
    //         } else {
    //             console.log("Fallaste");
    //         }
    //         setSelectedAnswer(answer);
    //     }
    // }

    const handleSelect = (answer, question) => {
        if (answer === question.correct_answer) {
          alert("¡Respuesta correcta!");
          setRespuestasCorrectas(prevRespuestasCorrectas => prevRespuestasCorrectas + 1);
        } else {
        alert("Respuesta incorrecta. La respuesta correcta es: " + question.correct_answer);
        }
      };

    useEffect(() => {
        if(amountQuestions > 0){
            axios.get(`https://opentdb.com/api.php?amount=${amountQuestions}`).then(res => {
                console.log(res.data.results);
                setQuestions(res.data.results)
            })
        }
    }, [amountQuestions])

    return(
        <div className="trivial">
            <div className="seleccion">
            <h1>Trivial</h1>
            <h3>Indica el número de preguntas que quieras</h3>
            <div className="input__container">
                <input className="input" type="number" name="amount" value={amountQuestions} onChange={handleAmoutChange}/>
            </div>
                <div className="score">
                    <h3>Respuestas correctas: <span>{respuestasCorrectas}</span></h3>
                </div>
            </div>
            <div className="preguntas-respuestas">
                {questions && questions.map((question, index) => {
                    
                    const correctAnswer = question.correct_answer;
                    const incorrectAnswer = question.incorrect_answers;
                    const answers = [ ...incorrectAnswer, correctAnswer];
                    const mixedAnswers = [...answers].sort(() => Math.random() - 0.5);
                
                    return (
                        
                        <div key={index} className="contenedor-preguntas">
                            <p>{question.question}</p>
                            <ul className="respuestas">
                                {mixedAnswers && mixedAnswers.map((answer, i) => (
                                    <li key={i}>
                                        {/* <button className={answer === correctAnswer && selectedAnswer!== null ? "correct answer" : selectedAnswer !== correctAnswer && selectedAnswer!== null ? "incorrecta" : "correcta"} key={i} onClick={() => handleSelect(answer, correctAnswer)}> */}
                                        <button onClick={() => handleSelect(answer, question)} className="respuestas">
                                            {answer}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
