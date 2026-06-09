import { useEffect, useLayoutEffect, useRef, useState } from "react";
import svgPaths from "./svg-xnb1grkepi";
import imgImage1712 from "../Ocha/36b610493eb683f0e81e17848fd143c365f117fd.png";
import imgImage1740 from "./image1740.webp";
import imgImage1736 from "./image1736.webp";
import imgImage1744 from "./image1744.png";
import imgImage1728 from "./image1728.webp";
import imgImage1729 from "./image1729.webp";
import imgDownload12 from "./download12.png";
import imgImage1730 from "./image1730.png";
import imgImage1731 from "./image1731.png";
import imgAlphonsaLogo768X2001 from "./alphonsa-logo768-x2001.png";
import imgLogo1 from "./logo1.png";
import imgImage1732 from "./image1732.png";
import imgKmcims1 from "./kmcims1.png";
import imgDownload22 from "./download22.png";
import imgDmhLogo1 from "./dmh-logo1.png";
import imgLogo11 from "./logo11.png";
import imgLeoHospitalLogo1 from "./leo-hospital-logo1.png";
import imgMedia19Df1Ed29F463Db903203C85909Eb6B672B0639981 from "./media19-df1-ed29-f463-db903203-c85909-eb6-b672-b0639981.png";
import imgAfba89EcFf22455EBad85E19B591A00517581886908541 from "./afba89-ec-ff22455-ebad85-e19-b591-a00517581886908541.png";
import imgCkBirlaHospital from "./CK_Birla_Hospital_for_Women_Transparent_logo 2.png";
import imgDownload1 from "./download 1.png";
import imgDownload11 from "./download (1) 1.png";
import imgDownload2 from "./download 2.png";
import imgDownload21 from "./download (2) 1.png";
import imgRectangle7 from "./rectangle7.webp";
import imgRectangle8 from "./rectangle8.webp";
import imgRectangle9 from "./rectangle9.webp";
import imgRectangle10 from "./rectangle10.webp";
import imgRectangle11 from "./rectangle11.webp";
import imgRectangle12 from "./rectangle12.webp";
import imgRectangle156 from "./rectangle156.webp";
import imgEllipse5 from "./ellipse5.png";
import imgEllipse6 from "./ellipse6.png";
import imgEllipse7 from "./ellipse7.png";
import imgRiyaKrishnamurthy from "./riyakrishnamurthy.png";
import imgAnanya from "./ananya.png";
import imgImage1727 from "./image1727.webp";
import imgImage1718 from "./image1718.png";
import imgImage1709 from "./image1709.webp";
import imgImage1723 from "./image1723.webp";
import imgContainer from "./container.png";
import imgHomePopup from "./homepopup.jpeg";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");

const faqItems = [
  {
    question: "Can 12th pass students apply?",
    answer:
      "Yes! Both programs of iMED Academy - HA and EMT  are designed for 12th pass students. You do not need any medical background or prior experience.",
  },
  {
    question: "Is 100% placement guaranteed?",
    answer:
      "We offer 100% placement support meaning we work actively until every student is placed. Our current placement rate is 80%+. Students who maintain 75%+ attendance and complete all assessments are eligible for our full placement assistance program.",
  },
  {
    question: "What is the fee structure? Are EMIs available?",
    answer:
      "The EMT program starts from just Rs. 299/day. For the HA program (online and offline), fees vary our counsellors will share the exact structure based on your preference. Easy EMI options are available for all programs.",
  },
  {
    question: "Where are your centres located?",
    answer:
      "We have our head office and two training centres in Delhi. The HA program is also available fully online. Contact us for the exact centre addresses and batch schedules.",
  },
  {
    question: "How long does it take to get a job after joining?",
    answer:
      "Most students receive their first job offer within 45 days of completing the course. Students in our EMT program often get hired during their internship sometimes before the course even ends.",
  },
  {
    question: "Can Arts & Commerce students build a career in the healthcare field?",
    answer:"Yes. Healthcare isn't only for science students. Roles like hospital administration, billing, and patient coordination are open to Arts & Commerce students with the right training."
  },
];

type ScopeDemandSelections = {
  healthcareRole: string;
  cityTier: string;
  hospitalType: string;
  shift: string;
  experienceYears: number;
};

type SalaryBreakdown = {
  monthlyGross: number;
  monthlyMin: number;
  monthlyMax: number;
  baseMonthly: number;
  hraAllowances: number;
  annualGross: number;
  takeHomeMonthly: number;
};

const HEALTHCARE_ROLE_OPTIONS = [
  "Emergency Medical Technician",
  "Hospital Administration",
  "General Duty Assistance",
];

const CITY_TIER_OPTIONS = ["Tier 1 - Metro", "Tier 2 - Large City", "Tier 3 - Small City"];
const HOSPITAL_TYPE_OPTIONS = ["Super-speciality", "Multi-speciality", "Clinic / Standalone Hospital"];
const SHIFT_OPTIONS = ["Day Shift", "Night Shift", "Rotational Shift"];

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.75 4.88-1.28A10 10 0 1 0 12 2Zm5.67 14.45c-.24.69-1.4 1.3-1.94 1.38-.5.08-1.13.12-1.83-.1-.43-.14-.99-.32-1.7-.62-2.99-1.3-4.94-4.34-5.1-4.54-.16-.2-1.22-1.62-1.22-3.08 0-1.46.77-2.18 1.04-2.48.27-.3.59-.38.79-.38.2 0 .4 0 .57.01.18.01.42-.07.66.52.24.58.8 2.01.88 2.16.07.15.11.33.02.53-.09.2-.14.33-.28.5-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.72 1.2 1.55 1.94 1.07.95 1.98 1.25 2.25 1.39.27.14.43.12.59-.07.16-.2.68-.79.86-1.07.18-.28.36-.23.61-.14.25.09 1.58.75 1.85.88.27.13.45.2.51.31.07.11.07.63-.17 1.32Z" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.59.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.59a1 1 0 0 1-.24 1l-2.21 2.2Z" />
    </svg>
  );
}

function computeSalaryBreakdown(selection: ScopeDemandSelections): SalaryBreakdown {
  const roleBaseRangeMatrix: Record<string, Record<string, [number, number]>> = {
    "Emergency Medical Technician": {
      "Tier 1 - Metro": [22000, 35000],
      "Tier 2 - Large City": [17000, 26000],
      "Tier 3 - Small City": [14000, 20000],
    },
    "Hospital Administration": {
      "Tier 1 - Metro": [35000, 58000],
      "Tier 2 - Large City": [26000, 42000],
      "Tier 3 - Small City": [20000, 30000],
    },
    "General Duty Assistance": {
      "Tier 1 - Metro": [15000, 22000],
      "Tier 2 - Large City": [12000, 18000],
      "Tier 3 - Small City": [10000, 15000],
    },
  };

  const hospitalMultiplier: Record<string, number> = {
    "Super-speciality": 1.12,
    "Multi-speciality": 1,
    "Clinic / Standalone Hospital": 0.85,
  };

  const shiftMultiplier: Record<string, number> = {
    "Day Shift": 1,
    "Night Shift": 1.15,
    "Rotational Shift": 1.08,
  };

  const expMultiplier = (years: number) => {
    if (years <= 0) return 1;
    let multiplier = 1;
    for (let year = 1; year <= Math.min(years, 5); year += 1) {
      multiplier *= 1.1;
    }
    for (let year = 6; year <= Math.min(years, 10); year += 1) {
      multiplier *= 1.07;
    }
    return multiplier;
  };

  const [minBase, maxBase] =
    roleBaseRangeMatrix[selection.healthcareRole]?.[selection.cityTier] ?? [15000, 22000];
  const combinedMultiplier =
    (hospitalMultiplier[selection.hospitalType] ?? 1) *
    (shiftMultiplier[selection.shift] ?? 1) *
    expMultiplier(selection.experienceYears);
  const monthlyMin = minBase * combinedMultiplier;
  const monthlyMax = maxBase * combinedMultiplier;
  const monthlyGross = (monthlyMin + monthlyMax) / 2;

  const baseMonthly = Math.round(monthlyGross * 0.7);
  const hraAllowances = monthlyGross - baseMonthly;
  const annualGross = monthlyGross * 12;
  const takeHomeMonthly = Math.round(monthlyGross * 0.88);

  return {
    monthlyGross: Math.round(monthlyGross),
    monthlyMin: Math.round(monthlyMin),
    monthlyMax: Math.round(monthlyMax),
    baseMonthly,
    hraAllowances,
    annualGross: Math.round(annualGross),
    takeHomeMonthly,
  };
}

function Group34() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 h-[29px] ml-0 mt-0 relative row-1 w-[22.895px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} />
        </div>
      </div>
    </div>
  );
}

function Group35() {
  const handleHomeClick = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      data-nav-target="home"
      onClick={handleHomeClick}
      className="content-stretch flex gap-[10px] items-center leading-[0] relative shrink-0 w-[203px] cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    >
      <Group34 />
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[18px] not-italic relative shrink-0 text-[#1f3471] text-[22.992px] text-center w-[170px]">
        <span className="leading-[21px]">{`iMED `}</span>
        <span className="leading-[21px] text-[#25a88d]">Academy</span>
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="group relative shrink-0">
      <button className="group block h-[24px] relative w-[96px] cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
        <p className="pointer-events-none -translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">Program</p>
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[72%]" />
      </button>
      <div className="invisible absolute left-1/2 top-[38px] z-30 min-w-[220px] -translate-x-1/2 translate-y-1 rounded-[14px] border border-[#dce4f6] bg-[rgba(255,255,255,0.98)] p-[8px] opacity-0 shadow-[0px_14px_32px_rgba(31,52,113,0.16)] backdrop-blur-[4px] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="pointer-events-none absolute left-1/2 top-[-7px] h-[12px] w-[12px] -translate-x-1/2 rotate-45 border-l border-t border-[#dce4f6] bg-white" />
        <button
          type="button"
          data-nav-target="career-path"
          className="block w-full rounded-[10px] px-[12px] py-[10px] text-left text-[15px] font-medium text-[#333] transition-colors duration-200 hover:bg-[#eef4ff] hover:text-[#1f3471]"
        >
          Programs
        </button>
        <button
          type="button"
          data-nav-target="imed-online"
          className="block w-full rounded-[10px] px-[12px] py-[10px] text-left text-[15px] font-medium text-[#333] transition-colors duration-200 hover:bg-[#eef4ff] hover:text-[#1f3471]"
        >
          Online Programs
        </button>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[118px]">
      <button data-nav-target="trusted-partners" className="group -translate-x-1/2 absolute block font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[59px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
        <p className="pointer-events-none leading-[24px] transition-colors duration-200 hover:text-[#1f3471]">Our Partners</p>
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[82%]" />
      </button>
    </div>
  );
}

function Frame21() {
  return (
    <button data-nav-target="about-imed" className="group block h-[24px] relative shrink-0 w-[109px] cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
      <p className="pointer-events-none -translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[54.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">About Us</p>
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[78%]" />
    </button>
  );
}

function FrameBlogs() {
  return (
    <button data-nav-target="blogs" className="group block h-[24px] relative shrink-0 w-[64px] cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
      <p className="pointer-events-none -translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">Blogs</p>
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[75%]" />
    </button>
  );
}

function Frame22() {
  return (
    <button data-nav-target="contact-us" className="group block h-[24px] relative shrink-0 w-[95px] cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
      <p className="pointer-events-none -translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[47.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">Contact Us</p>
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function FrameSkillbridge() {
  return (
    <button className="group block h-[24px] relative shrink-0 w-[96px] cursor-pointer transition-colors duration-200 hover:text-[#1f3471]">
      <p className="pointer-events-none -translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[48px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">Skillbridge</p>
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function AnimatedAchievement() {
  const word = "Achievement";
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timer = window.setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= word.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-block align-baseline bg-clip-text bg-gradient-to-r from-[#25a88d] text-[transparent] to-[#1f3471] whitespace-nowrap">
      {word.slice(0, visibleCount)}
    </span>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[26px] items-center justify-center relative shrink-0 w-[700px]">
      <Frame18 />
      <Frame20 />
      <Frame21 />
      <FrameBlogs />
      <Frame22 />
      <FrameSkillbridge />
    </div>
  );
}

function Button() {
  return (
    <div data-nav-target="contact-us" className="bg-[#25a88d] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function NavBar() {
  return (
    <div className="bg-white flex h-[72px] items-center justify-between overflow-visible px-[68px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] w-[1440px]" data-name="Nav Bar">
      <Group35 />
      <Frame23 />
      <Button />
    </div>
  );
}

function Frame166() {
  return (
    <div className="relative shrink-0 size-[17px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Frame 2095585796">
          <rect fill="var(--fill-0, #25A88D)" fillOpacity="0.1" height="17" rx="8.5" width="17" />
          <circle cx="8.5" cy="8.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 10" r="6.5" />
          <circle cx="8.5" cy="8.5" fill="var(--fill-0, #25A88D)" id="Ellipse 9" r="4.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame165() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <Frame166 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[32.5px] not-italic relative shrink-0 text-[#25a88d] text-[16px] text-justify whitespace-nowrap">India's Career Launchpad</p>
    </div>
  );
}

function Frame160() {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[15px] py-[5px] relative rounded-[inherit] size-full">
        <Frame165 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#25a88d] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame161() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame160 />
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[179px] min-w-full not-italic relative shrink-0 text-[#333] text-[75px] w-[min-content]">
        <span className="block leading-[90px]">From Aspiration</span>
        <span className="flex items-baseline gap-[10px] leading-[90px]">
          <span className="inline-block leading-[90px]">to</span>
          <AnimatedAchievement />
        </span>
      </p>
    </div>
  );
}

function Frame162() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[627px]">
      <Frame161 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] not-italic relative shrink-0 text-[#192138] text-[18px] text-justify w-[458px]">Practical training. Industry Skills. Real Opportunities. We prepare you for the roles that shape your Future</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#25a88d] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px] cursor-pointer">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[50px] relative rounded-[12px] shrink-0 w-[210px] cursor-pointer">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[#25a88d] text-[18px] whitespace-nowrap">Talk to Expert</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#25a88d] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame163() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame26 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[20px] w-[min-content] whitespace-pre-wrap">{`Educate . Equip . Employ`}</p>
    </div>
  );
}

function Frame164() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[30px] items-start left-[69px] top-[calc(50%+0.5px)] w-[733px]">
      <Frame162 />
      <Frame163 />
    </div>
  );
}

function MainPage() {
  return (
    <div id="hero-section" className="absolute bg-white h-[666px] left-0 overflow-clip top-[66px] w-[1440px]" data-name="Main page">
      <div className="absolute h-[736px] left-0 top-0 w-[1440px]" data-name="image 1740">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[119.97%] left-[-20.83%] max-w-none top-[-19.97%] w-[123.75%]" src={imgImage1740} />
        </div>
      </div>
      <div className="absolute h-[791px] left-[690px] top-px w-[833px]" data-name="image 1736">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1736} />
      </div>
      <Frame164 />
      <div className="absolute h-[623px] left-[522px] top-[25px] w-[415px]" data-name="image 1744">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1744} />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p5dd0300} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p338d3070} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2cc06480} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p62e2580} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[26843500px] shrink-0 size-[64px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(239, 246, 255) 100%)" }} data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[#101828] text-[25px] top-[-2px] whitespace-nowrap">1000+</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#4a5565] text-[12px] top-[-0.2px] whitespace-nowrap">Students Placed</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[54px] items-start relative shrink-0 w-[108px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Frame153() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container3() {
  return <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[64px] shrink-0 to-[rgba(0,0,0,0)] via-1/2 via-[#e5e7eb] w-px" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p2dfea7c0} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3e6bfd80} id="Vector_2" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p28d96f80} id="Vector_3" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.333 8H18.6663" id="Vector_4" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.333 13.3333H18.6663" id="Vector_5" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.333 18.6667H18.6663" id="Vector_6" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.333 24H18.6663" id="Vector_7" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[26843500px] shrink-0 size-[64px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(224, 231, 255) 0%, rgb(238, 242, 255) 100%)" }} data-name="Container">
      <Icon1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[#101828] text-[25px] top-[-2px] whitespace-nowrap">40+</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#4a5565] text-[12px] top-[-0.2px] whitespace-nowrap">Hiring Partners</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[56px] items-start relative shrink-0 w-[96px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Frame154() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[64px] shrink-0 to-[rgba(0,0,0,0)] via-1/2 via-[#e5e7eb] w-px" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p126fb100} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2b197400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[26843500px] shrink-0 size-[64px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(220, 252, 231) 0%, rgb(240, 253, 244) 100%)" }} data-name="Container">
      <Icon2 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[40px] mb-[-5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[#101828] text-[25px] top-[-2px] whitespace-nowrap">98%</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] mb-[-5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[-0.2px] not-italic text-[#4a5565] text-[14px] top-0 w-[166px]">Placement Track Record</p>
    </div>
  );
}

function Frame155() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[5px] relative shrink-0 w-[166px]">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Frame156() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Container7 />
      <Frame155 />
    </div>
  );
}

