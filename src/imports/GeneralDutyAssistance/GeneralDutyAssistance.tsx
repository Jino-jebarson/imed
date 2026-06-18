import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import svgPaths from "./svg-xfxxydqmnt";
import imgImage1712 from "../Ocha/36b610493eb683f0e81e17848fd143c365f117fd.png";
import imgImage1722 from "./image1722.webp";
import imgImage1745 from "./image1745.webp";
import imgImage1709 from "./image1709.webp";
import imgContainer from "./container.png";
import imgImage1723 from "./image1723.webp";
import imgImage1724 from "./image1724.webp";
import imgImage1718 from "./image1718.png";
import ScopeSalarySection from "../../app/components/ScopeSalarySection";

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div
        className="col-1 h-[29px] ml-0 mt-0 relative row-1 w-[22.895px]"
        data-name="image 1712"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]"
            src={imgImage1712}
          />
        </div>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div data-nav-target="home" className="content-stretch flex gap-[10px] items-center leading-[0] relative shrink-0 w-[203px] cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
      <Group12 />
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[18px] not-italic relative shrink-0 text-[#1f3471] text-[22.992px] text-center w-[170px]">
        <span className="leading-[21px]">{`iMED `}</span>
        <span className="leading-[21px] text-[#25a88d]">Academy</span>
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <button
      data-nav-target="career-path"
      className="group block h-[24px] relative shrink-0 w-[65px] transition-colors duration-200 hover:text-[#1f3471]"
    >
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">
        Program
      </p>
      <span aria-hidden="true" className="absolute pointer-events-none left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[72%]" />
    </button>
  );
}

function Frame20() {
  return (
    <button
      data-nav-target="why-imed"
      className="group block h-[24px] relative shrink-0 w-[109px] transition-colors duration-200 hover:text-[#1f3471]"
    >
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[54.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">
        About Us
      </p>
      <span aria-hidden="true" className="absolute pointer-events-none left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[78%]" />
    </button>
  );
}

function Frame21() {
  return (
    <button
      data-nav-target="contact-us"
      className="group block h-[24px] relative shrink-0 w-[95px] transition-colors duration-200 hover:text-[#1f3471]"
    >
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[47.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 hover:text-[#1f3471]">
        Contact Us
      </p>
      <span aria-hidden="true" className="absolute pointer-events-none left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0 w-[510px]">
      <Frame17 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Button() {
  return (
    <div
      data-nav-target="contact-us"
      className="bg-[#25a88d] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px]"
      data-name="Button"
    >
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function NavBar() {
  return (
    <div
      className="bg-white flex h-[72px] items-center justify-between overflow-visible px-[68px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] w-[1440px]"
      data-name="Nav Bar"
    >
      <Group13 />
      <Frame22 />
      <Button />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold items-start relative shrink-0 text-[50px]">
      <div className="h-[69px] leading-[0] relative shrink-0 text-white w-[482px]">
        <p className="leading-[70px] mb-0">Build Your Career in</p>
        <p className="leading-[70px]"></p>
      </div>
      <p className="h-[139px] leading-[70px] relative shrink-0 text-[#25a88d] w-[587px]">
        General Duty Assistance
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 w-full">
      <Frame36 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] relative shrink-0 text-[20px] text-white w-[684px] whitespace-pre-wrap">{`Industry-focused program with practical training and internship opportunities  designed to launch you into healthcare management leadership roles.`}</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#25a88d] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px] cursor-pointer">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-[50px] relative rounded-[12px] shrink-0 w-[210px] cursor-pointer">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
          Talk to Experts
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0">
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[20px] h-[408px] items-start left-[67px] top-1/2 w-[732px]">
      <Frame26 />
      <Frame25 />
    </div>
  );
}

function Frame15() {
  return (
    <div
      id="imed-online"
      data-nav="imed-online"
      className="absolute bg-[#1f3471] h-[666px] left-0 overflow-clip top-[66px] w-[1440px]"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[665px] left-[calc(50%+269px)] top-[calc(50%+0.5px)] w-[998px]"
        data-name="image 1722"
      >
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute inset-0 max-w-none object-cover opacity-47 pointer-events-none size-full"
          src={imgImage1722}
        />
      </div>
      <div className="absolute bg-gradient-to-r from-[#1f3471] from-[12.981%] h-[665px] left-[490px] to-[rgba(31,52,113,0)] top-px w-[311px]" />
      <Frame27 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        Program Overview
      </p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[calc(50%+0.5px)] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">
        What is General Duty Assistance?
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1274px]">
      <Heading1 />
      <Heading2 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#824747] h-[423px] overflow-clip relative rounded-[15px] shrink-0 w-[657px]">
      <div
        className="absolute h-[438px] left-0 top-0 w-[657px]"
        data-name="image 1745"
      >
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage1745}
        />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[20px] text-justify w-full whitespace-pre-wrap">
        <p className="leading-[32.5px] mb-0">
          General Duty Assistance (GDA) is a healthcare support role that
          focuses on helping patients with their basic daily needs and assisting
          medical staff in hospitals, clinics, or home care settings. A General
          Duty Assistant is responsible for tasks such as helping patients with
          personal hygiene, feeding, mobility, and comfort, as well as
          maintaining cleanliness in patient areas and transporting patients
          when needed.
        </p>
        <p className="leading-[32.5px] mb-0"></p>
        <p className="leading-[32.5px]">{`Although they do not perform advanced medical procedures, they play a vital role in ensuring patient well-being and supporting nurses and doctors in routine care. `}</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame39 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[581px]">
      <Frame40 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[68px] items-start relative shrink-0 w-[1304px]">
      <Frame31 />
      <Frame52 />
    </div>
  );
}

function About() {
  return (
    <div
      id="why-imed"
      data-nav="why-imed"
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 py-[60px] top-[732px] w-[1440px]"
      data-name="About"
    >
      <Frame44 />
      <Frame43 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[calc(50%+0.5px)] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        Curriculum Highlights
      </p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`What you'll learn`}</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1274px]">
      <Heading3 />
      <Heading4 />
    </div>
  );
}

function MdiTickCircleOutline() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline />
    </div>
  );
}

function Frame70() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame69 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Patient care support fundamentals
      </p>
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame70 />
    </div>
  );
}

function MdiTickCircleOutline1() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline1 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame72 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Patient mobility and transfer support
      </p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame71 />
    </div>
  );
}

function MdiTickCircleOutline2() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline2 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame74 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Communication with patients and families
      </p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame73 />
    </div>
  );
}

function MdiTickCircleOutline3() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline3 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame76 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Hospital documentation basics
      </p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame75 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[600px]">
      <Frame78 />
      <Frame79 />
      <Frame80 />
      <Frame81 />
    </div>
  );
}

