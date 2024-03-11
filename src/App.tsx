import { Calculator } from 'lucide-react'
import { AnswerQuestionButton } from './components/answerQuestion'
import { SeeMultiplicationTableButton } from './components/seeMultiplicationTable'
import { Toaster } from 'sonner'

export function App() {
  return (
    <main className="bg-amber-400 w-full h-screen flex flex-1 flex-col gap-5 items-center justify-center px-4">
      <div className='flex flex-row flex-wrap items-center justify-center gap-3'>
        <h1 className="text-stone-950 text-3xl font-black text-center">
          Tabuada Memorizer
        </h1>
        <Calculator 
          color='#0c0a09'
          size={56}
          strokeWidth='2.3'
        />
      </div>
      <p className="font-medium text-lg text-center max-w-[500px]">
        Responda questões rápidas de multiplicação da tabuada que tanto usamos!
      </p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <SeeMultiplicationTableButton />
        <AnswerQuestionButton />
      </div>
      <Toaster 
        richColors
        theme='light'
        duration={6000}
      />
    </main>
  )
}
