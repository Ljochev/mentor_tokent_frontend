import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarLayout from '../components/sidebar/SidebarLayout';

const Layout = ({nav=false, footer=false, sidebarLayout=false, type='', children}) => {

  return (
    <>
        {nav && <Header/>}
        {sidebarLayout && <SidebarLayout type={type} children={children}/>}
        {!sidebarLayout && children}
        {footer && <Footer/>}
    </>
  )
}

export default Layout