function Container8() {
  return <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[64px] shrink-0 to-[rgba(0,0,0,0)] via-1/2 via-[#e5e7eb] w-px" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p126fb100} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2b197400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[26843500px] shrink-0 size-[64px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(220, 252, 231) 0%, rgb(240, 253, 244) 100%)" }} data-name="Container">
      <Icon3 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[32px] relative shrink-0 w-[177px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[0.2px] not-italic text-[#101828] text-[25px] top-[-2px] w-[185px]">Rs 18K -  30K</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[158px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[0.2px] not-italic text-[#4a5565] text-[14px] top-0 w-[166px]">Average Starting Salary</p>
    </div>
  );
}

function Frame159() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[166px]">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Frame157() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Container9 />
      <Frame159 />
    </div>
  );
}

function Frame158() {
  return (
    <div className="content-stretch flex gap-[50px] items-center justify-center relative shrink-0 w-[1179px]">
      <Frame153 />
      <Container3 />
      <Frame154 />
      <Container6 />
      <Frame156 />
      <Container8 />
      <Frame157 />
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col h-[112px] items-center left-[calc(50%-0.5px)] px-[60px] py-[25px] rounded-[15px] top-[791px] w-[1301px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(37,168,141,0.2)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Frame158 />
    </div>
  );
}

function Frame151() {
  return (
    <div className="trusted-group content-stretch flex items-center relative shrink-0">
      <div className="h-[41px] relative shrink-0 w-[101px]" data-name="image 1728">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1728} />
      </div>
      <div className="h-[37px] relative shrink-0 w-[113px]" data-name="image 1729">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1729} />
      </div>
      <div className="h-[30px] relative shrink-0 w-[99px]" data-name="download (1) 2">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDownload12} />
      </div>
      <div className="h-[33px] relative shrink-0 w-[78px]" data-name="image 1730">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1730} />
      </div>
      <div className="h-[34px] relative shrink-0 w-[98px]" data-name="image 1731">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-full left-[-11.36%] max-w-none top-0 w-[120.67%]" src={imgImage1731} />
        </div>
      </div>
      <div className="h-[33px] relative shrink-0 w-[126px]" data-name="alphonsa-logo-768x200 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAlphonsaLogo768X2001} />
      </div>
      <div className="h-[36px] relative shrink-0 w-[124px]" data-name="ck-birla-hospital">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCkBirlaHospital} />
      </div>
      <div className="h-[32px] relative shrink-0 w-[112px]" data-name="download-1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDownload1} />
      </div>
      <div className="h-[32px] relative shrink-0 w-[112px]" data-name="download-1-1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDownload11} />
      </div>
      {/* <div className="h-[26px] relative shrink-0 w-[159px]" data-name="logo 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo1} />
      </div> */}
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[45px] items-center justify-center relative shrink-0 w-[1268px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic opacity-71 relative shrink-0 text-[#25a88d] text-[16px] text-center whitespace-nowrap">Trusted Partners</p>
      <div className="trusted-mask h-[48px] w-[1090px]">
        <div className="trusted-track trusted-row-rtl">
          <Frame151 />
          <Frame151 />
        </div>
      </div>
    </div>
  );
}

function Frame152() {
  return (
    <div className="trusted-group content-stretch flex items-center relative shrink-0">
      <div className="h-[27px] relative shrink-0 w-[114px]" data-name="image 1732">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[115.03%] left-0 max-w-none top-[-0.11%] w-[120.18%]" src={imgImage1732} />
        </div>
      </div>
      <div className="h-[41px] relative shrink-0 w-[166px]" data-name="KMCIMS 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKmcims1} />
      </div>
      <div className="h-[41px] relative shrink-0 w-[80px]" data-name="download (2) 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[242.5%] left-[-32.91%] max-w-none top-[-70%] w-[163.92%]" src={imgDownload22} />
        </div>
      </div>
      <div className="h-[31px] relative shrink-0 w-[89px]" data-name="dmh-logo 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDmhLogo1} />
      </div>
      <div className="h-[19px] relative shrink-0 w-[78px]" data-name="logo (1) 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo11} />
      </div>
      <div className="h-[41px] relative shrink-0 w-[78px]" data-name="leo-hospital-logo 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLeoHospitalLogo1} />
      </div>
      <div className="h-[43px] relative shrink-0 w-[71px]" data-name="media_19df1ed29f463db903203c85909eb6b672b063998 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMedia19Df1Ed29F463Db903203C85909Eb6B672B0639981} />
      </div>
      <div className="h-[31px] relative shrink-0 w-[90px]" data-name="afba89ec-ff22-455e-bad8-5e19b591a005-1758188690854 1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAfba89EcFf22455EBad85E19B591A00517581886908541} />
      </div>
      <div className="h-[32px] relative shrink-0 w-[112px]" data-name="download-2">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDownload2} />
      </div>
      <div className="h-[32px] relative shrink-0 w-[112px]" data-name="download-2-1">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDownload21} />
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[42px] items-center justify-center relative shrink-0 w-[1302px]">
      <div className="trusted-mask h-[48px] w-[1160px]">
        <div className="trusted-track trusted-row-ltr">
          <Frame152 />
          <Frame152 />
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic opacity-71 relative shrink-0 text-[#25a88d] text-[16px] text-center whitespace-nowrap">Trusted Partners</p>
    </div>
  );
}

function Container10() {
  return (
    <div id="trusted-partners" className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] h-[335px] items-center left-1/2 overflow-clip px-[70px] py-[100px] top-[903px] w-[1516px]" data-name="Container">
      <Frame56 />
      <Frame57 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Why iMED</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`We Don't Just Teach. We Place.`}</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[#4a5565] text-[20px] text-center top-px w-[777px]">iMED Academy is a Healthcare Career accelerator not a Coaching Center. Every batch ends with Job offers, not just Certificates.</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading1 />
      <Heading2 />
      <Paragraph8 />
    </div>
  );
}

function Group7() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[152.07%] left-[-5.11%] max-w-none top-[-31.92%] w-[110.37%]" src={imgRectangle7} />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group7 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">NSDC + HSSC Certified</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[25px] ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px]">Your iMED Certificate is backed by National Skill Development Corporation and HSSC recognised by Hospitals and Employers across India.</p>
    </div>
  );
}

function Services() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame31 />
      <Group8 />
    </div>
  );
}

function Group9() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[137.78%] left-0 max-w-none top-[-5.49%] w-full" src={imgRectangle8} />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group9 />
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">100% Placement Support</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[25px] ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px]">{`We don't just hand you a Certificate and wave goodbye. Our Placement team works until you're Hired mock Interviews, drives, follow-ups included.`}</p>
    </div>
  );
}

function Services1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame32 />
      <Group10 />
    </div>
  );
}

function Group11() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[137.78%] left-0 max-w-none top-[-8.13%] w-full" src={imgRectangle9} />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group11 />
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">Real Hospital Training</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[25px] ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px]">Our Students Train inside actual Hospitals. Not Classrooms pretending to be Hospitals. Real Hospitals. Real Workflows. Real Experience.</p>
    </div>
  );
}

function Services2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame33 />
      <Group12 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex gap-[50px] items-center relative shrink-0 w-full">
      <Services />
      <Services1 />
      <Services2 />
    </div>
  );
}

function Group13() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[137.78%] left-0 max-w-none top-[-6.73%] w-full" src={imgRectangle10} />
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">Job-Focused Curriculum</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[25px] ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px]">{`We don't teach theory for Exams. We train you for real Hospital Jobs Front Desk, Billing, Patient Coordination exactly what Employers need.`}</p>
    </div>
  );
}

function Services3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame34 />
      <Group14 />
    </div>
  );
}

function Group15() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle11} />
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group15 />
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">Online + Offline Options</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[25px] ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px]">The Hospital Administration Program is available both Online and Offline. Study from home or come to our Center your Choice</p>
    </div>
  );
}

function Services4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame35 />
      <Group16 />
    </div>
  );
}

function Group17() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-0.48px]">
      <div className="-translate-x-1/2 absolute h-[150px] left-1/2 rounded-[10px] top-[-0.48px] w-[310px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[137.78%] left-0 max-w-none top-[-3.24%] w-full" src={imgRectangle12} />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[150px] relative shrink-0 w-[310px]">
      <Group17 />
    </div>
  );
}

function Group18() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-0 mt-0 relative row-1 text-[#1f3471] text-[20px] w-[310px]">Internship-First Model</p>
      <div className="col-1 font-['Inter:Regular',sans-serif] font-normal ml-0 mt-[44px] relative row-1 text-[#757575] text-[16px] w-[310px] whitespace-pre-wrap">
        <p className="leading-[25px] mb-0">{`Hands on Hospital Exposure attachment before Placement. Real experience, Real environment  before Day 1 of your Job.`}</p>
        <p className="leading-[25px]"></p>
      </div>
    </div>
  );
}

function Services5() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[25.91px] items-center justify-center px-[11.336px] py-[40.484px] relative rounded-[25.91px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[360px] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer" data-name="Services">
      <Frame36 />
      <Group18 />
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex gap-[50px] items-center relative shrink-0 w-full">
      <Services3 />
      <Services4 />
      <Services5 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex flex-col gap-[50px] items-start relative shrink-0 w-[1180px]">
      <Frame117 />
      <Frame118 />
    </div>
  );
}

function About() {
  return (
    <div id="why-imed" className="absolute bg-white content-stretch flex flex-col gap-[120px] items-center left-0 px-[32px] py-[60px] top-[2246px] w-[1440px]" data-name="About">
      <Container11 />
      <Frame119 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">FAQs</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">Questions? We Have Answers.</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading3 />
      <Heading4 />
    </div>
  );
}

function Group19() {
  return (
    <div className="relative size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.pb051c80} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23px] mt-[22.36px] place-items-start relative row-1">
      <div className="col-1 flex items-center justify-center ml-[676.86px] mt-0 relative row-1 size-[28.284px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <Group19 />
        </div>
      </div>
      <p className="col-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] ml-0 mt-[2.64px] not-italic relative row-1 text-[20px] text-black whitespace-nowrap">Can 12th pass students apply?</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-white border border-[rgba(37,168,141,0.2)] border-solid col-1 h-[156px] ml-0 mt-0 rounded-[10px] row-1 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px]" />
      <Group20 />
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[31px] ml-[23px] mt-[70px] not-italic relative row-1 text-[16px] text-black tracking-[-0.32px] w-[644px]">Yes! Both programs of iMED Academy - HA and EMT - are designed for 12th pass students. You do not need any medical background or prior experience.</p>
    </div>
  );
}

function Group24() {
  return (
    <div className="col-1 ml-[681px] mt-[1.5px] relative row-1 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2679f600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Group23() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23px] mt-[25px] place-items-start relative row-1">
      <Group24 />
      <p className="col-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] ml-0 mt-0 not-italic relative row-1 text-[20px] text-black whitespace-nowrap">Is 100% placement guaranteed?</p>
    </div>
  );
}

function Group22() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-white border border-[rgba(37,168,141,0.2)] border-solid col-1 h-[74px] ml-0 mt-0 rounded-[10px] row-1 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px]" />
      <Group23 />
    </div>
  );
}

function Group27() {
  return (
    <div className="col-1 ml-[681px] mt-[2.5px] relative row-1 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2679f600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Group26() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23px] mt-[27px] place-items-start relative row-1">
      <Group27 />
      <p className="col-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] ml-0 mt-0 not-italic relative row-1 text-[20px] text-black whitespace-nowrap">What is the fee structure? Are EMIs available?</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-white border border-[rgba(37,168,141,0.2)] border-solid col-1 h-[74px] ml-0 mt-0 rounded-[10px] row-1 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px]" />
      <Group26 />
    </div>
  );
}

function Group30() {
  return (
    <div className="col-1 ml-[681px] mt-[1.5px] relative row-1 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2679f600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Group29() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23px] mt-[25px] place-items-start relative row-1">
      <Group30 />
      <p className="col-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] ml-0 mt-0 not-italic relative row-1 text-[20px] text-black whitespace-nowrap">Where are your centres located?</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-white border border-[rgba(37,168,141,0.2)] border-solid col-1 h-[74px] ml-0 mt-0 rounded-[10px] row-1 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px]" />
      <Group29 />
    </div>
  );
}

function Group33() {
  return (
    <div className="col-1 ml-[681px] mt-[1.5px] relative row-1 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2679f600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23px] mt-[25px] place-items-start relative row-1">
      <Group33 />
      <p className="col-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] ml-0 mt-0 not-italic relative row-1 text-[20px] text-black whitespace-nowrap">How long does it take to get a job after joining?</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-white border border-[rgba(37,168,141,0.2)] border-solid col-1 h-[74px] ml-0 mt-0 rounded-[10px] row-1 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px]" />
      <Group32 />
    </div>
  );
}

function FaqPlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`relative size-[20px] ${isOpen ? "rotate-45" : ""} transition-transform duration-200`}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 330">
          <path clipRule="evenodd" d="M9 20V0H11V20H9Z" fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2679f600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector 354 (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 w-[751px] max-h-[512px] overflow-y-auto pr-1 no-scrollbar">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={`${item.question}-${index}`}
            className={`bg-white border border-[rgba(37,168,141,0.2)] border-solid rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] w-[751px] ${isOpen ? "min-h-[156px]" : "min-h-[74px]"}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              className="content-stretch flex items-start justify-between gap-4 px-[23px] py-[24px] w-full"
            >
              <p className="flex-1 font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic text-[20px] text-black text-left">
                {item.question}
              </p>
              <FaqPlusIcon isOpen={isOpen} />
            </button>

            {isOpen && (
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[31px] not-italic px-[23px] pb-[24px] text-[16px] text-black tracking-[-0.32px] w-full pr-[55px]">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0">
      <div className="h-[512px] pointer-events-none relative rounded-[20px] shrink-0 w-[401px]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-white inset-0 rounded-[20px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[20px]">
            <img loading="lazy" decoding="async" alt="" className="absolute h-[117.67%] left-0 max-w-none top-[-6.09%] w-full" src={imgRectangle156} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(37,168,141,0.2)] border-solid inset-0 rounded-[20px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)]" />
      </div>
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1191px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0">
      <Frame109 />
    </div>
  );
}

function About1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[39px] items-center left-0 px-[32px] py-[60px] top-[7100.76px] w-[1440px]" data-name="About">
      <Container12 />
      <Frame73 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Our Programs</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">Choose Your Career Path</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[58px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-[calc(50%+0.5px)] not-italic text-[#4a5565] text-[18px] text-center top-px w-[777px]">Pick the path that fits your life. Every track ends with a real Healthcare Career</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading5 />
      <Heading6 />
      <Paragraph9 />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-white left-[312px] opacity-4 rounded-[40806480px] size-[146px] top-[71px]" data-name="Container" />;
}

function Frame169() {
  return (
    <div className="absolute bg-[rgba(37,168,141,0.33)] content-stretch flex items-center justify-center left-[271px] overflow-clip px-[14px] py-[7px] rounded-[6px] top-[22.24px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[11.036px] not-italic relative shrink-0 text-[#eee] text-[12px] whitespace-nowrap">HIGH DEMAND</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[156px] left-0 overflow-clip right-0 rounded-[19.458px] top-0" style={{ backgroundImage: "linear-gradient(111.567deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)" }} data-name="Container">
      <Container15 />
      <Frame169 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start leading-[normal] left-[41px] not-italic right-[41px] text-white top-[54px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[20px] whitespace-nowrap">EMT Program</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[18px] w-[min-content]">Certification in Emergency Medical Technology</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_8.33%_0.78%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21.814">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p20756700} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteTimeLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:time-line">
      <Group />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">6 Months</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%_12.5%_0.78%_12.5%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21.814">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p39d1df00} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteHospitalLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:hospital-line">
      <Group1 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteHospitalLine />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">Field Roles</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] w-full">{`3 Months Classroom & Practical Training + 3 Months field Internship`}</p>
    </div>
  );
}

function MdiTick() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">100% HSSC-aligned curriculum</p>
    </div>
  );
}

function MdiTick1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">{`Live emergency simulations & drills`}</p>
    </div>
  );
}

function MdiTick2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">{`Ambulance & Hospital Internship`}</p>
    </div>
  );
}

function MdiTick3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Placement assistance included</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame77 />
      <Frame78 />
      <Frame79 />
      <Frame80 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame81 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[188px] w-[328px]">
      <Frame39 />
      <Frame43 />
      <Frame82 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[41px] not-italic top-[475px] w-[328px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[16px] w-full">Starting Salary Range</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#25a88d] text-[18px] w-full">{`Rs 15,000 - Rs 25,000 /Month `}</p>
    </div>
  );
}

function Frame46() {
  const handleClick = () => {
    window.location.hash = "emt";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className="-translate-x-1/2 absolute content-stretch flex h-[40px] items-center justify-center left-1/2 overflow-clip px-[112px] py-[8px] rounded-[6px] top-[553px] w-[328px] cursor-pointer" style={{ backgroundImage: "linear-gradient(140.961deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white h-[640px] overflow-clip relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4),0px_6.478px_54.897px_0px_rgba(0,134,255,0.1)] shrink-0 transition-all duration-300 w-[410px] hover:-translate-y-2 hover:shadow-[0px_16px_24px_-6px_rgba(37,99,235,0.25),0px_10px_16px_-8px_rgba(0,0,0,0.12),12px_48px_58px_0px_rgba(229,233,246,0.5),0px_10px_60px_0px_rgba(0,134,255,0.15)]">
      <Container14 />
      <Frame38 />
      <Frame44 />
      <Frame45 />
      <Frame46 />
    </div>
  );
}

function Container17() {
  return <div className="absolute bg-white left-[312px] opacity-4 rounded-[40806480px] size-[146px] top-[71px]" data-name="Container" />;
}

function Frame170() {
  return (
    <div className="absolute bg-[rgba(37,168,141,0.33)] content-stretch flex items-center justify-center left-[298px] overflow-clip px-[14px] py-[7px] rounded-[6px] top-[22.24px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[11.036px] not-italic relative shrink-0 text-[#eee] text-[12px] whitespace-nowrap">FLAGSHIP</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[156px] left-0 overflow-clip right-0 rounded-[19.458px] top-0" style={{ backgroundImage: "linear-gradient(114.164deg, rgb(82, 86, 100) 4.0585%, rgb(65, 72, 91) 53.425%, rgb(165, 174, 202) 102.79%)" }} data-name="Container">
      <Container17 />
      <Frame170 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start leading-[normal] left-[41px] not-italic right-[41px] text-white top-[54px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[20px] w-[239px]">{`Hospital Administration (HA) Program `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[18px] w-[min-content]">Certification in Hospital Administration</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[8.33%_8.33%_0.78%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21.814">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p20756700} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteTimeLine1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:time-line">
      <Group2 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">6 Months</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[8.33%_12.5%_0.78%_12.5%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21.814">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p39d1df00} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteHospitalLine1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:hospital-line">
      <Group3 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteHospitalLine1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">60+ Job Roles</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Frame51 />
      <Frame52 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] w-full">{`4 Months Classroom & Practical Training + 2 Months Hospital Internship`}</p>
    </div>
  );
}

function MdiTick4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#333] text-[0px] w-[343px]">
        <span className="leading-[27px] text-[14px]">Dual Certification -</span>
        <span className="leading-[27px] text-[12px]">{` iMED Academy + HSSC (HFDC)`}</span>
      </p>
    </div>
  );
}

function MdiTick5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick5 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">100% HSSC-aligned curriculum</p>
    </div>
  );
}

function MdiTick6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick6 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Real Hospital Internship at partner facilities</p>
    </div>
  );
}

function MdiTick7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Placement assistance from Day 1</p>
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame85 />
      <Frame86 />
      <Frame87 />
      <Frame88 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame84 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[188px] w-[328px]">
      <Frame50 />
      <Frame53 />
      <Frame83 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[41px] not-italic top-[475px] w-[328px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[16px] w-full">Starting Salary Range</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#25a88d] text-[18px] w-full">{`Rs 18,000 - Rs 25,000 /Month `}</p>
    </div>
  );
}

function Frame55() {
  const handleClick = () => {
    window.location.hash = "ha";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className="-translate-x-1/2 absolute content-stretch flex h-[40px] items-center justify-center left-1/2 overflow-clip px-[112px] py-[8px] rounded-[6px] top-[553px] w-[328px] cursor-pointer" style={{ backgroundImage: "linear-gradient(140.961deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white h-[640px] overflow-clip relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4),0px_6.478px_54.897px_0px_rgba(0,134,255,0.1)] shrink-0 transition-all duration-300 w-[410px] hover:-translate-y-2 hover:shadow-[0px_16px_24px_-6px_rgba(37,99,235,0.25),0px_10px_16px_-8px_rgba(0,0,0,0.12),12px_48px_58px_0px_rgba(229,233,246,0.5),0px_10px_60px_0px_rgba(0,134,255,0.15)]">
      <Container16 />
      <Frame48 />
      <Frame49 />
      <Frame54 />
      <Frame55 />
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-white left-[312px] opacity-4 rounded-[40806480px] size-[146px] top-[71px]" data-name="Container" />;
}

function Frame171() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[283px] overflow-clip px-[14px] py-[7px] rounded-[6px] top-[22.24px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[11.036px] not-italic relative shrink-0 text-[#eee] text-[12px] whitespace-nowrap">FAST TRACK</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[156px] left-0 overflow-clip right-0 rounded-[19.458px] top-0" style={{ backgroundImage: "linear-gradient(113deg, rgb(151, 66, 7) 2%, rgb(235, 127, 37) 58%, rgb(245, 155, 71) 100%)" }} data-name="Container">
      <Container19 />
      <Frame171 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[41px] not-italic right-[41px] text-white top-[54px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap">General Duty Assistant</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0">{`Certificate in General Duty `}</p>
        <p className="leading-[normal]">Assistant</p>
      </div>
    </div>
  );
}

function Frame60() {
  return <div className="absolute h-[181px] left-[41px] top-[188px] w-[328px]" />;
}

function Group4() {
  return (
    <div className="absolute inset-[8.33%_8.33%_0.78%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21.814">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p20756700} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteTimeLine2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:time-line">
      <Group4 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine2 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">3 Months</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame63 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] w-full">{`2 Months Classroom & Practical Training + 1 Months Hospital Internship`}</p>
    </div>
  );
}

function MdiTick8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick8 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">100% HSSC-aligned curriculum</p>
    </div>
  );
}

function MdiTick9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick9 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Practical bedside care training</p>
    </div>
  );
}

function MdiTick10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick10 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Hospital Internship at partner facilities</p>
    </div>
  );
}

function MdiTick11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:tick">
          <path d={svgPaths.p39d55130} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick11 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Most accessible entry into Healthcare</p>
    </div>
  );
}

function MdiTick12() {
  return <div className="shrink-0 size-[24px]" data-name="mdi:tick" />;
}

function Frame95() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <MdiTick12 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame91 />
      <Frame92 />
      <Frame93 />
      <Frame94 />
      <Frame95 />
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame90 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[188px] w-[328px]">
      <Frame62 />
      <Frame64 />
      <Frame89 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[41px] not-italic top-[475px] w-[328px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[16px] w-full">Starting Salary Range</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#25a88d] text-[18px] w-full">{`Rs 15,000 - Rs 25,000 /Month `}</p>
    </div>
  );
}

function Frame66() {
  const handleClick = () => {
    window.location.hash = "gda";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className="-translate-x-1/2 absolute content-stretch flex h-[40px] items-center justify-center left-1/2 overflow-clip px-[112px] py-[8px] rounded-[6px] top-[553px] w-[328px] cursor-pointer" style={{ backgroundImage: "linear-gradient(140.961deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white h-[640px] overflow-clip relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4),0px_6.478px_54.897px_0px_rgba(0,134,255,0.1)] shrink-0 transition-all duration-300 w-[410px] hover:-translate-y-2 hover:shadow-[0px_16px_24px_-6px_rgba(37,99,235,0.25),0px_10px_16px_-8px_rgba(0,0,0,0.12),12px_48px_58px_0px_rgba(229,233,246,0.5),0px_10px_60px_0px_rgba(0,134,255,0.15)]">
      <Container18 />
      <Frame59 />
      <Frame60 />
      <Frame61 />
      <Frame65 />
      <Frame66 />
    </div>
  );
}

function Container19Acha() {
  return <div className="absolute bg-white left-[312px] opacity-4 rounded-[40806480px] size-[146px] top-[71px]" data-name="Container" />;
}

function Frame171Acha() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.22)] content-stretch flex items-center justify-center left-[288px] overflow-clip px-[14px] py-[7px] rounded-[6px] top-[22.24px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[11.036px] not-italic relative shrink-0 text-[#eee] text-[12px] whitespace-nowrap">FLAGSHIP</p>
    </div>
  );
}

function Container18Acha() {
  return (
    <div
      className="absolute h-[156px] left-0 overflow-clip right-0 rounded-[19.458px] top-0"
      style={{ backgroundImage: "linear-gradient(113.747deg, rgb(16, 211, 130) 1.5712%, rgb(64, 194, 140) 49.325%, rgb(8, 109, 67) 97.079%)" }}
      data-name="Container"
    >
      <Container19Acha />
      <Frame171Acha />
    </div>
  );
}

function Frame59Acha() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[41px] not-italic right-[41px] text-white top-[54px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap">ACHA Program</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0">Advance Certification in Hospital</p>
        <p className="leading-[normal]">Administration</p>
      </div>
    </div>
  );
}

function Frame61Acha() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[188px] w-[328px]">
      <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <MingcuteTimeLine2 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">9 Months</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <MingcuteHospitalLine1 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">60+ Job Roles</p>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] w-full">{`6 Months Classroom & Practical Training + 3 Months Hospital Internship`}</p>
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
        <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick8 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">QCC Readiness Track + Advance</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
            <MdiTick9 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Professional Skills Training</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick10 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">NSDC + HSSC-aligned curriculum</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick11 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Real Hospital internship at partner facilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame66Acha() {
  const handleClick = () => {
    window.location.hash = "acha";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className="-translate-x-1/2 absolute content-stretch flex h-[40px] items-center justify-center left-1/2 overflow-clip px-[112px] py-[8px] rounded-[6px] top-[553px] w-[328px] cursor-pointer" style={{ backgroundImage: "linear-gradient(140.961deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function FrameAcha() {
  return (
    <div className="bg-white h-[640px] overflow-clip relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4),0px_6.478px_54.897px_0px_rgba(0,134,255,0.1)] shrink-0 transition-all duration-300 w-[410px] hover:-translate-y-2 hover:shadow-[0px_16px_24px_-6px_rgba(37,99,235,0.25),0px_10px_16px_-8px_rgba(0,0,0,0.12),12px_48px_58px_0px_rgba(229,233,246,0.5),0px_10px_60px_0px_rgba(0,134,255,0.15)]">
      <Container18Acha />
      <Frame59Acha />
      <Frame61Acha />
      <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[41px] not-italic top-[475px] w-[328px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[16px] w-full">Starting Salary Range</p>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#25a88d] text-[18px] w-full">{`Rs 20,000 - Rs 35,000 /Month `}</p>
      </div>
      <Frame66Acha />
    </div>
  );
}

function Container19Gca() {
  return <div className="absolute bg-white left-[312px] opacity-4 rounded-[40806480px] size-[146px] top-[71px]" data-name="Container" />;
}

function Frame171Gca() {
  return (
    <div className="absolute bg-[rgba(82,123,255,0.24)] content-stretch flex items-center justify-center left-[257px] overflow-clip px-[14px] py-[7px] rounded-[6px] top-[22.24px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[11.036px] not-italic relative shrink-0 text-[#dfe9ff] text-[12px] whitespace-nowrap">HIGH DEMAND</p>
    </div>
  );
}

function Container18Gca() {
  return (
    <div
      className="absolute h-[156px] left-0 overflow-clip right-0 rounded-[19.458px] top-0"
      style={{ backgroundImage: "linear-gradient(113deg, rgb(76, 56, 178) 2%, rgb(96, 69, 201) 58%, rgb(128, 76, 224) 100%)" }}
      data-name="Container"
    >
      <Container19Gca />
      <Frame171Gca />
    </div>
  );
}

function Frame59Gca() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[41px] not-italic right-[41px] text-white top-[54px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap">GCA Program</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0">Certification in Geriatric Care</p>
        <p className="leading-[normal]">Assistance</p>
      </div>
    </div>
  );
}

function Frame61Gca() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[188px] w-[328px]">
      <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <MingcuteTimeLine2 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">6 Months</p>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] w-full">{`4 Months Classroom & Practical Training + 2 Months field Internship`}</p>
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
        <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick8 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">NSDC + HSSC-aligned curriculum</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
            <MdiTick9 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Practical elderly care training</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick10 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Home Care & Healthcare Facility Internship</p>
          </div>
          <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
            <MdiTick11 />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">Placement assistance included</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame66Gca() {
  const handleClick = () => {
    window.location.hash = "gca";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className="-translate-x-1/2 absolute content-stretch flex h-[40px] items-center justify-center left-1/2 overflow-clip px-[112px] py-[8px] rounded-[6px] top-[553px] w-[328px] cursor-pointer" style={{ backgroundImage: "linear-gradient(140.961deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function FrameGca() {
  return (
    <div className="bg-white h-[640px] overflow-clip relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4),0px_6.478px_54.897px_0px_rgba(0,134,255,0.1)] shrink-0 transition-all duration-300 w-[410px] hover:-translate-y-2 hover:shadow-[0px_16px_24px_-6px_rgba(37,99,235,0.25),0px_10px_16px_-8px_rgba(0,0,0,0.12),12px_48px_58px_0px_rgba(229,233,246,0.5),0px_10px_60px_0px_rgba(0,134,255,0.15)]">
      <Container18Gca />
      <Frame59Gca />
      <Frame61Gca />
      <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[41px] not-italic top-[475px] w-[328px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[16px] w-full">Starting Salary Range</p>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#25a88d] text-[18px] w-full">{`Rs 15,000 - Rs 30,000 /Month `}</p>
      </div>
      <Frame66Gca />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-wrap gap-[43px] items-start justify-center relative shrink-0 w-[1320px]">
      <FrameAcha />
      <Frame42 />
      <Frame37 />
      <FrameGca />
      <Frame58 />
    </div>
  );
}

function About2() {
  return (
    <div id="career-path" className="-translate-x-1/2 absolute z-[20] bg-white content-stretch flex flex-col gap-[126px] items-center left-1/2 px-[32px] py-[60px] top-[4609.76px] w-[1440px]" data-name="About">
      <Container13 />
      <Frame47 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Student Stories</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">Real Students. Real Jobs. Real Life Change.</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[58px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-[calc(50%+0.5px)] not-italic text-[18px] text-center text-white top-px w-[777px]">{`Every student who walks through iMED's doors carries a dream stability, independence, a future. We take that personally. We don't hand you a Certificate and disappear. We stand with you until you have an offer letter.`}</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading7 />
      <Heading8 />
      <Paragraph10 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="relative shrink-0 size-[44px]">
      <div className="absolute left-0 size-[44px] top-0">
        <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" height="44" src={imgEllipse5} width="44" />
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[0.733px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#25a88d] text-[14.667px] w-full">Anshika</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[10.267px] text-white w-full">Healthcare Coordinator</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Frame70 />
      <Frame74 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <div className="absolute inset-[10.56%_87.58%_83.01%_7.52%]" data-name="quote-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5786 16.9973">
          <path d={svgPaths.p2a633c00} fill="var(--fill-0, #25A88D)" id="quote-path" />
        </svg>
      </div>
      <p className="absolute bottom-[40%] font-['Inter:Regular',sans-serif] font-normal leading-[22px] left-[calc(50%-163.17px)] not-italic text-[14.667px] text-white top-[26.67%] w-[326.333px]">{`"I completed 12th and had no idea what to do. My parents were worried. I had a job offer from Apollo Hospital. I couldn't believe it happened so fast. IMED changed my life."`}</p>
      <Frame71 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="relative shrink-0 size-[60px]">
      <div className="absolute left-0 size-[60px] top-0">
        <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" height="60" src={imgEllipse6} width="60" />
      </div>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start leading-[27px] not-italic relative shrink-0 w-[278px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#25a88d] text-[20px] w-full">Rahul Verma</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-white w-full">Patient Coordinator</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="absolute content-stretch flex gap-[21px] items-center left-[41px] top-[262px]">
      <Frame76 />
      <Frame96 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] h-[360px] overflow-clip relative rounded-[20px] shrink-0 w-[545px]">
      <div className="absolute inset-[10.56%_87.58%_83.01%_7.52%]" data-name="quote-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6982 23.1781">
          <path d={svgPaths.p28086b70} fill="var(--fill-0, #25A88D)" id="quote-path" />
        </svg>
      </div>
      <p className="absolute bottom-[40%] font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(50%-222.5px)] not-italic text-[20px] text-white top-[26.67%] w-[445px]">{`"The communication and hospital etiquette training set me apart. My employer told me I was the most prepared candidate they had seen from any skilling program."`}</p>
      <Frame75 />
    </div>
  );
}

function Frame99() {
  return (
    <div className="relative shrink-0 size-[44px]">
      <div className="absolute left-0 size-[44px] top-0">
        <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" height="44" src={imgEllipse7} width="44" />
      </div>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[0.733px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#25a88d] text-[14.667px] w-full">Ananya Krishnan</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[10.267px] text-white w-full">Medical Records Assistant</p>
    </div>
  );
}

function Frame98() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Frame99 />
      <Frame100 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <div className="absolute inset-[10.56%_87.58%_83.01%_7.52%]" data-name="quote-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5786 16.9973">
          <path d={svgPaths.p2a633c00} fill="var(--fill-0, #25A88D)" id="quote-path" />
        </svg>
      </div>
      <p className="absolute bottom-[40%] font-['Inter:Regular',sans-serif] font-normal leading-[22px] left-[calc(50%-163.17px)] not-italic text-[14.667px] text-white top-[26.67%] w-[326.333px]">{`"I was completely lost after 12th. iMED gave me a clear path, real skills, and got me placed at Apollo within 45 days of completing my course. I'm earning more than I expected."`}</p>
      <Frame98 />
    </div>
  );
}

function StudentStoryCard({
  quote,
  name,
  role,
  image,
  isActive,
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
  isActive: boolean;
}) {
  return (
    <div
      className={`bg-[rgba(37,168,141,0.27)] overflow-clip relative rounded-[20px] shrink-0 transition-all duration-300 ease-out ${
        isActive ? "h-[360px] w-[545px]" : "h-[264px] w-[399.667px]"
      }`}
      data-story-card="true"
    >
      <div className="absolute inset-[10.56%_87.58%_83.01%_7.52%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox={isActive ? "0 0 26.6982 23.1781" : "0 0 19.5786 16.9973"}
        >
          <path d={isActive ? svgPaths.p28086b70 : svgPaths.p2a633c00} fill="var(--fill-0, #25A88D)" />
        </svg>
      </div>
      <p
        className={`absolute font-['Inter:Regular',sans-serif] font-normal not-italic text-white ${
          isActive
            ? "bottom-[40%] leading-[30px] left-[calc(50%-222.5px)] text-[20px] top-[26.67%] w-[445px]"
            : "bottom-[40%] leading-[22px] left-[calc(50%-163.17px)] text-[14.667px] top-[26.67%] w-[326.333px]"
        }`}
      >{`"${quote}"`}</p>
      <div className={`absolute content-stretch flex items-center ${isActive ? "gap-[21px] left-[41px] top-[262px]" : "gap-[15.4px] left-[30.07px] top-[192.13px]"}`}>
        <div className={`relative shrink-0 ${isActive ? "size-[60px]" : "size-[44px]"}`}>
          <div className={`absolute left-0 top-0 ${isActive ? "size-[60px]" : "size-[44px]"}`}>
            <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={image} />
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-start not-italic relative shrink-0 ${isActive ? "gap-px leading-[27px] w-[278px]" : "gap-[0.733px] leading-[19.8px] w-[250px]"}`}>
          <p className={`font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#25a88d] w-full ${isActive ? "text-[20px]" : "text-[14.667px]"}`}>{name}</p>
          <p className={`font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-white w-full ${isActive ? "text-[14px]" : "text-[10.267px]"}`}>{role}</p>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  const stories = [
    {
      quote:
        "I completed my B.com and had no idea what to do. My parents were worried. I had a job offer from Apollo Hospital. I couldn't believe it happened so fast. IMED changed my life.",
      name: "Anshika",
      role: "Claims Processing Executive",
      image: imgRiyaKrishnamurthy,
    },
    {
      quote:
        "The communication and hospital etiquette training set me apart. My employer told me I was the most prepared candidate they had seen from any skilling program.",
      name: "Rahul Verma",
      role: "Patient Coordinator",
      image: imgEllipse6,
    },
    {
      quote:
        "I was completely lost after 12th. iMED gave me a clear path, real skills, and got me placed at KRS Multi-speciality hospital within 45 days of completing my course. I'm earning more than I expected.",
      name: "Ananya Krishnan",
      role: "Medical Records Assistant",
      image: imgAnanya,
    },
    {
      quote:
      "I had no idea what to do after 12th. iMED gave me direction, real skills, and a job at a private hospital within 5 months. Life changed completely.",
      name: "Priya Sharma",
      role: "Front Desk Executive",
      image: imgEllipse5,
    },
    {
      quote:"As a parent I was nervous. But monthly progress reports, personal calls from the placement team ? they kept us involved every step. iMED delivered on every promise.",
      name: "Sunita Gupta",
      role: "Parent of iMED Graduate",
      image: imgEllipse7,
    },
  ];
  const loopedStories = [...stories, ...stories];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeStoryCardIndex, setActiveStoryCardIndex] = useState(1);
  const [isStoryHoverPaused, setIsStoryHoverPaused] = useState(false);

  const updateActiveStory = () => {
    if (!scrollerRef.current) return;
    const container = scrollerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-story-card='true']"));
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveStoryCardIndex(nearestIndex);
  };

  useLayoutEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      updateActiveStory();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [stories.length]);

  useEffect(() => {
    const speedPxPerSecond = 60;
    let carry = 0;
    const intervalMs = 16;
    const perTick = (speedPxPerSecond * intervalMs) / 1000;

    const timer = window.setInterval(() => {
      const container = scrollerRef.current;
      if (!container || isStoryHoverPaused) return;

      carry += perTick;
      const delta = Math.floor(carry);
      if (delta <= 0) return;
      carry -= delta;

      const halfScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= halfScroll - delta) {
        container.scrollLeft -= halfScroll;
      } else {
        container.scrollLeft += delta;
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isStoryHoverPaused]);

  return (
    <div
      ref={scrollerRef}
      onScroll={updateActiveStory}
      onMouseEnter={() => setIsStoryHoverPaused(true)}
      onMouseLeave={() => setIsStoryHoverPaused(false)}
      className="no-scrollbar relative shrink-0 w-[1306px] overflow-x-auto pb-[8px]"
    >
      <div className="content-stretch flex gap-[30px] items-end min-w-max px-[24px] pr-[130px]">
        {loopedStories.map((story, index) => {
          const visualIndex = index % stories.length;
          return (
            <StudentStoryCard
              key={`${story.name}-${index}`}
              image={story.image}
              isActive={activeStoryCardIndex === index}
              name={story.name}
              quote={story.quote}
              role={story.role}
            />
          );
        })}
      </div>
    </div>
  );
}

function About3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[162px] h-[789px] items-center left-1/2 px-[32px] py-[60px] top-[6311.76px] w-[1440px]" style={{ backgroundImage: "linear-gradient(151.281deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%), linear-gradient(105.348deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(31, 52, 113) 0%, rgb(31, 52, 113) 100%)" }} data-name="About">
      <Container20 />
      <Frame72 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-[905px]" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-w-px not-italic relative text-[30px] text-center text-white">Your Healthcare Career Starts With One Call.</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[35px] relative shrink-0 w-[765px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[58px] leading-[28px] left-[382px] not-italic text-[#dbeafe] text-[18px] text-center top-[0.5px] w-[560px]">Free counselling. Zero pressure. Just clarity on your next step.</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#25a88d] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px] cursor-pointer">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-[50px] relative rounded-[12px] shrink-0 w-[210px] cursor-pointer">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Talk to Expert</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Container21() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[23px] h-[293px] items-center justify-center left-[calc(50%-0.5px)] px-[52px] py-[60px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-[7902.76px] w-[1459px]" style={{ backgroundImage: "linear-gradient(168.645deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%), linear-gradient(126.829deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%), linear-gradient(90deg, rgb(31, 52, 113) 0%, rgb(31, 52, 113) 100%)" }} data-name="Container">
      <Heading9 />
      <Paragraph11 />
      <Frame27 />
    </div>
  );
}

function Frame101() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold gap-[24px] items-center left-[299px] not-italic top-[74px] w-[843px]">
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-[#25a88d] text-[20px] text-center w-[min-content]">
        <p className="leading-[65px]">The Real Problem</p>
      </div>
      <p className="leading-[65px] relative shrink-0 text-[#1f3471] text-[40px] whitespace-nowrap">{`From Student to Healthcare Professional `}</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents left-[829px] top-[369px]">
      <div className="absolute h-[407px] left-[829px] top-[369px] w-[611px]" data-name="image 1706" />
    </div>
  );
}

