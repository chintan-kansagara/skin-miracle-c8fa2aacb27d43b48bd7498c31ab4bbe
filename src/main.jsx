import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/* CONTENT INVENTORY, assembled from supplied readable evidence before composition:
   /skin-care/index.html: service overview, four packages, three-step process, clinician, hair FAQs, contact.
   /skin-care/about.html: individual care, mission, clinic environment and pharmacy, clinician.
   /skin-care/skin-care-treatment.html: peels, acne/scars, ageing, pigmentation, resurfacing, rejuvenation, bridal care; packages.
   /skin-care/hair-transplant-rajkot.html: scalp assessment, FUE and PRP; individual planning.
   /skin-care/laser-hair-removal-treatment.html: diode laser, body areas, skin/hair assessment and patch-test enquiry.
   /skin-care/hair-treatment.html: thinning, non-surgical options, individual suitability.
   /skin-care/cosmetology-treatment.html: injectables, facials, microdermabrasion, shared decisions.
   /skin-care/results.html: clinic identity and consultation; patient images and outcome promises excluded.
   /skin-care/contact.html: consistent Rajkot phone, email, address and weekday hours.
   / and /index.html: identity gateways only.
   /hair-transplant/index.html: mixed QHT branding and conflicting booking contact; excluded additional claims.
   Unread root treatment/contact/about URLs supply no content. Sunday schedule conflicts are omitted.
   Source photos: original official logo; promotional model, not patient/result; clinic exterior; supplied doctor portrait.
*/

