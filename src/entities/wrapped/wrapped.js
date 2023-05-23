import { observer } from 'mobx-react-lite'
import { RootStore } from '../../app/root-store';
import {useEffect, useState} from "react"
import { Login } from '../login/ui/Login';

export const Wrapped = observer(() => {

  const [check, setCheck] = useState(false)
  const [rootStore] = useState(() => new RootStore());
  const {updateIdInstance, updateTokenInstance, confirmAuth, isAuthenticated, loader} = rootStore

  const handleCheck = () =>{
    setCheck( check => !check)
  }

  const changeToken = (event) => {
    updateTokenInstance(event.target.value)
  }

  const changeId = (event) => {
    updateIdInstance(event.target.value)
  }


  return (
        !isAuthenticated ? (
            <Login handleCheck={handleCheck}
                    changeToken={changeToken}
                    changeId={changeId}
                    confirmAuth={confirmAuth}
                    check={check}
                    loader={loader} />
        ) : (
            'vi auth'
        )
  );
})

