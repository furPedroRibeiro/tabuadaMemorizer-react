import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function AnswerQuestionButton(){

    const[question, setQuestion] = useState("")
    const[contentInput, setContentInput] = useState(true)
    const[result, setResult] = useState(0)
    const[answer, setAnswer] = useState(0)

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
        setContentInput(false)
    }
    function submitAnswer(event: FormEvent){
        event.preventDefault()
        if(answer == result){
            toast.success('Resposta correta!!')
            generateQuestion()
            setContentInput(true)
            setAnswer(0)
        }else if(answer <= 0 ){
            toast.warning('Nenhuma resposta válida foi inserida!! Tente novamente')
            setContentInput(true)
        } else {
            toast.error('Resposta errada, a resposta certa era: ' + result)
            generateQuestion()
            setContentInput(true)
            setAnswer(0)
        }
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <button onClick={generateQuestion} className="bg-stone-950 text-amber-400 text-base w-11/12 md:w-auto px-4 py-3 rounded-md hover:bg-stone-900 transition-colors duration-300 outline-none">Responder questão</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-stone-950/20 inset-0 fixed'/>
                <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] md:w-auto'>
                        <form action="" method="post" className="flex flex-col items-center justify-center py-8 px-8 rounded-lg bg-amber-400 h-full">
                            <label htmlFor="">{question}</label>
                            {contentInput ? (
                                <input onChange={handleChangeAnswer} type="number" name="answer" id="answer" className="outline-none border-b-[1px] border-black bg-transparent my-2 text-center placeholder-black w-[180px]" value={0} autoFocus/>
                            ) : (
                                <input onChange={handleChangeAnswer} type="number" name="answer" id="answer" className="outline-none border-b-[1px] border-black bg-transparent my-2 text-center placeholder-black w-[180px]" autoFocus/>
                            )}
                            <button onClick={submitAnswer} className="bg-black text-amber-400 py-2 w-[180px] rounded-md border-none outline-none mt-2">Enviar</button>
                        </form>
                </Dialog.Content>
                <Dialog.Close></Dialog.Close>
            </Dialog.Portal>
        </Dialog.Root>
    )
}