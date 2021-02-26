import { useEffect, useState, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.scss'

import { faPlay, faStop, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Countdown = () => {
    const {
        minutes,
        hasFinished, 
        seconds,
        isActive,
        startCountdown,
        stopCountdown } = useContext(CountdownContext)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
