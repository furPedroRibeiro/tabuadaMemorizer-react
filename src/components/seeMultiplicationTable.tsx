import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import Parser from 'html-react-parser'

export function SeeMultiplicationTableButton(){

    const [multiplicationTable, setMultiplicationTable] = useState('')
    let contentMultiplicationTable = ''

    function handleMultiplicationTable(){
        contentMultiplicationTable = ''
        for(let i = 1; i < 11; i++){
            console.log('oi')
            contentMultiplicationTable += '<div className="flex flex-col items-center justify-center p-2 border-black border bg-amber-400 w-[100%] h-full">'
            for(let i_2 = 1; i_2 < 11; i_2++){
                contentMultiplicationTable += '<p className="font-semibold text-lg">' +i+ ' x ' +i_2+ ' = '+(i*i_2)+'</p>'
            }
            contentMultiplicationTable += '</div>'
        }
        setMultiplicationTable(contentMultiplicationTable)
        console.log(multiplicationTable)
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='w-11/12 md:w-auto'>
                <button onClick={handleMultiplicationTable} className="bg-stone-950 text-amber-400 text-base w-full md:w-auto px-4 py-3 rounded-md hover:bg-stone-900 transition-colors duration-300 outline-none">Ver tabuada</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-stone-950/20 inset-0 fixed'/>
                <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] md:h-[70vh] w-[90vw] bg-amber-400'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-auto justify-center items-center h-full w-full'>
                        {Parser(multiplicationTable)}
                    </div>
                </Dialog.Content>
                <Dialog.Close></Dialog.Close>
            </Dialog.Portal>
        </Dialog.Root>
    )
}