import styles from '../styles/components/LoginScreen.module.scss'
import { signIn, signOut, useSession } from 'next-auth/client'

export const LoginScreen = () => {
    const [ session, loading ] = useSession()

    return (
        <div className={styles.container}>

            {loading && <div>Carregando...</div>}

            <section className={styles.contentWrapper}>
                
                <div className={styles.textWrapper}>  
                <div className={styles.logo}>
                    <img src="/logo.png" alt="PomoChallenge"/>
                </div>
                    <div className={styles.textContent}>
                        <p>Aplicativo para controle de produtividade alinhado à exercícios que melhoram sua qualidade de vida.</p>
                    </div>

                    <div className={styles.loginCard}>
                        <p>É necessário estar logado para continuar.</p>
                        <button onClick={():Promise<void> => signIn('auth0')}>Fazer login</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
