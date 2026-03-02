import React from "react";
import Tittle from "./Tittle";
import assets from "../assets/assets";
import { motion } from "motion/react";

const OurWork = () => {
  const workData = [
    //Array is here
    {
      tittle: "Moble app marketing",
      description:
        "We turn bold ideas into powerful digital solutions that connect, engage...",
      image: assets.work_mobile_app,
    },
    {
      tittle: "Dashboard management",
      description: "We help you execute your plan and deliver results.",
      image: assets.work_dashboard_management,
    },
    {
      tittle: "Fitness app promotion",
      description:
        "We help you to create a marketing strategy that drives results",
      image: assets.work_fitness_app,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      id="our-work"
      className="flex flex-col items-center gap-7 pt-30 px-4 sm:px-12 lg:px-24 xl:px-40 text-gray-700 dark:text-white"
    >
      <Tittle
        tittle="Our latest work"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {workData.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="cursor-pointer transition-all duration-500 hover:scale-102"
          >
            <img src={work.image} className="w-full rounded-xl" alt="" />

            <h3 className="mt-3 mb-2 text-lg font-semibold">{work.tittle}</h3>

            <p className="text-sm opacity-60 w-5/6">{work.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurWork;
