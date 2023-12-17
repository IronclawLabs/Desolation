import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})

import Head from 'next/head'
import styles from '@styles/home.module.scss'
import Room from "@components/room";
import Overlay from "@components/overlay";
import Header from "@components/header";
import Footer from "@components/footer";
import LoginLightbox from "@components/login-lightbox";

export default function Login() {
    return (
        <>
            <Head>
                <title>Desolation</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main + " " +  inter.className} >

                <Header/>

                <Overlay/>

                <LoginLightbox/>

                <Room/>

                <Footer/>

            </main>
        </>
    )
}
