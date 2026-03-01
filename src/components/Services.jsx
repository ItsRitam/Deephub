import React from 'react'
import assets from '../assets/assets'
import Tittle from './Tittle'
 import ServiceCard from './ServiceCard'
import { motion } from "framer-motion"

const Services = () => {
//array:-
    const servicesData = [
        {
            tittle : 'Advertising',
            description : 'We trust bold ideas into powerful digital solutions that connect, engage...',
            icon : assets.ads_icon
        },
        {
            tittle : 'Content marketing',
            description : 'We help you execute your plan and deliver results.',
            icon : assets.marketing_icon
        },
        {
            tittle : 'Content writing',
            description : 'We help you create a marketing strategy that derives results.',
            icon : assets.content_icon
        },
        {
            tittle : 'Social media',
            description : 'We help you build a strong social media presence and engage with your audience.',
            icon : assets.social_icon
        },
    ]

  return (
    <div
    initial = 'hidden'
    whileInView='visible'
    viewport={{once: true}}
    transition={{staggerChildren:0.2}}
    id='services' className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white '>

        <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 -z-1 dark:hidden'/>

        <Tittle tittle='How can we help?' desc='Form strategy to execution, we craft digital solution that move your business forward.'/>

        <div className='flex flex-col md:grid grid-cols-2'>
            {servicesData.map((service, index)=>(
                <ServiceCard key={index} service={service} index={index}/>
            ))}
        </div>
      
    </div>
  )
}

export default Services

