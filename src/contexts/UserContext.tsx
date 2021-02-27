import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { useUser } from '@auth0/nextjs-auth0';

interface UserContextData {
    username: string;
    picture_url: string;
}

interface UserProviderProps {
children: ReactNode;
}


export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
    const { user, error, isLoading } = useUser();
    // const username = user.name 
    // const picture_url = user.picture 
    
    const username = user ? user.name : "Nome não cadastrado"
    const picture_url = user ? user.picture : ""
    

    return (
        <UserContext.Provider 
        value={{username, picture_url}}>
            {children}
        </UserContext.Provider>
    )
}