import { observer } from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import { RootStore } from '../../app/root-store';
import { HeaderContactList } from '../../shared/header-contact-list/Header-contact-list';
import { ContainerContactList } from '../../shared/container-contact-list/Container-contact-list';
import { useRootStore } from '../../app/use-root-store';

export const ContactList = observer(({  
  userIMG,
  wid,
  loader,
  updateLabel
}) => {


  const { label, getDataOnNumber, usersDatas, loaderAddNumber} = useRootStore()
  
  const [valueInputHeader, setValueInputHeader] = useState('')  
  const [validateNumber, setVaidateNumber] = useState(false)
  const [data, setData] = useState([])
  
  const onChangeInputHeader = (event) =>{
        event.preventDefault();
        setValueInputHeader(event.target.value)
        console.log(event.target.value)
  }
  
  const addNumberPhone = ()=>{
    if(valueInputHeader.trim().length > 0 ){
    getDataOnNumber(valueInputHeader)
    setData(usersDatas)
    setValueInputHeader('')
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
            addChat= {addNumberPhone}
            loaderAddNumber= {loaderAddNumber}
             />

         <ContainerContactList data={data} updateLabel={updateLabel}/>   
    </div>
  )
})


