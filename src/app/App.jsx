import { observer } from 'mobx-react-lite'
import { RootStore } from "./root-store";
import { useState} from "react"
import { RootStoreProvider } from "./root-store-provider";
import { Wrapped } from '../entities/wrapped/wrapped';

export const App = observer(() => {

  const [rootStore] = useState(() => new RootStore());


  return (
    <RootStoreProvider rootStore={rootStore}>    
      <div className='w-full h-full bg-emerald-600'>
        <h1 className='text-3xl text-center w-full py-5 h-32'>Green Api Client</h1>
        <Wrapped/>    
      </div>
    </RootStoreProvider>

  );
})


