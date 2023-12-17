import styles from '/styles/footer.module.scss'


export default function Footer() {

    return (
        <section className={styles.footer}>

            <div className="motto">
                This is a time for potential rebirth, a second genesis born from the ashes of the old world, and the digital pulse of the new
            </div>
            <div className="copy">
                Copyright Desolation Project &copy; 2024
            </div>

        </section>
    )
}