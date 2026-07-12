import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, ArrowLeft, Loader2 } from "lucide-react";
import ResultCard from "./ResultCard"; 

const ScanPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [mode, setMode] = useState("");
  
  const navigate = useNavigate();
  const API_URL = "http://localhost:8000";

  const handleUpload = async (file, type) => {
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    setFileName(file.name);
    setMode(type === "image" ? "Image" : "Video");

    const formData = new FormData();
    formData.append("file", file);

    const endpoint = type === "image" ? "/predict-image" : "/predict-video";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Failed to connect to ${type} API`);
      }

      setResult({
        status: data.prediction.toLowerCase(),
        confidence: data.confidence,
        fileUrl: data.file_url,
        type: type 
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300">
      
      <div className="mb-8">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5044E5] dark:text-gray-400 dark:hover:text-[#6a5fff] transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          AI Deepfake Detection System
        </h1>

        {!loading && !result && (
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900 hover:border-[#5044E5] dark:hover:border-[#6a5fff] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files[0], "image")}
              />
              <div className="h-20 w-20 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-5">
                <ImageIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Image Detection
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Upload PNG, JPG or JPEG image
              </p>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900 hover:border-red-400 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
            >
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files[0], "video")}
              />
              <div className="h-20 w-20 rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
                <Video className="h-10 w-10 text-red-500 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Video Detection
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Upload MP4, AVI or MOV video
              </p>
            </motion.label>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="animate-spin h-16 w-16 text-[#5044E5] mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Processing {mode}...
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {fileName}
            </p>
          </div>
        )}

        {!loading && result && (
          <div className="max-w-md mx-auto mt-8">
             <ResultCard 
               result={result} 
               onReset={() => {
                 setResult(null);
                 setFileName("");
               }} 
             />
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

      </div>
    </div>
  );
};

export default ScanPage;