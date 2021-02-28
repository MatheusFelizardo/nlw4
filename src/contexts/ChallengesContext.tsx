import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    closeLevelUpModal: () => void;    
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider ({children, ...rest}:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrenceExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelModalOpen, setIsLevelUpModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) 
    
    useEffect(()=> {

        if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) )
        {  
            alert("É mobile")
        }
        else {
            alert("É desktop")
            Notification.requestPermission().then(function(permission) { console.log('Permission state:', permission)});
        }

        
    }, [])

    useEffect(()=> {
        Cookies.set('level', `${level}`)
        Cookies.set('currentExperience', `${currentExperience}`)
        Cookies.set('challengesCompleted', `${challengesCompleted}`)

    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level+1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
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
            activeChallenge,
            closeLevelUpModal
            }}>
            {children}
            { isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider >
    )

}