function MdiTickCircleOutline4() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame83() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline4 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame83 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Ward assistance and hospital hygiene
      </p>
    </div>
  );
}

function Frame82() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame77 />
    </div>
  );
}

function MdiTickCircleOutline5() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline5 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame89 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Basic vital-sign awareness
      </p>
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame85 />
    </div>
  );
}

function MdiTickCircleOutline6() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame92() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline6 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame92 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Infection control and safety practices
      </p>
    </div>
  );
}

function Frame90() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame91 />
    </div>
  );
}

function MdiTickCircleOutline7() {
  return (
    <div
      className="relative shrink-0 size-[25px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p10670600}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame95() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] content-stretch flex items-center overflow-clip p-[5px] relative rounded-[8px] shrink-0">
      <MdiTickCircleOutline7 />
    </div>
  );
}

function Frame94() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[15px] items-center left-[15px] top-[calc(50%+0.5px)]">
      <Frame95 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap">
        Practical skills-lab training
      </p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="bg-white h-[73px] overflow-clip relative rounded-[6px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-full">
      <Frame94 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[600px]">
      <Frame82 />
      <Frame84 />
      <Frame90 />
      <Frame93 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex gap-[40px] items-center justify-center relative shrink-0">
      <Frame87 />
      <Frame86 />
    </div>
  );
}

function About1() {
  return (
    <div
      id="trusted-partners"
      data-nav="trusted-partners"
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[32px] py-[60px] top-[1465px] w-[1440px]"
      data-name="About"
    >
      <Frame45 />
      <Frame88 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        Program Details
      </p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[calc(50%+0.5px)] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`Course Details & Requirements`}</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1274px]">
      <Heading5 />
      <Heading6 />
    </div>
  );
}

function MdiClockOutline() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[28px] top-1/2"
      data-name="mdi:clock-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:clock-outline">
          <path
            d={svgPaths.pb2da780}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame99() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[12px] shrink-0 size-[50px]">
      <MdiClockOutline />
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[23px] not-italic relative shrink-0 text-[18px] w-[192px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[#1f3471] w-[min-content]">
        Duration
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#333] text-center w-[281px]">
        3 Months (2 Months Class Room Training + 1 Months Internship)
      </p>
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame99 />
      <Frame100 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="bg-white relative rounded-[21px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[30px] pr-[20px] py-[20px] relative size-full">
          <Frame101 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute inset-[18.75%_8.24%_18.75%_4.17%]"
      data-name="Group"
    >
      <div className="absolute inset-[-5.71%_-4.08%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 26.5257 19.5"
        >
          <g id="Group">
            <path
              d={svgPaths.p240f1a00}
              id="Vector"
              stroke="var(--stroke-0, #25A88D)"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p287b7b80}
              id="Vector_2"
              stroke="var(--stroke-0, #25A88D)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconParkOutlineDegreeHat() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[28px] top-1/2"
      data-name="icon-park-outline:degree-hat"
    >
      <Group />
    </div>
  );
}

function Frame106() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[12px] shrink-0 size-[50px]">
      <IconParkOutlineDegreeHat />
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[23px] not-italic relative shrink-0 text-[18px] w-[192px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[#1f3471] w-[min-content]">
        Eligibility
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#333] text-center w-[216px]">
        12th Pass - Any Stream
      </p>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame106 />
      <Frame107 />
    </div>
  );
}

function Frame104() {
  return (
    <div className="bg-white relative rounded-[21px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[30px] pr-[20px] py-[20px] relative size-full">
          <Frame105 />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%_12.5%_0.78%_12.5%]" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 25.4497"
      >
        <g id="Group">
          <g id="Vector" />
          <path
            clipRule="evenodd"
            d={svgPaths.p15d1800}
            fill="var(--fill-0, #25A88D)"
            fillRule="evenodd"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function MingcuteLocationLine() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[28px] top-1/2"
      data-name="mingcute:location-line"
    >
      <Group1 />
    </div>
  );
}

