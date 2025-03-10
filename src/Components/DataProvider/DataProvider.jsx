// import the useContext from React

import React, {createContext, useReducer} from 'react'
import { initialState } from '../../Utility/reducer';


 // Initiate the useContext

export const DataContext=createContext()


// Initialize provider function

export const DataProvider = ({ children, reducer, initialState}) => {
    return ( 
        <DataContext.Provider value={ useReducer(reducer, initialState)}> 
            {children}
            
        </DataContext.Provider>
    );
}; 