import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Globe, Menu, Play, ChevronDown, Plus, Minus, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Lenis from 'lenis';
import 'swiper/css';
import { Language, translations } from './i18n';

// Language Context
const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'en', setLang: () => {} });

// Context for Page Transition Overlays
const TransitionContext = createContext<(targetId: string) => void>(() => {});

function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (targetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView();
      setTimeout(() => setIsTransitioning(false), 200);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={triggerTransition}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center pointer-events-none"
          >
             <motion.span 
               initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
               animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.4, delay: 0.4 }}
               className="text-[#EFEBE4] font-serif text-3xl md:text-5xl uppercase tracking-widest"
             >
               Kylie <span className="italic font-light lowercase">affair</span>
             </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

function LanguageCurtain({ isOpen, close }: { isOpen: boolean, close: () => void }) {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang].hero;

  const handleLang = (l: Language) => {
    setLang(l);
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[110] bg-[#1a1a1a] flex flex-col items-center justify-center"
        >
          <button onClick={close} className="absolute top-8 right-8 text-[#EFEBE4] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">{t.close} ✕</button>
          <div className="flex flex-col gap-10 text-center text-[#EFEBE4] font-serif text-5xl md:text-7xl uppercase tracking-widest">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }}>
              <button onClick={() => handleLang('en')} className={`hover:text-gray-400 hover:italic transition-all ${lang === 'en' ? 'text-white' : 'text-gray-600'}`}>English</button>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.3 }}>
              <button onClick={() => handleLang('de')} className={`hover:text-gray-400 hover:italic transition-all ${lang === 'de' ? 'text-white' : 'text-gray-600'}`}>Deutsch</button>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.4 }}>
              <button onClick={() => handleLang('fr')} className={`hover:text-gray-400 hover:italic transition-all ${lang === 'fr' ? 'text-white' : 'text-gray-600'}`}>Français</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlobalNav({ onOpenLang, onOpenVip }: { onOpenLang: () => void, onOpenVip: () => void }) {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].nav;
  const tVip = translations[lang].vip;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const triggerTransition = useContext(TransitionContext);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest < window.innerHeight * 0.8) { 
      setHidden(true);
    } else {
      if (latest > previous) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-white/95 backdrop-blur-md text-gray-900 border-b border-gray-200/50 shadow-sm"
    >
      <nav className="hidden md:flex gap-8 text-xs tracking-widest font-medium uppercase z-10">
        <a href="#about" className="hover:opacity-70 transition-opacity">{t.about}</a>
        <a href="#services" className="hover:opacity-70 transition-opacity">{t.services}</a>
      </nav>
      <div className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2 text-xl font-serif tracking-widest uppercase z-0 pointer-events-none">
        Kylie <span className="italic font-light lowercase text-lg">affair</span>
      </div>
      <div className="flex items-center gap-6 z-10 w-full md:w-auto justify-between md:justify-end">
        <button className="md:hidden"><Menu size={24} /></button>
        <div className="flex items-center gap-4 md:gap-6 pr-10 md:pr-12 pointer-events-auto">
          <button onClick={onOpenLang} className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] md:text-xs font-medium hover:opacity-60 transition-opacity cursor-pointer">
            <Globe size={14} /> {lang.toUpperCase()}
          </button>
          <button onClick={onOpenVip} className="uppercase tracking-widest text-[10px] md:text-xs font-medium hover:text-gray-500 transition-colors cursor-pointer border border-gray-300 hover:border-gray-500 px-3 py-1.5 rounded-sm">
            {tVip.navBtn}
          </button>
          <button 
            onClick={() => triggerTransition('contact')}
            className="flex items-center justify-center bg-gray-900 text-[#FAF9F6] px-5 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs tracking-widest font-medium uppercase rounded-sm overflow-hidden relative group shadow-md cursor-pointer"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">{t.bookNow}</span>
            <span className="absolute inset-0 bg-gray-600 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

// Animation Variants for luxurious scroll effects
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const imageReveal = {
  hidden: { scale: 1.05, opacity: 0, filter: "blur(20px)" },
  visible: { 
    scale: 1, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
  }
};

const grayPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23d1d5db'/%3E%3C/svg%3E";