function Frame111() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[12px] shrink-0 size-[50px]">
      <MingcuteLocationLine />
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[23px] not-italic relative shrink-0 text-[18px] w-[192px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[#1f3471] w-[min-content]">
        Mode
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#333] text-center whitespace-nowrap">
        Offline / Hybrid
      </p>
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame111 />
      <Frame112 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="bg-white relative rounded-[21px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[30px] pr-[20px] py-[20px] relative size-full">
          <Frame109 />
        </div>
      </div>
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame102 />
      <Frame104 />
      <Frame108 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[555px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[30px] text-white w-full">
        Course details
      </p>
      <Frame103 />
    </div>
  );
}

function MdiTickCircleOutline8() {
  return (
    <div
      className="relative shrink-0 size-[28px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p21ed91e0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTickCircleOutline8 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        10th or 12th pass from a recognized board
      </p>
    </div>
  );
}

function MdiTickCircleOutline9() {
  return (
    <div
      className="relative shrink-0 size-[28px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p21ed91e0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTickCircleOutline9 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        Interest in patient support and service roles
      </p>
    </div>
  );
}

function MdiTickCircleOutline10() {
  return (
    <div
      className="relative shrink-0 size-[28px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p21ed91e0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTickCircleOutline10 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        Basic communication skills
      </p>
    </div>
  );
}

function MdiTickCircleOutline11() {
  return (
    <div
      className="relative shrink-0 size-[28px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p21ed91e0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTickCircleOutline11 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        Willingness to learn hygiene, safety, and ward support skills
      </p>
    </div>
  );
}

function MdiTickCircleOutline12() {
  return (
    <div
      className="relative shrink-0 size-[28px]"
      data-name="mdi:tick-circle-outline"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="mdi:tick-circle-outline">
          <path
            d={svgPaths.p21ed91e0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTickCircleOutline12 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        Personal interview with iMED admissions counselor
      </p>
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame117 />
      <Frame118 />
      <Frame119 />
      <Frame120 />
      <Frame121 />
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[23px] not-italic relative shrink-0 text-[30px] text-white w-full">
        Admission requirements
      </p>
      <Frame114 />
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[577px]">
      <Frame113 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[63px] items-start left-1/2 top-[calc(50%+0.5px)]">
      <Frame110 />
      <Frame115 />
    </div>
  );
}

function Frame97() {
  return (
    <div
      className="h-[600px] overflow-clip relative rounded-[20px] shrink-0 w-[1305px]"
      style={{
        backgroundImage:
          "linear-gradient(155.308deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%), linear-gradient(108.113deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)",
      }}
    >
      <Frame116 />
    </div>
  );
}

function About2() {
  return (
    <div
      id="career-path"
      data-nav="career-path"
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[32px] py-[60px] top-[3695px] w-[1440px]"
      data-name="About"
    >
      <Frame46 />
      <Frame97 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">{`Scope & Demand`}</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">
        Scope and Salary in India
      </p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading7 />
      <Heading8 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[764px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[194px] leading-[32.5px] not-italic relative shrink-0 text-[#4a5565] text-[20px] text-justify w-full">
        The increasing need for hospitals, elder-care, home healthcare, and
        assisted-care services is creating strong entry-level opportunities for
        trained GDAs. They are in demand across hospitals, nursing homes,
        home-care agencies, clinics, rehabilitation centers, and elder-care
        facilities. This rising demand offers stable employment and clear
        pathways for career growth in the healthcare sector.
      </p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame42 />
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start not-italic relative shrink-0 text-white w-[198px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[39px] relative shrink-0 text-[18px] w-full">
        Entry-Level GDA
      </p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[25px] w-full">
        ₹2 - 3 LPA
      </p>
    </div>
  );
}

function UilArrowGrowth() {
  return (
    <div className="relative shrink-0 size-[47px]" data-name="uil:arrow-growth">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <g id="uil:arrow-growth">
          <path
            d={svgPaths.p1179f900}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0">
      <Frame123 />
      <UilArrowGrowth />
    </div>
  );
}

function Container() {
  return (
    <div
      className="content-stretch flex h-[124px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full"
      style={{
        backgroundImage:
          "linear-gradient(113.994deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)",
      }}
      data-name="Container"
    >
      <Frame122 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start not-italic relative shrink-0 text-white w-[198px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[39px] relative shrink-0 text-[18px] w-[261px] whitespace-pre-wrap">{`Senior  Assistant`}</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[25px] w-[min-content]">
        ₹4.5 - 6 LPA
      </p>
    </div>
  );
}

function UilArrowGrowth1() {
  return (
    <div className="relative shrink-0 size-[47px]" data-name="uil:arrow-growth">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <g id="uil:arrow-growth">
          <path
            d={svgPaths.p1179f900}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0">
      <Frame125 />
      <UilArrowGrowth1 />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="content-stretch flex h-[124px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full"
      style={{
        backgroundImage:
          "linear-gradient(113.994deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)",
      }}
      data-name="Container"
    >
      <Frame124 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[367px]">
      <Container />
      <Container1 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start not-italic relative shrink-0 text-white w-[198px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[39px] relative shrink-0 text-[18px] w-full">
        Ward Assistant
      </p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[25px] w-full">
        ₹3 - 4.5 LPA
      </p>
    </div>
  );
}

function UilArrowGrowth2() {
  return (
    <div className="relative shrink-0 size-[47px]" data-name="uil:arrow-growth">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <g id="uil:arrow-growth">
          <path
            d={svgPaths.p1179f900}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0">
      <Frame128 />
      <UilArrowGrowth2 />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="content-stretch flex h-[124px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full"
      style={{
        backgroundImage:
          "linear-gradient(113.994deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)",
      }}
      data-name="Container"
    >
      <Frame127 />
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start not-italic relative shrink-0 text-white w-[198px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[39px] relative shrink-0 text-[18px] w-[220px]">
        Home Care Lead
      </p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[25px] w-[min-content]">
        ₹6 LPA+
      </p>
    </div>
  );
}

function UilArrowGrowth3() {
  return (
    <div className="relative shrink-0 size-[47px]" data-name="uil:arrow-growth">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <g id="uil:arrow-growth">
          <path
            d={svgPaths.p1179f900}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0">
      <Frame130 />
      <UilArrowGrowth3 />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="content-stretch flex h-[124px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full"
      style={{
        backgroundImage:
          "linear-gradient(113.994deg, rgb(53, 80, 159) 6.5327%, rgb(26, 56, 144) 53.048%, rgb(59, 99, 215) 99.563%)",
      }}
      data-name="Container"
    >
      <Frame129 />
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[367px]">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame98 />
      <Frame126 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[44px] items-start relative shrink-0 w-[662px]">
      <Frame41 />
      <Frame96 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-[#824747] h-[517px] overflow-clip relative rounded-[15px] shrink-0 w-[499px]">
      <div
        className="-translate-x-1/2 absolute h-[755px] left-[calc(50%+2px)] top-[-82px] w-[503px]"
        data-name="image 1709"
      >
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage1709}
        />
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%-221.5px)] not-italic text-[22px] text-black top-[580px] whitespace-nowrap">
        <span className="leading-[22px]">{`One Nation. `}</span>
        <span className="leading-[22px] text-[#1f3471]">Many States.</span>
        <span className="leading-[22px]">{` `}</span>
        <span className="leading-[22px] text-[#25a88d]">{`One Career Path `}</span>
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[calc(50%-165.5px)] not-italic text-[#25a88d] text-[18px] top-[617px] whitespace-nowrap">
        <span className="leading-[normal]">{`ðŸ‡®ðŸ‡³ `}</span>
        <span className="leading-[normal] text-[#333]">
          Made in India built for Bharath Future
        </span>
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[143px] items-start relative shrink-0 w-[1304px]">
      <Frame53 />
      <Frame32 />
    </div>
  );
}

function About3() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[60px] top-[2140px] w-[1440px]"
      data-name="About"
    >
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">{`Scope & Demand`}</p>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">
        Scope and Salary in India
      </p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading9 />
      <Heading10 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.6px] whitespace-nowrap">
        Tell us about you
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] w-[351px]">{`Estimates are Monthly, gross based on iMED Placement data & HSSC industry benchmarks.`}</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[246px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px] whitespace-nowrap">
          Career Growth
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[#25a88d] content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24px] w-[540px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <Text />
      <Icon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full" data-name="Dropdown">
      <Button1 />
    </div>
  );
}

function Label() {
  return (
    <div
      className="absolute content-stretch flex h-[19px] items-start left-0 top-[3px] w-[106px]"
      data-name="Label"
    >
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">
        Healthcare Role
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[246px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">
          Hospital Front Desk Coordinator
        </p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            id="Vector"
            stroke="var(--stroke-0, #6A7282)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24px] w-[540px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <Text1 />
      <Icon1 />
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full" data-name="Dropdown">
      <Label />
      <Button2 />
    </div>
  );
}

function Label1() {
  return (
    <div
      className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.4px] w-[60px]"
      data-name="Label"
    >
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">
        City Tier
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[104px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">
          Tier 1 - Metro
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            id="Vector"
            stroke="var(--stroke-0, #6A7282)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-white content-stretch flex h-[49px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24.4px] w-[540px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <Text2 />
      <Icon2 />
    </div>
  );
}

function Dropdown2() {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full" data-name="Dropdown">
      <Label1 />
      <Button3 />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="absolute content-stretch flex h-[19px] items-start left-0 top-[2.8px] w-[92px]"
      data-name="Label"
    >
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">
        Hospital Type
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[119px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">
          Multi-speciality
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            id="Vector"
            stroke="var(--stroke-0, #6A7282)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[23.8px] w-[540px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <Text3 />
      <Icon3 />
    </div>
  );
}

function Dropdown3() {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full" data-name="Dropdown">
      <Label2 />
      <Button4 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-0.2px] whitespace-nowrap">
          Experience
        </p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[34px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-0.2px] whitespace-nowrap">
          2 yrs
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="absolute content-stretch flex h-[20px] items-center justify-between left-0 top-[0.2px] w-[540px]"
      data-name="Container"
    >
      <Label3 />
      <Text4 />
    </div>
  );
}

function RangeSlider() {
  return (
    <div
      className="absolute bg-[#e5e7eb] h-[8px] left-0 rounded-[10px] top-[38.2px] w-[540px]"
      data-name="Range Slider"
    />
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">
          0 yrs
        </p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">
          15 yrs
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="absolute content-stretch flex h-[16px] items-start justify-between left-0 top-[54.2px] w-[540px]"
      data-name="Container"
    >
      <Text5 />
      <Text6 />
    </div>
  );
}

function ExperienceSlider() {
  return (
    <div
      className="h-[70.388px] relative shrink-0 w-full"
      data-name="ExperienceSlider"
    >
      <Container9 />
      <RangeSlider />
      <Container10 />
    </div>
  );
}

function Label4() {
  return (
    <div
      className="absolute content-stretch flex h-[19px] items-start left-0 top-[2.81px] w-[34px]"
      data-name="Label"
    >
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">
        Shift
      </p>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[70px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">
          Day Shift
        </p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            id="Vector"
            stroke="var(--stroke-0, #6A7282)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[23.81px] w-[540px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <Text7 />
      <Icon4 />
    </div>
  );
}

function Dropdown4() {
  return (
    <div className="h-[73.6px] relative shrink-0 w-full" data-name="Dropdown">
      <Label4 />
      <Button5 />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Dropdown />
      <Dropdown1 />
      <Dropdown2 />
      <Dropdown3 />
      <ExperienceSlider />
      <Dropdown4 />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[32px] h-[831px] items-start left-0 pt-[48px] px-[48px] top-0 w-[636px]"
      data-name="Container"
    >
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="absolute h-[830.588px] left-0 opacity-5 top-0 w-[669.6px]"
      data-name="Container"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute h-[24.08%] left-0 max-w-none top-0 w-[29.87%]"
          src={imgContainer}
        />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="absolute bg-[rgba(0,187,167,0.2)] h-[32px] left-0 rounded-[26843500px] top-0 w-[194.463px]"
      data-name="Container"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#46ecd5] text-[14px] top-[5.8px] whitespace-nowrap">
        Estimated Monthly Salary
      </p>
    </div>
  );
}

function Heading11() {
  return (
    <div
      className="absolute content-stretch flex h-[31.988px] items-start left-0 top-[48px] w-[573.6px]"
      data-name="Heading 2"
    >
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-px not-italic relative text-[24px] text-white">
        Hospital Front Desk Coordinator
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div
      className="absolute h-[20px] left-0 top-[95.99px] w-[573.6px]"
      data-name="Paragraph"
    >
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
        Tier 1 - Metro · Multi-speciality · 2 yrs exp · Day Shift
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="h-[115.988px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Container15 />
      <Heading11 />
      <Paragraph />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[48px] text-white top-[-3px] whitespace-nowrap">
        ₹22,385
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
        per month, gross
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Container17 />
      <Paragraph1 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[23.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
          Min
        </p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
          Max
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="bg-gradient-to-r from-[#00bba7] h-[12px] rounded-[26843500px] shrink-0 to-[#00d5be] w-full"
      data-name="Container"
    />
  );
}

function Container20() {
  return (
    <div
      className="bg-[#162456] h-[12px] relative rounded-[26843500px] shrink-0 w-full"
      data-name="Container"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[86.037px] pr-[86.05px] relative size-full">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.2px] whitespace-nowrap">
          ₹18,150
        </p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.025px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.2px] whitespace-nowrap">
          ₹26,620
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Text10 />
        <Text11 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] h-[76px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Container19 />
      <Container20 />
      <Container22 />
    </div>
  );
}

function Heading12() {
  return (
    <div
      className="absolute h-[28px] left-[24.8px] top-[24.8px] w-[524px]"
      data-name="Heading 3"
    >
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px] whitespace-nowrap">
        Breakdown
      </p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[149.45px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">
          Base salary (monthly)
        </p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[54.725px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px] whitespace-nowrap">
          ₹15,670
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[68.8px] w-[524px]"
      data-name="Container"
    >
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[127.537px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">
          HRA + allowances
        </p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[57.213px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px] whitespace-nowrap">
          ₹6,715
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[108.8px] w-[524px]"
      data-name="Container"
    >
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container26() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.1)] h-px left-[24.8px] top-[148.8px] w-[524px]"
      data-name="Container"
    />
  );
}

function Text16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[161.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#bedbff] text-[16px] top-[-2.2px] whitespace-nowrap">
          Annual gross (CTC est.)
        </p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[69.912px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px] whitespace-nowrap">
          ₹2,68,620
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[165.8px] w-[524px]"
      data-name="Container"
    >
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[193.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#46ecd5] text-[16px] top-[-2.2px] whitespace-nowrap">
          Estimated take-home / mo
        </p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[28px] relative shrink-0 w-[67.013px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#46ecd5] text-[18px] top-[-1.4px] whitespace-nowrap">
          ₹19,700
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div
      className="absolute bg-[rgba(0,187,167,0.2)] content-stretch flex h-[52px] items-center justify-between left-[0.8px] px-[24px] py-[12px] rounded-[10px] top-[205.8px] w-[572px]"
      data-name="Container"
    >
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.05)] h-[282.6px] relative rounded-[14px] shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0.8px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]"
      />
      <Heading12 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Icon5() {
  return (
    <div
      className="absolute left-[377.7px] size-[20px] top-[18px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d="M4.16699 10H15.8337"
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p1ae0b780}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="bg-[#00bba7] h-[56px] relative rounded-[26843500px] shrink-0 w-full"
      data-name="Button"
    >
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[273.4px] not-italic text-[16px] text-center text-white top-[13.8px] whitespace-nowrap">
        Talk to a Career Counsellor
      </p>
      <Icon5 />
    </div>
  );
}

function Container13() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[32px] h-[734.588px] items-start left-[48px] top-[48px] w-[573.6px]"
      data-name="Container"
    >
      <Container14 />
      <Container16 />
      <Container18 />
      <Container23 />
      <Button6 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="absolute h-[831px] left-[636px] overflow-clip top-0 w-[670px]"
      style={{
        backgroundImage:
          "linear-gradient(128.878deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%)",
      }}
      data-name="Container"
    >
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="h-[830.588px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Container6 />
      <Container11 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="bg-white content-stretch flex flex-col h-[831px] items-start overflow-clip relative rounded-[16px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[1306px]"
      data-name="Container"
    >
      <Container5 />
    </div>
  );
}

