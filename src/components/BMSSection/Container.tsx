import { useEffect, useRef } from 'react'
type Props = {
  children: JSX.Element | JSX.Element[]
}
const Container = ({ children }: Props) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight

        if (rect.top >= 0 && rect.top <= windowHeight * 0.9) {
          sectionRef.current.classList.add('visible')
        } else {
          sectionRef.current.classList.remove('visible')
        }
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll)
    // Check visibility on load
    handleScroll()

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className='bms'>
      {children}
    </section>
  )
}
export default Container
