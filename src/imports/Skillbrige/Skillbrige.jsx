import React, { useLayoutEffect, useState } from "react";
import skillbridgeHome from "./skillbridgeHome.jpeg";
import skillbridgeAi from "./skillbridgeAi.jpeg";
import skillbridgeDigitalMarketing from "./skillbridgeDigitalMarketing.jpeg";
import skillbridgeDataAnalytics from "./skillbridgeDataAnalytics.jpeg";
import skillbridgeCollege from "./skillbridgeCollege.jpeg";

const skillbridgeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SkillBridge by iMED Academy — Where Learning Meets Employability</title>
<meta name="description" content="On-campus workshops in AI, Digital Marketing & Data Analytics for B.Com, BBA, BCA & MBA students. ₹50,000 per module. By iMED Academy." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
:root{
  --teal:#0E8C7A;
  --teal-deep:#0A6E60;
  --teal-dark:#064D43;
  --teal-light:#E6F5F2;
  --teal-glow:#D0F0EA;
  --navy:#0F2137;
  --navy-soft:#163050;
  --navy-deep:#0A1626;
  --gold:#F2B53A;
  --gold-warm:#FFC94D;
  --coral:#EF5A3C;
  --cream:#FAFAF6;
  --cream-warm:#F4F1E8;
  --white:#fff;
  --text:#0E1F1D;
  --text-soft:#2A3D3A;
  --muted:#5F766F;
  --line:#D4E5E0;
  --line-light:#E8F0ED;
  --shadow-sm:0 2px 8px rgba(14,140,122,.06);
  --shadow-md:0 12px 36px rgba(14,140,122,.10);
  --shadow-lg:0 28px 56px rgba(14,140,122,.14);
  --shadow-navy:0 20px 50px rgba(15,33,55,.18);
  --display:'Inter',sans-serif;
  --body:'Inter',sans-serif;
  --mono:'JetBrains Mono',monospace;
  --fs-body:18px;
  --fs-lead:20px;
  --fw-regular:400;
  --fw-medium:500;
  --fw-semibold:600;
  --fw-bold:700;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  font-family:var(--body);
  font-size:var(--fs-body);
  font-weight:var(--fw-regular);
  color:var(--text);
  background:var(--white);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
img{max-width:100%;display:block;}
a{color:inherit;text-decoration:none;}
em{font-style:normal;}
button{font-family:inherit;cursor:pointer;border:none;background:none;}
::selection{background:var(--teal-glow);color:var(--navy);}
.container{width:min(1260px,90%);margin:0 auto;}

/* --- TOPBAR --- */
.topbar{
  background:var(--navy);color:rgba(255,255,255,.85);
  font-size:13.5px;padding:10px 0;font-weight:500;
}
.topbar .container{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;}
.topbar a{color:var(--gold);font-weight:600;transition:color .2s;}
.topbar a:hover{color:var(--gold-warm);}
.topbar .dot{display:inline-block;width:4px;height:4px;background:var(--teal);border-radius:50%;margin:0 10px;vertical-align:middle;}
.topbar-right{display:flex;align-items:center;gap:6px;}
.topbar-right .contact-item{display:inline-flex;align-items:center;gap:6px;}
.topbar-right .contact-item svg{width:14px;height:14px;stroke:#ffb020;stroke-width:1.9;fill:none;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}

/* --- NAV --- */
header{
  position:sticky;top:0;z-index:50;
  background:rgba(255,255,255,.92);
  backdrop-filter:blur(16px);
  border-bottom:1px solid var(--line-light);
}
nav{display:flex;align-items:center;justify-content:space-between;padding:16px 0;gap:20px;}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
.brand-mark{
  width:44px;height:44px;
  display:grid;place-items:center;
  background:transparent;
  border:none;border-radius:10px;
  padding:0;overflow:hidden;
  transition:transform .25s;
}
.brand-mark img{width:100%;height:100%;object-fit:cover;}
.brand-copy{display:flex;flex-direction:column;line-height:1;}
.brand-title{
  font-family:var(--display);
  font-size:28px;
  line-height:38px;
  font-weight:700;
  color:var(--navy);
  letter-spacing:-.02em;
}
.brand-subtitle{
  margin-top:3px;
  font-family:var(--body);
  font-size:10px;
  line-height:11px;
  font-weight:700;
  letter-spacing:.09em;
  color:#6f7f7a;
}
.brand:hover .brand-mark{transform:scale(1.04);}
.nav-toggle{
  display:none;
  width:42px;height:42px;
  border:1.5px solid var(--line);
  border-radius:10px;
  background:var(--white);
  color:var(--navy);
  align-items:center;justify-content:center;
}
.nav-toggle .bars{
  position:relative;display:block;width:18px;height:2px;background:currentColor;border-radius:2px;
}
.nav-toggle .bars::before,.nav-toggle .bars::after{
  content:'';position:absolute;left:0;width:18px;height:2px;background:currentColor;border-radius:2px;
}
.nav-toggle .bars::before{top:-6px;}
.nav-toggle .bars::after{top:6px;}
.nav-links{display:flex;gap:28px;align-items:center;font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--text-soft);}
.nav-links a{position:relative;padding:6px 0;transition:color .2s;}
.nav-links a:hover{color:var(--teal);}
.nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--teal);transition:width .3s;}
.nav-links a:hover::after{width:100%;}
.nav-links .btn{
  padding:10px 18px;
  line-height:1.1;
}
.nav-links .btn::after{display:none;}

/* --- BUTTONS --- */
.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 24px;border-radius:10px;
  font-weight:var(--fw-semibold);font-size:var(--fs-body);
  transition:all .22s cubic-bezier(.2,.8,.2,1);
  white-space:nowrap;border:1.5px solid transparent;
}
.btn-primary{background:var(--teal);color:var(--white);border-color:var(--teal);box-shadow:0 8px 24px rgba(14,140,122,.22);}
.btn-primary:hover{background:var(--teal-deep);transform:translateY(-2px);box-shadow:0 14px 32px rgba(14,140,122,.28);}
.btn-outline{background:transparent;color:var(--navy);border-color:var(--line);}
.btn-outline:hover{background:var(--navy);color:var(--white);border-color:var(--navy);}
.btn-dark{background:var(--navy);color:var(--white);border-color:var(--navy);}
.btn-dark:hover{background:var(--navy-deep);transform:translateY(-2px);box-shadow:var(--shadow-navy);}
.btn-gold{background:var(--gold);color:var(--navy);border-color:var(--gold);}
.btn-gold:hover{background:var(--gold-warm);transform:translateY(-2px);}
.btn-white{background:var(--white);color:var(--navy);border-color:var(--white);}
.btn-white:hover{background:var(--cream);transform:translateY(-2px);}
.btn-lg{padding:16px 30px;font-size:15.5px;border-radius:12px;}
.arrow{display:inline-block;transition:transform .25s;}
.btn:hover .arrow{transform:translateX(4px);}