function About4() {
  return (
    <ScopeSalarySection
      defaultRole="General Duty Assistance"
      topClassName="top-[2954px]"
    />
  );
}

function Frame33() {
  return (
    <div className="bg-[#824747] h-[565px] overflow-clip relative rounded-[15px] shrink-0 w-[620px]">
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[620px] top-[calc(50%+27.74px)]"
        data-name="image 1723"
      >
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage1723}
        />
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

function Heading13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[81px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        iMED Advantage
      </p>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[97px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[#1f3471] text-[40px] top-[-1px] w-[551px]">
        How iMED Academy helps you succeed
      </p>
    </div>
  );
}

function Paragraph2() {
  return <div className="h-[61px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container29() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] h-[186px] items-center relative shrink-0 w-[620px]"
      data-name="Container"
    >
      <Heading13 />
      <Heading14 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[61px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#4a5565] text-[20px] top-[-2px] w-[583px]">
        A 3-month weekend program for working professionals entering healthcare
        administration.
      </p>
    </div>
  );
}

function MdiTick() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Hands-on skills-lab training for patient support tasks
      </p>
    </div>
  );
}

function MdiTick1() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Faculty guidance for Hospital etiquette and communication
      </p>
    </div>
  );
}

function MdiTick2() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Training on hygiene, safety, mobility, and ward assistance
      </p>
    </div>
  );
}

