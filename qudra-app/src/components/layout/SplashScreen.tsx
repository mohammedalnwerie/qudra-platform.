/**
 * SplashScreen — شاشة إقلاع خفيفة وسريعة لمرة واحدة فقط في الجلسة.
 * تحترم prefers-reduced-motion وتخزن حالة العرض في sessionStorage.
 */

import { useState, useEffect, useCallback } from 'react'
import { QudraLogo } from '../ui/QudraLogo'
import styles from './SplashScreen.module.css'

export function SplashScreen() {
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const alreadyShown = sessionStorage.getItem('qudra_splash_dismissed') === 'true'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !alreadyShown && !reduceMotion
  })

  const [isLit, setIsLit] = useState<boolean>(false)
  const [isGone, setIsGone] = useState<boolean>(false)

  const dismiss = useCallback(() => {
    setIsGone(true)
    try {
      sessionStorage.setItem('qudra_splash_dismissed', 'true')
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      setShouldRender(false)
    }, 400)
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    const litTimer = setTimeout(() => {
      setIsLit(true)
    }, 30)

    // إقلاع سريع وأنيق (900ms) بدلاً من تعطيل المستخدم
    const autoDismissTimer = setTimeout(() => {
      dismiss()
    }, 900)

    const handleKey = () => dismiss()
    window.addEventListener('keydown', handleKey, { once: true })

    return () => {
      clearTimeout(litTimer)
      clearTimeout(autoDismissTimer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [shouldRender, dismiss])

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.splash} ${isLit ? styles.lit : ''} ${isGone ? styles.gone : ''}`}
      dir="rtl"
      role="status"
      aria-label="جارٍ التشغيل"
      onClick={dismiss}
    >
      <div className={styles.spIn}>
        <span className={styles.spHalo} aria-hidden="true" />
        <QudraLogo
          size={72}
          className={styles.spMark}
          aria-hidden="true"
          alt=""
        />
        <QudraLogo
          variant="wordmark"
          width={180}
          className={styles.spLock}
          alt="قُدرة"
        />
        <span className={styles.spTag}>
          من الكلام إلى <b>الدليل</b>
        </span>
        <span className={styles.spBar} aria-hidden="true">
          <i />
        </span>
      </div>
    </div>
  )
}
export default SplashScreen