function Frame103() {
  return (
    <div className="relative shrink-0 size-[74px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[117px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 117">
          <circle cx="58.5" cy="58.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 1" r="58.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[97px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 97">
          <circle cx="48.5" cy="48.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 3" r="48.5" />
        </svg>
      </div>
      <div className="absolute left-0 size-[74px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
          <circle cx="37" cy="37" fill="var(--fill-0, #25A88D)" id="Ellipse 2" r="37" />
        </svg>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[calc(50%+0.5px)] not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">1</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#1f3471] text-[20px] w-full">Free Counselling</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-black w-full">Book a call. Our experts understand your background and guide you to the right Program.</p>
    </div>
  );
}

function Frame102() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-0 top-0 w-[237px]">
      <Frame103 />
      <Frame104 />
    </div>
  );
}

function Frame106() {
  return (
    <div className="relative shrink-0 size-[74px]">
      <div className="absolute left-0 size-[74px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
          <circle cx="37" cy="37" fill="var(--fill-0, #25A88D)" id="Ellipse 2" r="37" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[117px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 117">
          <circle cx="58.5" cy="58.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 1" r="58.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[97px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 97">
          <circle cx="48.5" cy="48.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 3" r="48.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">
        <p className="leading-[20px] mb-0">2</p>
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#1f3471] text-[20px] w-full">{`Enroll & Train`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-black w-full">3 - 4 Months of structured Classroom + Practical training with weekly assessments.</p>
    </div>
  );
}

function Frame105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[337px] top-0 w-[237px]">
      <Frame106 />
      <Frame107 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="relative shrink-0 size-[74px]">
      <div className="absolute left-0 size-[74px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
          <circle cx="37" cy="37" fill="var(--fill-0, #25A88D)" id="Ellipse 2" r="37" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[117px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 117">
          <circle cx="58.5" cy="58.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 1" r="58.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[97px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 97">
          <circle cx="48.5" cy="48.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 3" r="48.5" />
        </svg>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[calc(50%+0.5px)] not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">3</p>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#1f3471] text-[20px] w-full">Hospital Internship</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-black w-full">Real Hospital Experience. Work alongside professionals in Partner Hospitals.</p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[674px] top-0 w-[237px]">
      <Frame110 />
      <Frame111 />
    </div>
  );
}

