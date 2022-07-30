import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({
  children,
  title,
  className,
}: {
  children: ReactNode
  title?: string
  className?: string
}) {
  return (
    <>
      <Header title={title} />
      <div className={`mx-auto max-w-7xl  ${className}`}>{children}</div>
      <Footer />
    </>
  )
}
