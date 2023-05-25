import { observer } from 'mobx-react-lite'
import { RootStore } from '../../app/root-store';
import {useEffect, useState} from "react"
import { Login } from '../login/ui/Login';
import { Messager } from '../messager/Messager';

export const Wrapped = observer(() => {

  const [a, setA] = useState('')
  const [check, setCheck] = useState(false);
  const [rootStore] = useState(() => new RootStore());
  const {
    updateIdInstance, 
    updateTokenInstance, 
    confirmAuth, 
    isAuthenticated, 
    loader, 
    error, 
    updateChecked,
    userIMG,
    wid
  } = rootStore;

  const handleCheck = () =>{
    setCheck( check => check = !check);
  }

  const changeToken = (event) => {
    updateTokenInstance(event.target.value);
  }

  const changeId = (event) => {
    updateIdInstance(event.target.value);
  }

  useEffect(()=>{
    updateChecked(check);
 
  },[check,isAuthenticated]);

  return (
        !isAuthenticated ? (
            <Login handleCheck={handleCheck}
                    changeToken={changeToken}
                    changeId={changeId}
                    confirmAuth={confirmAuth}
                    check={check}
                    loader={loader}
                    error={error} />
        ) : (
            <Messager userIMG={userIMG}
                      wid = {wid}
                      loader={loader}/>
        )
  );
})

