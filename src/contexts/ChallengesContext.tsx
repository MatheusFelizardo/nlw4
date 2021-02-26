import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    currentExperience : number;
    challengesCompleted : number;
    activeChallenge:Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider ({children}:ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrenceExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(()=> {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level+1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        new Audio('/notification.mp3').play()

        if (Notification.permission === "granted") {
            new Notification('🎉 Novo desafio  🎉', {
                body: `Valendo ${challenge.amount}xp 🏆`
            })
        }
        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount 
        
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }   

        setCurrenceExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
        
    }

    return (
        <ChallengesContext.Provider 
        value={{
            level, 
            currentExperience, 
            challengesCompleted, 
            experienceToNextLevel,
            completeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            activeChallenge
            }}>
            {children}
        </ChallengesContext.Provider >
    )

}