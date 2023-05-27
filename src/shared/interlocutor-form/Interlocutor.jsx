import { observer } from 'mobx-react-lite'
import React from 'react'
import { useRootStore } from '../../app/use-root-store';

export const Interlocutor = observer(({
    wid, 
    urlIMG, 
    name,
    messages, 
    index,
    active}) => {
        
    const {
        updateActiveChatUser,
    } = useRootStore();  

  const onClick=()=>{
    updateActiveChatUser(index);
  }  

  return (
    <div key={wid} className={`flex hover:bg-slate-200 justify-center sm:justify-between w-full h-16 items-center sm:px-4 cursor-pointer border-b sm:border-b-0`} onClick={onClick}>
        <img src={urlIMG} alt={name} width={45} height={45} className='rounded-full sm:mr-5'/>
        <div className='w-full h-full sm:flex flex-col lg:flex-row lg:justify-between justify-center items-center border-b border-opacity-20  hidden'>
            <span className='lg:w-1/2'>+{wid.slice(0,11)}</span>
            <span className='lg:w-1/2'>{name}</span>
        </div>
    </div>
  )
}
)

