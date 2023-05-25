import { observer } from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import { RootStore } from '../../app/root-store';
import { HeaderContactList } from '../../shared/header-contact-list/Header-contact-list';

export const ContactList = observer(({  
  userIMG,
  wid,
  loader
}) => {
    const [rootStore] = useState(() => new RootStore());
    const {
      getDataOnNumber
    } = rootStore;  
  
  const [valueInputHeader, setValueInputHeader] = useState('')  
  const [validateNumber, setVaidateNumber] = useState(false)
  
  const onChangeInputHeader = (event) =>{
        event.preventDefault();
        setValueInputHeader(event.target.value)
        console.log(event.target.value)
  }
  
  const addNumberPhone = ()=>{
    if(valueInputHeader.trim().length > 0 ){
    getDataOnNumber(valueInputHeader)
  }
}


  return (
    <div className='flex flex-col w-full h-full bg-slate-100'>
        <HeaderContactList 
            userIMG={userIMG}
            wid = {wid}
            loader={loader}
            value = {valueInputHeader}
            onChange={onChangeInputHeader}
            addChat= {addNumberPhone} />
    </div>
  )
})


