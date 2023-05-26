import { observer } from 'mobx-react-lite'
import {useEffect, useState} from "react"
import { Login } from '../login/ui/Login';
import Messager from '../messager/messager';
import { useRootStore } from '../../app/use-root-store';

export const Wrapped = observer(() => {

  const [check, setCheck] = useState(false);

  const {
    updateIdInstance, 
    updateTokenInstance, 
    confirmAuth, 
    isAuthenticated, 
    loader, 
    error, 
    updateChecked,
    userIMG,
    wid,
    label,
    updateLabel
  } = useRootStore();




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
                      loader={loader}
                      label={label}
                      updateLabel={updateLabel}
                   />
        )
  );
})

