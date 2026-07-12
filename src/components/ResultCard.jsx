import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react";

const ResultCard = ({ result, onReset }) => {
  const isReal = result.status === "real";
  
  const mediaType = result.type === "video" ? "Video" : "Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={`rounded-2xl border p-8 text-center shadow-lg bg-white dark:bg-gray-900 transition-colors duration-300 ${
        isReal
          ? "border-green-200 dark:border-green-900/50 shadow-green-100 dark:shadow-green-900/10"
          : "border-red-200 dark:border-red-900/50 shadow-red-100 dark:shadow-red-900/10"
      }`}
    >
      <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
        isReal 
          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
          : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
      }`}>
        {isReal ? <ShieldCheck className="h-8 w-8" /> : <ShieldAlert className="h-8 w-8" />}
      </div>

      <h3 className={`text-2xl font-bold mb-2 ${
        isReal ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      }`}>
        {isReal ? `Authentic ${mediaType}` : "Deepfake Detected"}
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {isReal
          ? "No signs of AI manipulation were found."
          : "This file shows signs of AI-generated manipulation."}
      </p>

      <div className="mx-auto max-w-xs mb-8">
        <div className="mb-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Confidence Score</span>
          <span className="font-mono font-semibold text-gray-900 dark:text-white">
            {result.confidence}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`h-full rounded-full ${isReal ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
      >
        <RotateCcw className="h-4 w-4" />
        Analyze Another File
      </button>
    </motion.div>
  );
};

export default ResultCard;