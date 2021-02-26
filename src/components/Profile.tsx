import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.scss'

export const Profile = () => {
    const { level } = useContext(ChallengesContext)

    return (

        <div className={styles.profileContainer} >
            <img src="https://github.com/MatheusFelizardo.png" alt="Matheus Felizardo"/>

            <div>
                <strong>Matheus Felizardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    {level}
                </p>
            </div>
        </div>
    )
}
