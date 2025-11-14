import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState(null);
  const [isManualScroll, setIsManualScroll] = useState(false);

  const navItems = [
    { id: "about", label: "Giới thiệu" },
    { id: "skills", label: "Kỹ năng" },
    { id: "projects", label: "Dự án" },
    { id: "experience", label: "Kinh nghiệm" },
    { id: "contact", label: "Liên hệ" },
  ];

  // 🟢 Theo dõi scroll — xác định section active
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isManualScroll) return; // 🚫 bỏ qua nếu đang scroll thủ công

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll]);

  // 🟣 Lắng nghe event từ Hero ("Cuộn xuống")
  useEffect(() => {
    const handleSectionChange = (e) => {
      const { id } = e.detail;
      setActiveSection(id);
      setIsManualScroll(true);
      setTimeout(() => setIsManualScroll(false), 800);
    };

    window.addEventListener("sectionChange", handleSectionChange);
    return () =>
      window.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  // 🟢 Scroll đến section (có trừ chiều cao navbar)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navbar = document.querySelector("nav");
    if (section && navbar) {
      setActiveSection(id);
      setIsManualScroll(true);

      const yOffset = -navbar.offsetHeight; // ✅ dùng chiều cao thực của navbar
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      setTimeout(() => setIsManualScroll(false), 1000);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          TanTien.dev
        </motion.h1>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHover = hovered === item.id;
            const showLine = isActive || isHover;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.08 }}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.label}
                {/* Hiệu ứng underline động */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: showLine ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full origin-center"
                />
              </motion.button>
            );
          })}
        </div>

        {/* Nút menu mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-lg border-t border-gray-200"
        >
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium py-2 px-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
