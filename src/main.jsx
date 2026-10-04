import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const phone = '+918160262323';
const services = [
  { number: '01', title: 'Skin care', text: 'Consultation and treatment for skin diseases, acne and other skin concerns.', items: 'Skin disease treatment · Acne care · Paediatric dermatology' },
  { number: '02', title: 'Hair care', text: 'Discuss hair loss and explore treatment options with the clinic.', items: 'Hair loss treatment · Hair treatment · Hair transplant' },
  { number: '03', title: 'Laser treatments', text: 'Explore laser treatment options suited to your concerns and treatment plan.', items: 'Laser treatments · Laser hair removal' },
  { number: '04', title: 'Cosmetic care', text: 'A personal consultation to discuss your skin goals and available cosmetic treatments.', items: 'Skin rejuvenation · Peels · Lip enhancement' }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => {
      observer.observe(element);
      element.classList.add('reveal-ready');
    });
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Skin Miracle home" onClick={closeMenu}>
        <img data-brand-logo src="./research-assets/business-logo.png" alt="Skin Miracle" width="170" height="86" />
      </a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="main-navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        <a href="#care" onClick={closeMenu}>Our care</a>
        <a href="#approach" onClick={closeMenu}>Your consultation</a>
        <a href="#visit" onClick={closeMenu}>Visit us</a>
        <a className="header-call" href={`tel:${phone}`}>Call the clinic <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image">
          <img src="./research-assets/generated-hero.png" alt="Illustrative portrait in a softly sunlit setting" width="1536" height="1024" fetchPriority="high" />
          <span className="image-caption">A little time for yourself.</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Skin Miracle · Rajkot</p>
          <h1 id="hero-title">Care that starts<br />with <em>you.</em></h1>
          <p className="hero-description">Skin, hair and cosmetic dermatology care, guided by your concerns. Start with a conversation at Skin Miracle.</p>
          <a className="button" href={`tel:${phone}`}>Call for a consultation <span aria-hidden="true">↗</span></a>
          <a className="text-link hero-link" href="#care">Explore our treatments <span aria-hidden="true">↓</span></a>
          <div className="hero-location"><span className="location-dot" aria-hidden="true"></span>Royal Park Main Road, Kalavad Road</div>
        </div>
      </section>
      <section className="care section-wrap" id="care" aria-labelledby="care-title">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">Thoughtful care, personal to you</p><h2 id="care-title">What brings<br />you here?</h2></div>
          <p>Whether you have a specific concern or want to explore your options, a consultation is the first step toward a personalised treatment plan.</p>
        </div>
        <div className="service-list">
          {services.map(service => <article className="service" key={service.number} data-reveal>
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <div className="service-copy"><p>{service.text}</p><p className="service-items">{service.items}</p></div>
            <a className="service-action" href={`tel:${phone}`} aria-label={`Call to discuss ${service.title.toLowerCase()}`}><span aria-hidden="true">↗</span></a>
          </article>)}
        </div>
        <p className="care-note">Treatment options are discussed during your consultation, based on your individual needs.</p>
      </section>
      <section className="approach" id="approach" aria-labelledby="approach-title">
        <div className="approach-intro" data-reveal>
          <p className="eyebrow">The consultation comes first</p>
          <h2 id="approach-title">Your concerns.<br />Our attention.</h2>
          <p>Meet Dr. Deep Jarsania at Skin Miracle in Rajkot. From your first conversation to follow-up care, the clinic’s approach centres on understanding your needs.</p>
          <a className="text-link" href={`tel:${phone}`}>Let’s talk about your care <span aria-hidden="true">↗</span></a>
        </div>
        <div className="steps">
          <article data-reveal><span>01 / LISTEN</span><h3>A conversation</h3><p>Share your concerns and goals in a detailed consultation. Discuss your expectations and available options.</p></article>
          <article data-reveal><span>02 / PLAN</span><h3>A personal plan</h3><p>The clinic creates a personalised treatment plan and discusses timelines and expected outcomes with you.</p></article>
          <article data-reveal><span>03 / FOLLOW UP</span><h3>Continued care</h3><p>Follow-up appointments help track your progress and discuss any adjustments to your treatment.</p></article>
        </div>
      </section>
      <section className="questions section-wrap" aria-labelledby="questions-title" data-reveal>
        <div><p className="eyebrow">Before you visit</p><h2 id="questions-title">A few helpful<br />details.</h2></div>
        <div className="faq-list">
          <details><summary>How do I arrange a consultation?<span aria-hidden="true">+</span></summary><p>Call <a href={`tel:${phone}`}>+91-8160262323</a> to discuss appointment availability with the clinic. You can also email <a href="mailto:skinmiracle11@gmail.com">skinmiracle11@gmail.com</a>.</p></details>
          <details><summary>Which treatments can I discuss?<span aria-hidden="true">+</span></summary><p>The clinic offers skin disease treatment, hair care, laser treatments and cosmetic dermatology services. Your consultation helps establish which options suit your concerns.</p></details>
          <details><summary>Where is the Rajkot clinic?<span aria-hidden="true">+</span></summary><p>You’ll find Skin Miracle on the 3rd floor of Shree Sarvottam Building, besides Satyam Supermarket, Royal Park Main Road, Kalavad Road, near University Road, Rajkot.</p></details>
        </div>
      </section>
      <section className="visit section-wrap" id="visit" aria-labelledby="visit-title">
        <div className="visit-top" data-reveal><div><p className="eyebrow">Find us in Rajkot</p><h2 id="visit-title">Make time<br />for your care.</h2></div><a className="button light" href={`tel:${phone}`}>Call the clinic <span aria-hidden="true">↗</span></a></div>
        <div className="visit-details" data-reveal>
          <div><h3>Visit</h3><address>3rd floor, Shree Sarvottam Building<br />Besides Satyam Supermarket<br />Royal Park Main Road, Kalavad Rd<br />Nr. to University Road<br />Rajkot, Gujarat 360005</address></div>
          <div><h3>Contact</h3><a href={`tel:${phone}`}>+91-8160262323</a><a href="mailto:skinmiracle11@gmail.com">skinmiracle11@gmail.com</a><a href="https://www.skinmiracleclinic.com/skin-care/index.html">Official clinic website <span aria-hidden="true">↗</span></a></div>
          <div><h3>Get to know us</h3><p>Explore patient feedback on Google.</p><a href="https://share.google/yEz5BhHYQYG8SiCHF">Read reviews on Google <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/skin_miracle_clinic?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==">Visit Instagram <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
    <footer><span>© {new Date().getFullYear()} Skin Miracle · Rajkot</span><span>AI-generated illustrative imagery</span><a href="#home">Back to top ↑</a></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
