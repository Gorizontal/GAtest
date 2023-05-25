import React from 'react'
import { observer } from 'mobx-react-lite'
import { ContactList } from '../contact-list/Contact-list'
import { Chat } from '../chat/Chat'

export const Messager = observer(({
  userIMG,
  wid,
  loader
}) => {


  return (
    <div className='w-full h-full bg-slate-400 flex justify-center'>
      {
        loader ? (<div>Loading...</div>) : (
          <div className='flex w-11/12  bg-slate-200 -mt-10'>
              <div className='w-1/3 '>
                <ContactList userIMG={userIMG}
                      wid = {wid}
                      loader={loader}/>
              </div>
              <div className='w-2/3'>
                  <Chat/>
              </div>
          </div>


        )
      }
    </div>
  )
})

