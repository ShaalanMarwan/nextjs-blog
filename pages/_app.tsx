import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }:AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
  );
}

export default MyApp;