function Frame113() {
  return (
    <div className="relative shrink-0 size-[74px]">
      <div className="absolute left-0 size-[74px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
          <circle cx="37" cy="37" fill="var(--fill-0, #25A88D)" id="Ellipse 2" r="37" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[117px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 117">
          <circle cx="58.5" cy="58.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 1" r="58.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[97px] top-[calc(50%-0.26px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 97">
          <circle cx="48.5" cy="48.5" fill="var(--fill-0, #25A88D)" fillOpacity="0.1" id="Ellipse 3" r="48.5" />
        </svg>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-1/2 not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">4</p>
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#1f3471] text-[20px] w-full">Get Placed</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-black w-full">Dedicated Placement drives. Interview prep, mock sessions, and job offers.</p>
    </div>
  );
}

function Frame112() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[1011px] top-0 w-[237px]">
      <Frame113 />
      <Frame114 />
    </div>
  );
}

function Frame67() {
  const [flowStage, setFlowStage] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || hasEnteredView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  useEffect(() => {
    if (!hasEnteredView || hasAnimatedOnce) {
      return;
    }

    const stepDelayMs = 900;
    const timer = window.setTimeout(() => {
      setFlowStage((prev) => {
        if (prev >= 6) {
          setHasAnimatedOnce(true);
          return 6;
        }
        return prev + 1;
      });
    }, stepDelayMs);
    return () => window.clearTimeout(timer);
  }, [flowStage, hasEnteredView, hasAnimatedOnce]);

  const stepState = (stepNumber: number) => {
    const visibleFrom = (stepNumber - 1) * 2;
    const active = flowStage === visibleFrom;
    const visible = flowStage >= visibleFrom;
    return { active, visible };
  };

  const lineState = (lineNumber: number) => {
    const fillAt = lineNumber * 2 - 1;
    const filled = flowStage > fillAt;
    const animating = flowStage === fillAt;
    return { filled, animating };
  };

  const s1 = stepState(1);
  const s2 = stepState(2);
  const s3 = stepState(3);
  const s4 = stepState(4);
  const l1 = lineState(1);
  const l2 = lineState(2);
  const l3 = lineState(3);

  const stepClass = (state: { active: boolean; visible: boolean }) =>
    `absolute transition-all duration-500 ${
      state.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    } ${state.active ? "drop-shadow-[0_0_12px_rgba(37,168,141,0.35)]" : ""}`;

  const lineFillClass = (state: { filled: boolean; animating: boolean }) =>
    `absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#25a88d] ${
      state.animating ? "transition-all duration-700" : "transition-all duration-300"
    } ${state.filled || state.animating ? "w-full" : "w-0"}`;

  return (
    <div ref={sectionRef} className="-translate-x-1/2 absolute h-[204px] left-1/2 top-[308px] w-[1248px]">
      <div className={stepClass(s1)}>
        <Frame102 />
      </div>
      <div className={stepClass(s2)}>
        <Frame105 />
      </div>
      <div className={stepClass(s3)}>
        <Frame108 />
      </div>
      <div className={stepClass(s4)}>
        <Frame112 />
      </div>

      <div className="absolute h-0 left-[183px] top-[37.24px] w-[212px]">
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#1f3471]/10" />
        <div className={lineFillClass(l1)} />
      </div>
      <div className="absolute h-0 left-[517px] top-[37.24px] w-[213px]">
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#1f3471]/10" />
        <div className={lineFillClass(l2)} />
      </div>
      <div className="absolute h-0 left-[855px] top-[37.24px] w-[213px]">
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#1f3471]/10" />
        <div className={lineFillClass(l3)} />
      </div>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f5f7fb] h-[582px] left-1/2 overflow-clip top-[8195.76px] w-[1440px]" data-name="why choose us">
      <Frame101 />
      <div className="absolute h-[697px] left-[760px] top-[20px] w-[656px]" data-name="image 1679" />
      <Group37 />
      <Frame67 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Contact us</p>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">Start Your Healthcare Journey</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[#4a5565] text-[20px] text-center top-px w-[777px]">Book a free career counselling session.</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading10 />
      <Heading11 />
      <Paragraph12 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start leading-[28px] left-[38px] not-italic text-white top-[44px] w-[336px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] w-[316px]">Take your career to the next level with expert guidance</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-center whitespace-pre">{`Apply now to lock in your seat  limited intake only`}</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#25a88d] h-[582px] left-0 overflow-clip rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[398px]" data-name="Container">
      <div className="absolute h-[582px] left-px top-0 w-[436px]" data-name="image 1727">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1727} />
      </div>
      <Frame122 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#1f3471] text-[24px] top-[-1px] whitespace-nowrap">Send us a Message</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">{`Full Name `}</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Your full name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">Phone</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">+91 XXXXX XXXXX</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">Qualification</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Enter your Qualification</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]" data-name="Container">
      <Label2 />
      <Input2 />
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex gap-[25px] items-start relative shrink-0">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">Preferred Program</p>
    </div>
  );
}

function MingcuteDownLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:down-line">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p12702c80} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[220px] items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Select a Program</p>
          <MingcuteDownLine />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]" data-name="Container">
      <Label3 />
      <Input3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">Mode of Program</p>
    </div>
  );
}

function MingcuteDownLine1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:down-line">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p12702c80} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[241px] items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Select a Mode</p>
          <MingcuteDownLine1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]" data-name="Container">
      <Label4 />
      <Input4 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex gap-[25px] items-start relative shrink-0">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-1px] whitespace-nowrap">Message</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f3f3f5] h-[64px] relative rounded-[5px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">{`Tell us anything `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Textarea />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[474.34px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_91)" id="Icon">
          <path d={svgPaths.p37a4d100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p20c783c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_91">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#25a88d] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[395.55px] not-italic text-[18px] text-center text-white top-[10px] whitespace-nowrap">Send Message</p>
      <Icon4 />
    </div>
  );
}

