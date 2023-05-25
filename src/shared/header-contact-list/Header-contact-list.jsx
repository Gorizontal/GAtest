import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { DebounceInput } from 'react-debounce-input'

export const HeaderContactList = observer(({wid, userIMG, onChange, value, addChat}) => {



  return (
    <div className='flex flex-col bg-slate-200 w-full'>
      <div className='flex  justify-between items-center h-16  px-10 border-r border-slate-600 border-opacity-20'>
        <img src={userIMG} alt="avatar" width={55} height={55} className=' rounded-full'/>
        <span>+{wid.slice(0,11)} ваш номер</span>  
      </div>
      <div className='flex flex-start w-full py-4 bg-slate-100 px-10 items-center'>
        <DebounceInput  minLength={0}
                        debounceTimeout={1000} 
                        type="text" 
                        placeholder='формат 7950...' 
                        className='w-full h-10 rounded outline-none bg-slate-200 p-1' 
                        onChange={onChange} 
                        value={value}/>
        <button className='text-slate-500 text-3xl text-center pb-1' onClick={addChat} >+</button>  
      </div>
    </div>
  )
})

