import { observer } from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import { useRootStore } from '../../app/use-root-store';
import { toJS } from 'mobx';

export const Chat = observer(() => {

  const { 
          activeChatUser: {avatar, name, chatId, messages},
          sendMessage,
          errorInput,
          getNoties
} = useRootStore()

const [message, setMessage] = useState('')

  const sendMessages = (event)=>{
    if(message.trim().length === 0) {
      return
    }
    event.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  const changeInput = (event)=>{
    setMessage(event.target.value)
  }

  useEffect(()=>{
    getNoties()
  },[])

  return (
    <div className='bg-slate-200 w-full h-full flex flex-col'>
      <div className='border-b border-opacity-20 w-full'>
       {chatId ? (
              <div className='flex bg-slate-300 h-16 items-center px-4'>
                  <img src={avatar} alt={avatar} width={50} height={50} className='rounded-full mr-4'/>
                  <div className='flex flex-col justify-start'>
                    <span>+{chatId.slice(0,11)}</span>
                    <span>{name}</span>
                  </div>

              </div>
       ) : null}
         

      </div>
      <div className='w-full h-full'>
        {
         chatId && messages.map(({message, send}, index)=>{
            return (
              <div key = {index} className={`${send ? 'justify-end' : 'justify-start'} flex items-center`}>
                <span className={`${send ? 'bg-green-400' : 'bg-gray-500'} py-1 px-3 m-1 rounded-lg text-sm`}>{message}</span>
                </div>
            )
          })
        }
      </div>
      <form className='flex flex-col justify-center items-center h-16 w-full bg-slate-300 p-4' onSubmit={sendMessages}>
        <input type="text"  className='border focus-visible:border-2 outline-none  rounded-lg w-full md:w-10/12 h-8' onChange={changeInput} value={message}/>
        {errorInput ? (<div className='text-sm'>Выберите пользователя для общения</div>) : null}
      </form>
    </div>
  )
}
)

