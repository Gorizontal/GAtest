import { observer } from 'mobx-react-lite'
import { RootStore } from "./root-store";
import {useEffect, useState} from "react"
import { RootStoreProvider } from "./root-store-provider";
import { Login } from '../entities/login/ui/Login';
import { Wrapped } from '../entities/wrapped/wrapped';

export const App = observer(() => {

  const [rootStore] = useState(() => new RootStore());


  return (
    <RootStoreProvider rootStore={rootStore}>    
      <div className='bg-green-600 w-full h-full'>
        <h1 className='text-3xl text-center w-full py-5'>Green Api Client</h1>
       
        <Wrapped/>    

      </div>

    </RootStoreProvider>

  );
})


