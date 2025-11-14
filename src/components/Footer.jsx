import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socials = [
    {
      icon: <Facebook size={22} />,
      href: "https://facebook.com/tantien.dev",
      label: "Facebook",
    },
    {
      icon: <Youtube size={22} />,
      href: "https://www.youtube.com/@tantien.dev",
      label: "YouTube",
    },
    {
      icon: <Instagram size={22} />,
      href: "https://instagram.com/tantien.dev",
      label: "Instagram",
    },
  ];

  // 🟣 Cuộn mượt về đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const event = new CustomEvent("sectionChange", { detail: { id: "" } });
    window.dispatchEvent(event);
  };

  // 🟢 Theo dõi vị trí cuộn - hiển thị nút ScrollTop khi qua Hero
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setShowScrollTop(window.scrollY > heroBottom - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🟣 Cuộn mượt về Hero khi click logo
  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
      const event = new CustomEvent("sectionChange", { detail: { id: "" } });
      window.dispatchEvent(event);
    }
  };

  return (
    <footer className="relative bg-indigo-950 text-white py-12 overflow-hidden">
      {/* 🌈 Hiệu ứng nền gradient động */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[120%] h-[120%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl rounded-full"
          animate={{
            x: ["-20%", "20%", "-15%"],
            y: ["-10%", "15%", "-5%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[140%] h-[140%] bg-gradient-to-l from-purple-400 via-pink-500 to-indigo-500 opacity-20 blur-3xl rounded-full"
          animate={{
            x: ["15%", "-25%", "20%"],
            y: ["10%", "-15%", "10%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Nội dung chính */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Logo + tagline */}
        <motion.h3
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
          }}
          onClick={scrollToHero}
          className="text-3xl font-extrabold tracking-wide mb-2 bg-gradient-to-r from-white via-indigo-100 to-pink-100 bg-clip-text text-transparent cursor-pointer select-none"
        >
          TanTien.dev{" "}
          <span className="text-sm font-light">| Frontend Developer</span>
        </motion.h3>

        <p className="text-indigo-200 text-sm mb-8 italic">
          “Không chỉ viết code, mình tạo ra những trải nghiệm web tinh tế và
          hiệu quả.”
        </p>

        {/* Mạng xã hội */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 justify-center mb-8 flex-wrap"
        >
          {socials.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              title={item.label}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Thông tin bản quyền */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-indigo-100"
        >
          © {new Date().getFullYear()} Nguyễn Tấn Tiến — Frontend Developer. Mọi
          quyền được bảo lưu.
        </motion.p>

        <p className="text-xs text-indigo-300 mt-2">
          Được thiết kế & phát triển với ❤️ bằng React, TailwindCSS & Framer
          Motion.
        </p>
      </motion.div>

      {/* 🔼 Nút Scroll To Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTop"
            initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={scrollToTop}
            whileHover={{
              scale: 1.15,
              rotate: 360,
              boxShadow:
                "0 0 25px rgba(99,102,241,0.6), 0 0 50px rgba(167,139,250,0.4)",
              background:
                "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
            }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
