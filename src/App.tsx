import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Play, ChevronDown, Menu } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Context for Page Transition Overlays
const TransitionContext = createContext<(targetId: string) => void>(() => {});

function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (targetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView();
      setTimeout(() => setIsTransitioning(false), 200);
    }, 800); // Overlay covers, then scroll, then delay before reveal
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

function GlobalNav() {
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
        <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
        <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
      </nav>
      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-xl font-serif tracking-widest uppercase z-0 pointer-events-none">
        Kylie <span className="italic font-light lowercase text-lg">affair</span>
      </div>
      <div className="flex items-center gap-6 z-10 w-full md:w-auto justify-between md:justify-end">
        <button className="md:hidden"><Menu size={24} /></button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => triggerTransition('contact')}
            className="flex items-center justify-center bg-gray-900 text-[#FAF9F6] px-6 py-2.5 text-xs tracking-widest font-medium uppercase rounded-sm overflow-hidden relative group shadow-md cursor-pointer"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Book Now</span>
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

function Hero() {
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
    if(heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;
    }
  };

  const TopContent = ({ isReveal }: { isReveal?: boolean }) => (
    <div className={`absolute top-0 left-0 w-full flex items-start justify-between p-8 md:p-12 z-10 transition-colors duration-300 ${isReveal ? 'text-white' : 'text-black'}`}>
      <div className="font-serif uppercase leading-[0.85] tracking-tighter text-6xl md:text-8xl flex flex-col">
        <span>KYLIE</span>
        <span className="italic font-light lowercase">affair</span>
      </div>
      <div>
        <button onClick={() => triggerTransition('contact')} className="uppercase tracking-widest text-sm md:text-base font-medium hover:opacity-70 transition-opacity cursor-pointer">
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <section 
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-screen overflow-hidden cursor-none bg-black select-none"
    >
      {/* Base Layer */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://s1.directupload.eu/images/260418/zeocn4ti.webp" 
          className="w-full h-full object-cover object-center" 
          alt="Kylie Base" 
        />
        <TopContent />
      </div>

      {/* Masked Reveal Layer */}
      <div className="absolute inset-0 w-full h-full hero-blob-mask pointer-events-none">
        <img 
          src="https://s1.directupload.eu/images/260418/68wyl8p2.webp" 
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

  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.7]);

  return (
    <div ref={containerRef} className="relative z-10 w-full bg-white">
      {/* Sticky About Section */}
      <motion.section 
        style={{ scale }}
        className="sticky top-0 h-screen px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={imageReveal}
            className="w-full md:w-1/2 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[400px] aspect-[2/3] rounded-t-full overflow-hidden shadow-2xl shadow-gray-200/50 bg-gray-200">
              <img 
                src={grayPlaceholder} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="w-full md:w-1/2 flex flex-col items-start"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 uppercase tracking-wide text-gray-900">
              I AM <span className="italic font-light lowercase">kylie</span> AFFAIR
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-700 mb-8 text-lg leading-relaxed max-w-lg">
              As an independent companion based in Düsseldorf, I am delighted to meet you here or in other destinations across Europe and beyond. With a genuine love for travel, elegant hotels, and meaningful encounters, I am available for engagements worldwide — wherever sophistication and serenity meet.
            </motion.p>
            <motion.button variants={fadeInUp} className="uppercase text-sm tracking-widest border-b border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              Learn About Kylie
            </motion.button>
          </motion.div>
        </div>
        <motion.div 
          style={{ opacity }} 
          className="absolute inset-0 bg-black pointer-events-none z-20" 
        />
      </motion.section>

      {/* Philosophy Section that scrolls over */}
      <section className="relative z-30 bg-[#FAF9F6] py-24 px-6 md:px-12 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] rounded-t-[3rem]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div variants={fadeInUp} className="md:w-1/3">
              <h3 className="font-serif text-3xl uppercase tracking-wider mb-6 text-gray-900">STYLE & <span className="italic font-light lowercase pr-1">presence</span></h3>
            </motion.div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg">
              <motion.div variants={fadeInUp}>
                <p className="mb-6">
                  There’s a quiet strength in elegance — a kind of presence that doesn’t need to be announced. That’s what defines me. 
                </p>
                <p>
                  Style, to me, is a love language — not about trends, but about how something makes you feel. I have a weakness for beautiful things: soft fabrics, timeless accessories, little treasures with a story.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="mb-6">
                  I’m drawn to subtle fragrances, warm light, genuine people and places that feel alive. As a companion, I value authenticity and freedom — encounters that are sincere, kind and a little spontaneous.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const accordionData = [
  { title: "Meet me in Düsseldorf", content: "As my home base, I am regularly available for enchanting encounters in Düsseldorf and the surrounding region. Experience genuine connection and refined company." },
  { title: "Drive Me To You", content: "I can comfortably visit you in nearby metropolitan areas within driving distance, bringing sophistication straight to your hotel or private residence." },
  { title: "Fly Me To You", content: "With a passion for discovering the world, I am available as an elite travel companion for international engagements across Europe and the globe." }
];

function InteractiveFlex() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#1A1A1A] text-[#EFEBE4] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-serif uppercase tracking-widest text-center mb-16">
          INDEPENDENT <span className="italic font-light lowercase">by nature</span>
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
          {accordionData.map((item, idx) => (
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

const cities = [
  {
    title: "Berlin",
    date: "Available",
    image: grayPlaceholder
  },
  {
    title: "Frankfurt",
    date: "Available",
    image: grayPlaceholder
  },
  {
    title: "Munich",
    date: "Available",
    image: grayPlaceholder
  }
];

function Destinations() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif uppercase tracking-widest mb-12 text-gray-900">CITY <span className="italic font-light lowercase pr-1">guides</span></motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cities.map((city, idx) => (
            <motion.div variants={fadeInUp} key={idx} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6 rounded-sm bg-gray-200">
                <img 
                  src={city.image} 
                  alt={city.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
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
              src={grayPlaceholder} 
              alt="Book Now" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <div className="w-full lg:w-1/2">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-widest mb-4 text-gray-900">
            TAKE THE <span className="italic font-light lowercase">next step</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 mb-12 text-lg max-w-lg">
            Ready to turn desire into something unforgettable? Discretion, connection, and authenticity — that's what defines Kylie Affair. Your privacy and satisfaction are my highest priority.
          </motion.p>
          
          <motion.form variants={fadeInUp} className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Name or Alias</label>
              <input type="text" className="bg-transparent outline-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder="Mr. Smith" required />
            </div>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input type="email" className="bg-transparent outline-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder="contact@secure.com" required />
            </div>
            <div className="flex flex-col border-b border-gray-300 pb-3 focus-within:border-gray-900 transition-colors">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Message & Dates</label>
              <textarea rows={3} className="bg-transparent outline-none resize-none placeholder:text-gray-400 text-gray-900 text-lg" placeholder="Details of your request..." required></textarea>
            </div>
            <button className="bg-gray-900 text-white uppercase tracking-widest text-sm py-5 mt-4 hover:bg-gray-800 transition-colors w-full sm:w-auto sm:px-12 self-start rounded-sm">
              Book Now
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
      <div className="font-serif text-2xl tracking-widest uppercase mb-4 text-gray-900">Kylie Affair</div>
      <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-widest">
        <a href="#" className="hover:text-gray-900 transition-colors">Impressum</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Datenschutz</a>
        <a href="#" className="hover:text-gray-900 transition-colors">FAQs</a>
      </div>
      <p className="tracking-wide">&copy; {new Date().getFullYear()} Kylie Affair. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <div className="font-sans text-gray-900 antialiased selection:bg-[#1A1A1A] selection:text-[#EFEBE4]">
        <GlobalNav />
        <main>
          <Hero />
          <StackingLayout />
          <InteractiveFlex />
          <Destinations />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </TransitionProvider>
  );
}
