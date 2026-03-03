import React from "react";
import assets from "../assets/assets";
import Tittle from "./Tittle";
import ServiceCard from "./ServiceCard";
import { motion } from "motion/react";

const Services = () => {
  //array:-
  const servicesData = [
    {
      tittle: "Deepfake Detection",
      description:
        "Detect manipulated faces, altered videos with advanced analysis",
      icon: assets.ads_icon,
    },
    {
      tittle: "Media Verification",
      description: "Check whether uploaded images and videos are real, modified, or artificially created.",
      icon: assets.marketing_icon,
    },
    {
      tittle: "Content Analysis",
      description:
        "We Examine visual patterns and inconsistencies to identify fake media.",
      icon: assets.content_icon,
    },
    {
      tittle: "Social media Authenticity",
      description:
        "Prevent the spread of misleading content by verifying media from us before sharing.",
      icon: assets.social_icon,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="services"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white "
    >
      <img
        src={assets.bgImage2}
        alt=""
        className="absolute -top-110 -left-70 -z-1 dark:hidden"
      />

      <Tittle
        tittle="How can we help?"
        desc="We examine pixel patterns, facial inconsistencies, and metadata anomalies to identify tampering."
      />

      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
