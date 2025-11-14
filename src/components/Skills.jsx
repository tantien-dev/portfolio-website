import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaWordpress,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPhp,
  SiFigma,
} from "react-icons/si";
import { useRef } from "react";

// Danh sách kỹ năng
const skills = [
  { name: "HTML5", icon: FaHtml5, color: "#e34c26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572b6" },
  { name: "JavaScript (ES6+)", icon: FaJs, color: "#f7df1e" },
  { name: "React.js", icon: FaReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Bootstrap", icon: FaBootstrap, color: "#7952b3" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "WordPress", icon: FaWordpress, color: "#21759b" },
  { name: "PHP", icon: SiPhp, color: "#777bb3" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Git / GitHub", icon: FaGitAlt, color: "#f1502f" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
];

// Animation
const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Skills() {
  const sectionRef = useRef(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white via-indigo-50 to-purple-50 overflow-hidden"
    >
      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.12),transparent_50%),radial-gradient(circle_at_75%_80%,rgba(167,139,250,0.12),transparent_50%)] pointer-events-none" />

      {/* Tiêu đề */}
      <motion.h2
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
          Kỹ năng chuyên môn
        </span>
      </motion.h2>

      {/* Mô tả tổng quan kỹ năng */}
      <motion.p
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
        className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-16"
      >
        Tôi sở hữu nền tảng vững chắc trong{" "}
        <span className="font-medium text-indigo-600">
          phát triển Frontend và WordPress
        </span>
        , cùng kiến thức mở rộng về{" "}
        <span className="font-medium text-purple-600">
          Backend (Node.js, Express, MongoDB)
        </span>
        . Tôi thường xuyên làm việc với{" "}
        <span className="text-indigo-500 font-semibold">React / Next.js</span>,{" "}
        <span className="text-purple-500 font-semibold">Tailwind CSS</span> và
        các công cụ thiết kế như{" "}
        <span className="text-pink-500 font-semibold">Figma</span> để tạo nên
        các sản phẩm web hiện đại, mượt mà và tối ưu hiệu năng. Hiện tôi đang
        định hướng phát triển trở thành{" "}
        <span className="font-semibold text-indigo-600">
          Full-Stack Developer
        </span>{" "}
        và nghiên cứu{" "}
        <span className="font-semibold text-purple-600">
          tích hợp AI vào website
        </span>{" "}
        nhằm mang lại trải nghiệm cá nhân hóa và thông minh hơn.
      </motion.p>

      {/* Lưới kỹ năng */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              custom={i * 0.05}
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="group relative bg-white/70 backdrop-blur-lg border border-white/50 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all overflow-hidden"
            >
              {/* Hiệu ứng hover */}
              <motion.div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition duration-500" />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                {Icon ? (
                  <Icon
                    className="w-12 h-12 mb-3 transition-transform group-hover:scale-110 duration-300"
                    style={{ color: skill.color }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-500">
                    {skill.name[0]}
                  </span>
                )}
              </motion.div>
              <span className="relative z-10 font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
