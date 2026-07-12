import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  FileVideo,
  FileImage,
  Plus,
  User,
  Camera,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const API_URL =
    "https://deephub-api.wonderfulplant-dffbac5d.centralindia.azurecontainerapps.io";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data);
        setAvatarUrl(data.profile_photo);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload-profile-photo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      setAvatarUrl(data.profile_photo);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black dark:text-white">
        Loading Dashboard...
      </div>
    );
  }

  const recentScans = profileData?.recent_predictions || [];
  const totalScans = recentScans.length;
  const fakesCount = recentScans.filter(
    (scan) => scan.prediction === "Fake",
  ).length;
  const realsCount = recentScans.filter(
    (scan) => scan.prediction === "Real",
  ).length;

  const displayedScans = showAll ? recentScans : recentScans.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300 relative">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profileData?.name || "User"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
            Here is what's happening with your recent deepfake scans.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/scan">
              <button className="flex items-center gap-2 bg-[#5044E5] hover:bg-[#4d8cea] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
                <Plus size={18} />
                New Scan
              </button>
            </Link>
          </div>
        </div>

        <div className="relative group shrink-0">
          <input
            type="file"
            accept="image/*"
            id="avatarUpload"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatarUpload"
            className="cursor-pointer block relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md w-32 h-32 sm:w-40 sm:h-40 bg-blue-50 dark:bg-gray-800 flex items-center justify-center transition-transform hover:scale-105"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User
                className="w-14 h-14 sm:w-16 sm:h-16 text-[#5044E5] dark:text-gray-400"
                strokeWidth={1.5}
              />
            )}

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </label>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Total Scans
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalScans}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500 dark:text-blue-400">
              <Activity size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Fakes Detected
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {fakesCount}
              </h3>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500 dark:text-red-400">
              <ShieldAlert size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Authentic Media
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {realsCount}
              </h3>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-500 dark:text-green-400">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col mb-10"
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 z-10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Scan History
          </h2>
        </div>

        {recentScans.length > 0 ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr className="text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-6 py-4 font-medium">Preview</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Result</th>
                    <th className="px-6 py-4 font-medium">Confidence</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <AnimatePresence initial={false}>
                    {displayedScans.map((scan) => (
                      <motion.tr
                        key={scan._id || Math.random()}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {/* --- UPDATED PREVIEW LOGIC --- */}
                            {scan.media_type === "image" ? (
                              <img
                                src={scan.file_url}
                                alt="thumbnail"
                                onClick={() =>
                                  setSelectedMedia({
                                    url: scan.file_url,
                                    type: "Image",
                                  })
                                }
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:opacity-80 transition-opacity relative z-10"
                              />
                            ) : (
                              <div
                                onClick={() =>
                                  setSelectedMedia({
                                    url: scan.file_url,
                                    type: "Video",
                                  })
                                }
                                className="relative w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:opacity-80 transition-opacity overflow-hidden z-10 bg-black flex items-center justify-center"
                              >
                                <video
                                  src={`${scan.file_url}#t=0.1`}
                                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                                  preload="metadata"
                                  muted
                                  playsInline
                                />
                                <FileVideo
                                  size={16}
                                  className="relative text-white z-20 drop-shadow-md"
                                />
                              </div>
                            )}
                            {/* ----------------------------- */}

                            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-[200px]">
                              {scan.filename}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 capitalize">
                            {scan.media_type === "video" ? (
                              <FileVideo size={16} className="text-red-500" />
                            ) : (
                              <FileImage size={16} className="text-blue-500" />
                            )}
                            {scan.media_type}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              scan.prediction === "Fake"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                            }`}
                          >
                            {scan.prediction}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${scan.prediction === "Fake" ? "bg-red-500" : "bg-green-500"}`}
                                style={{ width: `${scan.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {scan.confidence}%
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                          {new Date(scan.created_at).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {recentScans.length > 5 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center bg-gray-50/50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-2 text-sm font-semibold text-[#5044E5] bg-[#5044E5]/10 hover:bg-[#5044E5]/20 dark:text-[#6a5fff] dark:bg-[#6a5fff]/10 dark:hover:bg-[#6a5fff]/20 rounded-full transition-colors"
                >
                  {showAll ? "Show Less" : `Show All (${totalScans})`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No history available. Upload a file to start unmasking deepfakes.
          </div>
        )}
      </motion.div>

      {/* Media Preview Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all z-[60]"
              title="Close"
            >
              <X size={28} />
            </button>

            {selectedMedia.type === "Video" ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10 outline-none bg-black"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedMedia.url}
                alt="Enlarged Preview"
                className="w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10 outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
