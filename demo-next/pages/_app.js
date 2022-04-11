import { QueueProvider } from '../components/QueueProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueueProvider>
        <Component {...pageProps} />
      </QueueProvider>
    </>
  )
}

export default MyApp
