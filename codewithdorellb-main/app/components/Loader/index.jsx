import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div class="spinner" className={styles.spinner}>
  <div class="dot1" className={styles.dot1}></div>
  <div class="dot2" className={styles.dot2}></div>
</div>
  )
}