function MdiTick3() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Soft-skills support for patient and family interaction
      </p>
    </div>
  );
}

function MdiTick4() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] w-[566px]">
        Practical exposure through partner Healthcare settings
      </p>
    </div>
  );
}

function MdiTick5() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick5 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] w-[566px]">
        Career mentoring for hospital, home-care, and elder-care roles
      </p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[620px]">
      <Frame51 />
      <Frame54 />
      <Frame55 />
      <Frame56 />
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-start relative shrink-0">
      <Container29 />
      <Paragraph3 />
      <Frame37 />
    </div>
  );
}

function About5() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-white content-stretch flex gap-[40px] items-start left-1/2 pl-[69px] pr-[32px] py-[60px] top-[5005px] w-[1440px]"
      data-name="About"
    >
      <Frame33 />
      <Frame50 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[94.5px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        Placement Support
      </p>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[97px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[#1f3471] text-[40px] top-[-1px] w-[551px]">{`How iMED supports placements & career`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[61px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#4a5565] text-[20px] top-[-2px] w-[583px]">
        A 3-month weekend program for working professionals entering healthcare
        administration.
      </p>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[620px]"
      data-name="Container"
    >
      <Heading15 />
      <Heading16 />
      <Paragraph4 />
    </div>
  );
}

function MdiTick6() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick6 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Placement assistance with hospitals and home-care providers
      </p>
    </div>
  );
}

function MdiTick7() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Resume and interview preparation for support roles
      </p>
    </div>
  );
}

function MdiTick8() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick8 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Practical assessments to build job readiness
      </p>
    </div>
  );
}

function MdiTick9() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick9 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] whitespace-nowrap">
        Internship guidance through partner institutes
      </p>
    </div>
  );
}

function MdiTick10() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick10 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] w-[566px]">
        Support for entry-level hospital and care-center opportunities
      </p>
    </div>
  );
}

function MdiTick11() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:tick">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="mdi:tick">
          <path
            d={svgPaths.p159e99f0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick11 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#333] text-[18px] w-[566px]">
        Career counseling for growth into supervisory roles
      </p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[620px]">
      <Frame60 />
      <Frame61 />
      <Frame62 />
      <Frame63 />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-start relative shrink-0">
      <Container30 />
      <Frame38 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-[#824747] h-[565px] overflow-clip relative rounded-[15px] shrink-0 w-[620px]">
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[620px] top-[calc(50%+27.74px)]"
        data-name="image 1723"
      >
        <img
          loading="lazy"
          decoding="async"
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage1724}
        />
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

function About6() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-white content-stretch flex gap-[40px] items-start left-1/2 pl-[69px] pr-[32px] py-[60px] top-[5690px] w-[1440px]"
      data-name="About"
    >
      <Frame59 />
      <Frame34 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
        FAQs
      </p>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">
        Questions? We Have Answers.
      </p>
    </div>
  );
}

function Container31() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]"
      data-name="Container"
    >
      <Heading17 />
      <Heading18 />
    </div>
  );
}

function Text20() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        What is GDA?
      </p>
    </div>
  );
}

function Icon6() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text20 />
      <Icon6 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        Is GDA a nursing course?
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text21 />
      <Icon7 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        What jobs can I get after GDA?
      </p>
    </div>
  );
}

function Icon8() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text22 />
      <Icon8 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        What skills are required to become a GDA?
      </p>
    </div>
  );
}

function Icon9() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text23 />
      <Icon9 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button10 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        What is the salary scope for a General Duty Assistant?
      </p>
    </div>
  );
}

function Icon10() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text24 />
      <Icon10 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button11 />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        What career opportunities are available after completing GDA?
      </p>
    </div>
  );
}

function Icon11() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text25 />
      <Icon11 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div
      className="absolute h-[20px] left-[-0.2px] top-[15.8px] w-[192.425px]"
      data-name="Text"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.2px] whitespace-nowrap">
        How do I start a career as a General Duty Assistant?
      </p>
    </div>
  );
}

