
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight,
  ShoppingBag, Menu, X, Sparkles, Flower2, Droplets,
  Infinity as InfinityIcon, Star, Check, Play, Plus, Minus,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Midnight Bloom",
    subtitle: "Eau de Parfum",
    size: "100 ML",
    price: 2499,
    oldPrice: 3499,
    accent: "#d64bff",
    className: "bloom",
    description:
      "A captivating blend of floral and woody notes that lingers like your most beautiful memories.",
  },
  {
    name: "Velvet Eclipse",
    subtitle: "Intense Parfum",
    size: "80 ML",
    price: 2899,
    oldPrice: 3799,
    accent: "#4e9fff",
    className: "eclipse",
    description:
      "A deep, magnetic fragrance with warm amber, dark woods and a luminous finish.",
  },
  {
    name: "Rose Afterglow",
    subtitle: "Signature Eau de Parfum",
    size: "75 ML",
    price: 2199,
    oldPrice: 2999,
    accent: "#ff6bb5",
    className: "rose",
    description:
      "A soft rose fragrance wrapped in vanilla, delicate petals and a warm, elegant trail.",
  },
];

const gallery = [
  { title: "The Crystal Cap", label: "PRECISION CRAFT", type: "cap", symbol: "✧" },
  { title: "The Signature Bottle", label: "TIMELESS DESIGN", type: "bottle", symbol: "V" },
  { title: "The Golden Detail", label: "REFINED DETAILS", type: "label", symbol: "✳" },
  { title: "The Fragrance Mist", label: "A MOMENT OF MAGIC", type: "mist", symbol: "❋" },
];

const testimonials = [
  {
    quote: "Absolutely mesmerizing! The fragrance lasts all day and feels incredibly luxurious.",
    name: "Priya S.",
    detail: "Verified buyer",
  },
  {
    quote: "Elegant, sophisticated and unique. Midnight Bloom is now my signature scent.",
    name: "Ananya R.",
    detail: "Verified buyer",
  },
  {
    quote: "Beautiful packaging, gorgeous fragrance and a truly premium experience.",
    name: "Sneha K.",
    detail: "Verified buyer",
  },
];

function PerfumeBottle({ compact = false, variant = "bloom" }) {
  return (
    <div
      className={`bottle-stage ${compact ? "bottle-compact" : ""} ${variant}`}
      aria-label="Decorative luxury perfume bottle"
    >
      <div className="bottle-halo" />
      <div className="bottle-orbit bottle-orbit-a" />
      <div className="bottle-orbit bottle-orbit-b" />

      <div className="bottle-shadow" />

      <div className="perfume-bottle">
        <div className="bottle-cap">
          <div className="cap-top" />
          <div className="cap-facet facet-one" />
          <div className="cap-facet facet-two" />
          <div className="cap-facet facet-three" />
          <div className="cap-highlight" />
        </div>

        <div className="bottle-neck" />

        <div className="bottle-body">
          <div className="bottle-glass-edge" />
          <div className="bottle-liquid" />
          <div className="bottle-reflection reflection-one" />
          <div className="bottle-reflection reflection-two" />
          <div className="bottle-label">
            <span className="label-emblem">♧</span>
            <span className="label-brand">VÉLORA</span>
            <span className="label-line" />
            <span className="label-fragrance">
              {variant === "eclipse"
                ? "VELVET ECLIPSE"
                : variant === "rose"
                  ? "ROSE AFTERGLOW"
                  : "MIDNIGHT BLOOM"}
            </span>
            <span className="label-size">EAU DE PARFUM</span>
            <span className="label-ml">100 ML</span>
          </div>
          <div className="bottle-base" />
        </div>
      </div>

      {!compact && (
        <>
          <span className="bottle-spark spark-a">✦</span>
          <span className="bottle-spark spark-b">✧</span>
          <span className="bottle-spark spark-c">✳</span>
          <span className="bottle-spark spark-d">✦</span>
        </>
      )}
    </div>
  );
}

