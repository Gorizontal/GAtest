import { RootStoreContext } from "./root-store-context";

export const RootStoreProvider = ({children,rootStore}) => {
    
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};