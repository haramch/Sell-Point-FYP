import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import JoinAsSeller from './JoinAsSeller'
import Footer from '../../components/Footer'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Terms from './Terms'
import PrivacyPolicy from './PrivacyPolicy'
import Brands from './Brands'

export default function Frontend() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='about-us' element={<AboutUs />} />
                <Route path='contact-us' element={<ContactUs />} />
                <Route path='terms' element={<Terms/>}/>
                <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
                <Route path='brands' element={<Brands/>}/>
                <Route path='join-as-seller' element={<JoinAsSeller />} />
            </Routes>
            <Footer/>
        </>
    )
}