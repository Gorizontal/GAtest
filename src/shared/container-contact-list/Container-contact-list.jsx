import React from 'react'
import { Interlocutor } from '../interlocutor-form/Interlocutor'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../../app/use-root-store';

export const ContainerContactList = observer(() => {

    const {
        updateLabel,
        usersDatas
      } = useRootStore(); 

  return (
    <div className='w-full overflow-auto h-full'>
        {usersDatas.map((dat, index)=>{
          return  <Interlocutor key={dat.chatId} 
                                wid = {dat.chatId} 
                                urlIMG={dat.avatar} 
                                name={dat.name} 
                                updateLabel={updateLabel}
                                index = {index}/>          
        })}
    </div>
  )
}
)
