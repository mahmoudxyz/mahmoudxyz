// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from './contexts/LanguageContext';

// Navigation Button component with hover effect
const NavButton = ({ children, href, className = '' }) => {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group ${className}`}
    >
      <span>{children}</span>
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </a>
  );
};

// Social Button component with hover effect
const SocialButton = ({ Icon, href, label }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
};

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
    >
      <Globe className="h-4 w-4" />
      <span>{language.code === 'en' ? 'العربية' : 'English'}</span>
    </motion.button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  const navigation = [
    { name: language.code === 'en' ? 'RPG' : 'ار بي جي', href: '/rpg-preview' },
    { name: language.code === 'en' ? 'Blog' : 'المدونة', href: '/blog' },
    { name: language.code === 'en' ? 'Projects' : 'المشاريع', href: '/projects' },
  ];

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/mahmoudxyz', 
      label: 'GitHub'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/mahmoud4dev', 
      label: 'LinkedIn'
    },
    { 
      icon: Mail, 
      href: 'mailto:mahmoudahmedxyz@gmail.com', 
      label: 'Email'
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Name */}
          <motion.a 
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {language.code === 'en' ? 'Mahmoud Ahmed' : 'محمود أحمد'}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className={`flex items-center ${language.dir === 'rtl' ? 'space-x-reverse' : ''} space-x-6`}>
              {navigation.map((item) => (
                <NavButton key={item.name} href={item.href}>
                  {item.name}
                </NavButton>
              ))}
            </div>
          </div>

          {/* Desktop Social Links and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r pr-4">
              {socialLinks.map((item) => (
                <SocialButton
                  key={item.label}
                  Icon={item.icon}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4"
          >
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-4 px-3">
              {socialLinks.map((item) => (
                <SocialButton
                  key={item.label}
                  Icon={item.icon}
                  href={item.href}
                  label={item.label}
                />
              ))}
              <div className="border-l pl-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;