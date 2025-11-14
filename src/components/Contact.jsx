import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  CheckCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { fadeInUp } from "../utils/motion";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

// Import âm thanh từ assets
import successSound from "../assets/sounds/success.mp3";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const formRef = useRef(null);

  // 🟣 Thay giá trị của bạn tại đây
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; // 👉 Service ID trong EmailJS
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // 👉 Template ID gửi đến admin
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY; // 👉 Public key của bạn

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  // 🟣 Khởi tạo EmailJS
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  // 🟣 Unlock âm thanh
  useEffect(() => {
    const unlockAudio = () => {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            window.removeEventListener("click", unlockAudio);
          })
          .catch(() => {});
      }
    };
    window.addEventListener("click", unlockAudio);
    return () => window.removeEventListener("click", unlockAudio);
  }, []);

  // 🌌 Hiệu ứng particle nền
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
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(99,102,241,${this.alpha})`;
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

  // 🟢 Gửi form thật qua EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      // ✅ Thành công
      setIsLoading(false);
      setIsSubmitted(true);

      // 🎉 Hiệu ứng confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366F1", "#A855F7", "#EC4899", "#10B981"],
      });

      // 🔊 Phát âm thanh
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.7;
        audio.play().catch(() => {});
      }
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      alert("Gửi thất bại, vui lòng thử lại sau!");
      setIsLoading(false);
    }
  };

  const handleReset = () => setIsSubmitted(false);

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-white via-indigo-50/60 to-white overflow-hidden text-center"
    >
      {/* Âm thanh thành công */}
      <audio ref={audioRef} src={successSound} preload="auto" />

      {/* Canvas nền */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Gradient nền */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(167,139,250,0.15),transparent_70%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_70%)]"
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
          Liên hệ với tôi
        </span>
      </motion.h2>

      {/* Mô tả */}
      <motion.p
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed px-4"
      >
        Mình luôn sẵn sàng kết nối cho các dự án phát triển website, hợp tác
        công nghệ hoặc cơ hội nghề nghiệp trong lĩnh vực{" "}
        <span className="text-indigo-600 font-semibold">
          Frontend / Fullstack Web Development
        </span>
        . Hãy gửi lời nhắn hoặc liên hệ trực tiếp với mình qua các nền tảng bên
        dưới. Rất vui được trò chuyện và cùng nhau tạo nên những sản phẩm chất
        lượng 💻
      </motion.p>

      {/* Icon liên hệ */}
      <motion.div
        variants={fadeUp}
        custom={0.4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center gap-8 mb-12 flex-wrap"
      >
        {[
          {
            icon: <Mail size={28} />,
            href: "mailto:tantien.dev@gmail.com",
            label: "Email",
          },
          {
            icon: <Phone size={28} />,
            href: "tel:+84869219299",
            label: "Phone",
          },
          {
            icon: <Github size={28} />,
            href: "https://github.com/tantien-dev",
            label: "GitHub",
          },
          {
            icon: <Linkedin size={28} />,
            href: "https://www.linkedin.com/in/tan-tien-dev/",
            label: "LinkedIn",
          },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15, y: -4 }}
            className="flex flex-col items-center text-gray-700 hover:text-indigo-600 transition"
          >
            <div className="bg-white p-3 rounded-full shadow-md hover:shadow-xl border border-gray-100 transition">
              {item.icon}
            </div>
            <span className="text-sm mt-2 font-medium">{item.label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Form */}
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            variants={fadeUp}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-lg mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-indigo-100"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex gap-4 flex-col sm:flex-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  required
                  className="flex-1 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="flex-1 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />
              </div>

              {/* 🟢 Ô số điện thoại */}
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                required
                className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />

              <textarea
                name="message"
                placeholder="Bạn muốn trao đổi về dự án hoặc hợp tác như thế nào? Hãy chia sẻ..."
                rows="5"
                className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              ></textarea>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-all ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi tin nhắn ✉️"
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-green-200 flex flex-col items-center"
          >
            <CheckCircle size={64} className="text-green-500 mb-3" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Cảm ơn bạn đã liên hệ!
            </h3>
            <p className="text-gray-500 mb-5">
              Mình đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.
              Cùng nhau tạo nên những trải nghiệm web tuyệt vời nhé 🚀
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium border border-indigo-200 px-5 py-2 rounded-md hover:bg-indigo-50 transition-all"
            >
              <RotateCcw size={18} /> Gửi lại tin nhắn
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
