import { useState, useEffect } from "react";

const IMAGES = {
  heroBackground: "https://static.wixstatic.com/media/d794b0_2e51462a35af448e99718ca7aca0cbcff000.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/d794b0_2e51462a35af448e99718ca7aca0cbcff000.jpg",
  workshopGroup:  "https://static.wixstatic.com/media/d794b0_e0dc6dcd269b40e98d9b262e1c6c7c38~mv2.jpeg/v1/fill/w_600,h_800,al_c,q_85,enc_avif,quality_auto/d794b0_e0dc6dcd269b40e98d9b262e1c6c7c38~mv2.jpeg",
  paula:          "https://static.wixstatic.com/media/d794b0_f280c16115294f0cb2ccbdf0c21c7c9c~mv2.jpeg/v1/fill/w_800,h_1000,al_c,q_85,enc_avif,quality_auto/IMG_2387.jpeg",
  jamie:          "https://static.wixstatic.com/media/d794b0_c051db8ee478434db6fc36d587893f94~mv2.png/v1/fill/w_800,h_1000,al_c,q_85,enc_avif,quality_auto/IMG_2396_heic.png",
  workshopRoom:   "https://static.wixstatic.com/media/d794b0_5ff0b9f02e4f4249b3c5a51ecc02edc5~mv2.jpeg/v1/fill/w_1400,h_800,al_c,q_85,enc_avif,quality_auto/IMG_2064.jpeg",
  facilitation1:  "https://static.wixstatic.com/media/d794b0_47a85e58eb9e4f21a035768e4ee7e5c8~mv2.jpeg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_3072.jpeg",
  facilitation2:  "https://static.wixstatic.com/media/d794b0_565bcf126a3a4769945e9f96a2e1cfb7~mv2.jpg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_4889_edited.jpg",
  facilitation3:  "https://static.wixstatic.com/media/d794b0_1dfcffc02c10497ab775fb047e15d9f1~mv2.jpg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_0993_edited.jpg",
  consulting:     "https://static.wixstatic.com/media/d794b0_fe1a32eab4fe453a9e66f9c103d653ac~mv2.jpeg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_2519.jpeg",
  digital:        "https://static.wixstatic.com/media/d794b0_267c1d7e12a2412ab3e713bc1312cf62~mv2.jpeg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_0723.jpeg",
  webExp:         "https://static.wixstatic.com/media/d794b0_006a573e168b431494e5ad995b9a1dc4~mv2.jpeg/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_6600.jpeg",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream:#F8F4F1; --warm:#EEE0DC; --sand:#D4C0BC;
    --rose:#B56B72; --rose-dk:#8C4A50;
    --olive:#5C6B3A; --fern:#8C9E62;
    --oak:#2A2620; --mid:#7A6460; --white:#FFFFFF;
  }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--oak); line-height:1.7; overflow-x:hidden; }
  h1,h2,h3,h4 { font-family:'Cormorant Garamond',serif; font-weight:400; line-height:1.2; }

  /* NAV */
  nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 2.5rem; height:70px; background:rgba(248,244,241,0.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--sand); transition:box-shadow .3s; }
  nav.scrolled { box-shadow:0 2px 24px rgba(42,38,32,.1); }
  .nav-logo { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:500; letter-spacing:.08em; color:var(--oak); text-transform:uppercase; cursor:pointer; }
  .nav-logo span { color:var(--rose); }
  .nav-links { display:flex; gap:2.5rem; list-style:none; align-items:center; }
  .nav-links a { font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:var(--mid); cursor:pointer; transition:color .2s; border:none; background:none; padding:0; font-family:'DM Sans',sans-serif; }
  .nav-links a:hover,.nav-links a.active { color:var(--rose); }
  .nav-cta { background:var(--rose) !important; color:#fff !important; padding:.45rem 1.2rem !important; border-radius:2px; }
  .nav-cta:hover { background:var(--rose-dk) !important; }
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:4px; }
  .hamburger span { display:block; width:24px; height:1.5px; background:var(--oak); transition:all .3s; }
  .hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }
  .mobile-menu { display:none; position:fixed; top:70px; left:0; right:0; background:var(--cream); border-bottom:1px solid var(--sand); padding:1.5rem 2.5rem; z-index:99; flex-direction:column; gap:1.2rem; }
  .mobile-menu.open { display:flex; }
  .mobile-menu a { font-size:.85rem; letter-spacing:.1em; text-transform:uppercase; color:var(--mid); cursor:pointer; background:none; border:none; text-align:left; padding:0; font-family:'DM Sans',sans-serif; }
  .mobile-menu a:hover { color:var(--rose); }

  .page { padding-top:70px; min-height:100vh; }

  /* HERO */
  .hero { min-height:90vh; display:grid; grid-template-columns:1fr 1fr; }
  .hero-left { display:flex; flex-direction:column; justify-content:center; padding:5rem 4rem 5rem 5rem; }
  .hero-eyebrow { font-size:.7rem; letter-spacing:.22em; text-transform:uppercase; color:var(--rose); margin-bottom:1.2rem; display:flex; align-items:center; gap:.6rem; }
  .hero-title { font-size:clamp(2.6rem,4.5vw,4rem); font-weight:300; margin-bottom:1.8rem; line-height:1.08; }
  .hero-title em { color:var(--rose); font-style:italic; }
  .hero-body { font-size:1rem; color:var(--mid); max-width:460px; margin-bottom:2.5rem; line-height:1.85; }
  .hero-actions { display:flex; gap:1rem; flex-wrap:wrap; }
  .hero-right { position:relative; overflow:hidden; min-height:500px; }
  .hero-img { width:100%; height:100%; object-fit:cover; object-position:center 30%; display:block; }
  .hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(92,107,58,.75),rgba(92,107,58,.4)); }
  .hero-quote { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:2; padding:3rem; text-align:center; }
  .hero-quote-mark { font-family:'Cormorant Garamond',serif; font-size:7rem; line-height:.5; color:var(--fern); opacity:.5; display:block; margin-bottom:1rem; }
  .hero-quote p { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-style:italic; color:#fff; line-height:1.5; max-width:360px; }
  .hero-quote cite { display:block; margin-top:1.2rem; font-size:.72rem; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.7); font-style:normal; }

  /* BUTTONS */
  .btn-primary { display:inline-flex; align-items:center; gap:.5rem; background:var(--rose); color:#fff; padding:.8rem 1.8rem; font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; border:none; border-radius:2px; transition:background .2s,transform .15s; font-family:'DM Sans',sans-serif; }
  .btn-primary:hover { background:var(--rose-dk); transform:translateY(-1px); }
  .btn-outline { display:inline-flex; align-items:center; gap:.5rem; background:transparent; color:var(--oak); padding:.8rem 1.8rem; font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; border:1px solid var(--sand); border-radius:2px; transition:all .2s; font-family:'DM Sans',sans-serif; }
  .btn-outline:hover { border-color:var(--rose); color:var(--rose); }
  .btn-outline-white { display:inline-flex; align-items:center; gap:.5rem; background:transparent; color:#fff; padding:.8rem 1.8rem; font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; border:1px solid rgba(255,255,255,.4); border-radius:2px; transition:all .2s; font-family:'DM Sans',sans-serif; }
  .btn-outline-white:hover { border-color:#fff; background:rgba(255,255,255,.1); }

  /* SECTIONS */
  .section-label { font-size:.7rem; letter-spacing:.22em; text-transform:uppercase; color:var(--rose); display:flex; align-items:center; gap:.5rem; margin-bottom:.9rem; }
  .section-title { font-size:clamp(2rem,3.5vw,3rem); color:var(--oak); margin-bottom:1rem; }
  .section-body { font-size:1rem; color:var(--mid); max-width:700px; line-height:1.85; }
  .divider { width:48px; height:2px; background:var(--rose); margin:1.4rem 0; }

  /* HOME: MISSION — zoomed out to show full scene */
  .mission-grid { display:grid; grid-template-columns:1fr 1fr; min-height:520px; }
  .mission-img {
    width:100%; height:100%; display:block; min-height:420px;
    object-fit:contain;
    object-position:center center;
    background:#EEE0DC;
  }
  .mission-content { padding:5rem 4rem; display:flex; flex-direction:column; justify-content:center; background:var(--cream); }

  /* VALUES */
  .values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
  .value-card { padding:3rem 2.5rem; position:relative; overflow:hidden; }
  .value-card:nth-child(1) { background:var(--olive); }
  .value-card:nth-child(2) { background:var(--fern); }
  .value-card:nth-child(3) { background:#4A5830; }
  .value-card::before { content:attr(data-letter); position:absolute; right:-.15em; bottom:-.1em; font-family:'Cormorant Garamond',serif; font-size:11rem; line-height:1; color:rgba(255,255,255,.07); pointer-events:none; }
  .value-icon { font-size:2rem; color:rgba(255,255,255,.6); margin-bottom:1rem; display:block; }
  .value-card h3 { font-size:1.9rem; color:#fff; margin-bottom:.8rem; position:relative; }
  .value-card p { font-size:.92rem; color:rgba(255,255,255,.82); line-height:1.85; position:relative; }

  /* VIDEO / IMG STRIP */
  .img-strip { width:100%; height:420px; object-fit:cover; object-position:center 40%; display:block; }

  /* TESTIMONIALS */
  .testimonials-bg { background:var(--warm); padding:6rem 5rem; }
  .testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; margin-top:3rem; }
  .testimonial-card { background:#fff; padding:2.5rem; border-left:3px solid var(--rose); }
  .testimonial-card::before { content:'"'; font-family:'Cormorant Garamond',serif; font-size:5rem; line-height:.6; color:var(--sand); display:block; margin-bottom:1rem; }
  .testimonial-card p { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-style:italic; color:var(--oak); line-height:1.75; }

  /* CTA BAND */
  .cta-band { background:var(--oak); padding:5rem; display:flex; align-items:center; justify-content:space-between; gap:2rem; flex-wrap:wrap; }
  .cta-band h2 { font-size:2.5rem; color:#fff; max-width:520px; }
  .cta-band h2 em { color:var(--warm); font-style:italic; }

  /* OFFERINGS */
  .offerings-hero { position:relative; min-height:380px; display:flex; align-items:flex-end; overflow:hidden; }
  .offerings-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 35%; }
  .offerings-hero-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(42,38,32,.92) 45%,rgba(42,38,32,.55)); }
  .offerings-hero-content { position:relative; z-index:2; padding:4.5rem 5rem; }
  .offerings-hero-content h1 { font-size:clamp(2.2rem,3.5vw,3.6rem); color:#fff; max-width:580px; }
  .offerings-hero-content p { color:rgba(255,255,255,.72); max-width:540px; margin-top:1.2rem; line-height:1.85; }

  .offerings-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; background:var(--sand); }
  .offering-card { background:var(--cream); transition:background .2s; }
  .offering-card:hover { background:#fff; }

  /* OFFERING IMAGES — default framing */
  .offering-img { width:100%; height:240px; object-fit:cover; object-position:center 50%; display:block; }
  /* Card 1 — Art of Skilled Facilitation — heads cut, pull up */
  .offering-img-1 { object-position:center 15%; }
  /* Card 2 — Art of Skilled Dialogue — heads cut, pull up */
  .offering-img-2 { object-position:center 10%; }

  .offering-body { padding:2.8rem; }
  .offering-number { font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:var(--rose); margin-bottom:.8rem; display:flex; align-items:center; gap:.5rem; }
  .offering-card h2 { font-size:1.7rem; color:var(--oak); margin-bottom:.8rem; }
  .offering-card p { font-size:.93rem; color:var(--mid); line-height:1.85; margin-bottom:1.2rem; }
  .offering-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.67rem; letter-spacing:.08em; text-transform:uppercase; color:var(--olive); background:rgba(92,107,58,.1); padding:.28rem .75rem; border-radius:2px; margin-right:.4rem; margin-bottom:.4rem; }
  .offering-enquire { display:inline-flex; align-items:center; gap:.4rem; margin-top:1.2rem; font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:var(--rose); cursor:pointer; background:none; border:none; padding:0; border-bottom:1px solid var(--rose); font-family:'DM Sans',sans-serif; transition:opacity .2s; }
  .offering-enquire:hover { opacity:.7; }

  /* ABOUT */
  .about-hero { position:relative; min-height:420px; display:flex; align-items:flex-end; overflow:hidden; }
  .about-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 25%; }
  .about-hero-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(238,224,220,.05) 0%,rgba(238,224,220,.97) 72%); }
  .about-hero-content { position:relative; z-index:2; padding:4rem 5rem; }
  .about-hero-content h1 { font-size:clamp(2.4rem,3.8vw,3.6rem); color:var(--oak); }
  .about-hero-content p { font-size:1rem; color:var(--mid); line-height:1.9; max-width:640px; margin-top:1rem; }

  .about-mission { background:var(--olive); padding:5rem; display:grid; grid-template-columns:1fr 2fr; gap:4rem; align-items:center; }
  .about-mission h2 { font-size:2.5rem; color:#fff; line-height:1.2; }
  .about-mission p { color:rgba(255,255,255,.82); line-height:1.9; font-size:.97rem; }
  .about-mission p+p { margin-top:1rem; }

  /* TEAM — smaller portraits in stylish cards */
  .team-section { padding:6rem 5rem; }
  .team-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:4rem; margin-top:4rem; }
  .team-card {
    background:#fff;
    border-radius:4px;
    overflow:hidden;
    box-shadow:0 4px 32px rgba(42,38,32,.08);
    display:grid;
    grid-template-columns:160px 1fr;
    gap:0;
    border-left:4px solid var(--rose);
  }
  .team-photo-col {
    background:var(--warm);
    display:flex; align-items:flex-start; justify-content:center;
    padding:2rem 1rem;
  }
  .team-photo {
    width:120px; height:120px;
    object-fit:cover; object-position:center 5%;
    border-radius:50%;
    border:3px solid var(--rose);
    display:block;
  }
  .team-content { padding:2rem 2rem 2rem 1.5rem; }
  .team-member h2 { font-size:1.6rem; color:var(--oak); margin-bottom:.2rem; }
  .team-member .role { font-size:.72rem; letter-spacing:.15em; text-transform:uppercase; color:var(--rose); display:flex; align-items:center; gap:.4rem; margin-bottom:1rem; }
  .team-member p { font-size:.88rem; color:var(--mid); line-height:1.8; margin-bottom:.6rem; }
  .linkedin-link { display:inline-flex; align-items:center; gap:.4rem; font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--olive); text-decoration:none; margin-top:.6rem; border-bottom:1px solid var(--fern); padding-bottom:2px; transition:color .2s; }
  .linkedin-link:hover { color:var(--rose); border-color:var(--rose); }

  /* EVENTS */
  .events-hero { background:var(--oak); padding:6rem 5rem; position:relative; overflow:hidden; }
  .events-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 50%,rgba(140,158,98,.15),transparent 70%); }
  .events-hero h1 { font-size:clamp(2.4rem,3.8vw,3.6rem); color:#fff; position:relative; }
  .events-hero p { color:rgba(255,255,255,.65); max-width:500px; margin-top:1.2rem; line-height:1.85; position:relative; }
  .events-empty { padding:6rem 5rem; text-align:center; }
  .events-empty-icon { font-size:3rem; color:var(--sand); margin-bottom:1.5rem; display:block; }
  .events-empty h2 { font-size:2rem; color:var(--oak); margin-bottom:1rem; }
  .events-empty p { color:var(--mid); max-width:440px; margin:0 auto 2rem; line-height:1.85; }

  /* CONTACT */
  .contact-layout { display:grid; grid-template-columns:1fr 1fr; min-height:calc(100vh - 70px); }
  .contact-left { background:var(--olive); padding:6rem 4.5rem; display:flex; flex-direction:column; justify-content:center; position:relative; overflow:hidden; }
  .contact-left::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(140,158,98,.25),transparent 60%); }
  .contact-left h1 { font-size:clamp(2.2rem,3.2vw,3.2rem); color:#fff; margin-bottom:1rem; position:relative; }
  .contact-left h1 em { color:var(--warm); font-style:italic; }
  .contact-left p { color:rgba(255,255,255,.75); line-height:1.85; max-width:380px; margin-bottom:2.5rem; position:relative; }
  .contact-detail { display:flex; align-items:center; gap:1rem; color:rgba(255,255,255,.7); font-size:.9rem; margin-bottom:1rem; position:relative; }
  .contact-detail i { font-size:1.1rem; color:var(--fern); }
  .contact-detail a { color:var(--warm); text-decoration:none; transition:color .2s; }
  .contact-detail a:hover { color:#fff; }
  .contact-right { padding:6rem 4.5rem; background:var(--cream); display:flex; flex-direction:column; justify-content:center; }
  .contact-right h2 { font-size:2.1rem; color:var(--oak); margin-bottom:2rem; }
  .form-group { margin-bottom:1.4rem; }
  .form-group label { display:flex; align-items:center; gap:.4rem; font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--mid); margin-bottom:.5rem; }
  .form-group input,.form-group textarea,.form-group select { width:100%; padding:.82rem 1rem; border:1px solid var(--sand); background:#fff; color:var(--oak); font-family:'DM Sans',sans-serif; font-size:.95rem; border-radius:2px; transition:border-color .2s; outline:none; appearance:none; }
  .form-group input:focus,.form-group textarea:focus,.form-group select:focus { border-color:var(--rose); }
  .form-group textarea { min-height:140px; resize:vertical; }
  .form-success { background:var(--olive); color:#fff; padding:3rem; border-radius:2px; text-align:center; }
  .form-success i { font-size:2.5rem; margin-bottom:1rem; display:block; }
  .form-success h3 { font-size:1.9rem; margin-bottom:.8rem; }
  .form-success p { color:rgba(255,255,255,.8); }

  /* FOOTER */
  footer { background:var(--oak); padding:4.5rem 5rem 2.5rem; }
  .footer-top { display:grid; grid-template-columns:2fr 1fr 1fr; gap:4rem; padding-bottom:3rem; border-bottom:1px solid rgba(255,255,255,.1); }
  .footer-brand h3 { font-family:'Cormorant Garamond',serif; font-size:1.25rem; color:#fff; letter-spacing:.08em; text-transform:uppercase; margin-bottom:1rem; }
  .footer-brand h3 span { color:var(--rose); }
  .footer-brand p { font-size:.88rem; color:rgba(255,255,255,.5); line-height:1.8; max-width:320px; }
  .footer-col h4 { font-size:.7rem; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.38); margin-bottom:1.2rem; font-weight:500; }
  .footer-col ul { list-style:none; }
  .footer-col ul li { margin-bottom:.7rem; }
  .footer-col ul li a,.footer-col ul li button { display:flex; align-items:center; gap:.5rem; font-size:.88rem; color:rgba(255,255,255,.6); text-decoration:none; cursor:pointer; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color .2s; padding:0; }
  .footer-col ul li a:hover,.footer-col ul li button:hover { color:#fff; }
  .footer-bottom { padding-top:2rem; display:flex; align-items:flex-start; justify-content:space-between; gap:2rem; flex-wrap:wrap; }
  .footer-ack { font-size:.78rem; color:rgba(255,255,255,.38); line-height:1.75; max-width:580px; }
  .footer-copy { font-size:.75rem; color:rgba(255,255,255,.28); white-space:nowrap; align-self:flex-end; }

  @media (max-width:960px) {
    .nav-links { display:none; }
    .hamburger { display:flex; }
    .hero,.mission-grid,.contact-layout { grid-template-columns:1fr; }
    .hero-right { min-height:320px; }
    .hero-left { padding:3rem 2rem; }
    .mission-content,.testimonials-bg,.team-section { padding:4rem 2rem; }
    .values-grid { grid-template-columns:1fr; }
    .testimonials-grid { grid-template-columns:1fr; }
    .cta-band { padding:3.5rem 2rem; flex-direction:column; }
    .offerings-hero-content { padding:3rem 2rem; }
    .offerings-grid { grid-template-columns:1fr; }
    .offering-body { padding:2rem; }
    .about-hero-content { padding:3rem 2rem; }
    .about-mission { grid-template-columns:1fr; padding:3.5rem 2rem; gap:2rem; }
    .team-grid { grid-template-columns:1fr; gap:2rem; }
    .team-card { grid-template-columns:1fr; }
    .team-photo-col { padding:2rem; flex-direction:row; justify-content:flex-start; }
    .events-hero,.events-empty { padding:4rem 2rem; }
    .contact-left,.contact-right { padding:4rem 2rem; }
    footer { padding:3.5rem 2rem 2rem; }
    .footer-top { grid-template-columns:1fr; gap:2.5rem; }
    .footer-bottom { flex-direction:column; }
  }
  .fade-in { opacity:0; transform:translateY(20px); animation:fadeUp .7s ease forwards; }
  @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
  .fade-in:nth-child(2) { animation-delay:.15s; }
  .fade-in:nth-child(3) { animation-delay:.3s; }
  .fade-in:nth-child(4) { animation-delay:.45s; }
`;

const OFFERINGS = [
  { id:1, img:"facilitation1", imgClass:"offering-img offering-img-1", icon:"ti-users", title:"The Art of Skilled Facilitation", short:"AOSF", tags:["Face to face","Online","7–10 days","Max 24"], body:"This unique workshop takes a deep dive into transformational process facilitation. Using an experiential approach, participants learn theory and skills to lead transformational adult learning environments — engaging the head, heart and will of groups with a leader as host. Participants co-design, practise and receive feedback on a facilitation project using participatory, adult learning principles." },
  { id:2, img:"facilitation2", imgClass:"offering-img offering-img-2", icon:"ti-messages", title:"The Art of Skilled Dialogue", short:"AOSD", tags:["Face to face","7–10 days","Max 30"], body:"Creating and hosting brave spaces where people shift conversations from debate into generative dialogue is a skill requiring practice. Participants dive deep into processes for dialogue, personal reflection and co-creation — moving from 'talking nice' to genuine inquiry, contemplation, generative dialogue and collective creativity." },
  { id:3, img:"facilitation3", imgClass:"offering-img", icon:"ti-ear", title:"Facilitation", short:"FACILITATION", tags:["Face to face","Online","Customised"], body:"Just Joy Collective offers skilled process facilitators who assess a group's needs and cultivate the space required for people to achieve their goals. Our facilitators are deep listeners, skilled in holding chaotic and ambiguous spaces where outcomes are unknown yet unfolding. We have wide experience facilitating board meetings, conferences, assemblies and leadership workshops across the globe." },
  { id:4, img:"consulting", imgClass:"offering-img", icon:"ti-bulb", title:"Consulting", short:"CONSULTING", tags:["Tailored","Flexible"], body:"We offer consulting which grows the capacity of facilitators, leaders and change makers to customise their own facilitation sessions in a way that engages participants' head, heart and will. Contact us with ideas and we can work together to create transformative experiences for your participants." },
  { id:5, img:"digital", imgClass:"offering-img", icon:"ti-device-laptop", title:"Digital Skills for Mission", short:"DSFM", tags:["Online","Face to face","Customised"], body:"Developing customised learning programs and providing safe learning environments, our programs build confidence and enable participants to develop skills for today's technology-focused world. Workshops include Digital Communications for Mission Effectiveness, Hosting Digital Communications, Good Cyber Practice and Managing Digital Communications." },
  { id:6, img:"webExp", imgClass:"offering-img", icon:"ti-world", title:"Process Based Web Experiences", short:"PBWE", tags:["Online","Global reach","Multilingual"], body:"Taking our knowledge of process facilitation and applying it to the digital realm, we develop virtual experiences that reach across borders, languages and timezones — enabling organisations to conduct virtual conferences and face-to-face processes in new and engaging ways, with reduced costs and greater participation." },
];

const TESTIMONIALS = [
  { quote:"As I leave this workshop I feel energised because it was such a well facilitated process. I am keen to sharpen the focus of my work. My heart space has been opened." },
  { quote:"I feel confident, inspired and energized because I can apply all the things I learned from this course into my current and future ministry and really to the whole aspect of my life." },
  { quote:"I feel informed, equipped and inspired to keep developing my capability in online communication. Moreover, I am energised by the opportunities this platform offers for creating deep, formative, human encounters online." },
];

function Nav({ page, setPage }) {
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>20); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const nav=p=>{ setPage(p); setMenuOpen(false); window.scrollTo(0,0); };
  const links=[{id:"home",label:"Home"},{id:"offerings",label:"Offerings"},{id:"about",label:"About Us"},{id:"events",label:"Events"},{id:"contact",label:"Contact"}];
  return (
    <>
      <nav className={scrolled?"scrolled":""}>
        <span className="nav-logo" onClick={()=>nav("home")}>Just <span>Joy</span> Collective</span>
        <ul className="nav-links">
          {links.map(l=><li key={l.id}><a className={page===l.id?"active":""} onClick={()=>nav(l.id)}>{l.label}</a></li>)}
          <li><a className="nav-cta" onClick={()=>nav("contact")}>Enquire</a></li>
        </ul>
        <button className={`hamburger ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span/><span/><span/></button>
      </nav>
      <div className={`mobile-menu ${menuOpen?"open":""}`}>
        {links.map(l=><a key={l.id} onClick={()=>nav(l.id)}>{l.label}</a>)}
        <a onClick={()=>nav("contact")} style={{color:"var(--rose)"}}>Enquire Now →</a>
      </div>
    </>
  );
}

function Footer({ setPage }) {
  const nav=p=>{ setPage(p); window.scrollTo(0,0); };
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand"><h3>Just <span>Joy</span> Collective</h3><p>Facilitation and capacity development for organisations creating a more socially just and joy-filled world.</p></div>
        <div className="footer-col"><h4>Navigate</h4><ul>{[{p:"home",icon:"ti-home",label:"Home"},{p:"offerings",icon:"ti-package",label:"Offerings"},{p:"about",icon:"ti-users",label:"About Us"},{p:"events",icon:"ti-calendar",label:"Events"},{p:"contact",icon:"ti-mail",label:"Contact"}].map(x=><li key={x.p}><button onClick={()=>nav(x.p)}><i className={`ti ${x.icon}`}/>{x.label}</button></li>)}</ul></div>
        <div className="footer-col"><h4>Connect</h4><ul>
          <li><a href="mailto:justjoycollective@gmail.com"><i className="ti ti-mail"/>justjoycollective@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/just-joy-collective-7132a8237/" target="_blank" rel="noreferrer"><i className="ti ti-brand-linkedin"/>LinkedIn</a></li>
          <li><span style={{display:"flex",alignItems:"center",gap:".5rem",color:"rgba(255,255,255,.6)",fontSize:".88rem"}}><i className="ti ti-map-pin"/>Australia — worldwide</span></li>
        </ul></div>
      </div>
      <div className="footer-bottom">
        <p className="footer-ack">Just Joy Collective acknowledges Traditional Owners of Country throughout Australia and recognises the continuing connection to lands, waters and communities. We pay our respect to Aboriginal and Torres Strait Islander cultures and to Elders past and present.</p>
        <p className="footer-copy">© Just Joy Collective 2024</p>
      </div>
    </footer>
  );
}

function Home({ setPage }) {
  const nav=p=>{ setPage(p); window.scrollTo(0,0); };
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow fade-in"><i className="ti ti-leaf"/>Facilitation & Capacity Development</p>
          <h1 className="hero-title fade-in">Creating a more <em>just</em> and joy‑filled world</h1>
          <p className="hero-body fade-in">Just Joy Collective works with people in social justice, human rights and mission-based agencies — developing self and social awareness, process design skills, and technology for social change.</p>
          <div className="hero-actions fade-in">
            <button className="btn-primary" onClick={()=>nav("offerings")}><i className="ti ti-arrow-right"/>Explore Offerings</button>
            <button className="btn-outline" onClick={()=>nav("contact")}><i className="ti ti-message"/>Start a Conversation</button>
          </div>
        </div>
        <div className="hero-right">
          <img className="hero-img" src={IMAGES.heroBackground} alt="Just Joy Collective workshop"/>
          <div className="hero-overlay"/>
          <div className="hero-quote">
            <span className="hero-quote-mark">"</span>
            <p>Justice, peace and a joy filled world can be achieved through collaboration rather than competition, dialogue rather than debate.</p>
            <cite>— Just Joy Collective</cite>
          </div>
        </div>
      </section>

      <div className="mission-grid">
        <img className="mission-img" src={IMAGES.workshopGroup} alt="Paula and Jamie — Just Joy Collective"/>
        <div className="mission-content">
          <span className="section-label"><i className="ti ti-heart"/>Our Purpose</span>
          <h2 className="section-title">Deep conversation is where every engagement begins</h2>
          <div className="divider"/>
          <p className="section-body">We believe that strategic and sustained partnerships, a systems view and an integrated approach support better cultural shifts. Active participation and application of new learnings to personal and local contexts brings about personal and collective transformation.<br/><br/>Just Joy Collective works with faith-based communities, NGOs and NFPs, and has a personal commitment to supporting organisations working with women, girls and children in situations of marginalisation.</p>
        </div>
      </div>

      <div className="values-grid">
        {[{letter:"C",title:"Curiosity",icon:"ti-question-mark",body:"We bring genuine curiosity to every engagement — exploring together, asking deeper questions, and remaining open to what emerges from the group."},{letter:"C",title:"Compassion",icon:"ti-heart-handshake",body:"We hold space with warmth and care, recognising the courage it takes to enter genuine dialogue and the dignity of every person in the room."},{letter:"C",title:"Courage",icon:"ti-flame",body:"Transformational work asks us to step into the unknown together. We walk alongside groups with courage, holding both the challenge and the possibility."}].map(v=>(
          <div className="value-card" key={v.title} data-letter={v.letter}>
            <i className={`ti ${v.icon} value-icon`}/>
            <h3>{v.title}</h3><p>{v.body}</p>
          </div>
        ))}
      </div>

      <video className="img-strip" src="/video-stones.mp4" autoPlay muted loop playsInline style={{objectFit:"cover",objectPosition:"center",display:"block"}}/>

      <div className="testimonials-bg">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <span className="section-label"><i className="ti ti-quote"/>What Participants Say</span>
          <h2 className="section-title">Words from the room</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t,i)=><div className="testimonial-card" key={i}><p>{t.quote}</p></div>)}
          </div>
        </div>
      </div>

      <div className="cta-band">
        <h2>Ready to start a <em>conversation</em>?</h2>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
          <button className="btn-primary" onClick={()=>nav("offerings")}><i className="ti ti-package"/>View Offerings</button>
          <button className="btn-outline-white" onClick={()=>nav("contact")}><i className="ti ti-mail"/>Contact Us</button>
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

