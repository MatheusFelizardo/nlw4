import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

interface UserContextData {
    username: string;
    picture_url: string;
}

interface UserProviderProps {
children: ReactNode;
}


export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
    const [ session, loading ] = useSession()

    const {user} = session
    console.log(session)
    // const username = user.name 
    // const picture_url = user.picture 
    
    const username = user.name
    const picture_url = user.image
    

    return (
        <UserContext.Provider 
        value={{username, picture_url}}>
            {children}
        </UserContext.Provider>
    )
}