function Icon12() {
  return (
    <div
      className="absolute left-[782px] size-[28px] top-[17.4px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="var(--stroke-0, #25A88D)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div
      className="h-[52px] relative rounded-[8px] shrink-0 w-full"
      data-name="Button"
    >
      <Text26 />
      <Icon12 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[0.8px] px-[24px] relative size-full">
          <Button13 />
        </div>
      </div>
    </div>
  );
}

const gdaFaqQuestions = [
  "What is GDA?",
  "Is GDA a nursing course?",
  "What jobs can I get after GDA?",
  "What skills are required to become a GDA?",
  "What is the salary scope for a General Duty Assistant?",
  "What career opportunities are available after completing GDA?",
  "How do I start a career as a General Duty Assistant?",
];

const gdaAnswerIntros = [
  "Good question.",
  "A lot of students ask this.",
  "Here is a quick answer.",
  "Yes, and it helps to understand this early.",
];

const gdaAnswerOutros = [
  "Our counselors can help you map next steps based on your goals.",
  "Placement readiness improves with practical skills and communication.",
  "Career growth depends on role, experience, and city demand.",
  "We support you with training plus job-preparation guidance.",
];

function buildGdaRandomAnswer(question: string) {
  const intro =
    gdaAnswerIntros[Math.floor(Math.random() * gdaAnswerIntros.length)];
  const outro =
    gdaAnswerOutros[Math.floor(Math.random() * gdaAnswerOutros.length)];
  return `${intro} For "${question}", GDA training focuses on patient support, ward assistance, basic healthcare routines, and employability skills. ${outro}`;
}

function Container33() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [faqItems] = useState(() =>
    gdaFaqQuestions.map((question) => ({
      question,
      answer: buildGdaRandomAnswer(question),
    })),
  );

  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={`${item.question}-${index}`}
            className="relative shrink-0 w-full"
          >
            <div
              aria-hidden="true"
              className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.8px] border-solid inset-0 pointer-events-none"
            />
            <button
              type="button"
              onClick={() =>
                setOpenIndex((prev) => (prev === index ? -1 : index))
              }
              className="content-stretch flex items-start justify-between gap-4 px-[24px] py-[16px] relative w-full text-left"
            >
              <p className="flex-1 font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic text-[#0a0a0a] text-[20px]">
                {item.question}
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] text-[#25A88D] text-[24px]">
                {isOpen ? "-" : "+"}
              </p>
            </button>
            {isOpen && (
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] px-[24px] pb-[18px] text-[#333] text-[16px]">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Container32() {
  return (
    <div
      className="bg-white h-auto relative rounded-[14px] shrink-0 w-[848px]"
      data-name="Container"
    >
      <div className="content-stretch flex flex-col items-start p-[0.8px] relative rounded-[inherit] size-full">
        <Container33 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#e5e5e5] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
      />
    </div>
  );
}

function About7() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[39px] items-center left-1/2 px-[32px] py-[60px] top-[6375px] w-[1440px]"
      data-name="About"
    >
      <Container31 />
      <Container32 />
    </div>
  );
}

