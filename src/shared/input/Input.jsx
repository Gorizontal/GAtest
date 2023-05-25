import React from 'react'
import { DebounceInput } from 'react-debounce-input'


export const Input = ({changeInput, className, label, ...otherProps}) => {

  return (
        <div className='flex flex-col h-20 items-center'>
            <span>{label}</span>
            <DebounceInput 
                    minLength={0}
                    debounceTimeout={1000}
                    onChange={changeInput}
                    type="text"
                    className={`border rounded w-48  focus-visible:border-2 outline-none ${className}`}
                     />
         </div>
  )
}


