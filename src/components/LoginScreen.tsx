import styles from '../styles/components/LoginScreen.module.scss'
import { signIn, signOut, useSession } from 'next-auth/client'

export const LoginScreen = () => {
    const [ session, loading ] = useSession()

    return (
        <div className={styles.container}>
            <section className={styles.contentWrapper}>
                
                <div className={styles.textWrapper}>  
                <div className={styles.logo}>
                    <img src="/logo.png" alt="PomoChallenge"/>
                </div>

                    <div className={styles.textContent}>
                        {loading ? 
                        <h2>Carregando...</h2>
                        :
                        <p>Aplicativo para controle de produtividade alinhado à exercícios que melhoram sua qualidade de vida.</p>
                        }
                    </div>
                    {!loading && <div className={styles.loginCard}>
                        <p>É necessário estar logado para continuar.</p>
                        <a onClick={():Promise<void> => signIn('auth0')}>Fazer login</a>
                    </div> }
                   
                </div>
            </section>
        </div>
    )
}
