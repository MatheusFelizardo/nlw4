import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/Profile.module.scss'

export const Profile = () => {
    const { level } = useContext(ChallengesContext)
    const { picture_url, username } = useContext(UserContext)
    return (

        <div className={styles.profileContainer} >
            <img src={picture_url || ""} alt="{username}"/>

            <div>
                <strong>{username || ""}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    {level}
                </p>
            </div>
        </div>
    )
}
