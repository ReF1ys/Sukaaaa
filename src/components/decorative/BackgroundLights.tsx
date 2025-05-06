import styles from './BackgroundLights.module.css'
import Image from 'next/image';

const BackgroundLights = () => {
    return (
        <div className={styles.wrapper}>
            <Image src="/decoratives/line1.svg" alt="Decorative Line 1" className={styles.line1} width={1000} height={500} />
            <Image src="/decoratives/Line.svg" alt="Decorative Line 2" className={styles.line2} width={1000} height={500} />
        </div>
    )
}

export default BackgroundLights;
