import React from 'react'
import styles from '../styles/components/Profile.module.scss'

export const Profile = () => {
    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/MatheusFelizardo.png" alt="Matheus Felizardo"/>

            <div>
                <strong>Matheus Felizardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}