/* --- HERO --- */
.hero{
  position:relative;
  display:grid;
  grid-template-columns:43.3% 56.7%;
  align-items:start;
  column-gap:32px;
  padding:43px 85px 28px 85px;
  min-height:616px;
  height:auto;
}
.pill{
  display:inline-flex;
  align-items:center;
  gap:11px;
  height:43px;
  border:1px solid #e4ecf3;
  border-radius:999px;
  padding:0 17px;
  background:rgba(255,255,255,.9);
  box-shadow:0 8px 24px rgba(7,24,50,.04);
  font-size:14px;
  font-weight:800;
  margin-bottom:38px;
}
.pill i{
  width:10px;
  height:10px;
  background:var(--teal);
  border-radius:50%;
  box-shadow:0 0 0 6px rgba(4,153,132,.12);
}
.title{
  margin:0 0 22px 0;
  font-size:64px;
  line-height:1.055;
  letter-spacing:-3.8px;
  font-weight:900;
}
.grad{
  display:block;
  background:linear-gradient(90deg,#049984 0%,#063f86 88%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.copy{
  font-size:19px;
  line-height:1.72;
  color:#42546f;
  font-weight:500;
  width:585px;
  margin:0 0 35px;
}
.btns{display:flex;gap:27px;}
.hero .btn{height:56px;border-radius:8px;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:12px;}
.hero .btn.primary{width:253px;border:0;background:linear-gradient(135deg,#069c8d,#057a70);color:#fff;box-shadow:0 13px 25px rgba(5,122,112,.2);}
.hero .btn.secondary{width:232px;background:#fff;border:1px solid #dce6ee;color:#071832;box-shadow:0 12px 23px rgba(7,24,50,.06);}
.grid{width:20px;height:20px;display:grid;grid-template-columns:repeat(2,8px);gap:4px;}
.grid span{border:2px solid var(--teal);border-radius:1px;}
.visual{position:relative;padding:29px 0 0 6px;}
.dots{position:absolute;left:-72px;top:48px;width:208px;height:208px;border-radius:50%;background-image:radial-gradient(rgba(0,153,132,.45) 1.25px,transparent 1.25px);background-size:12px 12px;}
.ring{position:absolute;right:-51px;top:151px;width:259px;height:259px;border:1px solid rgba(4,153,132,.14);border-radius:50%;}
.photo{position:relative;z-index:1;width:100%;max-width:782px;height:394px;border:9px solid #fff;border-radius:24px;background:#fff;box-shadow:0 20px 42px rgba(7,24,50,.13);overflow:hidden;}
.photo img{width:100%;height:100%;object-fit:cover;display:block;}
.float{position:absolute;left:-20px;bottom:16px;width:266px;height:78px;border-radius:15px;background:#071b39;color:#fff;display:flex;align-items:center;gap:16px;padding:17px;box-shadow:0 18px 32px rgba(7,24,50,.28);z-index:3;}
.float .circle{width:47px;height:47px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;color:#fff;}
.float h3{margin:0;font-size:15px;line-height:1.38;font-weight:800;}
.stats{position:relative;z-index:3;width:100%;max-width:826px;height:94px;background:#fff;border:1px solid #e7edf4;border-radius:17px;box-shadow:0 18px 36px rgba(7,24,50,.07);margin:35px 0 0 -43px;display:grid;grid-template-columns:repeat(4,1fr);}
.stat{display:flex;align-items:center;justify-content:center;gap:17px;position:relative;}
.stat:not(:last-child)::after{content:"";position:absolute;right:0;width:1px;height:49px;background:#e2e9f1;}
.icon{width:47px;height:47px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e8f8f4;color:#078b7d;}
.stat:nth-child(2) .icon{background:#edf4ff;color:#204ac4;}
.stat:nth-child(3) .icon{background:#eaf8f1;color:#078b60;}
.stat:nth-child(4) .icon{background:#f1edff;color:#2920b5;}
.stat strong{font-size:30px;line-height:1;color:#078b7d;font-weight:900;}
.stat p{margin:6px 0 0;font-size:12.5px;font-weight:800;color:#071832;}
.svgicon{width:34px;height:34px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}

/* --- BRIDGE STRIP --- */
.bridge{padding:18px 85px 55px;background:#fff;}
.bridge h2{text-align:center;font-size:23px;font-weight:900;margin:0 0 39px;color:#071832;}
.bridge h2 span{color:#049984;}
.features{display:grid;grid-template-columns:repeat(4,1fr);gap:58px;}
.feature{display:grid;grid-template-columns:66px 1fr;gap:18px;}
.box{width:65px;height:65px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:#eaf5ff;color:#1a55b2;}
.feature:nth-child(2) .box{background:#e8f7eb;color:#087b43;}
.feature:nth-child(3) .box{background:#edf4ff;color:#1a55b2;}
.feature:nth-child(4) .box{background:#f3edff;color:#2e21b5;}
.feature h3{font-size:15px;margin:1px 0 11px;font-weight:900;color:#071832;}
.feature p{margin:0;font-size:14px;line-height:1.58;color:#43546d;font-weight:500;}

/* --- MARQUEE --- */
.marquee{
  background:var(--navy);color:#25a88d;
  padding:20px 0;overflow:hidden;
  border-top:1px solid rgba(255,255,255,.08);
  border-bottom:1px solid rgba(255,255,255,.08);
}
.marquee-track{
  display:flex;gap:40px;white-space:nowrap;
  animation:scroll 35s linear infinite;
  font-family:var(--display);font-style:normal;
  font-size:20px;font-weight:500;letter-spacing:-.01em;
}
.marquee-track span{display:inline-flex;align-items:center;gap:32px;}
.marquee-track .sep{width:6px;height:6px;background:var(--teal);border-radius:50%;flex-shrink:0;}
@keyframes scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

/* --- SECTION BASE --- */
section.s{padding:100px 0;}
.section-head{margin-bottom:48px;}
.section-head.center{text-align:center;max-width:760px;margin-left:auto;margin-right:auto;margin-bottom:48px;}
.section-eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--display);font-size:20px;font-weight:700;
  letter-spacing:0;text-transform:none;color:var(--teal);
  margin-bottom:16px;
}
.section-eyebrow .line{width:28px;height:2px;background:var(--teal);}
.section-title{
  font-family:var(--display);
  font-size:40px;
  line-height:48px;letter-spacing:0;
  color:var(--navy);font-weight:700;
  margin-bottom:16px;
}
.section-title em{font-style:normal;color:var(--teal);}
.section-sub{font-size:20px;font-weight:400;color:var(--muted);line-height:32.5px;max-width:777px;}
.section-head.center .section-sub{margin:0 auto;}

/* --- WHY SECTION --- */
.why{background:var(--cream);}
.why-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;
}
.why-card{
  background:var(--white);border:1px solid var(--line);
  border-radius:20px;padding:32px 28px;
  transition:all .3s;position:relative;overflow:hidden;
}
.why-card:hover{background:var(--teal-light);border-color:var(--line);}
.why-card .num{
  font-family:var(--display);font-style:normal;
  font-size:54px;line-height:.8;color:var(--teal-light);
  font-weight:400;margin-bottom:18px;
  transition:color .3s;
}
.why-card:hover .num{color:var(--teal);}
.why-card .icon{
  width:48px;height:48px;border-radius:12px;
  background:var(--teal-light);
  display:grid;place-items:center;
  margin-bottom:18px;
}
.why-card .icon svg{width:24px;height:24px;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.why-card .icon-academics{background:#eef4ff;}
.why-card .icon-placement{background:#e9fbf4;}
.why-card .icon-upskill{background:#fff6e9;}
.why-card h3{
  font-family:var(--display);font-size:24px;font-weight:400;
  letter-spacing:-.015em;margin-bottom:10px;color:var(--navy);
  line-height:1.15;
}
.why-card p{font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--muted);line-height:1.55;}

/* --- MODULES --- */
.modules{background:var(--white);}
.mod-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:22px;
}
.mod-card{
  background:var(--cream);border:1.5px solid var(--line);
  border-radius:24px;padding:0;overflow:hidden;
  transition:all .3s;display:flex;flex-direction:column;
}
.mod-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:var(--teal);}
.mod-card.featured{background:linear-gradient(160deg,var(--navy),var(--teal-dark));color:var(--white);border-color:var(--navy);}
.mod-card.featured:hover{border-color:var(--gold);}

.mod-img{height:200px;overflow:hidden;position:relative;}
.mod-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.mod-card:hover .mod-img img{transform:scale(1.05);}
.mod-img .mod-badge{
  position:absolute;top:14px;left:14px;
  padding:6px 12px;border-radius:100px;
  font-family:var(--mono);font-size:10.5px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;
  background:var(--white);color:var(--teal-deep);
}
.mod-card.featured .mod-img .mod-badge{background:var(--gold);color:var(--navy);}

.mod-body{padding:26px 24px;display:flex;flex-direction:column;flex-grow:1;}
.mod-meta{
  font-family:var(--mono);font-size:11.5px;font-weight:500;
  color:var(--muted);letter-spacing:.04em;margin-bottom:12px;
}
.mod-card.featured .mod-meta{color:rgba(255,255,255,.6);}
.mod-card h3{
  font-family:var(--display);font-size:28px;font-weight:400;
  letter-spacing:-.02em;margin-bottom:10px;color:var(--navy);line-height:1.1;
}
.mod-card.featured h3{color:var(--white);}
.mod-card > .mod-body > p{font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--muted);margin-bottom:18px;line-height:1.5;}
.mod-card.featured > .mod-body > p{color:rgba(255,255,255,.7);}

.mod-list{list-style:none;margin-bottom:24px;flex-grow:1;}
.mod-list li{
  padding:9px 0 9px 22px;font-size:var(--fs-body);font-weight:var(--fw-regular);line-height:1.45;
  color:var(--text-soft);position:relative;
  border-bottom:1px solid var(--line-light);
}
.mod-card.featured .mod-list li{color:rgba(255,255,255,.85);border-color:rgba(255,255,255,.1);}
.mod-list li:last-child{border-bottom:none;}
.mod-list li::before{content:'→';position:absolute;left:0;color:var(--teal);font-weight:700;font-size:13px;}
.mod-card.featured .mod-list li::before{color:var(--gold);}

.mod-price-row{
  display:flex;align-items:baseline;gap:10px;
  padding-top:18px;border-top:1px solid var(--line);
  margin-top:auto;
}
.mod-card.featured .mod-price-row{border-color:rgba(255,255,255,.15);}
.mod-price{font-family:var(--display);font-style:normal;font-size:34px;color:var(--teal-deep);font-weight:400;line-height:1;}
.mod-card.featured .mod-price{color:var(--gold);}
.mod-price-strike{font-size:15px;color:var(--muted);text-decoration:line-through;font-weight:500;}
.mod-card.featured .mod-price-strike{color:rgba(255,255,255,.5);}
.mod-offer{
  padding:4px 10px;background:var(--gold);color:var(--navy);
  border-radius:100px;font-size:11px;font-weight:800;
  letter-spacing:.04em;
}

/* --- PRICING --- */
.pricing{background:var(--cream);}
.price-grid{
  display:grid;grid-template-columns:1fr 1.2fr;gap:24px;
  align-items:stretch;
}
.price-card{
  background:var(--white);border:1.5px solid var(--line);
  border-radius:24px;padding:40px 36px;
  display:flex;flex-direction:column;
  transition:all .3s;position:relative;
}
.price-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.price-card.hero-card{
  background:linear-gradient(150deg,var(--navy),var(--teal-dark));
  color:var(--white);border-color:var(--navy);
  box-shadow:var(--shadow-navy);
}
.price-card.hero-card:hover{transform:translateY(-6px);box-shadow:0 32px 64px rgba(15,33,55,.25);}
.price-card .badge{
  position:absolute;top:14px;right:18px;
  padding:6px 16px;background:var(--gold);color:var(--navy);
  border-radius:100px;font-size:11.5px;font-weight:800;
  letter-spacing:.06em;text-transform:uppercase;
  white-space:nowrap;
}
.pc-strike-wrap{display:flex;align-items:center;gap:10px;}
.pc-eyebrow{
  font-family:var(--mono);font-size:11.5px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted);margin-bottom:14px;
}
.price-card.hero-card .pc-eyebrow{color:var(--gold);}
.pc-title{
  font-family:var(--display);font-size:36px;font-weight:400;
  line-height:1.05;letter-spacing:-.02em;margin-bottom:8px;color:var(--navy);
}
.price-card.hero-card .pc-title{color:var(--white);font-size:42px;font-style:normal;}
.pc-desc{font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--muted);margin-bottom:24px;line-height:1.5;}
.price-card.hero-card .pc-desc{color:rgba(255,255,255,.7);}

.pc-price-block{margin-bottom:28px;}
.pc-strike{
  font-family:var(--display);font-size:22px;
  color:var(--muted);position:relative;display:inline-block;
  margin-bottom:6px;font-style:normal;
}
.pc-deal{
  display:inline-flex;align-items:center;
  padding:4px 10px;border-radius:999px;
  background:#20c997;color:#062a24;
  font-family:var(--mono);font-size:11px;font-weight:700;
  letter-spacing:.05em;text-transform:uppercase;
}
.pc-strike::after{
  content:'';position:absolute;top:50%;left:-3px;right:-3px;
  height:2px;background:var(--coral);transform:rotate(-3deg);
}
.price-card.hero-card .pc-strike{color:rgba(255,255,255,.45);}
.pc-amount{
  font-family:var(--display);font-style:normal;
  font-size:clamp(56px,7vw,82px);font-weight:400;
  letter-spacing:-.04em;line-height:.88;color:var(--teal-deep);
}
.price-card.hero-card .pc-amount{color:var(--gold);}
.pc-amount .cur{font-size:.4em;font-family:var(--body);font-style:normal;font-weight:500;vertical-align:.55em;}
.pc-per{
  font-family:var(--mono);font-size:11.5px;font-weight:500;
  letter-spacing:.06em;text-transform:uppercase;
  color:var(--muted);margin-top:10px;
}
.price-card.hero-card .pc-per{color:rgba(255,255,255,.6);}

.pc-list{list-style:none;flex-grow:1;margin-bottom:28px;}
.pc-list li{
  padding:12px 0;font-size:var(--fs-body);font-weight:var(--fw-regular);line-height:1.45;
  border-bottom:1px solid var(--line-light);
  display:flex;gap:12px;align-items:flex-start;
  color:var(--text-soft);
}
.price-card.hero-card .pc-list li{border-color:rgba(255,255,255,.12);color:rgba(255,255,255,.9);}
.pc-list li:last-child{border-bottom:none;}
.pc-list li::before{
  content:'✓';color:var(--teal);font-weight:800;flex-shrink:0;font-size:14px;margin-top:1px;
}
.price-card.hero-card .pc-list li::before{color:var(--gold);}
.pc-list li strong{font-weight:700;}

.pc-btn{width:100%;justify-content:center;text-align:center;}

.price-note{
  margin-top:40px;padding:22px 28px;
  background:var(--white);border:1.5px dashed var(--teal);
  border-radius:14px;text-align:center;
  font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--text-soft);line-height:1.5;
}
.price-note strong{color:var(--teal-deep);font-weight:700;}

/* --- HOW IT WORKS --- */
.how{background:var(--white);}
.how-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;border:1.5px solid var(--line);
  border-radius:20px;overflow:hidden;
}
.how-step{
  padding:36px 28px;
  border-right:1.5px solid var(--line);
  background:var(--white);
  transition:background .3s;position:relative;
}
.how-step:hover{background:var(--teal-light);}
.how-step:last-child{border-right:none;}
.how-step .num{
  font-family:var(--display);font-style:normal;
  font-size:72px;line-height:.8;font-weight:400;
  color:var(--teal-glow);margin-bottom:18px;
  transition:color .3s;
}
.how-step:hover .num{color:var(--teal);}
.how-step h4{
  font-family:var(--display);font-size:22px;font-weight:400;
  letter-spacing:-.015em;margin-bottom:10px;line-height:1.15;
  color:var(--navy);
}
.how-step p{font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--muted);line-height:1.55;}

/* --- PARTNERSHIP SPLIT --- */
.partnership{background:var(--cream);}
.part-grid{
  display:grid;grid-template-columns:1fr 1.1fr;
  gap:48px;align-items:center;
}
.part-img{
  border-radius:24px;overflow:hidden;
  box-shadow:var(--shadow-lg);
  height:480px;position:relative;
}
.part-img img{width:100%;height:100%;object-fit:cover;object-position:100% center;transform:scaleX(-1);}
.part-img .overlay{
  position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 50%,rgba(15,33,55,.5));
}
.part-img .img-text{
  position:absolute;bottom:24px;left:24px;right:24px;
  color:var(--white);
}
.part-img .img-text h4{
  font-family:var(--display);font-style:normal;font-size:28px;
  font-weight:400;margin-bottom:6px;
}
.part-img .img-text p{font-size:var(--fs-body);font-weight:var(--fw-regular);color:rgba(255,255,255,.8);}

.part-features{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
.part-feat{
  background:var(--white);border:1px solid var(--line);
  border-radius:16px;padding:22px 20px;
  transition:all .3s;
}
.part-feat:hover{border-color:var(--teal);box-shadow:var(--shadow-sm);}
.part-feat h4{
  font-family:var(--display);font-size:19px;font-weight:400;
  color:var(--navy);margin-bottom:8px;letter-spacing:-.01em;
}
.part-feat p{font-size:13.5px;color:var(--muted);line-height:1.5;}

/* --- OUTCOMES --- */
.outcomes{background:var(--white);}
.out-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.out-card{
  border:1.5px solid var(--line);border-radius:22px;
  padding:40px 36px;background:var(--cream);
  position:relative;
}
.out-card.dark{background:var(--navy);color:var(--white);border-color:var(--navy);}
.out-card .oc-eyebrow{
  font-family:var(--mono);font-size:11px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;
  color:var(--teal-deep);margin-bottom:14px;
}
.out-card.dark .oc-eyebrow{color:var(--gold);}
.out-card h3{
  font-family:var(--display);font-size:32px;font-weight:400;
  line-height:1.05;letter-spacing:-.02em;margin-bottom:28px;
  color:var(--navy);
}
.out-card h3 em{font-style:normal;color:var(--teal);}
.out-card.dark h3{color:var(--white);}
.out-card.dark h3 em{color:var(--gold);}
.out-list{list-style:none;}
.out-list li{
  padding:16px 0;border-bottom:1px solid var(--line-light);
  display:flex;align-items:flex-start;gap:14px;
}
.out-card.dark .out-list li{border-color:rgba(255,255,255,.12);}
.out-list li:last-child{border-bottom:none;}
.out-list .ok{
  color:var(--teal);font-weight:800;font-size:15px;
  flex-shrink:0;margin-top:2px;
}
.out-card.dark .out-list .ok{color:var(--gold);}
.out-li-text{font-size:var(--fs-body);font-weight:var(--fw-regular);line-height:1.5;color:var(--text-soft);}
.out-li-text strong{display:block;font-weight:var(--fw-bold);color:var(--navy);margin-bottom:4px;font-size:var(--fs-body);}
.out-card.dark .out-li-text{color:rgba(255,255,255,.8);}
.out-card.dark .out-li-text strong{color:var(--white);}

/* --- TESTIMONIALS --- */
.testimonials{background:var(--navy);color:var(--white);}
.testimonials .section-eyebrow{color:var(--gold);}
.testimonials .section-eyebrow .line{background:var(--gold);}
.testimonials .section-title{color:var(--white);}
.testimonials .section-title em{color:var(--gold);}
.testimonials .section-sub{color:rgba(255,255,255,.65);}
.t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.t-card{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);
  border-radius:20px;padding:30px 26px;
  display:flex;flex-direction:column;
  backdrop-filter:blur(8px);
  transition:all .3s;
}
.t-card:hover{background:var(--teal);color:var(--white);border-color:var(--teal);}
.t-card.feature{background:rgba(255,255,255,.04);color:inherit;border-color:rgba(255,255,255,.12);}
.t-card.feature:hover{background:var(--teal);color:var(--white);border-color:var(--teal);}
.t-mark{
  font-family:var(--display);font-style:normal;font-size:64px;
  line-height:.5;color:var(--gold);margin-bottom:14px;
}
.t-card.feature .t-mark{color:var(--gold);}
.t-text{
  font-family:var(--display);font-style:normal;font-size:19px;
  line-height:1.35;letter-spacing:-.01em;font-weight:400;
  color:rgba(255,255,255,.9);margin-bottom:28px;flex-grow:1;
}
.t-card.feature .t-text{color:rgba(255,255,255,.9);font-size:19px;}
.t-foot{
  padding-top:16px;border-top:1px solid rgba(255,255,255,.15);
  display:flex;align-items:center;gap:12px;
}
.t-card.feature .t-foot{border-color:rgba(255,255,255,.15);}
.t-av{
  width:42px;height:42px;border-radius:50%;
  background:linear-gradient(135deg,var(--gold),var(--teal));
  flex-shrink:0;
  overflow:hidden;
}
.t-av img{width:100%;height:100%;object-fit:cover;display:block;}
.t-card.feature .t-av{background:linear-gradient(135deg,var(--navy),var(--teal-dark));}
.t-name{font-family:var(--display);font-size:16px;font-weight:400;color:var(--white);}
.t-role{font-family:var(--mono);font-size:10.5px;color:rgba(255,255,255,.55);letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}

/* --- FAQ --- */
.faq{background:var(--cream);}
.faq-layout{
  display:grid;grid-template-columns:1fr 2fr;
  gap:60px;align-items:flex-start;
}
.faq-list{display:flex;flex-direction:column;gap:0;border-top:1.5px solid var(--navy);}
.faq-item{
  border-bottom:1.5px solid var(--line);
  transition:background .25s;
}
.faq-item:hover{background:var(--cream-warm);}
.faq-item summary{
  list-style:none;padding:22px 0;cursor:pointer;
  font-family:var(--display);font-size:22px;font-weight:400;
  letter-spacing:-.015em;color:var(--navy);
  display:flex;justify-content:space-between;align-items:center;gap:20px;
}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-marker{
  font-family:var(--display);font-style:normal;font-size:28px;
  color:var(--teal);flex-shrink:0;transition:transform .3s;line-height:.8;
}
.faq-item[open] .faq-marker{transform:rotate(45deg);}
.faq-answer{
  padding:0 0 22px;font-size:var(--fs-body);font-weight:var(--fw-regular);color:var(--muted);
  line-height:1.6;max-width:700px;
}
.faq-answer strong{color:var(--text);font-weight:700;}

/* --- CTA --- */
.cta{
  padding:100px 0;
  background:linear-gradient(160deg,var(--navy),var(--teal-dark));
  color:var(--white);position:relative;overflow:hidden;
}
.cta::before{
  content:'';position:absolute;top:-100px;right:-100px;
  width:500px;height:500px;
  background:radial-gradient(circle,rgba(242,181,58,.15),transparent 65%);
}
.cta-inner{
  position:relative;z-index:1;
  max-width:880px;margin:0 auto;text-align:center;
}
.cta h2{
  font-family:var(--display);font-style:normal;font-weight:400;
  font-size:clamp(44px,6vw,80px);
  line-height:.92;letter-spacing:-.035em;
  color:var(--white);margin-bottom:22px;
}
.cta h2 em{color:var(--gold);}
.cta p{
  font-size:19px;color:rgba(255,255,255,.7);
  max-width:620px;margin:0 auto 36px;line-height:1.55;
}
.cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:48px;}
.cta-meta{
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
  padding-top:36px;border-top:1px solid rgba(255,255,255,.15);
  max-width:720px;margin:0 auto;
}
.cta-meta .cm{text-align:center;}
.cta-meta .cm-label{
  font-family:var(--mono);font-size:10.5px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.5);margin-bottom:6px;
}
.cta-meta .cm-val{
  font-family:var(--display);font-style:normal;font-size:16px;
  color:var(--gold);font-weight:400;
}

/* --- FOOTER --- */
footer{
  background:linear-gradient(160deg,#0b5a4f 0%, #123567 55%, #152857 100%);
  color:rgba(255,255,255,.86);
  padding:64px 0 24px;
}
.footer-top{
  display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;
  gap:40px;padding-bottom:34px;
  border-bottom:1px solid rgba(255,255,255,.18);
}
.footer-brand{margin-bottom:18px;display:flex;flex-direction:column;gap:16px;}
.footer-brand .brand{gap:10px;}
.footer-brand .brand-mark{
  width:44px;height:44px;
  padding:0;border:none;border-radius:10px;background:transparent;
}
.footer-tagline{font-size:15px;color:rgba(255,255,255,.92);font-weight:500;}
.footer-social{display:flex;gap:10px;margin-top:18px;}
.footer-social a{
  width:35px;height:35px;border-radius:999px;
  background:#fff;border:none;
  display:grid;place-items:center;color:#25a88d;
  transition:transform .2s, box-shadow .2s;
}
.footer-social a:hover{
  transform:translateY(-1px);
  box-shadow:0 6px 14px rgba(0,0,0,.18);
}
.footer-social a svg{width:14px;height:14px;}
.footer-col h5{
  font-family:var(--body);font-size:20px;font-weight:600;
  letter-spacing:0;text-transform:none;
  margin-bottom:14px;color:#25a88d;
}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.footer-col a{font-size:18px;font-weight:400;color:rgba(255,255,255,.96);transition:color .2s;}
.footer-col a:hover{color:#46ecd5;}
.footer-bottom{
  padding-top:18px;display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;gap:12px;font-size:14px;font-weight:400;color:rgba(255,255,255,.72);
}
.footer-bottom strong{color:#25a88d;font-weight:700;}

/* --- ANIMATIONS --- */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
.hero .title,.hero .copy,.hero .btns{animation:fadeUp .8s cubic-bezier(.2,.8,.2,1) both;}
.hero .copy{animation-delay:.08s;}
.hero .btns{animation-delay:.16s;}

/* --- RESPONSIVE --- */
@media(max-width:1800px){
  .container{width:min(1220px,88%);}
  .title{font-size:54px;}
  .photo{max-width:660px;}
  .stats{max-width:700px;margin:26px 0 0 0;}
  .copy{font-size:18px;line-height:1.62;width:540px;}
  .hero{padding-left:45px;padding-right:45px;}
  .bridge{padding-left:45px;padding-right:45px;}
}
@media(max-width:1450px){
  .hero{grid-template-columns:42% 58%;column-gap:24px;padding-left:36px;padding-right:36px;}
  .title{font-size:50px;letter-spacing:-3px;}
  .copy{width:500px;font-size:17px;line-height:1.58;}
  .photo{max-width:620px;height:360px;}
  .stats{max-width:620px;margin:22px 0 0 0;}
  .stat strong{font-size:26px;}
}
@media(max-width:1024px){
  .hero{grid-template-columns:1fr;min-height:0;height:auto;padding:34px 20px 24px;}
  .copy{width:100%;}
  .visual{padding:24px 0 0 0;}
  .photo{width:100%;height:auto;aspect-ratio:782/394;}
  .stats{width:100%;max-width:none;margin:20px 0 0 0;}
  .bridge{padding:20px 20px 42px;}
  .bridge h2{font-size:23px;}
  .features{grid-template-columns:1fr 1fr;gap:18px;}
  .feature h3{font-size:15px;}
  .feature p{font-size:14px;}
  .price-grid,.part-grid,.out-grid,.faq-layout{grid-template-columns:1fr;gap:36px;}
  .mod-grid,.why-grid,.t-grid{grid-template-columns:1fr;}
  .how-grid{grid-template-columns:1fr 1fr;border-radius:16px;}
  .how-step{border-bottom:1.5px solid var(--line);}
  .how-step:nth-child(2n){border-right:none;}
  .footer-top{grid-template-columns:1fr;}
  .cta-meta{grid-template-columns:1fr 1fr;}
  nav{flex-wrap:wrap;justify-content:space-between;gap:12px;}
  .nav-toggle{display:inline-flex;}
  .nav-links{
    display:none;
    width:100%;
    order:3;
    flex-direction:column;
    align-items:flex-start;
    gap:14px;
    white-space:normal;
    padding:8px 0 4px;
  }
  .nav-links.open{display:flex;}
  .nav-links .btn{margin-top:4px;}
  .part-features{grid-template-columns:1fr;}
}
@media(max-width:640px){
  nav{padding:14px 0;}
  .nav-links{
    font-size:15px;
    gap:12px;
  }
  .nav-links .btn{
    padding:8px 14px;
    font-size:14px;
  }
  .brand-title{font-size:28px;line-height:30px;}
  .brand-subtitle{font-size:9px;line-height:10px;letter-spacing:.08em;}
  .title{font-size:42px;line-height:1.08;letter-spacing:-2px;}
  .btns{gap:12px;flex-direction:column;}
  .hero .btn.primary,.hero .btn.secondary{width:100%;}
  .stats{grid-template-columns:1fr 1fr;height:auto;}
  .stat{padding:12px 8px;}
  .stat strong{font-size:24px;}
  .bridge h2{font-size:23px;}
  .features{grid-template-columns:1fr;}
  .feature h3{font-size:15px;}
  .feature p{font-size:14px;}
  .section-title{font-size:34px;line-height:42px;}
  .section-sub{font-size:18px;line-height:29px;}
  .section-eyebrow{font-size:18px;}
  section.s{padding:70px 0;}
  .how-grid{grid-template-columns:1fr;border-radius:14px;}
  .how-step{border-right:none;}
  .footer-top{grid-template-columns:1fr;}
  .cta{padding:70px 0;}
  .cta-meta{grid-template-columns:1fr 1fr;}
  .out-card,.price-card{padding:30px 24px;}
}
</style>
</head>
<body>

<!-- --- TOPBAR --- -->
<div class="topbar">
  <div class="container">
    <span>SkillBridge is an employability vertical inside <strong style="color:var(--gold)">iMED Academy</strong></span> <a href="#offer">Introductory offer: ₹50K per module →</a></span>
    <div class="topbar-right">
      <span class="contact-item">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.8 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6.1 6.1l1.4-1.4a2 2 0 0 1 2.1-.5c.9.4 1.8.7 2.7.8A2 2 0 0 1 22 16.9Z"></path>
        </svg>
        <a href="tel:+919266790357">+91 92667 90357</a>
      </span>
      <span class="dot"></span>
      <span class="contact-item">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="m3 7 9 7 9-7"></path>
        </svg>
        <a href="mailto:contact@imedacademy.in">contact@imedacademy.in</a>
      </span>
    </div>
  </div>
</div>

<!-- --- NAV --- -->
<header>
  <div class="container">
    <nav>      <a class="brand" href="/" target="_top">
        <span class="brand-mark"><img src="/favicon.png" alt="SkillBridge icon" /></span>
        <span class="brand-copy">
          <span class="brand-title">SkillBridge</span>
          <span class="brand-subtitle">BY iMED ACADEMY</span>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="skillbridge-nav-menu"><span class="bars"></span></button>
      <div class="nav-links" id="skillbridge-nav-menu">
        <a href="#modules">Modules</a>
        <a href="#offer">Pricing</a>
        <a href="#outcomes">For Colleges</a>
        <a href="#how">Process</a>
        <a href="#faq">FAQ</a>
        <a href="#contact" class="btn btn-primary">Partner With Us <span class="arrow">→</span></a>
      </div>
    </nav>
  </div>
</header>

<!-- --- HERO --- -->
<section class="hero">
  <div>
    <div class="pill"><i></i>On-campus upskilling for colleges</div>
    <h1 class="title">SkillBridge.<span class="grad">Skills Today.</span><span class="grad"><span class="careers-animated" data-word="Careers Tomorrow.">Careers Tomorrow.</span></span></h1>
    <p class="copy">SkillBridge by iMED Academy delivers industry-led workshops in AI, Digital Marketing, and Data Analytics on college campuses—helping students gain real-world skills and become career-ready before they graduate.</p>
    <div class="btns">
      <a href="#contact" class="btn primary">Book a College Demo →</a>
      <a href="#modules" class="btn secondary"><span class="grid"><span></span><span></span><span></span><span></span></span>Explore Modules</a>
    </div>
  </div>
  <div class="visual">
    <div class="dots"></div>
    <div class="ring"></div>
    <div class="photo">
      <img src="${skillbridgeHome}" alt="SkillBridge campus workshop" />
      <div class="float">
        <div class="circle">
          <svg class="svgicon" viewBox="0 0 24 24">
            <path d="M3 8l9-4 9 4-9 4-9-4z"></path>
            <path d="M6 10v5c3 2 9 2 12 0v-5"></path>
          </svg>
        </div>
        <h3>Industry-led learning<br>on your campus</h3>
      </div>
    </div>
    <div class="stats">
      <div class="stat">
        <div class="icon">
          <svg class="svgicon" viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="3"></circle>
            <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5"></path>
            <circle cx="17" cy="10" r="2"></circle>
          </svg>
        </div>
        <div><strong>30+</strong><p>Workshops</p></div>
      </div>
      <div class="stat">
        <div class="icon">
          <svg class="svgicon" viewBox="0 0 24 24">
            <path d="M7 19c3-1 4-3 4-6V7"></path>
            <path d="M15 7v5c0 3 1 5 4 7"></path>
            <circle cx="12" cy="5" r="2"></circle>
          </svg>
        </div>
        <div><strong>3</strong><p>Core Domains</p></div>
      </div>
      <div class="stat">
        <div class="icon">
          <svg class="svgicon" viewBox="0 0 24 24">
            <path d="M4 5c3-1 5-1 8 1v14c-3-2-5-2-8-1V5z"></path>
            <path d="M12 6c3-2 5-2 8-1v14c-3-1-5-1-8 1V6z"></path>
          </svg>
        </div>
        <div><p>Colleges Partnered</p></div>
      </div>
      <div class="stat">
        <div class="icon">
          <svg class="svgicon" viewBox="0 0 24 24">
            <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"></path>
            <path d="M9 12l2 2 4-5"></path>
          </svg>
        </div>
        <div><strong>100%</strong><p>Career Focused</p></div>
      </div>
    </div>
  </div>
</section>

<section class="bridge">
  <h2>Bridging the Gap Between <span>Education</span> and <span>Employment</span></h2>
  <div class="features">
    <div class="feature">
      <div class="box">
        <svg class="svgicon" viewBox="0 0 24 24">
          <circle cx="8" cy="8" r="3"></circle>
          <path d="M2 20c1-4 3-6 6-6s5 2 6 6"></path>
          <circle cx="17" cy="9" r="2.5"></circle>
          <path d="M15 15c3 .2 5 2 6 5"></path>
        </svg>
      </div>
      <div>
        <h3>Industry-Relevant Curriculum</h3>
        <p>Designed with industry experts to match real-world demands.</p>
      </div>
    </div>
    <div class="feature">
      <div class="box">
        <svg class="svgicon" viewBox="0 0 24 24">
          <path d="M4 21V7l8-4 8 4v14"></path>
          <path d="M9 21v-6h6v6"></path>
          <path d="M8 9h1M12 9h1M16 9h1M8 13h1M16 13h1"></path>
        </svg>
      </div>
      <div>
        <h3>On-Campus Delivery</h3>
        <p>We come to your campus and deliver hands-on learning.</p>
      </div>
    </div>
    <div class="feature">
      <div class="box">
        <svg class="svgicon" viewBox="0 0 24 24">
          <path d="M4 14c2-5 6-5 8 0s6 5 8 0"></path>
          <path d="M4 18c2-5 6-5 8 0s6 5 8 0"></path>
        </svg>
      </div>
      <div>
        <h3>Practical & Hands-On</h3>
        <p>Work on real projects, case studies, and tools used in the industry.</p>
      </div>
    </div>
    <div class="feature">
      <div class="box">
        <svg class="svgicon" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M9 13l-2 8 5-3 5 3-2-8"></path>
          <path d="M10 8l1.5 1.5L15 6"></path>
        </svg>
      </div>
      <div>
        <h3>Certification & Career Boost</h3>
        <p>Earn certificates, build portfolios, and stand out in the job market.</p>
      </div>
    </div>
  </div>
</section>

<!-- --- MARQUEE --- -->
<div class="marquee">
  <div class="marquee-track">
    <span>Where Learning Meets Employability.<i class="sep"></i>₹50K Not ₹90K<i class="sep"></i>AI · Digital Marketing · Data Analytics<i class="sep"></i>Placement Included<i class="sep"></i>No Fluff. No Filler.<i class="sep"></i></span>
    <span>Where Learning Meets Employability.<i class="sep"></i>₹50K Not ₹90K<i class="sep"></i>AI · Digital Marketing · Data Analytics<i class="sep"></i>Placement Included<i class="sep"></i>No Fluff. No Filler.<i class="sep"></i></span>
  </div>
</div>

<!-- --- WHY --- -->
<section class="s why" id="why">
  <div class="container">
    <div class="section-head">
      <div class="section-eyebrow"><span class="line"></span> The Reality</div>
      <h2 class="section-title">Degrees alone aren't <em>recruiter-ready.</em></h2>
      <p class="section-sub">Your BBA/BCom/BCA syllabus was written before ChatGPT existed. Recruiters expect AI fluency, data literacy, and digital marketing basics from every hire. Your students don't get that in class.</p>
    </div>
    <div class="why-grid">
      <div class="why-card">
        <div class="num">01</div>
        <div class="icon icon-academics" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" stroke="#2f5bd3"></path>
            <path d="M7 11.5V15c0 .7 2.2 2 5 2s5-1.3 5-2v-3.5" stroke="#2f5bd3"></path>
            <path d="M21 10v4" stroke="#2f5bd3"></path>
          </svg>
        </div>
        <h3>Curriculum lag is real.</h3>
        <p>College syllabi haven't caught up with what employers actually hire for. The gap between classroom and interview room is widening every semester.</p>
      </div>
      <div class="why-card">
        <div class="num">02</div>
        <div class="icon icon-placement" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 19V5" stroke="#14966f"></path>
            <path d="M4 19h16" stroke="#14966f"></path>
            <path d="m7 8 4 4 3-3 4 4" stroke="#14966f"></path>
          </svg>
        </div>
        <h3>Placement % is under pressure.</h3>
        <p>NAAC, NIRF, NBA — every accreditation now scrutinizes placement outcomes. A weak placement record affects rankings, admissions, and brand value.</p>
      </div>
      <div class="why-card">
        <div class="num">03</div>
        <div class="icon icon-upskill" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 18h6" stroke="#d48806"></path>
            <path d="M10 21h4" stroke="#d48806"></path>
            <path d="M12 3a6 6 0 0 0-3.8 10.6c.7.6 1.3 1.4 1.5 2.4h4.6c.2-1 .8-1.8 1.5-2.4A6 6 0 0 0 12 3Z" stroke="#d48806"></path>
          </svg>
        </div>
        <h3>Generic upskilling doesn't stick.</h3>
        <p>Free online courses produce near-zero completion. What works: structured, on-campus, instructor-led workshops with assessment and certification.</p>
      </div>
    </div>
  </div>
</section>

<!-- --- MODULES --- -->
<section class="s modules" id="modules">
  <div class="container">
    <div class="section-head center">
      <div class="section-eyebrow"><span class="line"></span> The Three Modules</div>
      <h2 class="section-title">Three skills every <em>graduate needs</em> in 2026.</h2>
      <p class="section-sub">Each module is a practical 30-hour workshop with certification, portfolio project, and industry-led delivery.</p>
    </div>

    <div class="mod-grid">
      <div class="mod-card">
        <div class="mod-img">
          <img src="${skillbridgeAi}" alt="AI tools workshop" />
          <div class="mod-badge">Most In-Demand</div>
        </div>
        <div class="mod-body">
          <div class="mod-meta">30 hours · Hands-on learning</div>
          <h3>AI Tools for Productivity</h3>
          <p>Universal AI skills for every student stream — from prompt engineering to workflow automation.</p>
          <ul class="mod-list">
            <li>ChatGPT, Gemini, Claude — prompt mastery</li>
            <li>AI-built resumes, LinkedIn & interview prep</li>
            <li>NotebookLM, Perplexity, Gamma for research</li>
            <li>Excel Copilot, Notion AI, Zapier automation</li>
            <li><strong>Capstone:</strong> Personal AI productivity stack</li>
          </ul>
          <div class="mod-price-row">
            <span class="mod-price">₹50,000</span>
            <span class="mod-price-strike">₹90,000</span>
            <span class="mod-offer">44% OFF</span>
          </div>
        </div>
      </div>

      <div class="mod-card featured">
        <div class="mod-img">
          <img src="${skillbridgeDigitalMarketing}" alt="Digital marketing workshop" />
          <div class="mod-badge">Bestseller</div>
        </div>
        <div class="mod-body">
          <div class="mod-meta">30 hours · Live campaign</div>
          <h3>Digital Marketing Essentials</h3>
          <p>Best for BBA, B.Com & MBA students entering sales and growth roles.</p>
          <ul class="mod-list">
            <li>Marketing fundamentals, funnels, customer journey</li>
            <li>SEO + keyword research + on-page audit</li>
            <li>Instagram + LinkedIn content strategy</li>
            <li>Meta Ads + Google Ads with real ₹500 spend</li>
            <li>GA4 + Meta insights — recruiter-valued analytics</li>
            <li><strong>Capstone:</strong> Live ad campaign + reporting</li>
          </ul>
          <div class="mod-price-row">
            <span class="mod-price">₹50,000</span>
            <span class="mod-price-strike">₹90,000</span>
            <span class="mod-offer">44% OFF</span>
          </div>
        </div>
      </div>

      <div class="mod-card">
        <div class="mod-img">
          <img src="${skillbridgeDataAnalytics}" alt="Data analytics workshop" />
          <div class="mod-badge">Recruiter Favorite</div>
        </div>
        <div class="mod-body">
          <div class="mod-meta">30 hours · Real datasets</div>
          <h3>Data Analytics: Excel + Power BI</h3>
          <p>Best for B.Com, MBA & BCA students entering analyst and finance roles.</p>
          <ul class="mod-list">
            <li>Excel mastery — formulas, lookups, pivots</li>
            <li>Data cleaning & analysis with real datasets</li>
            <li>Power BI — connect, model, visualize, deliver</li>
            <li>DAX basics + advanced calculated measures</li>
            <li>Data storytelling — numbers into decisions</li>
            <li><strong>Capstone:</strong> End-to-end business dashboard</li>
          </ul>
          <div class="mod-price-row">
            <span class="mod-price">₹50,000</span>
            <span class="mod-price-strike">₹90,000</span>
            <span class="mod-offer">44% OFF</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- --- PRICING --- -->
<section class="s pricing" id="offer">
  <div class="container">
    <div class="section-head center">
      <div class="section-eyebrow"><span class="line"></span> The Founding Offer</div>
      <h2 class="section-title">Two ways <em>in.</em></h2>
      <p class="section-sub">College pays. Students train. Outcomes follow. Pick what fits your placement budget — both priced under what you'd spend on a single recruitment drive.</p>
    </div>

    <div class="price-grid">
      <div class="price-card">
        <div class="pc-eyebrow">Pick Any One Module</div>
        <h3 class="pc-title">Single Module</h3>
        <p class="pc-desc">One workshop. One certificate. One portfolio project per student.</p>

        <div class="pc-price-block">
          <div class="pc-strike-wrap">
            <div class="pc-strike">₹90,000</div>
            <span class="pc-deal">44% OFF</span>
          </div>
          <div class="pc-amount"><span class="cur">₹</span>50,000</div>
          <div class="pc-per">Per module · per college · on-campus delivery</div>
        </div>

        <ul class="pc-list">
          <li>Choose any <strong>1 of 3</strong> flagship modules</li>
          <li><strong>30 hours</strong> of live, instructor-led training</li>
          <li>iMED-verified certificate + LinkedIn badge</li>
          <li>1 portfolio project per student</li>
          <li>Pre & post assessment reports</li>
          <li>Co-branded marketing material</li>
        </ul>

        <a href="#contact" class="btn btn-dark pc-btn">Lock This In <span class="arrow">→</span></a>
      </div>

      <div class="price-card hero-card">
        <span class="badge">✓ Best Value</span>
        <div class="pc-eyebrow">The Campus Pro Stack</div>
        <h3 class="pc-title">All Three + Placement Assist</h3>
        <p class="pc-desc">All 3 modules with placement assistance by iMED Academy.</p>

        <div class="pc-price-block">
          <div class="pc-strike-wrap">
            <div class="pc-strike">₹2,70,000</div>
            <span class="pc-deal">50% OFF</span>
          </div>
          <div class="pc-amount"><span class="cur">₹</span>1,35,000</div>
          <div class="pc-per">All 3 modules · 90 hours · placement assistance</div>
        </div>

        <ul class="pc-list">
          <li><strong>All 3 modules</strong> — AI + Marketing + Analytics</li>
          <li><strong>90 hours</strong> of training across one semester</li>
          <li>Triple certification — one per module</li>
          <li>3 portfolio projects per student</li>
          <li>2 industry guest lectures</li>
          <li><strong>Placement Assistance by iMED</strong> — direct shortlist into hiring partner network</li>
          <li>Founder visit + kick-off ceremony</li>
          <li>Annual renewal pricing locked for 2027</li>
        </ul>

        <a href="#contact" class="btn btn-gold pc-btn">Book College Demo <span class="arrow">→</span></a>
      </div>
    </div>

    <div class="price-note">
      <strong>Introductory partnership pricing is available for early college partners.</strong> Payment: 50% advance on signing · 50% on Day 1 of workshop.
    </div>
  </div>
</section>

<!-- --- HOW IT WORKS --- -->
<section class="s how" id="how">
  <div class="container">
    <div class="section-head center">
      <div class="section-eyebrow"><span class="line"></span> How It Works</div>
      <h2 class="section-title">First call to first workshop — <em>21 days.</em></h2>
      <p class="section-sub">Built for placement cells that don't have time for procurement marathons.</p>
    </div>

    <div class="how-grid">
      <div class="how-step">
        <div class="num">01</div>
        <h4>Discovery Call</h4>
        <p>30 minutes with your placement officer. We map student needs, semester calendar, and accreditation goals.</p>
      </div>
      <div class="how-step">
        <div class="num">02</div>
        <h4>Free Demo on Campus</h4>
        <p>A 2-hour sample workshop delivered free at your college. Principal, faculty, and students see it live.</p>
      </div>
      <div class="how-step">
        <div class="num">03</div>
        <h4>MoU Signed</h4>
        <p>Simple MoU. Package selected. 50% advance. Dates locked. Trainer assigned within 7 days.</p>
      </div>
      <div class="how-step">
        <div class="num">04</div>
        <h4>Workshop Live</h4>
        <p>30 hours of practical training. Trainer on campus. Certificates issued within 14 days of completion.</p>
      </div>
    </div>
  </div>
</section>

<!-- --- PARTNERSHIP --- -->
<section class="s partnership" id="partnership">
  <div class="container">
    <div class="part-grid">
      <div class="part-img">
        <img src="${skillbridgeCollege}" alt="Trainer interacting with college students" />
        <div class="overlay"></div>
        <div class="img-text">
          <h4>Working professionals. Not career coaches.</h4>
          <p>Every workshop taught by someone who does it for a living.</p>
        </div>
      </div>
      <div>
        <div class="section-head">
          <div class="section-eyebrow"><span class="line"></span> Why Colleges Choose Us</div>
          <h2 class="section-title">Zero operational lift. <em>Maximum impact.</em></h2>
          <p class="section-sub">We bring the trainers, content, assessment, and certification. Your team books a hall. That's it.</p>
        </div>
        <div class="part-features">
          <div class="part-feat">
            <h4>Campus delivery</h4>
            <p>We send the trainer and full kit. No travel for students. No online dropout problem.</p>
          </div>
          <div class="part-feat">
            <h4>Industry-led trainers</h4>
            <p>PMs, marketers, analysts — not lecturers. Students learn how tools are used to make money.</p>
          </div>
          <div class="part-feat">
            <h4>Portfolio-based assessment</h4>
            <p>Real projects: live campaigns, working dashboards, AI stacks. Interview-ready assets.</p>
          </div>
          <div class="part-feat">
            <h4>iMED placement network</h4>
            <p>Top performers shortlisted directly into iMED's 40+ active employer partner network.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- --- OUTCOMES --- -->
<section class="s outcomes" id="outcomes">
  <div class="container">
    <div class="section-head center">
      <div class="section-eyebrow"><span class="line"></span> Outcomes</div>
      <h2 class="section-title">Two sides of the win. <em>One workshop.</em></h2>
    </div>

    <div class="out-grid">
      <div class="out-card">
        <div class="oc-eyebrow">For the College</div>
        <h3>Placement narrative that <em>moves rankings.</em></h3>
        <ul class="out-list">
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>NAAC, NIRF & NBA-friendly proof.</strong>Documented industry workshops, verified attendance, employer-recognised certifications. Audit-ready.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Better placement percentages.</strong>Students enter interviews with portfolio projects, not just CGPA.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Zero operational lift.</strong>We bring trainers, content, assessment, certification. You book a hall.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Brand association with iMED Academy.</strong>1,000+ placements across 40+ partners.</div>
          </li>
        </ul>
      </div>

      <div class="out-card dark">
        <div class="oc-eyebrow">For the Student</div>
        <h3>Skills, certificate, portfolio. <em>All in 30 hours.</em></h3>
        <ul class="out-list">
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Industry-grade fluency.</strong>Real tools, real workflows, real campaigns. Not theoretical chapters.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>iMED-verified certificate.</strong>QR-authenticated. LinkedIn-shareable. Verifiable in 5 seconds.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Portfolio project.</strong>Live ad campaign · working dashboard · AI workflow — assets for interviews.</div>
          </li>
          <li>
            <span class="ok">✓</span>
            <div class="out-li-text"><strong>Direct placement assistance.</strong>Top performers from Campus Pro stack get shortlisted into iMED network.</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- --- TESTIMONIALS --- -->
<section class="s testimonials">
  <div class="container">
    <div class="section-head">
      <div class="section-eyebrow"><span class="line"></span> What Partners Say</div>
      <h2 class="section-title">Built on trust. Backed by <em>proof.</em></h2>
      <p class="section-sub">From iMED Academy — 1,000+ placed students and 40+ employer partners. SkillBridge inherits the same standard.</p>
    </div>

    <div class="t-grid">
      <div class="t-card feature">
        <div class="t-mark">"</div>
        <div class="t-text">iMED's placement track record is what made us trust SkillBridge from day one. The trainers were exactly what they promised — working professionals, not college lecturers reading slides. Our students are visibly more confident in interviews now.</div>
        <div class="t-foot">
          <div class="t-av"><img src="https://i.pravatar.cc/80?img=12" alt="Akhil Menon" /></div>
          <div>
            <div class="t-name">Akhil Menon</div>
            <div class="t-role">Placement Officer</div>
          </div>
        </div>
      </div>
      <div class="t-card">
        <div class="t-mark">"</div>
        <div class="t-text">I did the Digital Marketing workshop in my final semester. The live ad campaign I ran is the only thing my recruiter spent twenty minutes on. Got the offer two days later.</div>
        <div class="t-foot">
          <div class="t-av"><img src="https://i.pravatar.cc/80?img=32" alt="Keerthana Nair" /></div>
          <div>
            <div class="t-name">Keerthana Nair</div>
            <div class="t-role">Final Year BBA Student</div>
          </div>
        </div>
      </div>
      <div class="t-card">
        <div class="t-mark">"</div>
        <div class="t-text">I'd done plenty of online courses. None stayed with me. The Power BI workshop was different — by the end I had a real dashboard and something tangible for my resume.</div>
        <div class="t-foot">
          <div class="t-av"><img src="https://i.pravatar.cc/80?img=7" alt="Harishankar Iyer" /></div>
          <div>
            <div class="t-name">Harishankar Iyer</div>
            <div class="t-role">MBA Student  Finance</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- --- FAQ --- -->
<section class="s faq" id="faq">
  <div class="container">
    <div class="faq-layout">
      <div class="section-head">
        <div class="section-eyebrow"><span class="line"></span> FAQ</div>
        <h2 class="section-title">Questions placement officers <em>actually ask.</em></h2>
        <p class="section-sub" style="margin-top:14px;">Direct answers. If yours isn't here, we reply within 24 hours.</p>
        <br>
        <a href="#contact" class="btn btn-primary">Ask Us Directly <span class="arrow">→</span></a>
      </div>
      <div class="faq-list">
        <details class="faq-item">
          <summary>How is this different from Coursera, UpGrad, Internshala? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">Those platforms ship videos and hope students finish. We send <strong>working professionals to your campus</strong>, run live sessions, force completion via assessment, and only issue certificates on actual outcomes. Their completion: ~7%. Ours: 95%+.</div>
        </details>
        <details class="faq-item">
          <summary>Are the certificates recognised by employers? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">iMED Academy is recognised across <strong>40+ hospital and corporate partners</strong>. SkillBridge certificates carry QR-authenticated verification, are LinkedIn-shareable, and any recruiter can verify in 5 seconds.</div>
        </details>
        <details class="faq-item">
          <summary>What does "Placement Assistance by iMED" include? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">Only included with the <strong>₹1.5L Campus Pro Stack</strong>. Top performers (top 30%) get direct shortlist into iMED's hiring partner network — 40+ active employers. Warm intros, interview prep, shortlist priority. Not a guarantee — real assistance, measurable outcomes.</div>
        </details>
        <details class="faq-item">
          <summary>What if students don't attend regularly? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">75% minimum attendance required for certification — same standard your college applies. Attendance is digitally tracked and reported weekly to your placement cell.</div>
        </details>
        <details class="faq-item">
          <summary>Can we customize the workshops? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">Flagship topics are standardised for delivery consistency. But <strong>capstone projects and case studies are tailored</strong> — B.Com gets finance datasets, BBA gets marketing cases, BCA gets technical projects, MBA gets strategy briefs.</div>
        </details>
        <details class="faq-item">
          <summary>Who is this introductory offer for? <span class="faq-marker">+</span></summary>
          <div class="faq-answer">Quality control during launch. 5 founding partners in Bangalore for 2026 get founding-partner pricing <strong>locked in for life</strong>, priority placement access, and co-branded case studies. After 5 are signed, regular rates apply.</div>
        </details>
        <details class="faq-item">
          <summary>What's the payment structure? <span class="faq-marker">+</span></summary>
          <div class="faq-answer"><strong>50% advance on MoU signing.</strong> 50% on Day 1 of workshop. Clean, simple, non-negotiable — protects the trainer-side commitments we make to deliver to your campus.</div>
        </details>
      </div>
    </div>
  </div>
</section>

<!-- --- CTA --- -->
<section class="cta" id="contact">
  <div class="container">
    <div class="cta-inner">
      <h2>Bring SkillBridge to <em>your campus.</em></h2>
      <p>A 2-hour sample workshop delivered free on your campus. Your placement team, principal, and students see SkillBridge in action — and decide for themselves.</p>
      <div class="cta-actions">
        <a href="mailto:contact@imedacademy.in?subject=SkillBridge College Partnership Enquiry" class="btn btn-gold btn-lg">Email for Partnership <span class="arrow">→</span></a>
        <a href="tel:+919266790357" class="btn btn-white btn-lg">Call +91 92667 90357</a>
      </div>
      <div class="cta-meta">
        <div class="cm">
          <div class="cm-label">Email</div>
          <div class="cm-val">contact@imedacademy.in</div>
        </div>
        <div class="cm">
          <div class="cm-label">Phone</div>
          <div class="cm-val">+91 92667 90357</div>
        </div>
        <div class="cm">
          <div class="cm-label">Office</div>
          <div class="cm-val">Bangalore · Kochi · Delhi</div>
        </div>
        <div class="cm">
          <div class="cm-label">Response</div>
          <div class="cm-val">Within 24 hours</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- --- FOOTER --- -->
<footer>
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="brand" target="_top">
          <span class="brand-mark"><img src="/favicon.png" alt="SkillBridge icon" /></span>
          <span class="brand-copy">
            <span class="brand-title" style="color:#ffffff;">SkillBridge</span>
            <span class="brand-subtitle" style="color:rgba(255,255,255,.74);">BY IMED ACADEMY</span>
          </span>
        </a>
        <p class="footer-tagline">Educate. Equip. Employ.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/imed_academy_/?fbclid=IwY2xjawRhEjJleHRuA2FlbQIxMQBicmlkETE2YTZTZWMwVkpnTnBueDlNc3J0YwZhcHBfaWQBMAABHtQKnEn3xPSCpWGVechsClKv5s90Gqvqv4WFolT0Ae-hvnagmTedAqkxCNoZ_aem_9xl0yX6vqRemofRGlIchGQ" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></a>
          <a href="https://www.linkedin.com/company/imed-academy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="https://youtube.com/@imedacademy-m5l?si=uiQHuizBdA9_3cGe" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Modules</h5>
        <ul>
          <li><a href="#modules">AI Tools</a></li>
          <li><a href="#modules">Digital Marketing</a></li>
          <li><a href="#modules">Data Analytics</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>For Colleges</h5>
        <ul>
          <li><a href="#outcomes">Why Partner</a></li>
          <li><a href="#offer">Pricing</a></li>
          <li><a href="#how">Process</a></li>
          <li><a href="#contact">Book Demo</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="#why">About iMED</a></li>
          <li><a href="#partnership">Trainers</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#faq">Privacy & Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 SkillBridge by iMED Academy. All rights reserved.</span>
      <span>A vertical of <strong>iMED Academy</strong> · Educate · Equip · Employ</span>
    </div>
  </div>
</footer>

<script>
// Lazy/decode non-critical images to reduce initial rendering cost.
document.querySelectorAll('.mod-img img, .part-img img').forEach(function(img){
  img.loading = 'lazy';
  img.decoding = 'async';
});

// Use one delegated handler instead of attaching listeners to every anchor.
document.addEventListener('click', function(e){
  var link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if(!link) return;
  var target = link.getAttribute('href');
  if(!target || target === '#') return;
  var el = document.querySelector(target);
  if(!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if(history && history.replaceState){
    history.replaceState(null, '', target);
  }
});
</script>

</body>
</html>`;

let cachedParsedSkillbridge = null;

function parseSkillbridgeTemplate() {
  if (cachedParsedSkillbridge) return cachedParsedSkillbridge;
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return { bodyHtml: "", styles: [], links: [] };
  }

  const doc = new DOMParser().parseFromString(skillbridgeHtml, "text/html");

  // Scripts inside innerHTML do not execute reliably; we handle behavior in effect.
  doc.querySelectorAll("script").forEach((node) => node.remove());

  const styles = Array.from(doc.head.querySelectorAll("style")).map((styleEl) => styleEl.textContent || "");
  const links = Array.from(doc.head.querySelectorAll("link")).map((linkEl) => ({
    rel: linkEl.getAttribute("rel") || "",
    href: linkEl.getAttribute("href") || "",
    crossorigin: linkEl.getAttribute("crossorigin") || "",
  }));

  cachedParsedSkillbridge = {
    bodyHtml: doc.body.innerHTML || "",
    styles,
    links,
  };
  return cachedParsedSkillbridge;
}

function Skillbrige() {
  const [stylesReady, setStylesReady] = useState(false);
  const parsed = parseSkillbridgeTemplate();

  useLayoutEffect(() => {
    const animationTimers = [];
    const hasSkillbridgeStyles = Boolean(document.head.querySelector('[data-skillbridge-style="true"]'));

    parsed.links.forEach((link, index) => {
      if (!link.href || !link.rel) return;
      const marker = `skillbridge-link-${index}-${link.rel}-${link.href}`;
      if (document.head.querySelector(`link[data-skillbridge-link="${marker}"]`)) return;
      const el = document.createElement("link");
      el.rel = link.rel;
      el.href = link.href;
      if (link.crossorigin) el.crossOrigin = link.crossorigin;
      el.dataset.skillbridgeLink = marker;
      document.head.appendChild(el);
    });

    parsed.styles.forEach((cssText, index) => {
      if (!cssText) return;
      if (document.head.querySelector(`style[data-skillbridge-style-index="${index}"]`)) return;
      const style = document.createElement("style");
      style.textContent = cssText;
      style.dataset.skillbridgeStyle = "true";
      style.dataset.skillbridgeStyleIndex = String(index);
      document.head.appendChild(style);
    });
    if (hasSkillbridgeStyles || parsed.styles.length === 0 || document.head.querySelector('[data-skillbridge-style="true"]')) {
      setStylesReady(true);
    }

    const onClick = (e) => {
      const toggleBtn = e.target && e.target.closest ? e.target.closest(".nav-toggle") : null;
      if (toggleBtn) {
        const menu = document.querySelector("#skillbridge-nav-menu");
        if (!menu) return;
        const isOpen = menu.classList.toggle("open");
        toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        return;
      }

      const link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      const target = link.getAttribute("href");
      if (!target || target === "#") return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history && history.replaceState) {
        history.replaceState(null, "", target);
      }

      const menu = document.querySelector("#skillbridge-nav-menu");
      const toggle = document.querySelector(".nav-toggle");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
      }
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    };

    document.addEventListener("click", onClick);

    // Mirror previous in-template optimization for media-heavy sections.
    document.querySelectorAll(".mod-img img, .part-img img").forEach((img) => {
      img.loading = "lazy";
      img.decoding = "async";
    });

    const careersAnimatedEl = document.querySelector(".careers-animated");
    if (careersAnimatedEl) {
      const word = careersAnimatedEl.getAttribute("data-word") || "Careers Tomorrow.";
      careersAnimatedEl.textContent = "";
      const timer = window.setInterval(() => {
        const current = careersAnimatedEl.textContent || "";
        if (current.length >= word.length) {
          window.clearInterval(timer);
          return;
        }
        careersAnimatedEl.textContent = word.slice(0, current.length + 1);
      }, 90);
      animationTimers.push(timer);
    }

    return () => {
      document.removeEventListener("click", onClick);
      animationTimers.forEach((timer) => window.clearInterval(timer));
      document.head
        .querySelectorAll('style[data-skillbridge-style="true"], link[data-skillbridge-link]')
        .forEach((node) => node.remove());
      setStylesReady(false);
    };
  }, [parsed.links, parsed.styles]);

  if (!stylesReady) return null;
  return <div dangerouslySetInnerHTML={{ __html: parsed.bodyHtml }} />;
}

export default React.memo(Skillbrige);



