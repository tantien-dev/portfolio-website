import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { fadeInUp } from "../utils/motion";

const projects = [
  {
    name: "CRM Lite Application",
    desc: "Ứng dụng quản lý khách hàng (CRM) với giao diện hiện đại và dễ sử dụng. Cho phép thêm, chỉnh sửa, lọc và tìm kiếm khách hàng theo thời gian thực. Hệ thống được xây dựng bằng React, Node.js, Express và JSON Server nhằm mô phỏng API và dữ liệu thực tế.",
    tech: ["React", "Node.js", "Express", "JSON Server"],
    img: "/src/assets/projects/crm-app.jpg",
    live: "https://crm-mini-frontend.onrender.com",
    code: "https://github.com/yourusername/crm-mini-app",
  },
  {
    name: "Personal Portfolio Website",
    desc: "Website cá nhân được thiết kế với bố cục hiện đại, tối ưu trải nghiệm người dùng và hiệu ứng động tinh tế. Trang web giới thiệu kỹ năng, dự án và hành trình phát triển sự nghiệp công nghệ của tôi — được xây dựng hoàn toàn bằng React, TailwindCSS và Framer Motion.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    img: "/src/assets/projects/portfolio-preview.jpg",
    live: "#",
    code: "https://github.com/yourusername/portfolio",
  },
  {
    name: "Landing Page Business Template",
    desc: "Mẫu website landing page dành cho doanh nghiệp nhỏ, được tối ưu SEO, tốc độ tải nhanh và tương thích đa thiết bị. Dự án thể hiện khả năng thiết kế giao diện hiện đại, triển khai UI/UX mạch lạc và sử dụng kỹ thuật tối ưu hiệu suất React + Tailwind.",
    tech: ["React", "TailwindCSS", "Vite"],
    img: "/src/assets/projects/landing-business.jpg",
    live: "#",
    code: "https://github.com/yourusername/landing-business",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-gradient-to-b from-white via-indigo-50/30 to-white overflow-hidden"
    >
      {/* Hiệu ứng nền */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.1),transparent_70%)]"
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
          Dự án nổi bật
        </span>
      </motion.h2>

      {/* Danh sách dự án */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 relative z-10">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-indigo-100 hover:border-indigo-200 transition-all duration-300 overflow-hidden"
          >
            {/* Ảnh demo */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center gap-4 pb-6">
                <motion.a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-indigo-700 transition"
                >
                  <ExternalLink className="w-4 h-4" /> Xem Live
                </motion.a>
                <motion.a
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-200 transition"
                >
                  <Github className="w-4 h-4" /> Xem Code
                </motion.a>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-6 text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                {p.name}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
