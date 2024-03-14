import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function AnswerQuestionButton(){

    const[question, setQuestion] = useState("")
    const[result, setResult] = useState(0)
    const[answer, setAnswer] = useState(0)
    const[rightAnswer, setRightAnswer] = useState(0)
    const[writing, setWriting] = useState(false)

    function generateQuestion(){
        do{
            var number1 = Math.floor(Math.random() * 10) 
        }while(number1 == 0) 
        do{
            var number2 = Math.floor(Math.random() * 10) 
        }while(number2 == 0)
        setResult(number1*number2)
        setQuestion('Quanto é '+ number1 + 'x' + number2 + '?')
    }

    function handleChangeAnswer(event: ChangeEvent<HTMLInputElement>){
        setAnswer(event.target.valueAsNumber)
        setWriting(true)
    }
    function verifyRightAnswer(){
        if(rightAnswer > 0 && (rightAnswer+1) % 3 == 0){
            toast.success('Uau, você acertou ' + (rightAnswer+1) + ' em sequência, avassalador!!!')
        } else if(rightAnswer < 0 && (rightAnswer+(-1)) % 3 == 0){
            toast.error('Você errou ' + ((rightAnswer+(-1)) * -1) + ' em sequência, talvez seja a hora de revisar a tabuada!!')
        }
    }
    function submitAnswer(event: FormEvent){
        setWriting(false)
        console.log("Digitado pelo usuário: "+answer)
        event.preventDefault()
        if(answer === result){
            generateQuestion()
            if(rightAnswer < 0){
                setRightAnswer(1)
            } else if(rightAnswer >= 0) {
                setRightAnswer(rightAnswer + 1)
            }
            toast.success('Resposta correta!!')
        }else if(answer <= 0 ){
            toast.warning('Nenhuma resposta válida foi inserida!! Tente novamente')
        } else {
            generateQuestion()
            if(rightAnswer > 0){
                setRightAnswer(-1)
            } else if(rightAnswer <= 0) {
                setRightAnswer(rightAnswer + (-1))
            }
            toast.error('Resposta errada, a resposta certa era: ' + result)
        }
        verifyRightAnswer()
        console.log(rightAnswer)
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <button onClick={generateQuestion} className="bg-stone-950 text-amber-400 text-base w-[200px] px-4 py-3 rounded-md hover:bg-stone-900 transition-colors duration-300 outline-none">Responder questão</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-stone-950/20 inset-0 fixed'/>
                <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] md:w-auto'>
                        <form action="" method="post" className="flex flex-col items-center justify-center py-8 px-8 rounded-lg bg-amber-400 h-full">
                            <label htmlFor="">{question}</label>
                            {writing ? (
                                <input onChange={handleChangeAnswer} type="number" name="answer" id="answer" className="outline-none border-b-[1px] border-black bg-transparent my-2 text-center placeholder-black w-[180px]" value={answer} autoFocus/>
                            ) : (
                                <input onChange={handleChangeAnswer} type="number" name="answer" id="answer" className="outline-none border-b-[1px] border-black bg-transparent my-2 text-center placeholder-black w-[180px]" value='' autoFocus/>
                            )}
                            <button onClick={submitAnswer} className="bg-black text-amber-400 py-2 w-[180px] rounded-md border-none outline-none mt-2" type="submit">Enviar</button>
                        </form>
                </Dialog.Content>
                <Dialog.Close></Dialog.Close>
            </Dialog.Portal>
        </Dialog.Root>
    )
}