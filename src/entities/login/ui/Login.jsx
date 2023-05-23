import React from 'react'
import { observer } from 'mobx-react-lite'
import { Input } from '../../../shared/input/Input'


export const Login = observer(({handleCheck,changeToken,changeId,confirmAuth,check}) => {

  return ( 
          <div className='w-full  flex justify-center'>
            <div className='w-2/3 h-1/3 border-2 rounded-lg flex flex-col sm:w-1/2 bg-slate-100  items-center  py-4'>
              <Input changeInput = {changeId} label='Введите Id Instance'/>
              <Input changeInput = {changeToken} label='Введите Api Token Instance'/>
              <button onClick={confirmAuth} className='border-2  w-48 h-10 active:bg-green-200 bg-green-400 rounded hover:bg-green-600 mb-4'>Отправить</button>
              <div className='flex justify-center w-full'>
  
                <input type="checkbox" onChange={handleCheck} checked = {check} className='mr-2'/>
                {check ? (
                  <div>
                      ваши данные сохранены
                  </div>
                  ) : (
                    <div>
                      запомнить ваши данные?
                    </div>
                ) }
              </div>
          </div>
      </div>
  
        
    
  )
})

