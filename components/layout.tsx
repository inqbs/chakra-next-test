import { ReactChild, ReactChildren } from 'react'
import Footer from "./footer"
import NavBar from './navbar'

interface LayoutProps {
  children: ReactChildren | ReactChild
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout