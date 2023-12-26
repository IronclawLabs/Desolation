
import styles from '@styles/home.module.scss'
import Room from "@components/room";
import Overlay from "@components/overlay";
import Header from "@components/header";
import Footer from "@components/footer";
import LoginLightbox from "@components/login-lightbox";

export default function Login() {
    return (
        <>
            <main className={styles.main } >

                <Header/>

                <Overlay/>

                <LoginLightbox/>

                <Room/>

                <Footer/>

            </main>
        </>
    )
}
