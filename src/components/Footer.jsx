// ✅ ONLY FIXES — your code, minimal changes, mobile issue solved

import React from 'react'
import assets from '../assets/assets'
import { motion } from 'motion/react';

const Footer = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full overflow-x-hidden bg-slate-50 dark:bg-gray-900 pt-10 mt-20 px-4 sm:px-10 lg:px-24 xl:px-40"
    >
      {/* footer top */}
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">

        {/* left column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full space-y-5 text-sm text-gray-700 dark:text-gray-400"
        >
          <img
            src={theme === 'dark' ? assets.logo_dark : assets.logo}
            className="w-32 sm:w-44 mx-auto lg:mx-0"
            alt=""
          />

          <p className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            Redefining digital trust with intelligent deepfake detection technology.
          </p>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-4">
            <li><a className="hover:text-primary" href="#hero">Home</a></li>
            <li><a className="hover:text-primary" href="#services">Services</a></li>
            <li><a className="hover:text-primary" href="#our-work">Our Work</a></li>
            <li><a className="hover:text-primary" href="#contact-us">Contact Us</a></li>
          </ul>
        </motion.div>

        {/* right column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full text-gray-600 dark:text-gray-400"
        >
          <h3 className="font-semibold text-center lg:text-left">
            Subscribe our newsletter
          </h3>

          <p className="text-sm mt-2 mb-6 text-center lg:text-left">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex w-full gap-2">
  <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 min-w-0 p-3 text-sm outline-none rounded
               dark:text-gray-200 bg-transparent
               border border-gray-300 dark:border-gray-500"
  />

  <button className="shrink-0 bg-primary text-white rounded px-4">
    Subscribe
  </button>
</div>

        </motion.div>

      </div>

      <hr className="border-gray-300 dark:border-gray-500 my-6" />

      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="pb-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4"
      >
        <p className="text-center">
          Copyright 2026 © Deephub.ai - All Right Reserved.
        </p>

        <div className="flex gap-4">
          <img src={assets.facebook_icon} />
          <img src={assets.twitter_icon} />
          <img src={assets.instagram_icon} />
          <img src={assets.linkedin_icon} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Footer