function Heading19() {
  return (
    <div
      className="content-stretch flex h-[36px] items-start relative shrink-0 w-[905px]"
      data-name="Heading 3"
    >
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-w-px not-italic relative text-[30px] text-center text-white">
        Ready to start your GDA journey?
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[35px] relative shrink-0 w-[765px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[58px] leading-[28px] left-[382px] not-italic text-[#dbeafe] text-[18px] text-center top-[0.5px] w-[560px]">
        Limited seats for the 2026 batch. Apply online in under 5 minutes.
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#25a88d] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px] cursor-pointer">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-[50px] relative rounded-[12px] shrink-0 w-[210px] cursor-pointer">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
          Talk to Experts
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Container41() {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[23px] h-[387px] items-center justify-center left-[calc(50%+0.5px)] px-[52px] py-[60px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-[7194px] w-[1459px]"
      style={{
        backgroundImage:
          "linear-gradient(99.3413deg, rgb(0, 62, 156) 6.0505%, rgb(0, 120, 218) 92.71%)",
      }}
      data-name="Container"
    >
      <Heading19 />
      <Paragraph5 />
      <Frame28 />
    </div>
  );
}

function Group14() {
  return (
    <div className="h-[42px] relative shrink-0 w-[29.48px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 29.4797 42"
      >
        <g id="Group 1171275645">
          <path
            d={svgPaths.p39fca700}
            fill="var(--fill-0, white)"
            id="Vector 101"
          />
          <path
            d={svgPaths.p3f5aca80}
            fill="var(--fill-0, white)"
            id="Vector 102"
          />
          <path
            d={svgPaths.p18842c00}
            fill="var(--fill-0, white)"
            id="Vector 103"
          />
          <path
            d={svgPaths.p66e1300}
            fill="var(--fill-0, white)"
            id="Vector 104"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] h-[40px] items-start not-italic py-[6px] relative shrink-0 text-white w-[318px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[15px] leading-[0] relative shrink-0 text-[22.992px] w-full">
        <span className="leading-[11.036px]">{`iMED `}</span>
        <span className="leading-[11.036px]">Academy</span>
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[15px] w-full">
        Educate. Equip. Employ.
      </p>
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Group14 />
      <Frame131 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame132 />
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full">
      <Frame66 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[15px] text-white w-[min-content]">
        India's Career Launchpad
      </p>
    </div>
  );
}

function Group6() {
  return (
    <div
      className="absolute inset-[19.62%_76.57%_23.77%_8.03%]"
      data-name="<Group>"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17.2013 21.0835"
      >
        <g id="<Group>">
          <path
            d={svgPaths.p1a100400}
            fill="var(--fill-0, black)"
            id="<Path>"
          />
          <path
            d={svgPaths.p33376b80}
            fill="var(--fill-0, black)"
            id="<Path>_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div
      className="absolute contents inset-[19.62%_76.57%_23.77%_8.03%]"
      data-name="<Group>"
    >
      <Group6 />
    </div>
  );
}

function Group7() {
  return (
    <div
      className="absolute inset-[44.68%_8.5%_16.27%_28.77%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 70.0812 14.5432"
      >
        <g id="Group">
          <path
            d={svgPaths.p1a5cbc00}
            fill="var(--fill-0, black)"
            id="Vector"
          />
          <path
            d={svgPaths.p1b3b4cf0}
            fill="var(--fill-0, black)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p2617c100}
            fill="var(--fill-0, black)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p2cbeb300}
            fill="var(--fill-0, black)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p32d19e80}
            fill="var(--fill-0, black)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p21bb7c00}
            fill="var(--fill-0, black)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p28a8e1f0}
            fill="var(--fill-0, black)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p38c94300}
            fill="var(--fill-0, black)"
            id="Vector_8"
          />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div
      className="absolute contents inset-[19.62%_8.5%_16.27%_8.03%]"
      data-name="<Group>"
    >
      <Group5 />
      <Group7 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 111.727 37.2423"
      >
        <g id="Group">
          <path
            d={svgPaths.p27323b00}
            fill="var(--fill-0, black)"
            id="Vector"
          />
          <path
            d={svgPaths.p1a013cf0}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
        </g>
      </svg>
      <Group4 />
    </div>
  );
}

function Group9() {
  return (
    <div
      className="absolute inset-[21.09%_12.41%_63.01%_29.81%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64.5576 5.91995"
      >
        <g id="Group">
          <path
            d={svgPaths.p31813f00}
            fill="var(--fill-0, black)"
            id="Vector"
          />
          <path
            d={svgPaths.p4b1bc00}
            fill="var(--fill-0, black)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p1cb6700}
            fill="var(--fill-0, black)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p16952da0}
            fill="var(--fill-0, black)"
            id="Vector_4"
          />
          <path
            d={svgPaths.pc729600}
            fill="var(--fill-0, black)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p20275400}
            fill="var(--fill-0, black)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p13063b00}
            fill="var(--fill-0, black)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p3927cf80}
            fill="var(--fill-0, black)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p827fe00}
            fill="var(--fill-0, black)"
            id="Vector_9"
          />
          <path
            d={svgPaths.p3b320100}
            fill="var(--fill-0, black)"
            id="Vector_10"
          />
          <path
            d={svgPaths.p3897e200}
            fill="var(--fill-0, black)"
            id="Vector_11"
          />
          <path
            d={svgPaths.p2b070d00}
            fill="var(--fill-0, black)"
            id="Vector_12"
          />
          <path
            d={svgPaths.p8ddc00}
            fill="var(--fill-0, black)"
            id="Vector_13"
          />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div
      className="absolute contents inset-[21.09%_12.41%_63.01%_29.81%]"
      data-name="<Group>"
    >
      <Group9 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group3 />
      <Group8 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[17.806px] items-start relative shrink-0">
      <a
        href="https://play.google.com/store/apps/details?id=co.lazarus.ufkbi&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        aria-label="Get it on Google Play"
      >
        <div
          className="h-[37.242px] overflow-clip relative shrink-0 w-[125.692px]"
          data-name="Badge"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 125.692 37.2422"
          >
            <path
              d={svgPaths.p22d50b00}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 125.692 37.2422"
          >
            <path
              d={svgPaths.p1e0ec500}
              fill="var(--fill-0, black)"
              id="Vector"
            />
          </svg>
          <div
            className="absolute inset-[17.15%_64.87%_67.19%_30.63%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.51%_-1.56%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 5.82921 6.00662"
              >
                <path
                  d={svgPaths.p3d778200}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.5%_61.48%_67.5%_35.94%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.58%_-2.72%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 3.41623 5.76248"
              >
                <path
                  d={svgPaths.p6d98af0}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.5%_57.78%_67.5%_39.13%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.58%_-2.27%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 4.05865 5.76248"
              >
                <path
                  d={svgPaths.p2f142fc0}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.5%_55.03%_67.5%_44.4%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.58%_-12.29%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 0.893065 5.76248"
              >
                <path
                  d={svgPaths.p3358cf00}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.5%_51.26%_67.5%_45.69%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.58%_-2.3%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 4.0121 5.76248"
              >
                <path
                  d={svgPaths.p27422d00}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.17%_44.82%_67.17%_50.61%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.51%_-1.54%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 5.91295 6.00716"
              >
                <path
                  d={svgPaths.p2a0dce80}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[17.5%_40.59%_67.5%_55.99%]"
            data-name="Vector"
          >
            <div className="absolute inset-[-1.58%_-2.05%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 4.47762 5.76248"
              >
                <path
                  d={svgPaths.p1d05c9c0}
                  fill="var(--fill-0, black)"
                  id="Vector"
                  stroke="var(--stroke-0, black)"
                  strokeMiterlimit="10"
                  strokeWidth="0.176156"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-[42.61%_6.8%_15%_30.28%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 79.0904 15.7864"
            >
              <path
                d={svgPaths.p1a617280}
                fill="var(--fill-0, black)"
                id="Vector"
              />
            </svg>
          </div>
          <div
            className="absolute inset-[18.68%_83.04%_18.65%_7.38%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12.0425 23.3415"
            >
              <path
                d={svgPaths.p2192fa80}
                fill="url(#paint0_linear_1_1182)"
                id="Vector"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1_1182"
                  x1="11.0184"
                  x2="-4.60472"
                  y1="1.15451"
                  y2="16.7776"
                >
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
          <div
            className="absolute inset-[39.3%_75.52%_39.3%_16.96%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 9.4502 7.96983"
            >
              <path
                d={svgPaths.p14fc2800}
                fill="url(#paint0_linear_1_1106)"
                id="Vector"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1_1106"
                  x1="10.1764"
                  x2="-12.3458"
                  y1="3.98491"
                  y2="3.98491"
                >
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="absolute bottom-[17.83%] left-[7.73%] right-[79.91%] top-1/2"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15.53 11.9826"
            >
              <path
                d={svgPaths.p2b5f2100}
                fill="url(#paint0_linear_1_1100)"
                id="Vector"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1_1100"
                  x1="13.3979"
                  x2="-7.79293"
                  y1="2.14143"
                  y2="23.3229"
                >
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="absolute bottom-1/2 left-[7.73%] right-[79.91%] top-[17.83%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15.53 11.9805"
            >
              <path
                d={svgPaths.p6c4e600}
                fill="url(#paint0_linear_1_1094)"
                id="Vector"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1_1094"
                  x1="-2.92351"
                  x2="6.536"
                  y1="-6.47302"
                  y2="2.98649"
                >
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="absolute inset-[60.33%_79.91%_17.84%_7.73%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15.53 8.13277"
            >
              <path
                d={svgPaths.p1e1d0400}
                fill="var(--fill-0, black)"
                id="Vector"
                opacity="0.2"
              />
            </svg>
          </div>
          <div
            className="absolute inset-[77.28%_92.19%_18.85%_7.4%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 0.508112 1.44313"
            >
              <path
                d={svgPaths.p2b99b100}
                fill="var(--fill-0, black)"
                id="Vector"
                opacity="0.12"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-[39.45%] left-[20%] right-[75.51%] top-1/2"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 5.64219 3.92905"
            >
              <path
                d={svgPaths.p2accb580}
                fill="var(--fill-0, black)"
                id="Vector"
                opacity="0.12"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-1/2 left-[7.39%] right-[75.51%] top-[17.85%]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21.4981 11.9737"
            >
              <path
                d={svgPaths.p1c1d8f00}
                fill="var(--fill-0, white)"
                id="Vector"
                opacity="0.25"
              />
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
        <div
          className="h-[37.242px] overflow-clip relative shrink-0 w-[111.727px]"
          data-name="Badge"
        >
          <Group2 />
        </div>
      </a>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-start left-[80px] top-[42px] w-[298px]">
      <Frame133 />
      <Frame67 />
      <div
        className="h-[62px] relative shrink-0 w-[272px]"
        data-name="image 1718"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute h-[328.33%] left-[-10.01%] max-w-none top-[-103.91%] w-[111.47%]"
            src={imgImage1718}
          />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  const handleProgramClick =
    (route: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const currentHash = window.location.hash;
      if (currentHash === route) {
        const heroSection = document.getElementById("imed-online");
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        window.location.hash = route;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start pb-[10px] relative shrink-0 text-[18px] text-white">
      <button
        type="button"
        onClick={handleProgramClick("#emt")}
        className="relative shrink-0 text-left transition-colors duration-200 w-[264px] hover:text-[#8ee2d2]"
      >
        Emergency Medical Technician
      </button>
      <button
        type="button"
        onClick={handleProgramClick("#ha")}
        className="relative shrink-0 text-left transition-colors duration-200 w-[264px] hover:text-[#8ee2d2]"
      >
        Hospital Administration
      </button>
      <button
        type="button"
        onClick={handleProgramClick("#gda")}
        className="min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        General Duty Assistance
      </button>
      <button
        type="button"
        onClick={handleProgramClick("#ocha")}
        className="min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        OCHA
      </button>
      <button
        type="button"
        onClick={handleProgramClick("#acha")}
        className="min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        ACHA
      </button>
      <button
        type="button"
        onClick={handleProgramClick("#gca")}
        className="min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]"
      >
        GCA
      </button>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">
        Programs
      </p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start relative shrink-0 text-[18px] text-white w-full">
      <button
        type="button"
        onClick={() => {
          const target = document.getElementById("why-imed");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="relative shrink-0 text-left w-[111px] transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        About Us
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "#careers";
        }}
        className="min-w-full relative shrink-0 text-left w-[min-content] transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        Careers
      </button>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0 w-[157px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#25a88d] text-[20px] w-full">
        Company
      </p>
      <Frame3 />
    </div>
  );
}

function IcRoundEmail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:round-email">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ic:round-email">
          <path
            d={svgPaths.p3e50e500}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[13px] items-start relative shrink-0">
      <IcRoundEmail />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        contact@imedacademy.in
      </p>
    </div>
  );
}

function SolarPhoneBold() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="solar:phone-bold">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="solar:phone-bold">
          <path
            d={svgPaths.p3f2dc880}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[13px] items-start relative shrink-0">
      <SolarPhoneBold />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        +91 92667 90357
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame8 />
      <Frame10 />
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">
        Contact Us
      </p>
      <Frame9 />
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[35px]" data-name="1">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 35 35"
      >
        <g id="1">
          <circle
            cx="17.5"
            cy="17.5"
            fill="var(--fill-0, white)"
            id="BG"
            r="17.5"
          />
          <path
            d={svgPaths.p3eeb9f80}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div
      className="col-1 h-[15.219px] ml-0 mt-0 relative row-1 w-[7.903px]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 7.90323 15.2186"
      >
        <g id="Group">
          <path
            d={svgPaths.p2e759440}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LogoFbSimple() {
  return (
    <div
      className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[13.55px] mt-[10.16px] place-items-start relative row-1"
      data-name="logo-fb-simple 2"
    >
      <Group10 />
    </div>
  );
}

function Component1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="2"
    >
      <div
        className="col-1 ml-0 mt-0 relative row-1 size-[35px]"
        data-name="BG"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 35 35"
        >
          <circle
            cx="17.5"
            cy="17.5"
            fill="var(--fill-0, white)"
            id="BG"
            r="17.5"
          />
        </svg>
      </div>
      <LogoFbSimple />
    </div>
  );
}

function AkarIconsLinkedinFill() {
  return (
    <div
      className="relative shrink-0 size-[14px]"
      data-name="akar-icons:linkedin-fill"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="akar-icons:linkedin-fill">
          <path
            clipRule="evenodd"
            d={svgPaths.pa152600}
            fill="var(--fill-0, #25A88D)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[21px] row-1 size-[35px]">
      <AkarIconsLinkedinFill />
    </div>
  );
}

function Component2() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="19"
    >
      <Frame12 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[8.34%_4.16%_8.33%_4.17%]" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12.8333 11.6667"
      >
        <g id="Group">
          <path
            d={svgPaths.pf014ab0}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
          <path
            d={svgPaths.p35937000}
            fill="var(--fill-0, #25A88D)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p11c90580}
            fill="var(--fill-0, #25A88D)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function LineMdTwitterX() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[14px]"
      data-name="line-md:twitter-x"
    >
      <Group11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[26px] row-1 size-[35px]">
      <LineMdTwitterX />
    </div>
  );
}

function Component3() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="20"
    >
      <Frame13 />
    </div>
  );
}

