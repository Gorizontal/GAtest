import React from 'react'
import { observer } from 'mobx-react-lite'
import { DebounceInput } from 'react-debounce-input'

export const HeaderContactList = observer(({wid, userIMG, onChange, value, addChat, loaderAddNumber, errorInputHeader, errorInputHeaderLength}) => {



  return (
    <div className='flex flex-col bg-slate-200 w-full border-b border-opacity-20'>
      <div className='flex  sm:justify-between justify-center items-center h-16 px-4 sm:px-10 border-r border-slate-600 border-opacity-20'>
        <img src={userIMG} alt="avatar" width={55} height={55} className=' rounded-full'/>
        <span className='px-2 hidden md:inline'>+{wid.slice(0,11)} <span className='hidden lg:inline'>ваш номер</span></span>  
      </div>
      <div className='flex flex-col w-full py-4 bg-slate-100 sm:px-6 items-start'>
        <div>{errorInputHeader ? (<span className='text-xs text-red-700' >Абонент уже в списке</span>) : (null)}</div>
        <div>{errorInputHeaderLength ? (<span className='text-xs text-red-700'>Проверьте номер</span>) : (null)}</div>
        <div className='flex items-center w-full flex-col sm:flex-row'>
          <DebounceInput  minLength={0}
                          debounceTimeout={1000} 
                          type="number" 
                          placeholder='формат 7950... 11 цифр' 
                          className='w-full h-8 rounded-xl outline-none bg-slate-200 p-1' 
                          onChange={onChange} 
                          value={value}
                          />
          <button className='text-slate-500 text-3xl flex  items-center pb-1' onClick={addChat} disabled={loaderAddNumber}>
            {loaderAddNumber ? (<span className='text-xs'>loading</span>): (<span>+</span>)}
            </button>  
        </div>

      </div>
    </div>
  )
})

