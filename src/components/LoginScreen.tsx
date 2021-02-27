import styles from '../styles/components/LoginScreen.module.scss'

export const LoginScreen = () => {

    return (
        <div className={styles.container}>
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
                        <a href="/api/auth/login">Fazer login</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