function Form() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    qualification: "",
    preferredProgram: "",
    mode: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const updateValue = (key: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const submitContact = async (event: any) => {
    event.preventDefault();
    setFeedback(null);

    if (!formValues.fullName || !formValues.phone || !formValues.preferredProgram) {
      setFeedback("Please fill name, phone, and preferred program.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFeedback("Message sent successfully.");
      setFormValues({
        fullName: "",
        phone: "",
        qualification: "",
        preferredProgram: "",
        mode: "",
        message: "",
      });
    } catch (_error) {
      setFeedback("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-full"
      data-name="Form"
      onSubmit={submitContact}
    >
      <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-full">
        <Label />
        <input
          value={formValues.fullName}
          onChange={(event) => updateValue("fullName", event.target.value)}
          placeholder="Your full name"
          className="bg-[#f3f3f5] h-[36px] rounded-[5px] w-full px-[12px] text-[#111827] text-[14px] outline-none"
        />
      </div>

      <div className="content-stretch flex gap-[25px] items-start relative shrink-0">
        <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]">
          <Label1 />
          <input
            value={formValues.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="bg-[#f3f3f5] h-[36px] rounded-[5px] w-full px-[12px] text-[#111827] text-[14px] outline-none"
          />
        </div>
        <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]">
          <Label2 />
          <input
            value={formValues.qualification}
            onChange={(event) => updateValue("qualification", event.target.value)}
            placeholder="Enter your Qualification"
            className="bg-[#f3f3f5] h-[36px] rounded-[5px] w-full px-[12px] text-[#111827] text-[14px] outline-none"
          />
        </div>
      </div>

      <div className="content-stretch flex gap-[25px] items-start relative shrink-0">
        <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]">
          <Label3 />
          <select
            value={formValues.preferredProgram}
            onChange={(event) => updateValue("preferredProgram", event.target.value)}
            className="bg-[#f3f3f5] h-[36px] rounded-[5px] w-full px-[12px] text-[#111827] text-[14px] outline-none"
          >
            <option value="" disabled>
              Select a Program
            </option>
            <option value="Emergency Medical Technician">Emergency Medical Technician</option>
            <option value="Hospital Administration">Hospital Administration</option>
            <option value="General Duty Assistance">General Duty Assistance</option>
          </select>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[380px]">
          <Label4 />
          <select
            value={formValues.mode}
            onChange={(event) => updateValue("mode", event.target.value)}
            className="bg-[#f3f3f5] h-[36px] rounded-[5px] w-full px-[12px] text-[#111827] text-[14px] outline-none"
          >
            <option value="" disabled>
              Select a Mode
            </option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-start relative shrink-0 w-full">
        <Label5 />
        <textarea
          value={formValues.message}
          onChange={(event) => updateValue("message", event.target.value)}
          placeholder="Tell us anything"
          className="bg-[#f3f3f5] h-[64px] rounded-[5px] w-full px-[12px] py-[8px] text-[#111827] text-[14px] outline-none resize-none"
        />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-[#25a88d] h-[48px] rounded-[12px] shrink-0 w-full disabled:opacity-70 flex items-center justify-center gap-[10px]"
      >
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic text-[18px] text-center text-white whitespace-nowrap">
          {isSubmitting ? "Sending..." : "Send Message"}
        </p>
        <div className="relative size-[16px] shrink-0">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g clipPath="url(#clip0_send_icon_align)" id="Icon">
              <path d={svgPaths.p37a4d100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p20c783c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </g>
            <defs>
              <clipPath id="clip0_send_icon_align">
                <rect fill="white" height="16" width="16" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </button>
      {feedback ? <p className="w-full break-words text-[13px] leading-[18px] text-[#1f3471]">{feedback}</p> : null}
    </form>
  );
}

function Container26() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-auto min-h-[582px] items-start left-[437px] pb-[24px] pt-[41px] px-[41px] rounded-[16px] top-0 w-[869px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Heading12 />
      <Form />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-auto min-h-[582px] relative shrink-0 w-[1304px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[774px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[107px] items-center px-[32px] relative size-full">
          <Container23 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div id="contact-us" className="absolute bg-white content-stretch flex flex-col h-[947px] items-start left-0 py-[60px] top-[8777.76px] w-[1440px]" data-name="Contact">
      <Container22 />
    </div>
  );
}

function Group36() {
  return (
    <div className="h-[42px] relative shrink-0 w-[29.48px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4797 42">
        <g id="Group 1171275645">
          <path d={svgPaths.p39fca700} fill="var(--fill-0, white)" id="Vector 101" />
          <path d={svgPaths.p3f5aca80} fill="var(--fill-0, white)" id="Vector 102" />
          <path d={svgPaths.p18842c00} fill="var(--fill-0, white)" id="Vector 103" />
          <path d={svgPaths.p66e1300} fill="var(--fill-0, white)" id="Vector 104" />
        </g>
      </svg>
    </div>
  );
}

function Frame167() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] h-[40px] items-start not-italic py-[6px] relative shrink-0 text-white w-[318px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[15px] leading-[0] relative shrink-0 text-[22.992px] w-full">
        <span className="leading-[11.036px]">{`iMED `}</span>
        <span className="leading-[11.036px]">Academy</span>
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[15px] w-full">Educate. Equip. Employ.</p>
    </div>
  );
}

function Frame168() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Group36 />
      <Frame167 />
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame168 />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full">
      <Frame120 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[15px] text-white w-[min-content]">India's Career Launchpad</p>
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex gap-[17.806px] items-start relative shrink-0">
      <a
        href="https://play.google.com/store/apps/details?id=co.lazarus.ufkbi&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Get it on Google Play"
      >
        <div className="h-[37.242px] overflow-clip relative shrink-0 w-[125.692px]" data-name="Badge">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135 40">
          <path d={svgPaths.p11d0cb00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135 40">
          <path d={svgPaths.p17d06a00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
        <div className="absolute inset-[17.15%_64.87%_67.19%_30.63%]" data-name="Vector">
          <div className="absolute inset-[-1.6%_-1.65%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.27167 6.46222">
              <path d={svgPaths.p26930900} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_61.48%_67.5%_35.94%]" data-name="Vector">
          <div className="absolute inset-[-1.67%_-2.87%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.68 6.2">
              <path d={svgPaths.p10664380} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_57.78%_67.5%_39.13%]" data-name="Vector">
          <div className="absolute inset-[-1.67%_-2.4%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.37 6.2">
              <path d={svgPaths.p2516e240} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_55.03%_67.5%_44.4%]" data-name="Vector">
          <div className="absolute inset-[-1.67%_-12.99%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.969997 6.2">
              <path d={svgPaths.p27482200} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_51.26%_67.5%_45.69%]" data-name="Vector">
          <div className="absolute inset-[-1.67%_-2.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.32 6.2">
              <path d={svgPaths.p26d8d670} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.17%_44.82%_67.17%_50.61%]" data-name="Vector">
          <div className="absolute inset-[-1.6%_-1.62%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.36161 6.4628">
              <path d={svgPaths.p18b75740} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_40.59%_67.5%_55.99%]" data-name="Vector">
          <div className="absolute inset-[-1.67%_-2.16%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.81999 6.2">
              <path d={svgPaths.p1b2ff200} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[42.61%_6.8%_15%_30.28%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.9471 16.9554">
            <path d={svgPaths.p3bf69a00} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[18.68%_83.04%_18.65%_7.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9343 25.07">
            <path d={svgPaths.p318daf80} fill="url(#paint0_linear_1_38)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_38" x1="11.8343" x2="-4.9457" y1="1.24" y2="18.02">
                <stop stopColor="#00A0FF" />
                <stop offset="0.01" stopColor="#00A1FF" />
                <stop offset="0.26" stopColor="#00BEFF" />
                <stop offset="0.51" stopColor="#00D2FF" />
                <stop offset="0.76" stopColor="#00DFFF" />
                <stop offset="1" stopColor="#00E3FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-[39.3%_75.52%_39.3%_16.96%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.15 8.56">
            <path d={svgPaths.pd44b100} fill="url(#paint0_linear_1_36)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_36" x1="10.93" x2="-13.26" y1="4.28" y2="4.28">
                <stop stopColor="#FFE000" />
                <stop offset="0.41" stopColor="#FFBD00" />
                <stop offset="0.78" stopColor="#FFA500" />
                <stop offset="1" stopColor="#FF9C00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-[17.83%] left-[7.73%] right-[79.91%] top-1/2" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.68 12.8699">
            <path d={svgPaths.p22c5c100} fill="url(#paint0_linear_1_160)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_160" x1="14.39" x2="-8.37" y1="2.3" y2="25.05">
                <stop stopColor="#FF3A44" />
                <stop offset="1" stopColor="#C31162" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-1/2 left-[7.73%] right-[79.91%] top-[17.83%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.68 12.8676">
            <path d={svgPaths.p158a8800} fill="url(#paint0_linear_1_128)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_128" x1="-3.14" x2="7.02" y1="-6.95235" y2="3.20764">
                <stop stopColor="#32A071" />
                <stop offset="0.07" stopColor="#2DA771" />
                <stop offset="0.48" stopColor="#15CF74" />
                <stop offset="0.8" stopColor="#06E775" />
                <stop offset="1" stopColor="#00F076" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-[60.33%_79.91%_17.84%_7.73%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.68 8.73501">
            <path d={svgPaths.p1dcf4f00} fill="var(--fill-0, black)" id="Vector" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute inset-[77.28%_92.19%_18.85%_7.4%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.545738 1.55">
            <path d={svgPaths.p2c0c5100} fill="var(--fill-0, black)" id="Vector" opacity="0.12" />
          </svg>
        </div>
        <div className="absolute bottom-[39.45%] left-[20%] right-[75.51%] top-1/2" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.06 4.22">
            <path d={svgPaths.p394ffd00} fill="var(--fill-0, black)" id="Vector" opacity="0.12" />
          </svg>
        </div>
        <div className="absolute bottom-1/2 left-[7.39%] right-[75.51%] top-[17.85%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.09 12.8603">
            <path d={svgPaths.p3f3cbd00} fill="var(--fill-0, white)" id="Vector" opacity="0.25" />
          </svg>
        </div>
        </div>
      </a>
      <a
        href="https://apps.apple.com/app/id1472483563"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Download on the App Store"
      >
        <div className="h-[37.242px] overflow-clip relative shrink-0 w-[111.727px]" data-name="Badge">
        <div className="absolute contents inset-0" data-name="Group">
          <div className="absolute contents inset-0" data-name="Group">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 40.0001">
              <g id="Group">
                <path d={svgPaths.pc62b700} fill="var(--fill-0, black)" id="Vector" />
                <path d={svgPaths.p1a6e69a0} fill="var(--fill-0, white)" id="Vector_2" />
              </g>
            </svg>
            <div className="absolute contents inset-[19.62%_8.5%_16.27%_8.03%]" data-name="<Group>">
              <div className="absolute contents inset-[19.62%_76.57%_23.77%_8.03%]" data-name="<Group>">
                <div className="absolute inset-[19.62%_76.57%_23.77%_8.03%]" data-name="<Group>">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4751 22.6448">
                    <g id="<Group>">
                      <path d={svgPaths.p392c3ac0} fill="var(--fill-0, black)" id="<Path>" />
                      <path d={svgPaths.p1cf4c200} fill="var(--fill-0, black)" id="<Path>_2" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[44.68%_8.5%_16.27%_28.77%]" data-name="Group">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.2708 15.6202">
                  <g id="Group">
                    <path d={svgPaths.p2e5b4400} fill="var(--fill-0, black)" id="Vector" />
                    <path d={svgPaths.pffac500} fill="var(--fill-0, black)" id="Vector_2" />
                    <path d={svgPaths.p1a865440} fill="var(--fill-0, black)" id="Vector_3" />
                    <path d={svgPaths.p330b1d00} fill="var(--fill-0, black)" id="Vector_4" />
                    <path d={svgPaths.p1e303df2} fill="var(--fill-0, black)" id="Vector_5" />
                    <path d={svgPaths.p20a15d00} fill="var(--fill-0, black)" id="Vector_6" />
                    <path d={svgPaths.p23168600} fill="var(--fill-0, black)" id="Vector_7" />
                    <path d={svgPaths.p49a4800} fill="var(--fill-0, black)" id="Vector_8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute contents inset-[21.09%_12.41%_63.01%_29.81%]" data-name="<Group>">
            <div className="absolute inset-[21.09%_12.41%_63.01%_29.81%]" data-name="Group">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.3382 6.35832">
                <g id="Group">
                  <path d={svgPaths.p2f79c980} fill="var(--fill-0, black)" id="Vector" />
                  <path d={svgPaths.pd854800} fill="var(--fill-0, black)" id="Vector_2" />
                  <path d={svgPaths.paec5800} fill="var(--fill-0, black)" id="Vector_3" />
                  <path d={svgPaths.p38440080} fill="var(--fill-0, black)" id="Vector_4" />
                  <path d={svgPaths.p37170580} fill="var(--fill-0, black)" id="Vector_5" />
                  <path d={svgPaths.p68ff860} fill="var(--fill-0, black)" id="Vector_6" />
                  <path d={svgPaths.pb1c1000} fill="var(--fill-0, black)" id="Vector_7" />
                  <path d={svgPaths.p25555400} fill="var(--fill-0, black)" id="Vector_8" />
                  <path d={svgPaths.p34969df0} fill="var(--fill-0, black)" id="Vector_9" />
                  <path d={svgPaths.p15d93700} fill="var(--fill-0, black)" id="Vector_10" />
                  <path d={svgPaths.p99de300} fill="var(--fill-0, black)" id="Vector_11" />
                  <path d={svgPaths.p357aef00} fill="var(--fill-0, black)" id="Vector_12" />
                  <path d={svgPaths.p22aff500} fill="var(--fill-0, black)" id="Vector_13" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        </div>
      </a>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-start left-[80px] top-[42px] w-[298px]">
      <Frame172 />
      <Frame121 />
      <div className="h-[62px] relative shrink-0 w-[272px]" data-name="image 1718">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[328.33%] left-[-10.01%] max-w-none top-[-103.91%] w-[111.47%]" src={imgImage1718} />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start pb-[10px] relative shrink-0 text-[18px] text-white">
      <button
        type="button"
        onClick={() => {
          window.location.hash = "emt";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 whitespace-nowrap hover:text-[#8ee2d2]"
      >
        Emergency Medical Technician
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "ha";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 w-[264px] hover:text-[#8ee2d2]"
      >
        Hospital Administration
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "gda";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        General Duty Assistance
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "ocha";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        OCHA
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "acha";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        ACHA
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "gca";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="cursor-pointer min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        GCA
      </button>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">Programs</p>
      <Frame4 />
    </div>
  );
}

function Frame5WithCareers({ onOpenCareers }: { onOpenCareers: () => void }) {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start relative shrink-0 text-[18px] text-white w-full">
      <p className="relative shrink-0 w-[111px] cursor-pointer transition-colors duration-200 hover:text-[#8ee2d2]">{`About Us`}</p>
      <p className="relative shrink-0 whitespace-nowrap transition-colors duration-200 hover:text-[#8ee2d2] cursor-pointer">Hospital Partners</p>
      <button
        type="button"
        onClick={onOpenCareers}
        className="min-w-full relative shrink-0 text-left w-[min-content] transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        Careers
      </button>
    </div>
  );
}

function Frame7({ onOpenCareers }: { onOpenCareers: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0 w-[157px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#25a88d] text-[20px] w-full">Company</p>
      <Frame5WithCareers onOpenCareers={onOpenCareers} />
    </div>
  );
}

function IcRoundEmail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:round-email">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:round-email">
          <path d={svgPaths.p3e50e500} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[13px] items-start relative shrink-0">
      <IcRoundEmail />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">contact@imedacademy.in</p>
    </div>
  );
}

function SolarPhoneBold() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="solar:phone-bold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="solar:phone-bold">
          <path d={svgPaths.p3f2dc880} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[13px] items-start relative shrink-0">
      <SolarPhoneBold />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">+91 92667 90357</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame10 />
      <Frame12 />
    </div>
  );
}

function Frame173() {
  return (
    <div id="contact-us" className="content-stretch flex flex-col gap-[23px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">Contact Us</p>
      <Frame11 />
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[35px]" data-name="1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="1">
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, white)" id="BG" r="17.5" />
          <path d={svgPaths.p3eeb9f80} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 h-[15.219px] ml-0 mt-0 relative row-1 w-[7.903px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.90323 15.2186">
        <g id="Group">
          <path d={svgPaths.p2e759440} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LogoFbSimple() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[13.55px] mt-[10.16px] place-items-start relative row-1" data-name="logo-fb-simple 2">
      <Group5 />
    </div>
  );
}

function Component1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="2">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[35px]" data-name="BG">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, white)" id="BG" r="17.5" />
        </svg>
      </div>
      <LogoFbSimple />
    </div>
  );
}

function AkarIconsLinkedinFill() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="akar-icons:linkedin-fill">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="akar-icons:linkedin-fill">
          <path clipRule="evenodd" d={svgPaths.pa152600} fill="var(--fill-0, #25A88D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[21px] row-1 size-[35px]">
      <AkarIconsLinkedinFill />
    </div>
  );
}

function Component2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="19">
      <Frame14 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[8.34%_4.16%_8.33%_4.17%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 11.6667">
        <g id="Group">
          <path d={svgPaths.pf014ab0} fill="var(--fill-0, #25A88D)" id="Vector" />
          <path d={svgPaths.p35937000} fill="var(--fill-0, #25A88D)" id="Vector_2" />
          <path d={svgPaths.p11c90580} fill="var(--fill-0, #25A88D)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function LineMdTwitterX() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="line-md:twitter-x">
      <Group6 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[26px] row-1 size-[35px]">
      <LineMdTwitterX />
    </div>
  );
}

function Component3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="20">
      <Frame15 />
    </div>
  );
}

function MdiYoutube() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="mdi:youtube">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="mdi:youtube">
          <path d={svgPaths.p28fdae80} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[29px] row-1 size-[35px]">
      <MdiYoutube />
    </div>
  );
}

function Component4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="21">
      <Frame16 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center ml-0 mt-0 relative row-1">
      <a
        href="https://www.instagram.com/imed_academy_/?fbclid=IwY2xjawRhEjJleHRuA2FlbQIxMQBicmlkETE2YTZTZWMwVkpnTnBueDlNc3J0YwZhcHBfaWQBMAABHtQKnEn3xPSCpWGVechsClKv5s90Gqvqv4WFolT0Ae-hvnagmTedAqkxCNoZ_aem_9xl0yX6vqRemofRGlIchGQ"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Instagram"
      >
        <Component />
      </a>
      <a
        href="https://www.facebook.com/people/IMed-Academy/61587360444802/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Facebook"
      >
        <Component1 />
      </a>
      <a
        href="https://www.linkedin.com/company/imed-academy/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="LinkedIn"
      >
        <Component2 />
      </a>
      <a
        href="https://twitter.com/imedacademy_"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Twitter"
      >
        <Component3 />
      </a>
      <a
        href="https://www.youtube.com/@imedacademy-25"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="YouTube"
      >
        <Component4 />
      </a>
    </div>
  );
}

function Social() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Social">
      <Frame13 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[74px] items-start relative shrink-0">
      <Frame173 />
      <Social />
    </div>
  );
}

function Frame123({ onOpenCareers }: { onOpenCareers: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[120px] items-start left-[452px] top-[42px]">
      <Frame8 />
      <Frame7 onOpenCareers={onOpenCareers} />
      <Frame9 />
    </div>
  );
}