const asset = (name) => `./research-assets/${name}`;
const phone = 'tel:+918160262323';
const directions = 'https://www.google.com/maps/dir/?api=1&destination=22.2809894%2C70.7580522';
const treatments = [
  {
    id: 'skin', label: 'Skin care', title: 'Care that starts with your skin.', intro: 'From a persistent concern to a change in texture or tone, begin with an assessment and discuss the options that suit your skin.',
    groups: [
      ['Acne & scars', 'Consultation for active acne and acne scars, with medication, peels or procedures considered as part of an individual plan.'],
      ['Pigmentation & uneven tone', 'Explore chemical peels, brightening treatments and laser skin rejuvenation for concerns about tone and texture.'],
      ['Ageing & skin texture', 'Discuss fine lines, skin rejuvenation and laser resurfacing. Your consultation helps clarify which approach is appropriate.'],
      ['Skin conditions & children’s skin', 'The clinic provides skin disease assessment and paediatric dermatology consultations, alongside facial and bridal skin care.']
    ], tags: ['Chemical peels', 'Laser resurfacing', 'Skin rejuvenation', 'Bridal skin care']
  },
  {
    id: 'hair', label: 'Hair & scalp', title: 'Understand the concern. Explore your options.', intro: 'Hair fall and thinning have different causes. A scalp assessment and a discussion of your history help guide an individual treatment plan.',
    groups: [
      ['Hair fall & thinning', 'Discuss when the changes began, their pattern and your scalp concerns before choosing a course of care.'],
      ['Non-surgical treatment', 'The clinic offers non-surgical hair treatment options. Suitability depends on the type of hair loss and an individual assessment.'],
      ['PRP therapy', 'Platelet-rich plasma uses a preparation from your own blood as a hair treatment option. Ask the clinician about suitability, the procedure and follow-up.'],
      ['Ongoing scalp care', 'Review your hair care routine and progress during follow-ups, with adjustments discussed where needed.']
    ], tags: ['Scalp assessment', 'Hair fall consultation', 'PRP therapy', 'Follow-up care']
  },
  {
    id: 'transplant', label: 'Hair transplant', title: 'A considered approach to hair restoration.', intro: 'Explore hair transplant options with Dr. Deep Jarsania, beginning with a scalp assessment and a clear discussion of expectations.',
    groups: [
      ['FUE hair transplant', 'Follicular Unit Extraction involves taking hair follicles from a donor area and placing them in areas of thinning. The clinic lists FUE among its options.'],
      ['Individual planning', 'Discuss the extent of hair loss, donor hair and your goals to understand whether a transplant is appropriate.'],
      ['Before a procedure', 'Ask about preparation, anaesthesia, the planned procedure, risks and the time you should allow.'],
      ['Recovery & review', 'Your care discussion should include recovery instructions and follow-up. Timelines and outcomes depend on the individual plan.']
    ], tags: ['FUE', 'Donor-area assessment', 'Procedure discussion', 'Recovery planning']
  },
  {
    id: 'laser', label: 'Laser hair reduction', title: 'Less routine. A plan for your skin.', intro: 'Laser hair reduction is offered for women and men. Treatment planning takes your skin type, hair growth and chosen area into account.',
    groups: [
      ['Face & smaller areas', 'Consultations are available for upper lip, chin, sideburns and underarms.'],
      ['Body areas', 'The source lists arms, shoulders, chest, legs, full back, abdomen and buttocks, as well as bikini and Brazilian areas.'],
      ['Technology & assessment', 'The clinic lists diode laser technology. Discuss the equipment, your skin and hair characteristics, and whether a patch test is appropriate.'],
      ['Planning sessions', 'Ask about the proposed course, preparation, aftercare and likely maintenance before beginning treatment.']
    ], tags: ['Face', 'Underarms', 'Arms & legs', 'Body areas']
  },
  {
    id: 'cosmetic', label: 'Cosmetic dermatology', title: 'Your goals, discussed thoughtfully.', intro: 'A cosmetic consultation gives you space to explain your concerns and compare the available treatment choices with the clinician.',
    groups: [
      ['Injectable options', 'The clinic lists Botox, dermal fillers and lip enhancement. Discuss suitability, risks and the intended approach during consultation.'],
      ['Facials & exfoliation', 'Galvanic facials, chemical peels and microdermabrasion are among the listed options for facial care.'],
      ['Laser skin facial', 'Discuss laser facial treatments and skin rejuvenation in relation to your individual concerns.'],
      ['Shared decisions', 'When more than one option is available, the clinic’s approach is to explain the choices and develop a plan together.']
    ], tags: ['Dermal fillers', 'Botox', 'Microdermabrasion', 'Galvanic facials']
  }
];
const packages = [
  { name: 'Skin rejuvenation', note: 'For a conversation about texture, tone and ageing skin.', items: ['Volume-loss concerns', 'Collagen-focused rejuvenation', 'Fine lines & wrinkles', 'Uneven skin tone'] },
  { name: 'Peel package', note: 'Explore a peel approach suited to your skin.', items: ['Fine lines', 'Age spots', 'Lines around the eyes & mouth', 'Mild scar appearance'] },
  { name: 'Wedding preparation', note: 'Discuss your goals and timeline ahead of the day.', items: ['Glow facials', 'IPL treatment for skin concerns', 'Unwanted hair removal', 'Inch loss / slimming enquiries'] },
  { name: 'Acne care', note: 'A plan that takes your current acne into account.', items: ['Medication treatment', 'Spot peels for pustular acne', 'Comedone extraction'] }
];
const faqs = [
  ['Where should I begin?', 'Start with a consultation to discuss your concerns, routine and goals. The clinic describes an individual assessment followed by a treatment plan and follow-up reviews. Call to arrange a visit and confirm consultation details.'],
  ['What can cause hair loss?', 'The clinic’s FAQ lists hereditary patterns, hormonal changes, nutritional deficiencies, stress and medical conditions among possible causes. Hair practices can also contribute. An assessment helps explore what may apply to you.'],
  ['What types of hair loss are discussed?', 'The clinic lists androgenetic alopecia, telogen effluvium and alopecia areata. The type of hair loss matters when discussing treatment options.'],
  ['What is a hair transplant?', 'A hair transplant moves hair follicles from a donor area to an area of thinning. The clinic lists FUE among its treatments; its FAQ also mentions FUT. Ask which techniques are offered for your situation.'],
  ['How long does a hair transplant take?', 'The source FAQ gives a general estimate of four to eight hours, depending on graft numbers. Confirm the planned duration with the clinician after assessment.'],
  ['What should I ask about discomfort and recovery?', 'Ask about local anaesthesia, expected discomfort, aftercare and the recovery schedule for your procedure. The clinic’s FAQ discusses local anaesthesia, but personal recovery and treatment experiences vary.'],
  ['How is laser hair reduction planned?', 'The clinic considers skin type, hair growth and treatment area. Ask about assessment, patch testing, the course of sessions and aftercare before starting.'],
  ['How much do treatments and packages cost?', 'No verified prices are supplied. Call the clinic for current package contents, consultation details and a quote for the recommended plan.'],
  ['Can I visit on a Sunday?', 'Please call to confirm Sunday availability. The source pages give different Sunday schedules, so an appointment should be confirmed directly.']
];

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>; }
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('skin');
  const treatment = treatments.find((item) => item.id === active);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach((el) => { if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal-pending'); observer.observe(el); } });
    const handleMotion = () => { if (query.matches) { observer.disconnect(); document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending')); } };
    query.addEventListener?.('change', handleMotion);
    return () => { observer.disconnect(); query.removeEventListener?.('change', handleMotion); };
  }, []);
  const selectTreatment = (id) => { setActive(id); };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Skin Miracle home"><img data-brand-logo src={asset('business-logo.png')} alt="Skin Miracle" width="170" height="86" /></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
      <nav id="main-nav" aria-label="Main navigation" className={menuOpen ? 'nav open' : 'nav'}>
        {[['Treatments', 'treatments'], ['Our doctor', 'doctor'], ['Packages', 'packages'], ['Visit us', 'visit']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="button small" href={phone}>Book a consultation <Arrow /></a>
      </nav>
    </header>
    <main id="main">
      <section id="home" className="hero">
        <img className="hero-photo" src={asset('business-photo-1.webp')} alt="Promotional skincare image of a woman with her eyes closed" width="1800" height="720" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow"><span className="dot" /> SKIN MIRACLE · RAJKOT</p>
          <h1>A little care.<br />A more confident<br /><em>you.</em></h1>
          <p className="hero-description">Skin, hair and cosmetic care that begins with understanding you.</p>
          <div className="hero-actions"><a className="button" href={phone}>Let’s talk about your skin <Arrow /></a><a className="text-link" href="#treatments">Explore treatments <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-caption">Skin & hair clinic<br /><strong>Kalavad Road, Rajkot</strong></div>
      </section>
      <section className="intro section container" data-reveal>
        <div><p className="eyebrow">INDIVIDUAL CARE, FROM THE START</p><h2>Your skin has a story.<br />We’re here to <em>listen.</em></h2></div>
        <div className="intro-copy"><p>Whether you’re managing a skin concern, noticing hair thinning or considering cosmetic care, the first step is a conversation.</p><p>At Skin Miracle, treatment is planned around your concerns and goals, with consultation, a personalised plan and follow-up care at the heart of the process.</p><a className="text-link" href="#process">How your care is planned <Arrow /></a></div>
      </section>
      <section id="treatments" className="treatment-section section" data-reveal>
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">EXPLORE YOUR OPTIONS</p><h2>Care for every<br /><em>chapter.</em></h2></div><p>Find your concern below. Explore the details, then speak with the clinic about the right next step.</p></div>
          <div className="treatment-browser">
            <div className="treatment-selector" aria-label="Choose a treatment category">{treatments.map((item) => <button key={item.id} onClick={() => selectTreatment(item.id)} aria-pressed={active === item.id} aria-controls="treatment-detail" className={active === item.id ? 'selected' : ''}>{item.label}<span aria-hidden="true">↗</span></button>)}</div>
            <article id="treatment-detail" className="treatment-detail" aria-label={treatment.label}>
              <p className="eyebrow">{treatment.label}</p><h3>{treatment.title}</h3><p className="detail-intro">{treatment.intro}</p>
              <div className="detail-grid">{treatment.groups.map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div>
              <div className="tags">{treatment.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a className="text-link" href={phone}>Discuss {treatment.label.toLowerCase()} <Arrow /></a>
            </article>
          </div>
          <p className="section-footnote">Treatment suitability, risks, expected outcomes and costs are discussed during your consultation.</p>
        </div>
      </section>
      <section id="doctor" className="doctor-section container section" data-reveal>
        <figure className="doctor-photo image-frame"><img src={asset('doctor.png')} alt="Dr. Deep Jarsania seated in the clinic consultation room" width="544" height="575" loading="lazy" /><figcaption>Dr. Deep Jarsania · Skin Miracle, Rajkot</figcaption></figure>
        <div className="doctor-copy"><p className="eyebrow">MEET YOUR CLINICIAN</p><h2>A conversation.<br />A clearer <em>way forward.</em></h2><h3>Dr. Deep Jarsania</h3><p>Dr. Deep Jarsania is the clinician featured by Skin Miracle for its skin and hair care services in Rajkot, including hair restoration consultations.</p><p>Bring your concerns and questions. Discuss the options, understand what a treatment involves and make an informed decision about your care.</p><a href={phone} className="button">Arrange a consultation <Arrow /></a><a className="review-link" href="https://share.google/yEz5BhHYQYG8SiCHF" target="_blank" rel="noopener noreferrer">Read reviews on Google <Arrow /></a></div>
      </section>
      <section id="process" className="process section" data-reveal><div className="container"><div className="section-heading"><div><p className="eyebrow">YOUR CARE, STEP BY STEP</p><h2>Clarity at <em>every step.</em></h2></div><p>A simple, considered process that keeps your concerns and questions in the conversation.</p></div><div className="process-grid">{[
        ['01', 'The consultation', 'Discuss your concerns, history and goals. Explore your options, expectations and the timeline with the clinician.'],
        ['02', 'Your treatment plan', 'Review a personalised approach, including suitability, preparation and what the proposed treatment involves.'],
        ['03', 'Follow-up care', 'Review progress, discuss aftercare and make adjustments to the plan where needed.']
      ].map(([number, title, text]) => <article key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="packages" className="packages section container" data-reveal><div className="section-heading"><div><p className="eyebrow">FOCUSED CARE PACKAGES</p><h2>A plan around<br /><em>your priorities.</em></h2></div><p>Explore the clinic’s listed packages. Call to confirm current inclusions, suitability and pricing.</p></div><div className="package-grid">{packages.map((item, index) => <article className="package" key={item.name}><span className="package-label">CARE COLLECTION / 0{index + 1}</span><h3>{item.name}</h3><p>{item.note}</p><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul><a className="text-link" href={phone}>Enquire about this package <Arrow /></a></article>)}</div></section>
      <section id="faq" className="faq section container" data-reveal><div><p className="eyebrow">BEFORE YOUR VISIT</p><h2>A few helpful<br /><em>answers.</em></h2><p className="faq-intro">Your consultation is the place to discuss advice specific to you. These answers help you prepare for that conversation.</p><a className="text-link" href={phone}>Have another question? Call us <Arrow /></a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" className="plus">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="visit" className="visit section" data-reveal><div className="container visit-grid"><div className="visit-copy"><p className="eyebrow">COME FIND US IN RAJKOT</p><h2>Your next step<br />starts <em>here.</em></h2><address>3rd floor, Shree Sarvottam Building<br />Besides Satyam Supermarket<br />Royal Park Main Road, Kalavad Rd,<br />Nr. to University Road,<br />Rajkot, Gujarat 360005</address><div className="hours"><span>Monday – Saturday</span><strong>10:00 AM – 07:30 PM</strong><small>Call to confirm Sunday availability.</small></div><div className="visit-actions"><a className="button" href={phone}>Call +91-8160262323 <Arrow /></a><a className="text-link" href={directions} target="_blank" rel="noopener noreferrer">Get directions <Arrow /></a></div><a className="email" href="mailto:skinmiracle11@gmail.com">skinmiracle11@gmail.com</a></div><figure className="clinic-photo image-frame"><img src={asset('business-photo-2.webp')} width="1360" height="767" loading="lazy" alt="Skin Miracle signage on the clinic building in Rajkot" /><figcaption>Skin Miracle · Kalavad Road, Rajkot</figcaption></figure></div></section>
    </main>
    <footer className="footer container"><div className="footer-top"><a className="brand" href="#home" aria-label="Skin Miracle home"><img data-brand-logo src={asset('business-logo.png')} alt="Skin Miracle" width="170" height="86" /></a><p>Thoughtful care.<br /><span>Skin. Hair. You.</span></p><div className="footer-links"><a href="#treatments">Treatments</a><a href="#faq">FAQs</a><a href="https://www.instagram.com/skin_miracle_clinic/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://share.google/yEz5BhHYQYG8SiCHF" target="_blank" rel="noopener noreferrer">Read reviews on Google ↗</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Skin Miracle · Rajkot</span><span>Hero image is promotional; it does not show a patient or treatment result.</span><a href="#home">Back to top ↑</a></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
