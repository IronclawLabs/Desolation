import styles from '/styles/header.module.scss'

export default function Header() {

    return (
        <section className={styles.header}>

            <div className="logo">
                <img src="/assets/desolation-logo.png" alt="Desolation logo" width={200}/>
                {/*<img src="/assets/desolation-logo-masked.png" alt="Desolation logo" width={200}/>*/}
            </div>

            <div className={styles.mainMenu}>
                <img src="/assets/desolation-ico.png" alt="Desolation logo" width={50}/>
            </div>

        </section>
    )
}