function Hero({ onOpenLang, onOpenVip }: { onOpenLang: () => void, onOpenVip: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(-400);
  const mouseY = useRef(-400);
  const points = useRef(Array.from({length: 5}, () => ({x: -400, y: -400})));

  const triggerTransition = useContext(TransitionContext);

  useEffect(() => {
    let animationId: number;
    const tick = () => {
      // Main blob smoothing (approx 200ms delay feel)
      points.current[0].x += (mouseX.current - points.current[0].x) * 0.15;
      points.current[0].y += (mouseY.current - points.current[0].y) * 0.15;

      // Trailing blobs (creates the organic tail effect)
      for(let i=1; i<5; i++) {
        points.current[i].x += (points.current[i-1].x - points.current[i].x) * 0.35;
        points.current[i].y += (points.current[i-1].y - points.current[i].y) * 0.35;
      }

      if (heroRef.current) {
        points.current.forEach((p, i) => {
          heroRef.current!.style.setProperty(`--mx${i}`, `${p.x}px`);
          heroRef.current!.style.setProperty(`--my${i}`, `${p.y}px`);
        });
      }
      animationId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Determine the hero top offset dynamically but efficiently
    if(heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;
    }
  };

  const TopContent = ({ isReveal }: { isReveal?: boolean }) => {
    const { lang } = useContext(LanguageContext);
    const t = translations[lang].hero;
    const tVip = translations[lang].vip;
    return (
    <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 md:p-12 z-10 transition-colors duration-300 pointer-events-none ${isReveal ? 'text-white' : 'text-black'}`}>
      <div className="w-full flex items-start justify-between">
        <div className="font-serif uppercase leading-[0.85] tracking-tighter text-6xl md:text-8xl flex flex-col">
          <span>KYLIE</span>
          <span className="italic font-light lowercase">affair</span>
        </div>
        <div className="flex items-center gap-5 md:gap-8 mt-1 md:mt-2 pr-10 md:pr-12 pointer-events-auto">
          <button onClick={onOpenLang} className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] md:text-xs font-medium hover:opacity-60 transition-opacity cursor-pointer">
            <Globe size={14} /> {lang.toUpperCase()}
          </button>
          <button onClick={onOpenVip} className="uppercase tracking-widest text-[10px] md:text-xs font-medium hover:opacity-60 transition-opacity cursor-pointer border border-current px-3 py-1.5 rounded-sm backdrop-blur-sm bg-white/5">
            {tVip.navBtn}
          </button>
          <button onClick={() => triggerTransition('contact')} className="uppercase tracking-widest text-[10px] md:text-xs font-medium hover:opacity-70 transition-opacity cursor-pointer">
            {translations[lang].nav.bookNow}
          </button>
        </div>
      </div>
      <div className="w-full pb-safe flex justify-center pb-8 md:pb-12 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="uppercase tracking-widest text-[10px] md:text-xs font-medium flex items-center gap-3 px-4 py-2 rounded-full text-white drop-shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-90 drop-shadow-sm shadow-black"></span>
          <span style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{t.hint}</span>
        </motion.div>
      </div>
    </div>
    );
  };

  return (
    <section 
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-screen overflow-hidden cursor-auto bg-black select-none touch-pan-y"
    >
      {/* Base Layer */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://s1.directupload.eu/images/260420/vlu3kmej.webp" 
          className="w-full h-full object-cover object-center" 
          alt="Kylie Base" 
        />
        <TopContent />
      </div>

      {/* Masked Reveal Layer */}
      <div className="absolute inset-0 w-full h-full hero-blob-mask pointer-events-none">
        <img 
          src="https://s1.directupload.eu/images/260420/ltvokorh.webp" 
          className="w-full h-full object-cover object-center" 
          alt="Kylie Reveal" 
        />
        <TopContent isReveal={true} />
      </div>
    </section>
  );
}

function StackingLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { lang } = useContext(LanguageContext);
  const t = translations[lang].about;
  const tIntro = translations[lang].intro;

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0, 0.7]);

  const sliderImages = [
    "https://s1.directupload.eu/images/260420/s2nsri27.webp",
    "https://s1.directupload.eu/images/260420/y7ipe3dv.webp",
    "https://s1.directupload.eu/images/260420/lgrkglsx.webp",
    "https://s1.directupload.eu/images/260420/qki6gr8z.webp",
    "https://s1.directupload.eu/images/260420/499nonoc.webp",
    "https://s1.directupload.eu/images/260420/nu8hbfxa.webp",
    "https://s1.directupload.eu/images/260420/anrkugp3.webp",
    "https://s1.directupload.eu/images/260420/9dlqs26l.webp",
    "https://s1.directupload.eu/images/260420/jyme3mzv.webp",
    "https://s1.directupload.eu/images/260420/su5lt8wh.webp"
  ];

  return (
    <div ref={containerRef} className="relative z-10 w-full bg-white">
      {/* Sticky About Section */}
      <motion.section 
        style={{ scale }}
        className="sticky top-0 h-screen py-8 md:py-10 flex flex-col justify-between overflow-hidden bg-white"
      >
        <div className="w-full flex-1 flex flex-col justify-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="w-full flex flex-col items-center text-center px-6 md:px-12 mb-4 md:mb-8 mt-6 md:mt-2"
          >
            <motion.h2 variants={fadeInUp} className="text-[11vw] leading-[0.8] font-serif mb-4 md:mb-5 uppercase tracking-tighter text-gray-900 w-full whitespace-nowrap overflow-hidden">
              {tIntro.titlePart1} <span className="italic font-light lowercase">{tIntro.titlePart2}</span> {tIntro.titlePart3}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-700 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
              {tIntro.text}
            </motion.p>
            <motion.button variants={fadeInUp} className="uppercase text-xs tracking-widest border-b border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
              {tIntro.btn}
            </motion.button>
          </motion.div>

          {/* Continuous Image Slider */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full"
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView="auto"
              loop={true}
              speed={5000}
              grabCursor={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="w-full continuous-slider px-6 md:px-12 pb-4"
            >
              {sliderImages.map((src, idx) => (
                <SwiperSlide 
                  key={idx}
                  className="!h-[50vh] md:!h-[55vh] lg:!h-[62vh] !w-auto aspect-[4/5] relative rounded-sm overflow-hidden group shadow-2xl shadow-gray-200/50 bg-gray-200 mr-6"
                >
                  <img src={src} alt={`Slider Image ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-[#EFEBE4] font-serif tracking-widest text-lg md:text-xl uppercase">Kylie Affair</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
        <motion.div 
          style={{ opacity }} 
          className="absolute inset-0 bg-black pointer-events-none z-20" 
        />
      </motion.section>

      {/* Spacer to give the slider time to be viewed before the next section overlaps */}
      <div className="h-[80vh] w-full pointer-events-none"></div>

      {/* Philosophy Section that scrolls over */}
      <section id="about" className="relative z-30 bg-[#FAF9F6] py-24 px-6 md:px-12 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] rounded-t-[3rem]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div variants={fadeInUp} className="md:w-1/3">
              <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-wider mb-6 text-gray-900">{t.titlePart1} <span className="italic font-light lowercase pr-1">{t.titlePart2}</span></h3>
            </motion.div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg">
              <motion.div variants={fadeInUp}>
                <p className="mb-6">
                  {t.p1}
                </p>
                <p>
                  {t.p2}
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="mb-6">
                  {t.p3}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function InteractiveFlex() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].services;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--spotlight-x', `${x}px`);
      containerRef.current.style.setProperty('--spotlight-y', `${y}px`);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="services" 
      className="py-24 px-6 md:px-12 bg-[#1A1A1A] text-[#EFEBE4] overflow-hidden relative"
      style={{
        backgroundImage: `radial-gradient(800px circle at var(--spotlight-x, -200px) var(--spotlight-y, -200px), rgba(255,255,255,0.06), transparent 40%)`
      }}
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-serif uppercase tracking-widest text-center mb-16">
          {t.titlePart1} <span className="italic font-light lowercase">{t.titlePart2}</span>
        </motion.h2>
        
        <motion.div variants={imageReveal} className="relative w-full aspect-video md:aspect-[21/9] bg-stone-800 mb-16 flex items-center justify-center overflow-hidden group cursor-pointer rounded-sm bg-gray-700">
          <img 
            src={grayPlaceholder} 
            alt="Video Placeholder" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#EFEBE4]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-md bg-black/20">
            <Play className="text-[#EFEBE4] ml-2" size={32} strokeWidth={1.5} />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {t.accordion.map((item, idx) => (
            <motion.div variants={fadeInUp} key={idx} className="border-b border-[#EFEBE4]/20">
              <button 
                className="w-full py-6 flex justify-between items-center text-left hover:text-white transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-xl md:text-2xl font-serif tracking-wide">{item.title}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ChevronDown className="text-[#EFEBE4]/70" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[#EFEBE4]/70 text-lg">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Destinations() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].destinations;

  const cityImages = [
    "https://s1.directupload.eu/images/260420/9dlqs26l.webp", // Modern, elegant structure (Berlin)
    "https://s1.directupload.eu/images/260420/qki6gr8z.webp", // Distinctive / classic architecture (Frankfurt)
    "https://s1.directupload.eu/images/260420/y7ipe3dv.webp"  // Warm, timeless style (Munich)
  ];

  const cities = t.cities.map((c, i) => ({
    ...c,
    image: cityImages[i] || grayPlaceholder
  }));

  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif uppercase tracking-widest mb-12 text-gray-900">{t.titlePart1} <span className="italic font-light lowercase pr-1">{t.titlePart2}</span></motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cities.map((city, idx) => (
            <motion.div variants={fadeInUp} key={idx} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6 rounded-sm bg-gray-200">
                <img 
                  src={city.image} 
                  alt={city.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 transform-gpu will-change-transform"
                />
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{city.date}</p>
              <h3 className="font-serif text-2xl group-hover:text-gray-500 transition-colors text-gray-900">
                {city.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactCTA() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#FAF9F6] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
      >
        <motion.div variants={imageReveal} className="w-full lg:w-1/2">
          <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-gray-200 shadow-xl">
            <img 
              src="https://s1.directupload.eu/images/260420/qybc5xx8.jpg" 
              alt="Book Now" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <div className="w-full lg:w-1/2">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-widest mb-4 text-gray-900">
            {t.titlePart1} <span className="italic font-light lowercase">{t.titlePart2}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 mb-12 text-lg max-w-lg">
            {t.text}
          </motion.p>
          
          <motion.form variants={fadeInUp} className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t.labels.name}</label>
              <input type="text" className="bg-transparent outline-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder={t.placeholders.name} required />
            </div>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t.labels.email}</label>
              <input type="email" className="bg-transparent outline-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder={t.placeholders.email} required />
            </div>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t.labels.message}</label>
              <textarea rows={3} className="bg-transparent outline-none resize-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder={t.placeholders.message} required></textarea>
            </div>
            <button className="bg-gray-900 text-white uppercase tracking-widest text-sm py-5 mt-4 hover:bg-gray-800 transition-colors w-full sm:w-auto sm:px-12 self-start rounded-sm">
              {t.labels.submit}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

function InfoOverlay({ page, close }: { page: 'impressum' | 'privacy' | 'faq' | null, close: () => void }) {
  const { lang } = useContext(LanguageContext);
  const tFaq = translations[lang].faqPage;
  const tImp = translations[lang].impressumPage;
  const tPriv = translations[lang].privacyPage;
  const tHero = translations[lang].hero;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] bg-[#FAF9F6] overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 relative">
            <button 
              onClick={close} 
              className="absolute top-8 right-6 md:top-12 md:right-12 text-gray-900 group flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <span className="uppercase text-xs tracking-widest font-medium">{tHero.close}</span>
              <X strokeWidth={1} size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {page === 'impressum' && (
                 <div className="space-y-8 text-gray-800">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-16">{tImp.title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap"><strong className="uppercase text-xs tracking-widest block mb-2 text-gray-500">{tImp.h1}</strong>{tImp.p1}</p>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap"><strong className="uppercase text-xs tracking-widest block mb-2 text-gray-500">{tImp.h2}</strong>{tImp.p2}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mt-12">{tImp.disclaimer}</p>
                 </div>
              )}

              {page === 'privacy' && (
                 <div className="space-y-8 text-gray-800">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-12">{tPriv.title}</h2>
                    <div className="space-y-8">
                      {tPriv.sections.map((sec, idx) => (
                        <div key={idx}>
                          <h3 className="text-xl font-serif mb-3">{sec.h}</h3>
                          <p className="text-gray-600 leading-relaxed">{sec.p}</p>
                        </div>
                      ))}
                    </div>
                 </div>
              )}

              {page === 'faq' && (
                 <div className="space-y-8 text-gray-800">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-16">{tFaq.title}</h2>
                    <div className="border-t border-gray-200">
                      {tFaq.questions.map((faq, i) => (
                        <div key={i} className="border-b border-gray-200">
                          <button 
                            className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          >
                            <span className="text-lg md:text-xl font-serif tracking-wide group-hover:text-gray-500 transition-colors pr-8">{faq.q}</span>
                            <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
                              {openFaq === i ? <Minus strokeWidth={1} /> : <Plus strokeWidth={1} />}
                            </span>
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="pb-8 text-gray-600 leading-relaxed">{faq.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                 </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer({ onOpenPage }: { onOpenPage: (page: 'impressum' | 'privacy' | 'faq') => void }) {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].footer;

  return (
    <footer className="py-12 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
      <div className="font-serif text-2xl tracking-widest uppercase mb-4 text-gray-900">Kylie Affair</div>
      <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-widest">
        <button onClick={() => onOpenPage('impressum')} className="hover:text-gray-900 transition-colors">{t.impressum}</button>
        <button onClick={() => onOpenPage('privacy')} className="hover:text-gray-900 transition-colors">{t.privacy}</button>
        <button onClick={() => onOpenPage('faq')} className="hover:text-gray-900 transition-colors">{t.faq}</button>
      </div>
      <p className="tracking-wide">&copy; {new Date().getFullYear()} Kylie Affair. {t.rights}</p>
    </footer>
  );
}

function VipLogin({ isOpen, close }: { isOpen: boolean, close: () => void }) {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].vip;
  const tHero = translations[lang].hero;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <button 
            onClick={close} 
            className="absolute top-8 right-6 md:top-12 md:right-12 text-[#EFEBE4] group flex items-center gap-2 hover:opacity-60 transition-opacity"
          >
            <span className="uppercase text-xs tracking-widest font-medium">{tHero.close}</span>
            <X strokeWidth={1} size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-[#1A1A1A] border border-gray-800 p-10 md:p-14 rounded-sm shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-widest text-[#EFEBE4] mb-3">{t.title}</h2>
              <p className="text-gray-400 text-sm">{t.subtitle}</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
              <div className="flex flex-col border-b border-gray-700 pb-2 focus-within:border-gray-500 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t.email}</label>
                <input type="email" className="bg-transparent outline-none text-[#EFEBE4] text-base placeholder:text-gray-700" placeholder="vip@client.com" />
              </div>
              <div className="flex flex-col border-b border-gray-700 pb-2 focus-within:border-gray-500 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t.password}</label>
                <input type="password" className="bg-transparent outline-none text-[#EFEBE4] text-base placeholder:text-gray-700" placeholder="••••••••" />
              </div>
              <button className="mt-8 bg-[#EFEBE4] text-black uppercase tracking-widest text-xs font-semibold py-4 hover:bg-gray-300 transition-colors rounded-sm w-full">
                {t.submit}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 cursor-pointer hover:text-gray-300 transition-colors uppercase tracking-widest">{t.request}</p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [activeInfoPage, setActiveInfoPage] = useState<'impressum' | 'privacy' | 'faq' | null>(null);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <TransitionProvider>
        <div className="font-sans text-gray-900 antialiased selection:bg-[#1A1A1A] selection:text-[#EFEBE4]">
          <LanguageCurtain isOpen={isLangOpen} close={() => setIsLangOpen(false)} />
          <VipLogin isOpen={isVipOpen} close={() => setIsVipOpen(false)} />
          <InfoOverlay page={activeInfoPage} close={() => setActiveInfoPage(null)} />
          <GlobalNav onOpenLang={() => setIsLangOpen(true)} onOpenVip={() => setIsVipOpen(true)} />
          <main>
            <Hero onOpenLang={() => setIsLangOpen(true)} onOpenVip={() => setIsVipOpen(true)} />
            <StackingLayout />
            <InteractiveFlex />
            <Destinations />
            <ContactCTA />
          </main>
          <Footer onOpenPage={setActiveInfoPage} />
        </div>
      </TransitionProvider>
    </LanguageContext.Provider>
  );
}
