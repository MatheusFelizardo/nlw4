import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: ()=> void;
    stopCountdown:()=> void;
}

interface CountdownProviderProps {
children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps) {

    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const [hasFinished, setHasFinished] = useState(false)

    const startCountdown = () => {
        setIsActive(true)
    }

    const stopCountdown = () => {
        setIsActive(false)
        setHasFinished(false);
        setTime(0.1 * 60)
    }

    useEffect(()=> {
        if(isActive && time > 0) {
            setTimeout(()=> {
                setTime(time-1)
            }, 1000)
        }
        if(isActive && time === 0) {
            setHasFinished(true)
            
            startNewChallenge()
            setIsActive(false)
            setTime(.1 * 60)
        }
        if (!isActive) {
            setTime(.1 * 60)
        }
    }, [isActive, time])

    
    return (
        <CountdownContext.Provider 
        value={{
            minutes, 
            seconds, 
            hasFinished, 
            isActive,
            startCountdown, 
            stopCountdown 
            }}>
            {children}
        </CountdownContext.Provider>
    )
}