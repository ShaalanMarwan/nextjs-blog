import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
export default function Home() {
  return (
    <div className={styles.container}>
     {/* <Loader show/> */}
     <button onClick={()=> toast.success("hello react!")}>
       toast me
     </button>
    </div>
  );
}
