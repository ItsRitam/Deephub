import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video } from "lucide-react";
import { Link } from "react-router-dom";

const UploadZone = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        AI Deepfake Detection System
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* IMAGE CTA */}
        <Link to="/scan" className="block focus:outline-none">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900 hover:border-[#5044E5] dark:hover:border-[#6a5fff] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm h-full"
          >
            <div className="h-20 w-20 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-5">
              <ImageIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Image Detection
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Click here to try our image detection model
            </p>
          </motion.div>
        </Link>

        {/* VIDEO CTA */}
        <Link to="/scan" className="block focus:outline-none">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900 hover:border-red-400 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm h-full"
          >
            <div className="h-20 w-20 rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
              <Video className="h-10 w-10 text-red-500 dark:text-red-400" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Video Detection
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Click here to try our video detection model
            </p>
          </motion.div>
        </Link>

      </div>
    </div>
  );
};

export default UploadZone;