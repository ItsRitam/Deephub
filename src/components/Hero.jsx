import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import UploadZone from "./UploadZone";
import { Video } from "lucide-react";

const Hero = () => {
  return (
    <div
      id="hero"
      className="flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      {/* Badges Container */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        
        {/* Photos Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 p-1.5 pr-4 rounded-full"
        >
          <img className="w-20" src={assets.group_profile} alt="" />
          <p className="text-xs font-medium">Trained with 150k+ photos</p>
        </motion.div>

        {/* Videos Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 border border-gray-300 dark:border-gray-600 p-1.5 px-4 rounded-full"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30">
            <Video size={14} className="text-red-500" />
          </div>
          <p className="text-xs font-medium pr-1">Trained with 1k+ videos</p>
        </motion.div>
        
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl "
      >
        Unmasking Deepfakes{" "}
        <span className="bg-gradient-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent ">
          Restoring{" "}
        </span>
        digital trust
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 sm:max-w-lg pb-3 "
      >
        Creating meaningful connections and turning big ideas into interactive
        digital experiences
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        viewport={{ once: true }}
        className="relative w-full max-w-6xl mx-auto"
      >
        
        {/* Render the clean, clickable UploadZone cards directly */}
        <UploadZone />

        <img
          src={assets.bgImage1}
          alt=""
          className="absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 dark:hidden"
        />
      </motion.div>
    </div>
  );
};

export default Hero;