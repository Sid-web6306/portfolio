"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: personalInfo.github },
    { icon: Linkedin, href: personalInfo.linkedin },
    { icon: Mail, href: `mailto:${personalInfo.email}` },
  ];

  return (
    <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {personalInfo.name}
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -3 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>© {currentYear} Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>by {personalInfo.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
