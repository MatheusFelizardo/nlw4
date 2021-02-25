import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.scss'


export const ChallengeBox = () => {
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext)

    return (
        <div className={styles.ChallengeBoxContainer}>

            {activeChallenge ? 
            (<div className={styles.ChallengeActive}>
                <header>Ganhe {activeChallenge.amount}xp</header>

                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} alt={activeChallenge.type}/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>

                <footer>
                    <button type="button" className={styles.challengeFailedButton} onClick={resetChallenge}>Falhei</button>

                    <button type="button" className={styles.challengeSuceededdButton}>Completei</button>
                </footer>
            </div>)
            :             
            (<div className={styles.ChallengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Complete os desafios, ganhe experiência e suba de level.
                </p>
            </div>)
            }

            
        </div>
    )
}
