import {useContext} from "react";
import {RootStoreContext} from "./root-store-context";

export const useRootStore = () => {

    const context = useContext(RootStoreContext);
    if(context === undefined){
        throw new Error('state не инициализирован')
    }
    return context;
};