import React from 'react'
import { observer } from 'mobx-react-lite'
import { Input } from '../../../shared/input/Input'

export const Login = observer(
  ({
        handleCheck,
        changeToken,
        changeId,
        confirmAuth,
        check, 
        error, 
        loader
    }) => {

  return ( 
          <div className='w-full  flex justify-center'>    
            {
              loader ? (<div>loading...</div>) : (
              <div className='w-2/3 h-1/3 border-2 rounded-lg flex flex-col sm:w-1/2 bg-slate-100  items-center  py-4'>
                {error ? (<div className='text-xl text-red-600 font-medium mb-2'>Неверные ID или API Token. </div>) : null}
                <Input 
                  changeInput = {changeId} 
                  label='Введите Id Instance'
                  className='border-green-500'
                />
                <Input 
                  changeInput = {changeToken} 
                  label='Введите Api Token Instance'
                  className='border-green-500'
                />
                <button onClick={confirmAuth} className='border-2  w-48 h-10 active:bg-green-200 bg-green-400 rounded hover:bg-green-600 mb-4'>Войти</button>
                <div className='flex justify-center w-full'>
                  <input type="checkbox" onChange = {handleCheck} checked = {check} className='mr-2'/>
                  {check ? (
                      <div>
                          я вас запомню!
                      </div>
                    ) : (   
                      <div>
                           запомнить вас?
                      </div>
                  ) }
               </div>
              </div>
         )}   
      </div>
  )
})

