import React from 'react'
import HeroSection from '../../../components/HeroSection'
import HomePageService from '../../../components/HomePageService'
import Adminfeatures from '../../../components/Adminfeatures'  
import Buyerfeatures from '../../../components/Buyerfeatures' 
import CaseStudy from '../../../components/CaseStudy'
import Customization from '../../../components/Customization'
import MobileApps from '../../../components/MobileApps'
import ProcessSection from '../../../components/ProcessSection'
import TestimonialSection from '../../../components/TestimonailSection'
import BuyerApp from '../../../components/BuyerApp'
import GuideSection from '../../../components/GuideSection'
import FaqSection from '../../../components/FaqSection'

export default function Home() {
    return (
        <div>
            <HeroSection />
            <HomePageService />
            <Adminfeatures />
            <Buyerfeatures/>
            <CaseStudy/>
            <Customization/>
            <MobileApps/>
            <ProcessSection/>
            <TestimonialSection/>
            <BuyerApp/>
            <GuideSection/>
            <FaqSection/>
        </div>
    )
}