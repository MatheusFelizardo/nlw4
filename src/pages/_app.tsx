import { Provider } from 'next-auth/client'
import { ChallengesProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'
// import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
