"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

const initialNavLinks = [
  { name: "Home", href: "#home", isActive: true },
  { name: "About", href: "#about", isActive: false },
  { name: "Skills", href: "#skills", isActive: false },
  { name: "Projects", href: "#projects", isActive: false },
  { name: "Contact", href: "#contact", isActive: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(initialNavLinks);

  // Function to set active link by name
  const setActiveLink = (linkName: string) => {
    setNavLinks(prevLinks =>
      prevLinks.map(link => ({
        ...link,
        isActive: link.name === linkName
      }))
    );
  };
  const { theme, setTheme } = useTheme();

  // Hydration-safe way to check if mounted on client
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <Link href="#home">SJ</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative text-sm font-medium transition-colors group ${link.isActive
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
                    }`}
                >
                  {link.name}
                  {link.isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all ${!link.isActive ? "w-0 group-hover:w-full" : "w-0"
                    }`} />
                </motion.a>
              );
            })}

            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 rounded-b-2xl shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block transition-colors ${link.isActive
                        ? "text-violet-600 dark:text-violet-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
                        }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
