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
    <div key={wid} className={`flex hover:bg-slate-200 justify-between w-full h-16 items-center px-4 cursor-pointer`} onClick={onClick}>
        <img src={urlIMG} alt={name} width={45} height={45} className='rounded-full mr-5'/>
        <div className='w-full h-full flex justify-between items-center border-b border-opacity-20'>
            <span className='w-1/2'>+{wid.slice(0,11)}</span>
            <span className='w-1/2'>{name}</span>
        </div>
    </div>
  )
}
)

