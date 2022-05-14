import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./auth-context";
import {initialState,dataReducer} from "../reducer/data-reducer"

const DataContext = createContext();

const DataProvider = ({children}) => {

    const {token, currentUser} = useAuth();
    const [state, dispatch] = useReducer(dataReducer, initialState);

    useEffect(()=> {
        if(!token){
            dispatch({type:"ADD_NOTES", payload:{note:[]}})
        }
        if(token){
            dispatch({type:"ADD_NOTES",payload:{note:currentUser.notes}})
            dispatch({type:"ARCHIVE", payload:{archive:currentUser.archives}})
        }
    },[token]);

    return (
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext);

export {DataProvider, useData};