function App() {
  const pageRef = useRef(null);
  const bottleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const selected = products[selectedIndex];
  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-inner", {
        y: -25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const hero = gsap.timeline({ delay: 0.15 });
      hero
        .from(".hero-kicker", {
          opacity: 0,
          y: 15,
          duration: 0.6,
        })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 35,
            stagger: 0.15,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".hero-description, .hero-actions, .hero-benefits",
          {
            opacity: 0,
            y: 18,
            stagger: 0.13,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".hero-product",
          {
            opacity: 0,
            scale: 0.8,
            x: 25,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.8",
        );

      gsap.to(".petal", {
        y: "random(-35, 35)",
        x: "random(-22, 22)",
        rotation: "random(-45, 45)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.to(".hero-product .perfume-bottle", {
        y: -12,
        rotation: 1.5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-product .bottle-orbit-a", {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-product .bottle-orbit-b", {
        rotate: -360,
        duration: 32,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.from(".note-row", {
        opacity: 0,
        x: -22,
        duration: 0.65,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".notes-list",
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(".gallery-card", {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 86%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!bottleRef.current) return;

    const element = bottleRef.current;
    const handleMove = (event) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      element.style.setProperty("--tilt-x", `${-y * 9}deg`);
      element.style.setProperty("--tilt-y", `${x * 10}deg`);
    };

    const handleLeave = () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const addToCart = () => {
    setCartCount((count) => count + 1);
    setNotice(`${selected.name} added to your bag`);
  };

  const buyNow = () => {
    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const nextProduct = (direction) => {
    setSelectedIndex(
      (current) => (current + direction + products.length) % products.length,
    );
  };

  const moveGallery = (direction) => {
    setGalleryIndex(
      (current) => (current + direction + gallery.length) % gallery.length,
    );
  };

  const visibleGallery = Array.from({ length: 4 }, (_, i) =>
    gallery[(galleryIndex + i) % gallery.length],
  );

  return (
    <main className="velora-page" ref={pageRef}>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />

      <header className="navbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Vélora home">
            <Flower2 size={28} strokeWidth={1.1} />
            <span className="brand-word">
              VÉLORA
              <small>F R A G R A N C E S</small>
            </span>
          </button>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {[
              ["Home", "home"],
              ["About", "about"],
              ["Fragrances", "fragrances"],
              ["Gallery", "gallery"],
              ["Reviews", "reviews"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="cart-icon"
              aria-label={`Open shopping bag, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="nav-buy" onClick={buyNow}>
              Buy Now <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-background" aria-hidden="true">
          <div className="hero-moon" />
          <div className="hero-mountain mountain-back" />
          <div className="hero-mountain mountain-front" />
          <div className="hero-floor" />
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className={`petal petal-${i + 1}`}>
              {i % 2 === 0 ? "✧" : "❋"}
            </span>
          ))}
        </div>

        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="kicker-line" /> LUXURY IN EVERY DROP
            </p>
            <h1 className="hero-title">
              <span className="hero-title-line">More Than a</span>
              <span className="hero-title-line">Fragrance.</span>
              <span className="hero-title-line script-line">It’s a Feeling.</span>
            </h1>
            <p className="hero-description">
              Discover the essence of elegance with Vélora. A luxurious
              fragrance crafted for those who leave a lasting impression.
            </p>

            <div className="hero-actions">
              <button className="button-primary" onClick={() => scrollTo("fragrances")}>
                Shop Collection <ArrowUpRight size={17} />
              </button>
              <button className="video-button" onClick={() => scrollTo("about")}>
                <span className="play-circle"><Play size={14} fill="currentColor" /></span>
                Discover Vélora
              </button>
            </div>

            <div className="hero-benefits">
              <div>
                <span className="benefit-icon"><Flower2 /></span>
                <span><strong>Premium</strong><small>Ingredients</small></span>
              </div>
              <div>
                <span className="benefit-icon"><InfinityIcon /></span>
                <span><strong>Long Lasting</strong><small>Fragrance</small></span>
              </div>
              <div>
                <span className="benefit-icon"><Sparkles /></span>
                <span><strong>Elegant</strong><small>Packaging</small></span>
              </div>
            </div>
          </div>

          <div className="hero-product" ref={bottleRef}>
            <div className="hero-product-glow" />
            <div className="hero-product-ring" />
            <div className="hero-product-ring ring-secondary" />
            <PerfumeBottle variant={selected.className} />
            <div className="floating-caption caption-top">
              <span>01 / THE SIGNATURE</span>
              <span className="caption-line" />
            </div>
            <div className="floating-caption caption-bottom">
              <span>CRAFTED TO BE REMEMBERED</span>
            </div>
            <div className="product-selector">
              {products.map((product, index) => (
                <button
                  key={product.name}
                  className={selectedIndex === index ? "selector-dot active" : "selector-dot"}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Select ${product.name}`}
                  aria-pressed={selectedIndex === index}
                />
              ))}
            </div>
          </div>
        </div>

        <button className="scroll-indicator" onClick={() => scrollTo("about")}>
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={14} />
        </button>
      </section>

      <section id="about" className="about-section section-divider">
        <div className="container about-layout">
          <div className="about-art reveal">
            <div className="about-art-backdrop" />
            <div className="about-art-orbit" />
            <PerfumeBottle compact variant="bloom" />
            <span className="about-art-caption">THE ART OF SCENT</span>
            <span className="about-art-number">V / 001</span>
          </div>

          <div className="about-copy reveal">
            <p className="section-kicker">ABOUT THE FRAGRANCE</p>
            <h2>A Timeless Blend<br />of Elegance &amp; Mystery</h2>
            <p className="section-description">
              Vélora is a luxurious fragrance that combines the finest
              aromatic notes with modern sophistication. Designed for
              dreamers, achievers and those who embrace their unique journey,
              it’s more than a perfume — it’s your signature.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon"><Sparkles /></span>
                <div><strong>Natural Inspiration</strong><small>Inspired by nature’s finest notes</small></div>
              </div>
              <div className="feature-item">
                <span className="feature-icon"><Droplets /></span>
                <div><strong>Refined Formula</strong><small>Crafted for an elegant scent experience</small></div>
              </div>
              <div className="feature-item">
                <span className="feature-icon"><InfinityIcon /></span>
                <div><strong>Lasting Impression</strong><small>A memorable fragrance trail</small></div>
              </div>
            </div>
          </div>

          <blockquote className="brand-quote reveal">
            <span className="quote-open">“</span>
            Elegance is not about being noticed, it’s about being remembered.
            <span className="quote-signature">— Vélora</span>
          </blockquote>
        </div>
      </section>

      <section id="fragrances" className="fragrance-section section-divider">
        <div className="container fragrance-layout">
          <div className="notes-column reveal">
            <p className="section-kicker">THE SCENT JOURNEY</p>
            <h2>Notes That<br />Tell Your Story</h2>
            <p className="muted-intro">
              Three beautiful layers. One unforgettable signature.
            </p>

            <div className="notes-list">
              <div className="note-row">
                <div className="note-visual citrus">✳</div>
                <div><strong>Top Notes</strong><p>Bergamot, Pink Pepper, Mandarin</p></div>
              </div>
              <div className="note-row">
                <div className="note-visual floral">❋</div>
                <div><strong>Heart Notes</strong><p>Jasmine, Rose, Lily</p></div>
              </div>
              <div className="note-row">
                <div className="note-visual woody">✺</div>
                <div><strong>Base Notes</strong><p>Vanilla, Musk, Sandalwood</p></div>
              </div>
            </div>
          </div>

          <div className="notes-bottle reveal">
            <div className="notes-bottle-glow" />
            <div className="notes-petal petal-left">❋</div>
            <div className="notes-petal petal-right">✧</div>
            <PerfumeBottle variant={selected.className} />
            <span className="notes-bottle-label">A SCENT THAT STAYS</span>
          </div>

          <div className="purchase-card reveal">
            <p className="mini-brand"><Flower2 size={15} /> V É L O R A</p>
            <p className="product-type">{selected.subtitle} · {selected.size}</p>
            <h2>{selected.name}</h2>
            <p className="product-description">{selected.description}</p>

            <div className="price-row">
              <strong>{money(selected.price)}</strong>
              <del>{money(selected.oldPrice)}</del>
              <span className="discount">
                {Math.round((1 - selected.price / selected.oldPrice) * 100)}% OFF
              </span>
            </div>

            <div className="rating-row">
              <span className="rating-stars">★★★★★</span>
              <span>4.8</span><span className="rating-reviews">(2.5k reviews)</span>
            </div>

            <div className="purchase-actions">
              <button className="button-primary add-cart" onClick={addToCart}>
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button className="button-outline details-button" onClick={buyNow}>
                Buy Now <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="purchase-trust">
              <span><Check size={12} /> Secure checkout</span>
              <span><Check size={12} /> Premium packaging</span>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section section-divider">
        <div className="container">
          <div className="gallery-heading reveal">
            <div>
              <p className="section-kicker">EXPLORE THE ESSENCE</p>
              <h2>A Closer Look</h2>
            </div>
            <div className="gallery-controls">
              <button aria-label="Previous gallery item" onClick={() => moveGallery(-1)}><ArrowLeft /></button>
              <button aria-label="Next gallery item" onClick={() => moveGallery(1)}><ArrowRight /></button>
            </div>
          </div>

          <div className="gallery-grid">
            {visibleGallery.map((item, index) => (
              <motion.button
                key={item.type}
                className={`gallery-card gallery-${item.type}`}
                onClick={() => setGalleryIndex((galleryIndex + index) % gallery.length)}
                whileHover={{ y: -6 }}
                layout
              >
                <span className="gallery-art">
                  {item.type === "bottle" ? (
                    <PerfumeBottle compact variant="bloom" />
                  ) : (
                    <span className="gallery-symbol">{item.symbol}</span>
                  )}
                  <span className="gallery-light" />
                </span>
                <span className="gallery-card-title">{item.title}</span>
                <span className="gallery-card-subtitle">{item.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="gallery-pagination">
            {gallery.map((item, index) => (
              <button
                key={item.type}
                className={galleryIndex === index ? "page-dot active" : "page-dot"}
                onClick={() => setGalleryIndex(index)}
                aria-label={`Show gallery group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="reviews-backdrop" />
        <div className="container reviews-inner">
          <div className="section-heading reveal">
            <p className="section-kicker">WHAT OUR CUSTOMERS SAY</p>
            <h2>Loved by Those Who <span className="gradient-text">Feel.</span></h2>
            <p>Little moments. Lasting impressions.</p>
          </div>

          <div className="reviews-grid">
            {testimonials.map((review, index) => (
              <motion.article
                key={review.name}
                className="review-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.13 }}
                whileHover={{ y: -5 }}
              >
                <div className="review-stars">
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <span className="review-quote-mark">“</span>
                <p>{review.quote}</p>
                <div className="review-author">
                  <span className="review-avatar">{review.name.charAt(0)}</span>
                  <span><strong>{review.name}</strong><small>{review.detail}</small></span>
                  <Check size={14} className="verified-icon" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-light" />
        <div className="container final-cta-inner reveal">
          <p className="section-kicker">YOUR SIGNATURE SCENT AWAITS</p>
          <h2>Experience Luxury <span className="gradient-text">Today.</span></h2>
          <p>Indulge in a fragrance that feels uniquely yours.</p>
          <button className="button-primary" onClick={() => scrollTo("fragrances")}>
            Discover Your Scent <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-main">
          <button className="brand footer-brand" onClick={() => scrollTo("home")}>
            <Flower2 size={28} strokeWidth={1.1} />
            <span className="brand-word">VÉLORA<small>F R A G R A N C E S</small></span>
          </button>
          <p className="footer-tagline">A little mystery. A lasting memory.</p>
          <div className="footer-links">
            {["Home", "About", "Fragrances", "Reviews", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label === "Fragrances" ? "fragrances" : label.toLowerCase())}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>© {new Date().getFullYear()} VÉLORA. A demo brand concept.</span>
            <span>MADE WITH <span className="footer-heart">♥</span> AND IMAGINATION</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {notice && (
          <motion.div
            className="toast-message"
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Check size={17} /> {notice}
            <button aria-label="Dismiss notification" onClick={() => setNotice("")}><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          >
            <motion.aside
              className="cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping bag"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="drawer-heading">
                <div><p className="section-kicker">YOUR SELECTION</p><h2>Your Bag ({cartCount})</h2></div>
                <button className="drawer-close" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}><X /></button>
              </div>

              {cartCount === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={40} />
                  <h3>Your bag is waiting.</h3>
                  <p>Discover a fragrance that feels like you.</p>
                  <button className="button-primary" onClick={() => { setCartOpen(false); scrollTo("fragrances"); }}>Explore Fragrances</button>
                </div>
              ) : (
                <>
                  <div className="cart-product">
                    <div className="cart-mini-bottle"><PerfumeBottle compact variant={selected.className} /></div>
                    <div className="cart-product-info">
                      <span className="product-type">{selected.subtitle}</span>
                      <h3>{selected.name}</h3>
                      <strong>{money(selected.price)}</strong>
                      <div className="quantity-control">
                        <button aria-label="Remove one item" onClick={() => setCartCount((count) => Math.max(0, count - 1))}><Minus size={13} /></button>
                        <span>{cartCount}</span>
                        <button aria-label="Add one item" onClick={() => setCartCount((count) => count + 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-total"><span>Subtotal</span><strong>{money(selected.price * cartCount)}</strong></div>
                  <p className="cart-demo-note">Demo cart — no payment will be processed.</p>
                  <button className="button-primary checkout-button" onClick={buyNow}>Continue <ArrowUpRight size={15} /></button>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            className="checkout-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCheckoutOpen(false)}
          >
            <motion.div
              className="checkout-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="drawer-close checkout-close" aria-label="Close" onClick={() => setCheckoutOpen(false)}><X /></button>
              <div className="checkout-icon"><ShoppingBag /></div>
              <p className="section-kicker">YOUR SIGNATURE SCENT</p>
              <h2 id="checkout-title">A little luxury awaits.</h2>
              <div className="checkout-product">
                <span>{selected.name}</span>
                <strong>{money(selected.price)}</strong>
              </div>
              <p>This is a frontend demo. Online payment and real order processing have not been connected.</p>
              <button className="button-primary checkout-button" onClick={() => { setCheckoutOpen(false); setNotice("Thank you for exploring Vélora!"); }}>
                Continue Exploring <ArrowRight size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
