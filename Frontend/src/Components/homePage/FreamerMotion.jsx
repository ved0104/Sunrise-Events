// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const FramerMotion = () => {
//     return (
//         <div className="flex flex-col items-center justify-center h-65 bg-amber-50 text-white text-center px-4">
//             {/* Stats Section with Pop Effect */}
//             <div className="flex gap-8">
//                 <motion.div
//                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
//                     initial={{ scale: 0, opacity: 0 }}
//                     whileInView={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                     viewport={{ once: true }} // Ensures animation plays only once
//                 >
//                     650+ <br /> Clients
//                 </motion.div>

//                 <motion.div
//                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
//                     initial={{ scale: 0, opacity: 0 }}
//                     whileInView={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                     viewport={{ once: true }}
//                 >
//                     12+ <br /> Years
//                 </motion.div>

//                 <motion.div
//                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
//                     initial={{ scale: 0, opacity: 0 }}
//                     whileInView={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                     viewport={{ once: true }}
//                 >
//                     1000+ <br /> Events
//                 </motion.div>

//             </div>
//         </div>
//     );
// };

// // const FramerMotion = () => {
// //     return (
// //         <div className="flex flex-col items-center justify-center h-65 bg-amber-50 text-white text-center px-4">
// //             {/* Stats Section with Pop Effect */}
// //             <div className="flex gap-8">
// //                 <motion.div
// //                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
// //                     initial={{ scale: 0, opacity: 0 }}
// //                     whileInView={{ scale: 1, opacity: 1 }}
// //                     transition={{ duration: 0.5, delay: 0.2 }}
// //                     viewport={{ once: true }} // Ensures animation plays only once
// //                 >
// //                     650+ <br /> Clients
// //                 </motion.div>

// //                 <motion.div
// //                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
// //                     initial={{ scale: 0, opacity: 0 }}
// //                     whileInView={{ scale: 1, opacity: 1 }}
// //                     transition={{ duration: 0.5, delay: 0.4 }}
// //                     viewport={{ once: true }}
// //                 >
// //                     12+ <br /> Years
// //                 </motion.div>

// //                 <motion.div
// //                     className="p-6 pt-15 h-50 w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl text-bold text-amber-600 font-semibold"
// //                     initial={{ scale: 0, opacity: 0 }}
// //                     whileInView={{ scale: 1, opacity: 1 }}
// //                     transition={{ duration: 0.5, delay: 0.4 }}
// //                     viewport={{ once: true }}
// //                 >
// //                     1000+ <br /> Events
// //                 </motion.div>

// //             </div>
// //         </div>
// //     );
// // };

// export default FramerMotion;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Counter = ({ end, duration, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return; // Start counting only when visible
    let start = 0;
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [startCounting, end, duration]);

  return <span>{count}</span>;
};

const FramerMotion = () => {
  const [startCounting, setStartCounting] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-70 text-center px-4 bg-[#FFF5ED]">
      {/* Stats Section */}
      <motion.div
        className="flex flex-wrap gap-8"
        whileInView={() => setStartCounting(true)} // Start counting when visible
        viewport={{ once: true }} // Ensures animation plays only once
      >
        {/* Clients */}
        <motion.div
          className="pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Counter end={650} duration={4} startCounting={startCounting} />+ <br /> Clients
        </motion.div>

        {/* Years */}
        <motion.div
          className=" pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Counter end={12} duration={4} startCounting={startCounting} />+ <br /> Years
        </motion.div>

        {/* Events */}
        <motion.div
          className="pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Counter end={1000} duration={1} startCounting={startCounting} />+ <br /> Events
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FramerMotion;
