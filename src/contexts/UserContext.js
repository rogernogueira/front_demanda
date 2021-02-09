import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export default ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}