function Offerings({ setPage }) {
  const nav=p=>{ setPage(p); window.scrollTo(0,0); };
  return (
    <div className="page">
      <div className="offerings-hero">
        <img className="offerings-hero-img" src={IMAGES.workshopRoom} alt="Workshop"/>
        <div className="offerings-hero-overlay"/>
        <div className="offerings-hero-content">
          <span className="section-label" style={{color:"rgba(255,255,255,.6)"}}><i className="ti ti-package"/>What We Offer</span>
          <h1>Capacity Development<br/>Workshops & Services</h1>
          <p>Both online and face-to-face facilitation services, process design consulting, and sustained capacity development programs. All programs are uniquely designed to achieve your goals.</p>
        </div>
      </div>
      <div className="offerings-grid">
        {OFFERINGS.map((o,i)=>(
          <div className="offering-card" key={o.id}>
            <img className={o.imgClass} src={IMAGES[o.img]} alt={o.title}/>
            <div className="offering-body">
              <span className="offering-number"><i className={`ti ${o.icon}`}/>{String(i+1).padStart(2,"0")} — {o.short}</span>
              <h2>{o.title}</h2>
              <div style={{marginBottom:"1rem"}}>{o.tags.map(t=><span className="offering-tag" key={t}><i className="ti ti-tag" style={{fontSize:"10px"}}/>{t}</span>)}</div>
              <p>{o.body}</p>
              <button className="offering-enquire" onClick={()=>nav("contact")}><i className="ti ti-arrow-right"/>Enquire about this offering</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cta-band">
        <h2>All programs designed <em>uniquely</em> for your goals</h2>
        <button className="btn-primary" onClick={()=>nav("contact")}><i className="ti ti-message"/>Start a Conversation</button>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

function About({ setPage }) {
  const nav=p=>{ setPage(p); window.scrollTo(0,0); };
  return (
    <div className="page">
      <div className="about-hero">
        <img className="about-hero-img" src={IMAGES.workshopRoom} alt="Facilitation workshop"/>
        <div className="about-hero-overlay"/>
        <div className="about-hero-content">
          <span className="section-label"><i className="ti ti-users"/>Who We Are</span>
          <h1>The Facilitators</h1>
          <div className="divider"/>
          <p>Just Joy Collective is built on decades of experience in education, leadership, facilitation and technology — united by a shared belief that a more just and joy-filled world is possible through genuine dialogue and collaboration.</p>
        </div>
      </div>

      <div className="about-mission">
        <h2>Our Way<br/>of Being</h2>
        <div>
          <p>Our guiding principles of Curiosity, Compassion and Courage underpin the participatory way in which we work and the way we engage others.</p>
          <p>We believe that justice, peace and a joy-filled world can be achieved through collaboration rather than competition, dialogue rather than debate. Creating and supporting learning communities of practice expands the initial work we offer through our workshops.</p>
          <p>Just Joy Collective works with faith-based communities, NGOs and NFPs, and has a personal commitment to supporting organisations in developing countries with a focus on women, girls and children in situations of marginalisation.</p>
        </div>
      </div>

      <div className="team-section">
        <span className="section-label"><i className="ti ti-id-badge"/>Meet the Team</span>
        <h2 className="section-title">Paula & Jamie Sgherza</h2>
        <div className="divider"/>
        <div className="team-grid">
          {[
            { name:"Paula Sgherza", img:IMAGES.paula, role:"Co-founder · Process Facilitator", linkedin:"https://www.linkedin.com/in/paula-sgherza-6750aa3b/", linkedinLabel:"Connect with Paula", paras:[
              "Paula loves facilitation. It is her joy to be of service to others in this creative and essential work for leaders of today and the future.",
              "She brings over 30 years' experience as an educator and leader and is highly regarded for her relaxed, contemplative and innovative style.",
              "Paula is trained in the Art of Hosting, Theory U, Theory of Change, Appreciative Inquiry, Open Space and the Circle Way. She applies a trauma-informed approach to all her work."
            ]},
            { name:"Jamie Sgherza", img:IMAGES.jamie, role:"Co-founder · Technology & Facilitation", linkedin:"https://www.linkedin.com/in/jamiesgherza/", linkedinLabel:"Connect with Jamie", paras:[
              "Jamie loves technology. He brings a wealth of experience from diverse leadership roles across complex education and information technology settings.",
              "As a skilled leader, educator and facilitator, Jamie creates dynamic environments that encourage personal and professional growth — known for his easy-going, action-oriented style.",
              "Jamie has trained in Theory U, Theory of Change and project management, and has wide experience assisting organisations with digital transformation."
            ]},
          ].map(m=>(
            <div className="team-card" key={m.name}>
              <div className="team-photo-col">
                <img className="team-photo" src={m.img} alt={m.name}/>
              </div>
              <div className="team-content team-member">
                <h2>{m.name}</h2>
                <span className="role"><i className="ti ti-star"/>{m.role}</span>
                {m.paras.map((p,i)=><p key={i}>{p}</p>)}
                <a href={m.linkedin} className="linkedin-link" target="_blank" rel="noreferrer"><i className="ti ti-brand-linkedin"/>{m.linkedinLabel} on LinkedIn</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-band">
        <h2>Let's work <em>together</em></h2>
        <button className="btn-primary" onClick={()=>nav("contact")}><i className="ti ti-mail"/>Get in Touch</button>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

function Events({ setPage }) {
  const nav=p=>{ setPage(p); window.scrollTo(0,0); };
  return (
    <div className="page">
      <div className="events-hero">
        <span className="section-label" style={{color:"rgba(255,255,255,.55)"}}><i className="ti ti-calendar"/>Upcoming Events</span>
        <h1>Join Us</h1>
        <p>Workshops, gatherings and learning opportunities with Just Joy Collective. Register your interest and we'll be in touch when something is scheduled near you.</p>
      </div>
      <div className="events-empty">
        <i className="ti ti-plant events-empty-icon"/>
        <h2>No upcoming events scheduled</h2>
        <p>We're currently planning our next round of workshops and programs. Reach out — we may be able to bring something to your organisation.</p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-primary" onClick={()=>nav("contact")}><i className="ti ti-mail"/>Register Your Interest</button>
          <button className="btn-outline" onClick={()=>nav("offerings")}><i className="ti ti-package"/>View All Offerings</button>
        </div>
      </div>
      <img className="img-strip" src={IMAGES.workshopRoom} alt="Just Joy Collective workshop"/>
      <div className="testimonials-bg">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <span className="section-label"><i className="ti ti-quote"/>What Participants Say</span>
          <h2 className="section-title">Words from past workshops</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t,i)=><div className="testimonial-card" key={i}><p>{t.quote}</p></div>)}
          </div>
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

function Contact({ setPage }) {
  const [form,setForm]=useState({name:"",email:"",organisation:"",service:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const [loading,setLoading]=useState(false);
  const onChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const onSubmit=e=>{ e.preventDefault(); setLoading(true); setTimeout(()=>{ setLoading(false); setSubmitted(true); },1200); };
  return (
    <div className="page">
      <div className="contact-layout">
        <div className="contact-left">
          <span className="section-label" style={{color:"rgba(255,255,255,.55)"}}><i className="ti ti-mail"/>Get in Touch</span>
          <h1>Let's start a <em>conversation</em></h1>
          <p>All of our programs are designed uniquely to achieve your goals. We'd love to hear about your organisation and what you're hoping to create together.</p>
          <div className="contact-detail"><i className="ti ti-mail"/><a href="mailto:justjoycollective@gmail.com">justjoycollective@gmail.com</a></div>
          <div className="contact-detail"><i className="ti ti-brand-linkedin"/><a href="https://www.linkedin.com/in/just-joy-collective-7132a8237/" target="_blank" rel="noreferrer">Just Joy Collective on LinkedIn</a></div>
          <div className="contact-detail"><i className="ti ti-map-pin"/><span>Australia — serving organisations worldwide</span></div>
        </div>
        <div className="contact-right">
          {submitted ? (
            <div className="form-success"><i className="ti ti-circle-check"/><h3>Thank you</h3><p>Your message has been received. We'll be in touch soon to start the conversation.</p></div>
          ) : (
            <>
              <h2>Send us a message</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group"><label><i className="ti ti-user"/>Your name *</label><input name="name" type="text" required value={form.name} onChange={onChange} placeholder="Your name"/></div>
                <div className="form-group"><label><i className="ti ti-mail"/>Email address *</label><input name="email" type="email" required value={form.email} onChange={onChange} placeholder="your@email.com"/></div>
                <div className="form-group"><label><i className="ti ti-building"/>Organisation</label><input name="organisation" type="text" value={form.organisation} onChange={onChange} placeholder="Your organisation"/></div>
                <div className="form-group"><label><i className="ti ti-list"/>Area of interest</label>
                  <select name="service" value={form.service} onChange={onChange}>
                    <option value="">Select an offering...</option>
                    {OFFERINGS.map(o=><option key={o.id} value={o.title}>{o.title}</option>)}
                    <option value="General enquiry">General enquiry</option>
                  </select>
                </div>
                <div className="form-group"><label><i className="ti ti-message"/>Your message *</label><textarea name="message" required value={form.message} onChange={onChange} placeholder="Tell us about your organisation and what you're hoping to achieve..."/></div>
                <button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center"}} disabled={loading}>
                  {loading?<><i className="ti ti-loader"/>Sending...</>:<><i className="ti ti-send"/>Send Message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  const pages={home:<Home setPage={setPage}/>,offerings:<Offerings setPage={setPage}/>,about:<About setPage={setPage}/>,events:<Events setPage={setPage}/>,contact:<Contact setPage={setPage}/>};
  return (<><style>{css}</style><Nav page={page} setPage={setPage}/>{pages[page]}</>);
}
