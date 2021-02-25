import { useEffect, useState, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.scss'

import { faPlay, faStop, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Countdown = () => {
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const [hasFinished, setHasFinished] = useState(false)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    const startCountdown = () => {
        setIsActive(true)
    }

    const stopCountdown = () => {
        setIsActive(false)
    }

    useEffect(()=> {
        if(isActive && time > 0) {
            setTimeout(()=> {
                setTime(time-1)
            }, 1000)
        }
        if(isActive && time === 0) {
            setHasFinished(true)
            let alarm = new Audio ('alarm-sound.mp3')

            alarm.play()
            startNewChallenge()
            setIsActive(false)
            setTime(.1 * 60)
        }
        if (!isActive) {
            setTime(.1 * 60)
        }
    }, [isActive, time])

    return (
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>

        </div>
        {hasFinished ? ( 
            <button disabled onClick={startCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonFinished}`}>
            <span>Ciclo encerrado</span> <FontAwesomeIcon icon={faCheckCircle} />
            </button>
        ) : <>
             {isActive ? ( <button onClick={stopCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            <span>Abandonar ciclo</span> <FontAwesomeIcon icon={faStop} />
            </button>) : (<button onClick={startCountdown} type="button" className={styles.countdownButton}>
            <span>Iniciar um ciclo</span> <FontAwesomeIcon icon={faPlay} />
            </button>)}
        </>}
       
        



        </div>
    )
}
