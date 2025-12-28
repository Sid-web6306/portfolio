"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, ArrowUpRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import { personalInfo } from "@/lib/data";
import emailjs from "@emailjs/browser";

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setStatus("loading");
    
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: personalInfo.github,
      color: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: personalInfo.linkedin,
      color: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      color: "hover:bg-violet-600 hover:text-white",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let&apos;s connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I&apos;m currently available for freelance work and full-time positions. 
                If you have a project that needs coding or a position that matches my 
                skills, don&apos;t hesitate to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 5 }}
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-violet-500 dark:hover:border-violet-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Email</div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {personalInfo.email}
                  </div>
                </div>
                <ArrowUpRight className="ml-auto text-gray-400 group-hover:text-violet-600 transition-colors" size={20} />
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Location</div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    Dhampur, Uttar Pradesh, India
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-4">
                Find me on
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-all ${social.color}`}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="reply_to"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                type="submit"
                disabled={status === "loading"}
                className={`w-full px-8 py-4 font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  status === "success"
                    ? "bg-green-500 text-white shadow-green-500/25"
                    : status === "error"
                    ? "bg-red-500 text-white shadow-red-500/25"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-500/25 hover:shadow-violet-500/40"
                } ${status === "loading" ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <XCircle size={18} />
                    Failed to Send
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <p className="text-center text-green-600 dark:text-green-400 text-sm">
                  Thank you! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-red-600 dark:text-red-400 text-sm">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
