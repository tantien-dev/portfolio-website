import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Palette } from "lucide-react";
import { fadeInUp } from "../utils/motion";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-purple-50"
    >
      {/* Hiệu ứng Parallax nền */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.2),transparent_60%)]"
      />

      {/* Lớp ánh sáng mờ nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Tiêu đề */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-gray-900 mb-6"
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Giới thiệu về tôi
          </span>
        </motion.h2>

        {/* Đoạn giới thiệu chính */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-16"
        >
          Tôi là{" "}
          <span className="font-semibold text-indigo-600">Nguyễn Tấn Tiền</span>
          , một{" "}
          <span className="font-medium text-purple-600">
            Frontend & WordPress Developer
          </span>{" "}
          với hơn 4 năm kinh nghiệm phát triển website chuyên nghiệp, từng tham
          gia nhiều dự án cho khách hàng Nhật và thị trường trong nước. Tôi yêu
          thích việc tạo nên những sản phẩm web{" "}
          <span className="text-indigo-500 font-semibold">
            hiệu năng cao – tinh tế – trải nghiệm người dùng vượt trội
          </span>{" "}
          thông qua sự kết hợp giữa{" "}
          <span className="font-medium text-purple-600">
            tư duy kỹ thuật, thẩm mỹ thiết kế và chiến lược phát triển sản phẩm
          </span>
          . Mục tiêu của tôi là không ngừng nâng cấp bản thân để trở thành{" "}
          <span className="font-semibold text-indigo-600">
            Full-Stack Developer
          </span>{" "}
          và ứng dụng <span className="font-medium text-purple-600">AI</span>{" "}
          vào hệ thống web thông minh, giúp doanh nghiệp tối ưu quy trình và
          nâng cao trải nghiệm người dùng.
        </motion.p>

        {/* Các giá trị & kỹ năng nổi bật */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{
              scale: 1.06,
              y: -8,
              boxShadow:
                "0px 8px 30px rgba(99,102,241,0.25), 0 0 25px rgba(167,139,250,0.15)",
            }}
            className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Code2 size={30} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Code sạch & tối ưu
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tôi chú trọng vào cấu trúc code rõ ràng, hiệu suất cao và dễ mở
              rộng. Mỗi dòng code đều hướng đến tính bền vững, khả năng tái sử
              dụng và trải nghiệm phát triển chuyên nghiệp.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{
              scale: 1.06,
              y: -8,
              boxShadow:
                "0px 8px 30px rgba(167,139,250,0.25), 0 0 25px rgba(192,132,252,0.15)",
            }}
            className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Palette size={30} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Thiết kế UX/UI hướng trải nghiệm
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tôi luôn đặt người dùng ở trung tâm, thiết kế giao diện vừa trực
              quan vừa truyền cảm hứng, đảm bảo trải nghiệm mượt mà trên mọi
              thiết bị và tối ưu hành trình tương tác.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.06,
              y: -8,
              boxShadow:
                "0px 8px 30px rgba(236,72,153,0.25), 0 0 25px rgba(244,114,182,0.15)",
            }}
            className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 border border-gray-100 hover:border-pink-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                <Rocket size={30} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Liên tục học hỏi & phát triển 🚀
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tôi không ngừng cập nhật công nghệ mới như React, Next.js, Node.js
              và AI Integration, với mục tiêu phát triển thành lập trình viên
              toàn diện, tạo ra giải pháp web sáng tạo & bền vững.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
