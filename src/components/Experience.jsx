import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { fadeInUp } from "../utils/motion";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      company: "Freelance Developer",
      position: "Frontend Developer (ReactJS / UI Developer)",
      period: "2024 - Hiện tại",
      details:
        "Thực hiện các dự án freelance cho doanh nghiệp nhỏ và cá nhân, tập trung vào việc xây dựng website và ứng dụng React hiện đại. Ứng dụng linh hoạt các công nghệ như TailwindCSS, Framer Motion và REST API để tạo ra giao diện tinh tế, tối ưu hiệu suất và trải nghiệm người dùng.",
    },
    {
      company: "Cộng tác Startup / Dự án nội bộ",
      position: "Web Developer",
      period: "2023 - 2024",
      details:
        "Tham gia phát triển giao diện web cho dự án startup công nghệ, chịu trách nhiệm triển khai UI theo thiết kế Figma và tối ưu responsive trên đa nền tảng. Hợp tác chặt chẽ với team backend để tích hợp API, đảm bảo tính thống nhất và hiệu năng cao của hệ thống.",
    },
    {
      company: "Tự học & Xây dựng nền tảng chuyên môn",
      position: "Frontend Learner / Project Builder",
      period: "2022 - 2023",
      details:
        "Tập trung học sâu về JavaScript, ReactJS và các thư viện UI hiện đại. Thực hành qua hàng loạt dự án nhỏ để củng cố kỹ năng lập trình, tư duy UI/UX và workflow phát triển sản phẩm thực tế (Git, deploy, code structure).",
    },
    {
      company: "Công ty Thiết kế & Phát triển Website",
      position: "Nhân viên Thiết kế & Lập trình Website",
      period: "2019 - 2022",
      details:
        "Phụ trách thiết kế giao diện và lập trình website cho doanh nghiệp, khách hàng trong nước. Có kinh nghiệm làm việc với HTML, CSS, JavaScript và CMS (WordPress). Học hỏi quy trình triển khai website chuyên nghiệp và phối hợp cùng đội ngũ thiết kế – nội dung – kỹ thuật.",
    },
  ];

  const fadeVariant = (direction = "left") => ({
    hidden: { opacity: 0, x: direction === "left" ? -80 : 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 bg-gradient-to-b from-white via-indigo-50/40 to-white overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.15),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.15),transparent_70%)]"
      />

      {/* Tiêu đề */}
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center text-gray-900 mb-14"
      >
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Kinh nghiệm làm việc
        </span>
      </motion.h2>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 rounded-full transform -translate-x-1/2" />
        {/* Glow line */}
        <motion.div
          style={{ height: glowHeight }}
          className="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(139,92,246,0.6)] rounded-full transform -translate-x-1/2"
        />

        <div className="flex flex-col gap-20">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeVariant(i % 2 === 0 ? "left" : "right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center md:items-stretch`}
            >
              {/* Card */}
              <div
                className={`w-full md:w-1/2 md:pr-8 ${
                  i % 2 !== 0 ? "md:order-2 md:pl-8 md:pr-0" : ""
                }`}
              >
                <div className="bg-white/90 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 relative z-10">
                  {/* Thêm padding-top nhỏ để tránh icon đè lên text trên mobile */}
                  <div className="pt-6 md:pt-0">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {exp.details}
                    </p>
                  </div>
                </div>
              </div>

              {/* Icon timeline */}
              <div className="absolute left-1/2 md:top-1/2 top-0 -translate-x-1/2 md:-translate-y-1/2 z-20 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-4 border-white">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Khoảng trống cho desktop */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
