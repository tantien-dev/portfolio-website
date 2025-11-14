import { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import Typewriter from "typewriter-effect";

// Import ảnh avatar từ assets
import avatar from "../assets/avatar.webp";

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const shimmerRef = useRef(null);
  const reflectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // 🟣 Nền particle động
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(99,102,241,0.12)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 70; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 🟢 Parallax (di chuyển theo cuộn)
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, -150]);
  const yAvatar = useTransform(scrollY, [0, 800], [0, 100]);
  const yContent = useTransform(scrollY, [0, 800], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navHeight = document.querySelector("nav")?.offsetHeight || 0;
    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
      const event = new CustomEvent("sectionChange", { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  // 🌈 Spotlight + Reflection
  useEffect(() => {
    const spotlight = spotlightRef.current;
    const shimmer = shimmerRef.current;
    const reflection = reflectionRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      spotlight.style.background = `radial-gradient(
        400px circle at ${clientX}px ${clientY}px,
        rgba(167,139,250,0.25),
        transparent 60%
      )`;

      shimmer.style.background = `linear-gradient(
        115deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.2) ${(clientX / window.innerWidth) * 100}%,
        rgba(255,255,255,0) 100%
      )`;

      if (reflection) {
        const rect = reflection.getBoundingClientRect();
        const relX = clientX - rect.left;
        const relY = clientY - rect.top;
        reflection.style.background = `radial-gradient(
          circle at ${relX}px ${relY}px,
          rgba(255,255,255,0.35),
          transparent 60%
        )`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-center text-center bg-gradient-to-b from-indigo-50 via-white to-purple-50 overflow-hidden"
    >
      {/* Canvas nền */}
      <motion.canvas
        ref={canvasRef}
        style={{ y: yBg, opacity: opacityHero }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Spotlight & shimmer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
      />
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-all duration-500 ease-out"
      />

      {/* Avatar */}
      <motion.div
        style={{ y: yAvatar, opacity: opacityHero }}
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={0}
        className="relative w-44 h-44 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-indigo-100"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-60 blur-2xl rounded-full"
        />
        <img
          src={avatar}
          alt="Nguyễn Tấn Tiền"
          className="relative w-full h-full object-cover rounded-full"
        />
        <div
          ref={reflectionRef}
          className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out rounded-full"
        />
      </motion.div>

      {/* Nội dung */}
      <motion.h1
        style={{ y: yContent, opacity: opacityHero }}
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={0.2}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2"
      >
        Nguyễn Tấn Tiền
      </motion.h1>

      <motion.div
        style={{ y: yContent, opacity: opacityHero }}
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={0.4}
        className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4"
      >
        <Typewriter
          options={{
            strings: [
              "Frontend & WordPress Developer",
              "React • Next.js • Node.js",
              "Tích hợp AI • Web hiện đại & hiệu năng cao",
            ],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 30,
          }}
        />
      </motion.div>

      <motion.p
        style={{ y: yContent, opacity: opacityHero }}
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={0.6}
        className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        Tôi là{" "}
        <span className="font-semibold text-indigo-600">
          Frontend & WordPress Developer
        </span>{" "}
        với hơn 4 năm kinh nghiệm xây dựng và tối ưu website chuyên nghiệp. Tôi
        tập trung vào việc kết hợp{" "}
        <span className="font-medium text-purple-600">
          hiệu suất, thẩm mỹ và trải nghiệm người dùng
        </span>{" "}
        để tạo nên các sản phẩm web hiện đại, mượt mà và chuẩn SEO. Mục tiêu của
        tôi là phát triển thành{" "}
        <span className="font-semibold text-indigo-600">
          Full-Stack Developer
        </span>{" "}
        và ứng dụng{" "}
        <span className="font-medium text-purple-600">
          AI vào hệ thống web thông minh
        </span>
        .
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={0.8}
        style={{ opacity: opacityHero }}
        className="flex flex-wrap justify-center gap-4"
      >
        <motion.button
          onClick={() => scrollToSection("projects")}
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 8px 24px rgba(99,102,241,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-7 py-3 rounded-full font-medium shadow-md hover:bg-indigo-700 transition-all relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Xem Dự án nổi bật <ArrowRight className="w-5 h-5" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-out rounded-full"></span>
        </motion.button>

        <motion.button
          onClick={() => scrollToSection("contact")}
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 8px 20px rgba(167,139,250,0.25)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 px-7 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Mail className="w-5 h-5" /> Kết nối với tôi
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-out rounded-full"></span>
        </motion.button>
      </motion.div>

      {/* Nút cuộn xuống */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: opacityHero }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer text-gray-400 hover:text-indigo-600 transition flex flex-col items-center"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-1">Khám phá thêm</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