function Frame6({ onOpenCareers }: { onOpenCareers: () => void }) {
  return (
    <div className="bg-[#1f3471] h-[330px] relative shrink-0 w-full">
      <Frame3 />
      <Frame123 onOpenCareers={onOpenCareers} />
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <a href="#privacy-policy" className="cursor-pointer relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">Privacy Policy</a>
      <a href="#terms-and-conditions" className="cursor-pointer relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">Terms of use</a>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute bg-[#1f3471] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[normal] not-italic px-[70px] py-[16px] relative size-full text-[14px] text-white whitespace-nowrap">
          <p className="relative shrink-0">&copy; 2026 iMED Academy. All rights reserved. &middot; NSDC Authorised Training Partner &middot; MSME Registered</p>
          <Frame124 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

function Frame17({ onOpenCareers }: { onOpenCareers: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-[9724.76px] w-[1440px]">
      <Frame6 onOpenCareers={onOpenCareers} />
      <Frame2 />
    </div>
  );
}

export function CareersFormModal({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    interestedRole: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const submitCareer = async (event: any) => {
    event.preventDefault();
    setFeedback(null);

    if (!values.name || !values.mobile || !values.email || !values.interestedRole) {
      setFeedback("Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("interestedRole", values.interestedRole);
      if (resume) {
        formData.append("resume", resume);
      }

      const response = await fetch(`${API_BASE_URL}/api/careers`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFeedback("Application submitted successfully.");
      setTimeout(() => onClose(), 800);
    } catch (_error) {
      setFeedback("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120]">
      <button type="button" onClick={onClose} aria-label="Close careers form" className="absolute inset-0 bg-[rgba(15,23,43,0.58)]" />
      <div className="absolute left-1/2 top-1/2 max-h-[92vh] w-[95vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[20px] bg-white p-[16px] shadow-[0px_20px_45px_rgba(15,23,43,0.32)] sm:p-[22px] md:p-[28px]">
        <div className="mb-[16px] flex items-start justify-between gap-[12px] md:mb-[22px] md:items-center">
          <div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] leading-[28px] text-[#1f3471] sm:text-[26px] sm:leading-[32px] md:text-[28px] md:leading-[34px]">Careers</p>
            <p className="mt-[4px] font-['Inter:Regular',sans-serif] text-[14px] leading-[20px] text-[#4a5565]">Share your details and we will contact you.</p>
          </div>
          <button type="button" onClick={onClose} className="h-[38px] w-[38px] rounded-[10px] border border-[#d1d5dc] text-[22px] leading-none text-[#1f3471]">&times;</button>
        </div>
        <form
          className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-[16px]"
          onSubmit={submitCareer}
        >
          <label className="col-span-1 flex flex-col">
            <span className="mb-[6px] block font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Name</span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              className="h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[15px] outline-none focus:border-[#25a88d]"
              placeholder="Enter your name"
            />
          </label>
          <label className="col-span-1 flex flex-col">
            <span className="mb-[6px] block font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Mobile No</span>
            <input
              type="tel"
              value={values.mobile}
              onChange={(event) => setValues((prev) => ({ ...prev, mobile: event.target.value }))}
              className="h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[15px] outline-none focus:border-[#25a88d]"
              placeholder="Enter mobile number"
            />
          </label>
          <label className="col-span-1 md:col-span-2 flex flex-col">
            <span className="mb-[6px] block font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Mail ID</span>
            <input
              type="email"
              value={values.email}
              onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              className="h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[15px] outline-none focus:border-[#25a88d]"
              placeholder="Enter email address"
            />
          </label>
          <label className="col-span-1 md:col-span-2 flex flex-col">
            <span className="mb-[6px] block font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Interested Role</span>
            <select
              value={values.interestedRole}
              onChange={(event) => setValues((prev) => ({ ...prev, interestedRole: event.target.value }))}
              className="h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[15px] outline-none focus:border-[#25a88d]"
            >
              <option value="" disabled>
                Select interested role
              </option>
              <option value="Emergency Medical Technician">Emergency Medical Technician</option>
              <option value="Hospital Administration">Hospital Administration</option>
              <option value="General Duty Assistance">General Duty Assistance</option>
            </select>
          </label>
          <label className="col-span-1 md:col-span-2 flex flex-col">
            <span className="mb-[6px] block font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Resume Upload</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => setResume(event.target.files?.[0] || null)}
              className="h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[10px] text-[14px] text-[#4a5565] file:mr-[12px] file:my-[5px] file:h-[36px] file:rounded-[8px] file:border-0 file:bg-[#e9f8f4] file:px-[12px] file:text-[13px] file:font-medium file:text-[#02765e]"
            />
          </label>
          {feedback ? <p className="col-span-1 md:col-span-2 text-[13px] text-[#1f3471]">{feedback}</p> : null}
          <div className="col-span-1 md:col-span-2 mt-[6px] flex flex-col-reverse gap-[10px] sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="h-[44px] rounded-[10px] border border-[#d1d5dc] px-[18px] font-['Inter:Medium',sans-serif] text-[14px] text-[#364153]">Cancel</button>
            <button disabled={isSubmitting} type="submit" className="h-[44px] rounded-[10px] bg-[#25a88d] px-[22px] font-['Inter:Semi_Bold',sans-serif] text-[14px] text-white disabled:opacity-70">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">About iMED Academy</p>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`Building India's Allied Healthcare Workforce`}</p>
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading13 />
      <Heading14 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[10px] items-start leading-[32.5px] not-italic relative shrink-0 text-[20px] w-full">
      <p className="h-[297px] relative shrink-0 text-[#4a5565] text-justify w-full">{`iMED Academy is a Career-focused Healthcare training institute dedicated to preparing industry-ready professionals through practical, skill-based education. As an NSDC-certified training partner aligned with the standards of the Healthcare Sector Skill Council (HSSC), the Academy offers specialized programs in allied Healthcare fields such as Hospital Administration, Emergency Medical Technician (EMT), General Duty Assistant (GDA), GCA (Geriatric Care Assistant), PCC (Patient Care Coordinator), Patient Counsellor, Health Insurance & TPA Claims, Hospital Front Office + Medical Billing.`}</p>
      <p className="relative shrink-0 text-[#333] w-full">Learn. Get Certified. Get Placed.</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#25a88d] col-1 h-[42px] ml-0 mt-0 opacity-24 rounded-[5px] row-1 w-[173px]" />
      <p className="col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] ml-[13px] mt-[13px] not-italic relative row-1 text-[#02765e] text-[20px] whitespace-nowrap">NSDC Certified</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#25a88d] col-1 h-[42px] ml-0 mt-0 opacity-24 rounded-[5px] row-1 w-[162px]" />
      <p className="col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] ml-[13px] mt-[13px] not-italic relative row-1 text-[#02765e] text-[20px] whitespace-nowrap">HSSC Aligned</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#25a88d] col-1 h-[42px] ml-0 mt-0 opacity-24 rounded-[5px] row-1 w-[193px]" />
      <p className="col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] ml-[13px] mt-[13px] not-italic relative row-1 text-[#02765e] text-[20px] whitespace-nowrap">Hospital Partners</p>
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0 w-full">
      <Group38 />
      <Group40 />
      <Group41 />
    </div>
  );
}

function Group39() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#25a88d] col-1 h-[42px] ml-0 mt-0 opacity-24 rounded-[5px] row-1 w-[269px]" />
      <p className="col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] ml-[13px] mt-[13px] not-italic relative row-1 text-[#02765e] text-[20px] whitespace-nowrap">100% Placement Support</p>
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start leading-[0] relative shrink-0 w-[588px]">
      <Frame131 />
      <Group39 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[662px]">
      <Frame129 />
      <Frame130 />
    </div>
  );
}

function Container34() {
  return <div className="absolute bg-white left-[402px] opacity-4 rounded-[40806480px] size-[146px] top-[67px]" data-name="Container" />;
}

function Frame134() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 whitespace-nowrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[40px]">40+</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[39px] relative shrink-0 text-[20px]">Hospital Partners</p>
    </div>
  );
}

function Frame133() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[5px] items-start left-[50px] not-italic text-white top-[calc(50%-0.5px)] w-[345px]">
      <Frame134 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[20px] w-[min-content]">Trusted by top hospital across India</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[126px] overflow-clip relative rounded-[12px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(123.712deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)" }} data-name="Container">
      <Container34 />
      <Frame133 />
    </div>
  );
}

function MaterialSymbolsMapRounded() {
  return (
    <div className="h-[23.75px] relative shrink-0 w-[24px]" data-name="material-symbols:map-rounded">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.75">
        <g id="material-symbols:map-rounded">
          <path d={svgPaths.p151e6c00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame137() {
  return (
    <div className="content-stretch flex gap-[5px] items-end relative shrink-0 w-full">
      <MaterialSymbolsMapRounded />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">Delhi NCR</p>
    </div>
  );
}

function Frame136() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] w-[126px]">
      <Frame137 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[65px] overflow-clip relative rounded-[12px] shrink-0 w-[177px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_16px_30px_rgba(31,52,113,0.28)] hover:brightness-110 cursor-pointer" style={{ backgroundImage: "linear-gradient(112.27deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)" }} data-name="Container">
      <Frame136 />
    </div>
  );
}

function MaterialSymbolsMapRounded1() {
  return (
    <div className="h-[23.75px] relative shrink-0 w-[24px]" data-name="material-symbols:map-rounded">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.75">
        <g id="material-symbols:map-rounded">
          <path d={svgPaths.p151e6c00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame139() {
  return (
    <div className="content-stretch flex gap-[5px] items-end relative shrink-0 w-full">
      <MaterialSymbolsMapRounded1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">Banglore</p>
    </div>
  );
}

function Frame138() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[4px] items-center left-[calc(50%+0.5px)] top-[calc(50%+1px)] w-[116px]">
      <Frame139 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white w-full">Opening Soon</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[65px] overflow-clip relative rounded-[12px] shrink-0 w-[177px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_16px_30px_rgba(31,52,113,0.28)] hover:brightness-110 cursor-pointer" style={{ backgroundImage: "linear-gradient(112.27deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)" }} data-name="Container">
      <Frame138 />
    </div>
  );
}

function MaterialSymbolsMapRounded2() {
  return (
    <div className="h-[23.75px] relative shrink-0 w-[24px]" data-name="material-symbols:map-rounded">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.75">
        <g id="material-symbols:map-rounded">
          <path d={svgPaths.p151e6c00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex gap-[5px] items-end relative shrink-0 w-full">
      <MaterialSymbolsMapRounded2 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">{` Kochi`}</p>
    </div>
  );
}

function Frame140() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%-0.5px)] top-1/2 w-[88px]">
      <Frame141 />
      {/* <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white w-full">Opening Soon</p> */}
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[65px] overflow-clip relative rounded-[12px] shrink-0 w-[177px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_16px_30px_rgba(31,52,113,0.28)] hover:brightness-110 cursor-pointer" style={{ backgroundImage: "linear-gradient(112.27deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)" }} data-name="Container">
      <Frame140 />
    </div>
  );
}

function Frame135() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Container35 />
      <Container36 />
      <Container37 />
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[559px]">
      <Container33 />
      <Frame135 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-start relative shrink-0 w-[662px]">
      <Frame128 />
      <Frame132 />
    </div>
  );
}

function Frame142() {
  return (
    <div className="bg-[#824747] h-[697px] overflow-clip relative rounded-[15px] shrink-0 w-[620px]">
      <div className="-translate-x-1/2 absolute h-[1067px] left-1/2 top-[-47px] w-[712px]" data-name="image 1709">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1709} />
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%-228px)] not-italic text-[22px] text-black top-[590px] whitespace-nowrap">
        <span className="leading-[22px]">{`One Nation. `}</span>
        <span className="leading-[22px] text-[#1f3471]">Many States.</span>
        <span className="leading-[22px]">{` `}</span>
        <span className="font-['Inter:Semi_Bold_Italic',sans-serif] italic leading-[22px] text-[#25a88d]">One Career Path.</span>
      </p>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex gap-[19px] items-start relative shrink-0 w-[1270px]">
      <Frame127 />
      <Frame142 />
    </div>
  );
}

function About4() {
  return (
    <div id="about-imed" className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 pr-[32px] py-[60px] top-[1238px] w-[1440px]" data-name="About">
      <Frame125 />
      <Frame126 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[59.5px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">iMED Online</p>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[97px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[#1f3471] text-[40px] top-[-1px] w-[551px]">Online Certificate in Hospital Administration</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[61px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#4a5565] text-[20px] top-[-2px] w-[583px]">A 3-month weekend program for working professionals entering Healthcare Administration.</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[620px]" data-name="Container">
      <Heading15 />
      <Heading16 />
      <Paragraph13 />
    </div>
  );
}

function MdiTick13() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="mdi:tick">
          <path d={svgPaths.p159e99f0} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame145() {
  return (
    <div className="col-1 content-stretch flex gap-[15px] items-center ml-0 mt-0 relative row-1">
      <MdiTick13 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">3 Months - weekends only (4 hrs/day)</p>
    </div>
  );
}

function MdiTick14() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="mdi:tick">
          <path d={svgPaths.p159e99f0} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame146() {
  return (
    <div className="col-1 content-stretch flex gap-[15px] items-center ml-0 mt-[40px] relative row-1">
      <MdiTick14 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">100% Online, Live instructor-led</p>
    </div>
  );
}

function MdiTick15() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="mdi:tick">
          <path d={svgPaths.p159e99f0} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame147() {
  return (
    <div className="col-1 content-stretch flex gap-[15px] items-center ml-0 mt-[80px] relative row-1">
      <MdiTick15 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">iMED Academy Certification</p>
    </div>
  );
}

function MdiTick16() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="mdi:tick">
          <path d={svgPaths.p159e99f0} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame148() {
  return (
    <div className="col-1 content-stretch flex gap-[15px] items-center ml-0 mt-[120px] relative row-1">
      <MdiTick16 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">Careers: Medical Billing, Insurance Billing, Hospital Admin</p>
    </div>
  );
}

function Group42() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame145 />
      <Frame146 />
      <Frame147 />
      <Frame148 />
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[620px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">Program Highlights</p>
      <Group42 />
    </div>
  );
}

function Frame30() {

  return (
    <div onClick={()=>{
  window.location.hash = "ocha";
          window.scrollTo({ top: 0, behavior: "smooth" });
    }}  className="bg-[#25a88d] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px] cursor-pointer">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Now</p>
    </div>
  );
}

function Frame143() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-start relative shrink-0">
      <Container38 />
      <Frame144 />
      <Frame30 />
    </div>
  );
}

function Frame149() {
  return (
    <div className="bg-[#824747] h-[565px] overflow-clip relative rounded-[15px] shrink-0 w-[620px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[620px] top-[calc(50%+27.74px)]" data-name="image 1723">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1723} />
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%-222px)] not-italic text-[22px] text-black top-[604px] whitespace-nowrap">
        <span className="leading-[22px]">{`One Nation. `}</span>
        <span className="leading-[22px] text-[#1f3471]">Many States.</span>
        <span className="leading-[22px]">{` `}</span>
        <span className="leading-[22px] text-[#25a88d]">{`One Career Path `}</span>
      </p>
    </div>
  );
}

function About5() {
  return (
    <div id="imed-online" className="-translate-x-1/2 absolute bg-white content-stretch flex gap-[40px] items-start left-1/2 pl-[69px] pr-[32px] py-[60px] top-[5626.76px] w-[1440px]" data-name="About">
      <Frame143 />
      <Frame149 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">{`Scope & Demand`}</p>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">Scope and Salary in India</p>
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading17 />
      <Heading18 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.6px] whitespace-nowrap">Tell us about you</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-0.2px] w-[351px]">{`Estimates are Monthly, gross based on iMED Placement data & HSSC industry benchmarks.`}</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph14 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (nextValue: string) => void;
}) {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full cursor-pointer" data-name="Dropdown">
      <label className="absolute content-stretch flex h-[19px] items-start left-0 top-[3px] w-full font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px]">
        {label}
      </label>
      <div className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24px] w-[540px] cursor-pointer">
        <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <select
          aria-label={label}
          className="bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium h-full leading-[24px] not-italic text-[#101828] text-[16px] text-left w-full outline-none appearance-none pr-[28px]"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-0.2px] whitespace-nowrap">Experience</p>
      </div>
    </div>
  );
}

function Text4({ experienceYears }: { experienceYears: number }) {
  return (
    <div className="h-[20px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-0.2px] whitespace-nowrap">{`${experienceYears} yrs`}</p>
      </div>
    </div>
  );
}

function Container44({ experienceYears }: { experienceYears: number }) {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-0 top-[0.2px] w-[540px]" data-name="Container">
      <Label9 />
      <Text4 experienceYears={experienceYears} />
    </div>
  );
}

function RangeSlider({
  experienceYears,
  onExperienceChange,
}: {
  experienceYears: number;
  onExperienceChange: (value: number) => void;
}) {
  return (
    <input
      aria-label="Experience in years"
      className="absolute left-0 top-[34px] w-[540px] accent-[#25a88d]"
      max={15}
      min={0}
      onChange={(event) => onExperienceChange(Number(event.target.value))}
      step={1}
      type="range"
      value={experienceYears}
    />
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">0 yrs</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">15 yrs</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-0 top-[54.2px] w-[540px]" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function ExperienceSlider({
  experienceYears,
  onExperienceChange,
}: {
  experienceYears: number;
  onExperienceChange: (value: number) => void;
}) {
  return (
    <div className="h-[70.388px] relative shrink-0 w-full" data-name="ExperienceSlider">
      <Container44 experienceYears={experienceYears} />
      <RangeSlider experienceYears={experienceYears} onExperienceChange={onExperienceChange} />
      <Container45 />
    </div>
  );
}