function MdiYoutube() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="mdi:youtube">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="mdi:youtube">
          <path
            d={svgPaths.p28fdae80}
            fill="var(--fill-0, #25A88D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[29px] row-1 size-[35px]">
      <MdiYoutube />
    </div>
  );
}

function Component4() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="21"
    >
      <Frame14 />
    </div>
  );
}

function Frame11() {
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
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Social"
    >
      <Frame11 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[74px] items-start relative shrink-0">
      <Frame134 />
      <Social />
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute content-stretch flex gap-[120px] items-start left-[452px] top-[42px]">
      <Frame6 />
      <Frame5 />
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#1f3471] h-[330px] relative shrink-0 w-full">
      <Frame1 />
      <Frame68 />
    </div>
  );
}

function Frame35() {
  const handleLegalClick =
    (route: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.location.hash = route;
    };

  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <a
        href="#privacy-policy"
        onClick={handleLegalClick("#privacy-policy")}
        className="cursor-pointer relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        Privacy Policy
      </a>
      <a
        href="#terms-and-conditions"
        onClick={handleLegalClick("#terms-and-conditions")}
        className="cursor-pointer relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        Terms of use
      </a>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute bg-[#1f3471] inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[normal] not-italic px-[70px] py-[16px] relative size-full text-[14px] text-white whitespace-nowrap">
          <p className="relative shrink-0">
            &copy; 2026 iMED Academy. All rights reserved. &middot; NSDC
            Authorised Training Partner &middot; MSME Registered
          </p>
          <Frame35 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

function Frame16() {
  return (
    <div
      id="contact-us"
      data-nav="contact-us"
      className="absolute content-stretch flex flex-col items-center left-0 top-[7581px] w-[1440px]"
    >
      <Frame4 />
      <Frame />
    </div>
  );
}

export default function GeneralDutyAssistance() {
  const designWidth = 1440;
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateScale = () => {
      const viewportWidth =
        document.documentElement.clientWidth || window.innerWidth;
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
      data-name="General Duty Assistance"
      style={{ height: scaledHeight ? `${scaledHeight}px` : "100vh" }}
    >
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
          <Frame15 />
          <About />
          <About1 />
          <About2 />
          <About3 />
          <About4 />
          <About5 />
          <About6 />
          <About7 />
          <Container41 />
          <Frame16 />
        </div>
      </div>
    </div>
  );
}
