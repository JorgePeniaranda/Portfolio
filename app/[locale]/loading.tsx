import styles from '@/styles/loading.module.css'

export default function Loading () {
  return (
    <div className='bg-black grid place-items-center w-full h-full fixed top-0 left-0  z-50'>
      <span className={styles.loader} />
    </div>
  )
}