function Container43({
  selections,
  onUpdateSelection,
}: {
  selections: ScopeDemandSelections;
  onUpdateSelection: <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <SelectField label="Healthcare Role" onChange={(value) => onUpdateSelection("healthcareRole", value)} options={HEALTHCARE_ROLE_OPTIONS} value={selections.healthcareRole} />
      <SelectField label="City Tier" onChange={(value) => onUpdateSelection("cityTier", value)} options={CITY_TIER_OPTIONS} value={selections.cityTier} />
      <SelectField label="Hospital Type" onChange={(value) => onUpdateSelection("hospitalType", value)} options={HOSPITAL_TYPE_OPTIONS} value={selections.hospitalType} />
      <ExperienceSlider experienceYears={selections.experienceYears} onExperienceChange={(value) => onUpdateSelection("experienceYears", value)} />
      <SelectField label="Shift" onChange={(value) => onUpdateSelection("shift", value)} options={SHIFT_OPTIONS} value={selections.shift} />
    </div>
  );
}

function Container41({
  selections,
  onUpdateSelection,
}: {
  selections: ScopeDemandSelections;
  onUpdateSelection: <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => void;
}) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[831px] items-start left-0 pt-[48px] px-[48px] top-0 w-[636px]" data-name="Container">
      <Container42 />
      <Container43 onUpdateSelection={onUpdateSelection} selections={selections} />
    </div>
  );
}
function Container47() {
  return (
    <div className="absolute h-[830.588px] left-0 opacity-5 top-0 w-[669.6px]" data-name="Container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img loading="lazy" decoding="async" alt="" className="absolute h-[24.08%] left-0 max-w-none top-0 w-[29.87%]" src={imgContainer} />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-[rgba(0,187,167,0.2)] h-[32px] left-0 rounded-[26843500px] top-0 w-[194.463px]" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#46ecd5] text-[14px] top-[5.8px] whitespace-nowrap">Estimated Monthly Salary</p>
    </div>
  );
}

function Heading19({ healthcareRole }: { healthcareRole: string }) {
  return (
    <div className="absolute content-stretch flex h-[31.988px] items-start left-0 top-[48px] w-[573.6px]" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-px not-italic relative text-[24px] text-white">{healthcareRole}</p>
    </div>
  );
}

function Paragraph15({
  cityTier,
  hospitalType,
  experienceYears,
  shift,
}: {
  cityTier: string;
  hospitalType: string;
  experienceYears: number;
  shift: string;
}) {
  return (
    <div className="absolute h-[20px] left-0 top-[95.99px] w-[573.6px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">{`${cityTier} ? ${hospitalType} ? ${experienceYears} yrs exp ? ${shift}`}</p>
    </div>
  );
}

function Container49({ selections }: { selections: ScopeDemandSelections }) {
  return (
    <div className="h-[115.988px] relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Heading19 healthcareRole={selections.healthcareRole} />
      <Paragraph15 cityTier={selections.cityTier} experienceYears={selections.experienceYears} hospitalType={selections.hospitalType} shift={selections.shift} />
    </div>
  );
}

function Container52({ monthlyGross }: { monthlyGross: number }) {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[48px] text-white top-[-3px] whitespace-nowrap">{`Rs ${formatInr(monthlyGross)}`}</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">per month, gross</p>
    </div>
  );
}

function Container51({ monthlyGross }: { monthlyGross: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container52 monthlyGross={monthlyGross} />
      <Paragraph16 />
    </div>
  );
}
function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[23.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">Min</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">Max</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container56() {
  return <div className="bg-gradient-to-r from-[#00bba7] h-[12px] rounded-[26843500px] shrink-0 to-[#00d5be] w-full" data-name="Container" />;
}

function Container55() {
  return (
    <div className="bg-[#162456] h-[12px] relative rounded-[26843500px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[86.037px] pr-[86.05px] relative size-full">
          <Container56 />
        </div>
      </div>
    </div>
  );
}

function Text10({ minValue }: { minValue: number }) {
  return (
    <div className="h-[20px] relative shrink-0 w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.2px] whitespace-nowrap">{`Rs ${formatInr(minValue)}`}</p>
      </div>
    </div>
  );
}

function Text11({ maxValue }: { maxValue: number }) {
  return (
    <div className="h-[20px] relative shrink-0 w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.2px] whitespace-nowrap">{`Rs ${formatInr(maxValue)}`}</p>
      </div>
    </div>
  );
}

function Container57({ minValue, maxValue }: { minValue: number; maxValue: number }) {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Text10 minValue={minValue} />
        <Text11 maxValue={maxValue} />
      </div>
    </div>
  );
}

function Container53({ minValue, maxValue }: { minValue: number; maxValue: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
      <Container57 minValue={minValue} maxValue={maxValue} />
    </div>
  );
}

function Heading20() {
  return (
    <div className="absolute h-[28px] left-[24.8px] top-[24.8px] w-[524px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px] whitespace-nowrap">Breakdown</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[149.45px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">Base salary (monthly)</p>
      </div>
    </div>
  );
}

function Text13({ baseMonthly }: { baseMonthly: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic right-0 tabular-nums text-[16px] text-right text-white top-[-2.2px] whitespace-nowrap">{`${formatInr(baseMonthly)}`}</p>
      </div>
    </div>
  );
}

function Container59({ salary }: { salary: SalaryBreakdown }) {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[68.8px] w-[524px]" data-name="Container">
      <Text12 />
      <Text13 baseMonthly={salary.baseMonthly} />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[127.537px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">HRA + allowances</p>
      </div>
    </div>
  );
}

function Text15({ hraAllowances }: { hraAllowances: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic right-0 tabular-nums text-[16px] text-right text-white top-[-2.2px] whitespace-nowrap">{`${formatInr(hraAllowances)}`}</p>
      </div>
    </div>
  );
}

function Container60({ salary }: { salary: SalaryBreakdown }) {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[108.8px] w-[524px]" data-name="Container">
      <Text14 />
      <Text15 hraAllowances={salary.hraAllowances} />
    </div>
  );
}

function Container61() {
  return <div className="absolute bg-[rgba(255,255,255,0.1)] h-px left-[24.8px] top-[148.8px] w-[524px]" data-name="Container" />;
}

function Text16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[161.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">Annual gross (CTC est.)</p>
      </div>
    </div>
  );
}

function Text17({ annualGross }: { annualGross: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic right-0 tabular-nums text-[16px] text-right text-white top-[-2.2px] whitespace-nowrap">{`${formatInr(annualGross)}`}</p>
      </div>
    </div>
  );
}

function Container62({ salary }: { salary: SalaryBreakdown }) {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[165.8px] w-[524px]" data-name="Container">
      <Text16 />
      <Text17 annualGross={salary.annualGross} />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[193.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#46ecd5] text-[16px] top-[-2.2px] whitespace-nowrap">Estimated take-home / month</p>
      </div>
    </div>
  );
}

function Text19({ takeHomeMonthly }: { takeHomeMonthly: number }) {
  return (
    <div className="h-[28px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic right-0 tabular-nums text-[#46ecd5] text-[18px] text-right top-[-1.4px] whitespace-nowrap">{`${formatInr(takeHomeMonthly)}`}</p>
      </div>
    </div>
  );
}

function Container63({ salary }: { salary: SalaryBreakdown }) {
  return (
    <div className="absolute bg-[rgba(0,187,167,0.2)] content-stretch flex h-[52px] items-center justify-between left-[0.8px] px-[24px] py-[12px] rounded-[10px] top-[205.8px] w-[572px]" data-name="Container">
      <Text18 />
      <Text19 takeHomeMonthly={salary.takeHomeMonthly} />
    </div>
  );
}

function Container58({ salary }: { salary: SalaryBreakdown }) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] h-[282.6px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Heading20 />
      <Container59 salary={salary} />
      <Container60 salary={salary} />
      <Container61 />
      <Container62 salary={salary} />
      <Container63 salary={salary} />
    </div>
  );
}
function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16699 10H15.8337" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame174() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center justify-center left-[185px] top-[15.65px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Talk to a Career Expert</p>
      <Icon10 />
    </div>
  );
}

function Button7() {
  const handleClick = () => {
    const element = document.getElementById('contact-us');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div onClick={handleClick} className="bg-[#00bba7] h-[56px] relative rounded-[26843500px] shrink-0 w-full cursor-pointer" data-name="Button">
      <Frame174 />
    </div>
  );
}

function Container48({
  selections,
  salary,
}: {
  selections: ScopeDemandSelections;
  salary: SalaryBreakdown;
}) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[734.588px] items-start left-[48px] top-[48px] w-[573.6px]" data-name="Container">
      <Container49 selections={selections} />
      <Container51 monthlyGross={salary.monthlyGross} />
      <Container53 minValue={salary.monthlyMin} maxValue={salary.monthlyMax} />
      <Container58 salary={salary} />
      <Button7 />
    </div>
  );
}

function Container46({
  selections,
  salary,
}: {
  selections: ScopeDemandSelections;
  salary: SalaryBreakdown;
}) {
  return (
    <div className="absolute h-[831px] left-[636px] overflow-clip top-0 w-[670px]" style={{ backgroundImage: "linear-gradient(128.878deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%)" }} data-name="Container">
      <Container47 />
      <Container48 salary={salary} selections={selections} />
    </div>
  );
}

function Container40({
  selections,
  salary,
  onUpdateSelection,
}: {
  selections: ScopeDemandSelections;
  salary: SalaryBreakdown;
  onUpdateSelection: <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => void;
}) {
  return (
    <div className="h-[830.588px] relative shrink-0 w-full" data-name="Container">
      <Container41 onUpdateSelection={onUpdateSelection} selections={selections} />
      <Container46 salary={salary} selections={selections} />
    </div>
  );
}

function Container39({
  selections,
  salary,
  onUpdateSelection,
}: {
  selections: ScopeDemandSelections;
  salary: SalaryBreakdown;
  onUpdateSelection: <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => void;
}) {
  return (
    <div className="bg-white content-stretch flex flex-col h-[831px] items-start overflow-clip relative rounded-[16px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[1306px]" data-name="Container">
      <Container40 onUpdateSelection={onUpdateSelection} salary={salary} selections={selections} />
    </div>
  );
}

function About6({
  selections,
  salary,
  onUpdateSelection,
}: {
  selections: ScopeDemandSelections;
  salary: SalaryBreakdown;
  onUpdateSelection: <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => void;
}) {
  return (
    <div className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[60px] top-[3468.76px] w-[1440px]" data-name="About">
      <Frame150 />
      <Container39 onUpdateSelection={onUpdateSelection} salary={salary} selections={selections} />
    </div>
  );
}

export default function HomePage({ onOpenCareers }: { onOpenCareers: () => void }) {
  const designWidth = 1440;
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const [scopeDemandSelections, setScopeDemandSelections] = useState<ScopeDemandSelections>({
    healthcareRole: HEALTHCARE_ROLE_OPTIONS[0],
    cityTier: CITY_TIER_OPTIONS[0],
    hospitalType: HOSPITAL_TYPE_OPTIONS[1],
    shift: SHIFT_OPTIONS[0],
    experienceYears: 0,
  });
  const [isPopupVisible, setIsPopupVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("homePopupDismissed") !== "true";
  });
  const salaryBreakdown = computeSalaryBreakdown(scopeDemandSelections);

  const closePopup = () => {
    setIsPopupVisible(false);
    sessionStorage.setItem("homePopupDismissed", "true");
  };

  const updateScopeDemandSelection = <K extends keyof ScopeDemandSelections>(key: K, value: ScopeDemandSelections[K]) => {
    setScopeDemandSelections((prev) => ({ ...prev, [key]: value }));
  };

  useLayoutEffect(() => {
    const updateScale = () => {
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const nextScale = viewportWidth / designWidth;
      setPageScale(nextScale);

      if (pageRef.current) {
        setScaledHeight(Math.ceil(pageRef.current.offsetHeight * nextScale));
      }
    };

    const resizeObserver = new ResizeObserver(updateScale);
    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);


  return (
    <div
      className="bg-white overflow-x-hidden relative w-full"
      data-name="Home Page"
      style={{ height: scaledHeight ? `${scaledHeight}px` : "100vh" }}
    >
      {isPopupVisible && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[rgba(7,16,40,0.25)] backdrop-blur-[6px] px-4 py-6 overflow-y-auto">
          <div className="relative w-[min(900px,100%)] my-auto">
            <div className="relative flex justify-center">
              <div className="relative overflow-hidden rounded-[12px]">
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close popup"
                  className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ece8] bg-white text-[#24406f] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
                <img
                  src={imgHomePopup}
                  alt="Popup"
                  className="w-full h-auto max-h-[80vh] object-contain cursor-pointer rounded-[12px]"
                  onClick={() => {
                    closePopup();
                    const el = document.getElementById("contact-us");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .trusted-mask {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .trusted-track {
          display: flex;
          width: max-content;
          align-items: center;
          will-change: transform;
          transform: translate3d(0,0,0);
        }
        .trusted-group {
          display: flex;
          align-items: center;
          gap: 50px;
        }
        .trusted-track > div > div {
          filter: grayscale(1);
          opacity: 0.7;
          transition: filter 220ms ease, opacity 220ms ease;
        }
        .trusted-track > div > div:hover {
          filter: grayscale(0);
          opacity: 1;
        }
        .trusted-mask:hover .trusted-track {
          animation-play-state: paused;
        }
        .trusted-row-rtl {
          animation: trustedPartnersRTL 16s linear infinite;
        }
        .trusted-row-ltr {
          animation: trustedPartnersLTR 18s linear infinite;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes trustedPartnersRTL {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @keyframes trustedPartnersLTR {
          0% { transform: translate3d(-50%,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
      `}</style>
      <div
        className="fixed left-0 top-0 z-[200] origin-top-left"
        style={{ transform: `scale(${pageScale})`, width: `${designWidth}px` }}
      >
        <NavBar />
      </div>
      <div
        ref={pageRef}
        className="origin-top-left"
        style={{ transform: `scale(${pageScale})`, width: `${designWidth}px` }}
      >
        <div className="bg-white relative size-full">
          <MainPage />
          <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(255,255,255,0)] h-[231px] left-1/2 to-[45.416%] to-white top-[641px] w-[1440px]" />
          <Container />
          <Container10 />
          <About />
          <About1 />
          <About2 />
          <About3 />
          <Container21 />
          <WhyChooseUs />
          <Contact />
          <Frame17 onOpenCareers={onOpenCareers} />

          <About4 />
          <About5 />
          <About6 onUpdateSelection={updateScopeDemandSelection} salary={salaryBreakdown} selections={scopeDemandSelections} />
        </div>
      </div>
    </div>
  );
}



















