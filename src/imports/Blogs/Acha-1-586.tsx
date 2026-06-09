import { useEffect, useLayoutEffect, useRef, useState } from "react";
import svgPaths from "./svg-v065p4xun2";
import imgImage1712 from "./36b610493eb683f0e81e17848fd143c365f117fd.png";
import imgImage1759 from "./0aef614057d2dd2cb63735ca6452bf43da273b81.png";
import imgContainer from "./8919be360f51d471440c4b6430ed677872229099.png";
import imgImage1761 from "./6f8b171ac929a75274356651f457fceaf175c770.png";
import imgImage1718 from "./5915099e30d31d9fe1c6e5f291809fe3439e9de6.png";

const blogCriticalImages = [imgImage1712, imgImage1759, imgContainer, imgImage1761, imgImage1718];

function preloadBlogImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
    if (image.decode) {
      image.decode().then(() => resolve()).catch(() => resolve());
    }
  });
}

function navigateToHomeSection(sectionId: string) {
  const scroll = () => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (window.location.hash !== "") {
    window.location.hash = "";
    window.setTimeout(scroll, 140);
    return;
  }

  scroll();
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 h-[29px] ml-0 mt-0 relative row-1 w-[22.895px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" loading="eager" fetchPriority="high" decoding="async" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <button data-nav-target="home" className="content-stretch flex gap-[10px] items-center leading-[0] relative shrink-0 w-[203px] text-left transition-transform duration-200 hover:scale-[1.02]">
      <Group10 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold h-[18px] not-italic relative shrink-0 text-[#1f3471] text-[22.992px] text-center w-[170px]">
        <span className="leading-[21px]">{`iMED `}</span>
        <span className="leading-[21px] text-[#25a88d]">Academy</span>
      </p>
    </button>
  );
}

function Frame53() {
  return (
    <button data-nav-target="blog-overview" className="group h-[24px] relative shrink-0 w-[78px] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1f3471]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Overview</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[76%]" />
    </button>
  );
}

function Frame55() {
  return (
    <button data-nav-target="leadership-footprint" className="group h-[24px] relative shrink-0 w-[84px] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1f3471]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Footprint</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[76%]" />
    </button>
  );
}

function Frame56() {
  return (
    <button data-nav-target="blog-vision" className="group h-[24px] relative shrink-0 w-[60px] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1f3471]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Vision</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[78%]" />
    </button>
  );
}

function Frame57() {
  return (
    <button data-nav-target="blog-contact" className="group h-[24px] relative shrink-0 w-[95px] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1f3471]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Contact Us</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function Frame58() {
  return (
    <button data-nav-target="skillbridge" className="group h-[24px] relative shrink-0 w-[90px] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1f3471]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Skillbridge</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame53 />
      <Frame55 />
      <Frame56 />
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function Button() {
  return (
    <button data-nav-target="blog-contact" className="bg-[#25a88d] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Apply Now `}</p>
    </button>
  );
}

function NavBar() {
  return (
    <div className="relative z-50 bg-white content-stretch flex h-[66px] items-center justify-between overflow-visible px-[68px] py-[15px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] w-[1440px]" data-name="Nav Bar">
      <Frame52 />
      <Frame59 />
      <Button />
    </div>
  );
}

function Frame47() {
  return (
    <div className="relative shrink-0 size-[17px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Frame 2095585796">
          <rect fill="var(--fill-0, #14CCA8)" fillOpacity="0.3" height="17" rx="8.5" width="17" />
          <circle cx="8.5" cy="8.5" fill="var(--fill-0, #14CCA8)" fillOpacity="0.2" id="Ellipse 10" r="6.5" />
          <circle cx="8.5" cy="8.5" fill="var(--fill-0, #14CCA8)" id="Ellipse 9" r="4.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <Frame47 />
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[32.5px] not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-justify uppercase whitespace-nowrap">Honorary Academician · iMED Academy</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[15px] py-[5px] relative rounded-[inherit] size-full">
        <Frame46 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame41 />
      <div className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold h-[179px] leading-[0] min-w-full not-italic relative shrink-0 text-[#333] text-[75px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[90px] mb-0 text-white">{`Learn From `}</p>
        <p className="leading-[90px] text-[#14cca8]">Industry Leaders</p>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[627px]">
      <Frame42 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[97px] leading-[32.5px] not-italic relative shrink-0 text-[18px] text-justify text-white w-full">At iMED Academy, our academic leadership brings real-world healthcare experience into the classroom shaping future professionals with practical insights, operational excellence, and strong values.</p>
    </div>
  );
}

function Frame17() {
  return (
    <button type="button" data-nav-target="blog-overview" className="content-stretch flex h-[50px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[12px] shrink-0 w-[220px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(36, 160, 140) 7.1429%, rgb(36, 151, 138) 14.286%, rgb(36, 143, 137) 21.429%, rgb(35, 135, 135) 28.571%, rgb(35, 126, 134) 35.714%, rgb(34, 118, 132) 42.857%, rgb(34, 110, 130) 50%, rgb(33, 102, 128) 57.143%, rgb(33, 94, 125) 64.286%, rgb(33, 86, 123) 71.429%, rgb(32, 77, 121) 78.571%, rgb(32, 69, 118) 85.714%, rgb(31, 61, 116) 92.857%, rgb(31, 52, 113) 100%), linear-gradient(90deg, rgb(37, 168, 141) 0%, rgb(37, 168, 141) 100%)" }}>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Meet Dr. Tickoo</p>
    </button>
  );
}

function Frame18() {
  return (
    <button
      type="button"
      onClick={() => navigateToHomeSection("career-path")}
      className="bg-[rgba(255,255,255,0.1)] h-[50px] relative rounded-[12px] shrink-0 w-[210px]"
    >
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.5px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Explore Programs</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </button>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[30px] items-start left-[69px] top-[calc(50%-29.5px)] w-[733px]">
      <Frame43 />
      <Frame44 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[31.988px] left-[24px] top-[24px] w-[417.2px]" data-name="Heading 3">
      <p className="[word-break:break-word] absolute font-['Poppins:ExtraBold',sans-serif] leading-[32px] left-0 not-italic text-[#182c7a] text-[24px] top-[0.4px] whitespace-nowrap">Dr. Bhawna Tickoo</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[15.988px] left-[16px] top-[8px] w-[130.887px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[16px] left-0 not-italic text-[#182c7a] text-[12px] top-[0.2px] whitespace-nowrap">10+ Yrs · Tertiary Care</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(37,168,141,0.3)] h-[31.988px] left-[24px] rounded-[10px] top-[95.99px] w-[162.887px]" data-name="Container">
      <Text />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-[0.8px] border-[rgba(255,255,255,0.4)] border-solid h-[153.575px] left-[24px] rounded-[10px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-[422.43px] w-[466.8px]" data-name="Container">
      <Heading1 />
      <p className="[word-break:break-word] absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[24px] not-italic text-[#25a88d] text-[14px] top-[59.99px] w-[417.2px]">Healthcare Operations Leader</p>
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[600px] left-[858px] overflow-clip rounded-[36px] top-[24px] w-[514.8px]" data-name="Container">
      <img alt="" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[36px] size-full" src={imgContainer} />
      <div className="absolute h-[663px] left-[-12px] top-[-33px] w-[543px]" data-name="image 1761">
        <img alt="" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1761} />
      </div>
      <Container1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-[#1f3471] h-[666px] left-0 overflow-clip top-[66px] w-[1440px]">
      <div className="-translate-y-1/2 absolute h-[798px] left-0 top-[calc(50%+40px)] w-[1440px]" data-name="image 1759">
        <img alt="" loading="lazy" fetchPriority="low" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1759} />
      </div>
      <Frame45 />
      <Container />
    </div>
  );
}

function Group11() {
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

function Frame48() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] h-[40px] items-start not-italic py-[6px] relative shrink-0 text-white w-[318px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[15px] leading-[0] relative shrink-0 text-[22.992px] w-full">
        <span className="leading-[11.036px]">{`iMED `}</span>
        <span className="leading-[11.036px]">Academy</span>
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[15px] w-full">Educate. Equip. Employ.</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Group11 />
      <Frame48 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame49 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full">
      <Frame25 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[15px] text-white w-[min-content]">India’s Career Launchpad</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[19.62%_76.57%_23.77%_8.03%]" data-name="<Group>">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2013 21.0835">
        <g id="<Group>">
          <path d={svgPaths.p1a100400} fill="var(--fill-0, black)" id="<Path>" />
          <path d={svgPaths.p33376b80} fill="var(--fill-0, black)" id="<Path>_2" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[19.62%_76.57%_23.77%_8.03%]" data-name="<Group>">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[44.68%_8.5%_16.27%_28.77%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70.0812 14.5432">
        <g id="Group">
          <path d={svgPaths.p1a5cbc00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1b3b4cf0} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2617c100} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p2cbeb300} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p32d19e80} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p21bb7c00} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p28a8e1f0} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p38c94300} fill="var(--fill-0, black)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[19.62%_8.5%_16.27%_8.03%]" data-name="<Group>">
      <Group3 />
      <Group5 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111.727 37.2423">
        <g id="Group">
          <path d={svgPaths.p27323b00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1a013cf0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
      <Group2 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[21.09%_12.41%_63.01%_29.81%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.5576 5.91995">
        <g id="Group">
          <path d={svgPaths.p31813f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p4b1bc00} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p1cb6700} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p16952da0} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.pc729600} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p20275400} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p13063b00} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p3927cf80} fill="var(--fill-0, black)" id="Vector_8" />
          <path d={svgPaths.p827fe00} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.p3b320100} fill="var(--fill-0, black)" id="Vector_10" />
          <path d={svgPaths.p3897e200} fill="var(--fill-0, black)" id="Vector_11" />
          <path d={svgPaths.p2b070d00} fill="var(--fill-0, black)" id="Vector_12" />
          <path d={svgPaths.p8ddc00} fill="var(--fill-0, black)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[21.09%_12.41%_63.01%_29.81%]" data-name="<Group>">
      <Group7 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group1 />
      <Group6 />
    </div>
  );
}

function Frame24() {
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
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.692 37.2422">
          <path d={svgPaths.p22d50b00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.692 37.2422">
          <path d={svgPaths.p1e0ec500} fill="var(--fill-0, black)" id="Vector" />
        </svg>
        <div className="absolute inset-[17.15%_64.87%_67.19%_30.63%]" data-name="Vector">
          <div className="absolute inset-[-1.51%_-1.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82921 6.00662">
              <path d={svgPaths.p3d778200} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_61.48%_67.5%_35.94%]" data-name="Vector">
          <div className="absolute inset-[-1.58%_-2.72%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.41623 5.76248">
              <path d={svgPaths.p6d98af0} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_57.78%_67.5%_39.13%]" data-name="Vector">
          <div className="absolute inset-[-1.58%_-2.27%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.05865 5.76248">
              <path d={svgPaths.p2f142fc0} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_55.03%_67.5%_44.4%]" data-name="Vector">
          <div className="absolute inset-[-1.58%_-12.29%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.893065 5.76248">
              <path d={svgPaths.p3358cf00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_51.26%_67.5%_45.69%]" data-name="Vector">
          <div className="absolute inset-[-1.58%_-2.3%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.0121 5.76248">
              <path d={svgPaths.p27422d00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.17%_44.82%_67.17%_50.61%]" data-name="Vector">
          <div className="absolute inset-[-1.51%_-1.54%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.91295 6.00716">
              <path d={svgPaths.p2a0dce80} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[17.5%_40.59%_67.5%_55.99%]" data-name="Vector">
          <div className="absolute inset-[-1.58%_-2.05%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.47762 5.76248">
              <path d={svgPaths.p1d05c9c0} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.176156" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[42.61%_6.8%_15%_30.28%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.0904 15.7864">
            <path d={svgPaths.p1a617280} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[18.68%_83.04%_18.65%_7.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0425 23.3415">
            <path d={svgPaths.p2192fa80} fill="url(#paint0_linear_1_779)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_779" x1="11.0184" x2="-4.60472" y1="1.15451" y2="16.7776">
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
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.4502 7.96983">
            <path d={svgPaths.p14fc2800} fill="url(#paint0_linear_1_760)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_760" x1="10.1764" x2="-12.3458" y1="3.98491" y2="3.98491">
                <stop stopColor="#FFE000" />
                <stop offset="0.41" stopColor="#FFBD00" />
                <stop offset="0.78" stopColor="#FFA500" />
                <stop offset="1" stopColor="#FF9C00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-[17.83%] left-[7.73%] right-[79.91%] top-1/2" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.53 11.9826">
            <path d={svgPaths.p2b5f2100} fill="url(#paint0_linear_1_754)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_754" x1="13.3979" x2="-7.79293" y1="2.14143" y2="23.3229">
                <stop stopColor="#FF3A44" />
                <stop offset="1" stopColor="#C31162" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-1/2 left-[7.73%] right-[79.91%] top-[17.83%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.53 11.9805">
            <path d={svgPaths.p6c4e600} fill="url(#paint0_linear_1_803)" id="Vector" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_803" x1="-2.92351" x2="6.536" y1="-6.47302" y2="2.98649">
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
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.53 8.13277">
            <path d={svgPaths.p1e1d0400} fill="var(--fill-0, black)" id="Vector" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute inset-[77.28%_92.19%_18.85%_7.4%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.508112 1.44313">
            <path d={svgPaths.p2b99b100} fill="var(--fill-0, black)" id="Vector" opacity="0.12" />
          </svg>
        </div>
        <div className="absolute bottom-[39.45%] left-[20%] right-[75.51%] top-1/2" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.64219 3.92905">
            <path d={svgPaths.p2accb580} fill="var(--fill-0, black)" id="Vector" opacity="0.12" />
          </svg>
        </div>
        <div className="absolute bottom-1/2 left-[7.39%] right-[75.51%] top-[17.85%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4981 11.9737">
            <path d={svgPaths.p1c1d8f00} fill="var(--fill-0, white)" id="Vector" opacity="0.25" />
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
        <Group />
      </div>
      </a>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[38px] items-start left-[80px] top-[42px] w-[298px]">
      <Frame50 />
      <Frame24 />
      <div className="h-[62px] relative shrink-0 w-[272px]" data-name="image 1718">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" loading="lazy" fetchPriority="low" decoding="async" className="absolute h-[328.33%] left-[-10.01%] max-w-none top-[-103.91%] w-[111.47%]" src={imgImage1718} />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start relative shrink-0 text-[18px] text-white">
      <button type="button" onClick={() => { window.location.hash = "#emt"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 whitespace-nowrap hover:text-[#8ee2d2]">Emergency Medical Technician</button>
      <button type="button" onClick={() => { window.location.hash = "#ha"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 w-[264px] hover:text-[#8ee2d2]">Hospital Administration</button>
      <button type="button" onClick={() => { window.location.hash = "#gda"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer min-w-full relative shrink-0 text-left transition-colors duration-200 w-[min-content] hover:text-[#8ee2d2]">General Duty Assistance</button>
      <button type="button" onClick={() => { window.location.hash = "#ocha"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 whitespace-nowrap hover:text-[#8ee2d2]">OCHA</button>
      <button type="button" onClick={() => { window.location.hash = "#acha"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 whitespace-nowrap hover:text-[#8ee2d2]">ACHA</button>
      <button type="button" onClick={() => { window.location.hash = "#gca"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer relative shrink-0 text-left transition-colors duration-200 whitespace-nowrap hover:text-[#8ee2d2]">Geriatric Care Assistance</button>
    </div>
  );
}

function Frame6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">Programs</p>
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
          window.location.hash = "";
          setTimeout(() => {
            document.getElementById("about-imed")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }}
        className="relative shrink-0 w-[111px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      >
        About Us
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "#careers";
          window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[23px] items-center leading-[normal] not-italic relative shrink-0 w-[157px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#25a88d] text-[20px] w-full">Company</p>
      <Frame3 />
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

function Frame8() {
  return (
    <a href="mailto:contact@imedacademy.in" className="content-stretch flex gap-[13px] items-start relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">
      <IcRoundEmail />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">contact@imedacademy.in</p>
    </a>
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

function Frame10() {
  return (
    <a href="tel:+919266790357" className="content-stretch flex gap-[13px] items-start relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">
      <SolarPhoneBold />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">+91 92667 90357</p>
    </a>
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

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[20px] w-[min-content]">Contact Us</p>
      <Frame9 />
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

function Group8() {
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
      <Group8 />
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

function Frame12() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[21px] row-1 size-[35px]">
      <AkarIconsLinkedinFill />
    </div>
  );
}

function Component2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="19">
      <Frame12 />
    </div>
  );
}

function Group9() {
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
      <Group9 />
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
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="20">
      <Frame13 />
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

function Frame14() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[7px] relative rounded-[29px] row-1 size-[35px]">
      <MdiYoutube />
    </div>
  );
}

function Component4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="21">
      <Frame14 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center ml-0 mt-0 relative row-1">
      <a href="https://www.instagram.com/imed_academy_/?fbclid=IwY2xjawRhEjJleHRuA2FlbQIxMQBicmlkETE2YTZTZWMwVkpnTnBueDlNc3J0YwZhcHBfaWQBMAABHtQKnEn3xPSCpWGVechsClKv5s90Gqvqv4WFolT0Ae-hvnagmTedAqkxCNoZ_aem_9xl0yX6vqRemofRGlIchGQ" target="_blank" rel="noopener noreferrer" className="inline-flex" aria-label="Instagram"><Component /></a>
      <a href="https://www.facebook.com/people/IMed-Academy/61587360444802/" target="_blank" rel="noopener noreferrer" className="inline-flex" aria-label="Facebook"><Component1 /></a>
      <a href="https://www.linkedin.com/company/imed-academy/" target="_blank" rel="noopener noreferrer" className="inline-flex" aria-label="LinkedIn"><Component2 /></a>
      <a href="https://twitter.com/imedacademy_" target="_blank" rel="noopener noreferrer" className="inline-flex" aria-label="Twitter"><Component3 /></a>
      <a href="https://www.youtube.com/@imedacademy-25" target="_blank" rel="noopener noreferrer" className="inline-flex" aria-label="YouTube"><Component4 /></a>
    </div>
  );
}

function Social() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Social">
      <Frame11 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[113px] items-start relative shrink-0">
      <Frame51 />
      <Social />
    </div>
  );
}

function Frame26() {
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
    <div className="bg-[#1f3471] h-[328px] relative shrink-0 w-full">
      <Frame1 />
      <Frame26 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0">
      <button type="button" onClick={() => { window.location.hash = "#privacy-policy"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">Privacy Policy</button>
      <button type="button" onClick={() => { window.location.hash = "#terms-and-conditions"; window.scrollTo({ top: 0, behavior: "smooth" }); }} className="relative shrink-0 transition-colors duration-200 hover:text-[#8ee2d2]">Terms of use</button>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute bg-[#1f3471] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[normal] not-italic px-[70px] py-[16px] relative size-full text-[14px] text-white whitespace-nowrap">
          <p className="relative shrink-0">© 2026 iMED Academy. All rights reserved. · NSDC Authorised Training Partner · MSME Registered</p>
          <Frame20 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-[4901.7px] w-[1440px]">
      <Frame4 />
      <Frame />
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-[#25a88d] h-[610px] overflow-clip relative rounded-[10px] shrink-0 w-[434px]">
      <div className="absolute h-[665px] left-[-68px] top-[-28px] w-[546px]" data-name="image 1762">
        <img alt="" loading="lazy" fetchPriority="low" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1761} />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[26.043px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0432 26.0432">
        <g id="Icon">
          <path d={svgPaths.p1cd28900} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
          <path d={svgPaths.p13d984c0} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
        </g>
      </svg>
    </div>
  );
}

function Frame65() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2.442px] h-[41.669px] items-start min-w-px not-italic relative">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.788px] relative shrink-0 text-[#182c7a] text-[14.649px] w-full">10+ Years</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16.277px] min-h-px relative text-[11.394px] text-[rgba(24,44,122,0.6)] w-full">Experience</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex gap-[10.58px] items-start relative shrink-0 w-full">
      <Icon />
      <Frame65 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white drop-shadow-[0px_0.814px_1.221px_rgba(0,0,0,0.1),0px_0.814px_0.814px_rgba(0,0,0,0.1)] justify-self-stretch relative rounded-[8.139px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.651px] border-solid inset-0 pointer-events-none rounded-[8.139px]" />
      <div className="content-stretch flex flex-col items-start p-[20.346px] relative size-full">
        <Frame66 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[26.043px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0432 26.0432">
        <g id="Icon">
          <path d={svgPaths.p2fc7e640} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
          <path d={svgPaths.p27120500} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
        </g>
      </svg>
    </div>
  );
}

function Frame70() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2.442px] h-[41.669px] items-start min-w-px not-italic relative">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.788px] relative shrink-0 text-[#182c7a] text-[14.649px] w-full">Operations</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16.277px] min-h-px relative text-[11.394px] text-[rgba(24,44,122,0.6)] w-full">Expert</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex gap-[10.58px] items-start relative shrink-0 w-full">
      <Icon1 />
      <Frame70 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white drop-shadow-[0px_0.814px_1.221px_rgba(0,0,0,0.1),0px_0.814px_0.814px_rgba(0,0,0,0.1)] justify-self-stretch relative rounded-[8.139px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.651px] border-solid inset-0 pointer-events-none rounded-[8.139px]" />
      <div className="content-stretch flex flex-col items-start p-[20.346px] relative size-full">
        <Frame69 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[26.043px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0432 26.0432">
        <g id="Icon">
          <path d={svgPaths.pe0cb7c0} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
          <path d={svgPaths.pcaffb00} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
          <path d={svgPaths.p1e2606c0} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
        </g>
      </svg>
    </div>
  );
}

function Frame72() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2.442px] h-[41.669px] items-start min-w-px not-italic relative">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.788px] relative shrink-0 text-[#182c7a] text-[14.649px] w-full">{`NABH `}</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16.277px] min-h-px relative text-[11.394px] text-[rgba(24,44,122,0.6)] w-full">Specialist</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[10.58px] items-start relative shrink-0 w-full">
      <Icon2 />
      <Frame72 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white drop-shadow-[0px_0.814px_1.221px_rgba(0,0,0,0.1),0px_0.814px_0.814px_rgba(0,0,0,0.1)] justify-self-stretch relative rounded-[8.139px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.651px] border-solid inset-0 pointer-events-none rounded-[8.139px]" />
      <div className="content-stretch flex flex-col items-start p-[20.346px] relative size-full">
        <Frame71 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[26.043px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0432 26.0432">
        <g id="Icon">
          <path d={svgPaths.p6d61a40} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.17027" />
        </g>
      </svg>
    </div>
  );
}

function Frame74() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2.442px] h-[41.669px] items-start min-w-px not-italic relative">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.788px] relative shrink-0 text-[#182c7a] text-[14.649px] w-full">Patient-Centric</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16.277px] min-h-px relative text-[11.394px] text-[rgba(24,44,122,0.6)] w-full">Leader</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex gap-[10.58px] items-start relative shrink-0 w-full">
      <Icon3 />
      <Frame74 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white drop-shadow-[0px_0.814px_1.221px_rgba(0,0,0,0.1),0px_0.814px_0.814px_rgba(0,0,0,0.1)] justify-self-stretch relative rounded-[8.139px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.651px] border-solid inset-0 pointer-events-none rounded-[8.139px]" />
      <div className="content-stretch flex flex-col items-start p-[20.346px] relative size-full">
        <Frame73 />
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="gap-x-[16.277021408081055px] gap-y-[16.277021408081055px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] h-[181px] relative shrink-0 w-[435.41px]">
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[435px]">
      <Frame63 />
      <Frame67 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[15.988px] left-[24.8px] top-[8.8px] w-[110.45px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[16px] left-0 not-italic text-[#25a88d] text-[12px] top-[0.2px] tracking-[0.6px] whitespace-nowrap">FACULTY PROFILE</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[33.588px] relative rounded-[4px] shrink-0 w-[160.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#25a88d] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text1 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[542px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[43px] relative shrink-0 text-[#25a88d] text-[60px] w-full">Dr. Bhawna Tickoo</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[33px] relative shrink-0 text-[20px] text-black w-full">{`Healthcare Operations Leader & Hospital Administrator`}</p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[25px] items-start not-italic relative shrink-0 w-[768px]">
      <Frame60 />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#333] text-[20px] w-[min-content] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[32px]">{`Dr. Bhawna Tickoo is a healthcare operations leader and hospital administrator with over a decade of experience across leading tertiary care institutions in India. With a Master's in Hospital Administration from `}</span>
          <span className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic text-[#1f3471]">TISS Mumbai</span>
          <span className="leading-[32px]">
            {` and a clinical foundation in dentistry, she brings a unique blend of clinical insight and operational excellence.`}
            <br aria-hidden="true" />
            <br aria-hidden="true" />
          </span>
        </p>
        <p className="leading-[32px] mb-0">
          {`Her expertise spans hospital operations, NABH accreditation, quality compliance, patient experience, and healthcare process transformation. She has held key leadership roles across organizations such as Apollo Hospitals, AIIMS New Delhi, and Nanavati Max  consistently driving improvements in efficiency, service delivery, and clinical governance.`}
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p className="mb-0">
          <span className="leading-[32px]">{`Currently in medical administration at `}</span>
          <span className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic text-[#1f3471]">Sir Ganga Ram Hospital</span>
          <span className="leading-[32px]">
            , Dr. Tickoo is deeply engaged in strengthening systems, optimizing workflows, and building patient-centric care models.
            <br aria-hidden="true" />
            <br aria-hidden="true" />
          </span>
        </p>
        <p className="leading-[32px]">As an Honorary Academician with iMED Academy, she contributes her real-world experience to bridge the gap between theoretical learning and practical hospital operations mentoring future healthcare leaders with a focus on execution, quality, and ethical care delivery.</p>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start justify-center relative shrink-0">
      <Container7 />
      <Frame61 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-start justify-between left-1/2 top-[80px] w-[1242px]">
      <Frame68 />
      <Frame62 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-white h-[981px] relative rounded-[20px] shrink-0 w-[1305px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame64 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(37,99,235,0.15),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)]" />
    </div>
  );
}

function About() {
  return (
    <div id="blog-overview" className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-center left-1/2 px-[32px] py-[60px] top-[732px] w-[1440px]" data-name="About">
      <Frame27 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Leadership Footprint</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[calc(50%+0.5px)] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`Trusted Across India's Top Institutions`}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1274px]">
      <Heading />
      <Heading2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ceb9d80} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3fb33600} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame78() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[28px] not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium mb-[-4px] relative shrink-0 text-[#333] text-[14px] w-[173px]">Tertiary Care</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">Apollo Hospitals</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon4 />
      <Frame78 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame76 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ceb9d80} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3fb33600} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame79() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[28px] not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium mb-[-4px] relative shrink-0 text-[#333] text-[14px] w-[173px]">Tertiary Care</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">AIIMS New Delhi</p>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon5 />
      <Frame79 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame77 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ceb9d80} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3fb33600} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame81() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[28px] not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium mb-[-4px] relative shrink-0 text-[#333] text-[14px] w-[173px]">Tertiary Care</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182c7a] text-[18px] w-[218px]">Nanavati Max Healthcare</p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon6 />
      <Frame81 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame80 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ceb9d80} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3fb33600} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame83() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[28px] not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium mb-[-4px] relative shrink-0 text-[#333] text-[14px] w-[173px]">Tertiary Care</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182c7a] text-[18px] w-[204px]">Sir Ganga Ram Hospital</p>
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon7 />
      <Frame83 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame82 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-[1274px]">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function About1() {
  return (
    <div id="leadership-footprint" className="-translate-x-1/2 absolute bg-[#f5f7fb] content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[32px] py-[60px] top-[1833px] w-[1440px]" data-name="About">
      <Frame21 />
      <Frame75 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Areas of Expertise</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">{`A Rare Blend of Clinical & Operational Mastery`}</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[#4a5565] text-[20px] text-center top-px w-[777px] whitespace-pre-wrap">{`From quality systems to patient experience design  competencies built across India's most rigorous healthcare environments.`}</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131px] items-center relative shrink-0 w-[1176px]" data-name="Container">
      <Heading3 />
      <Heading4 />
      <Paragraph />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p25ac5180} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p34392700} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon8 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">Hospital Operations</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame86 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p101a6580} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p76546be} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p12eadd00} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon9 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[177px]">NABH Accreditation</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame87 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p136aa380} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon10 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">Quality Compliance</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame88 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p599bf00} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12H12.0133" id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
          <path d="M20 12H20.0133" id="Vector_4" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon11 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">Patient Experience</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame89 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full">
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p26c56780} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p18cb7e80} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon12 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[173px]">Healthcare Process</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame91 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M14.6667 2.66667V5.33333" id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M6.66667 2.66667V5.33333" id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p20043300} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2b3f2e00} id="Vector_4" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p13a53f80} id="Vector_5" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon13 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[177px]">Clinical Governance</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame92 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1fa92f00} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p230c5e00} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon14 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[182px]">Operational Strategy</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame93 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dcdf880} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pe622d00} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0 w-[219px]">
      <Icon15 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#182c7a] text-[18px] w-[203px]">Medical Administration</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[100px] items-center justify-center p-[25px] relative rounded-[10px] shrink-0 w-[300px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame94 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full">
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-[1275px]">
      <Frame85 />
      <Frame90 />
    </div>
  );
}

function About2() {
  return (
    <div id="blog-vision" className="absolute bg-white content-stretch flex flex-col gap-[120px] items-center left-0 px-[32px] py-[60px] top-[2243px] w-[1440px]" data-name="About">
      <Container12 />
      <Frame84 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[72px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">iMED Academy</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[#1f3471] text-[40px] top-[-1px] w-[551px]">Our Vision</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[61px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#4a5565] text-[20px] top-[-2px] w-[620px] whitespace-pre-wrap">
        <p className="leading-[32.5px] mb-0">At iMED Academy, the vision is to build a new generation of healthcare professionals who are not only academically sound but also operationally capable and industry ready.</p>
        <p className="leading-[32.5px] mb-0">​</p>
        <p className="leading-[32.5px] mb-0">In healthcare, knowledge alone is not enough implementation, systems thinking, and patient-centered execution matter equally.</p>
        <p className="leading-[32.5px] mb-0">​</p>
        <p className="leading-[32.5px] mb-0">We bridge the gap between theoretical learning and practical hospital operations through real-world exposure, case-based learning, and operational problem-solving.</p>
        <p className="leading-[32.5px] mb-0">​</p>
        <p className="leading-[32.5px]">The institution is committed to shaping leaders who prioritize patient safety, efficiency, quality, and ethical healthcare delivery.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[620px]" data-name="Container">
      <Heading5 />
      <Heading6 />
      <Paragraph1 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col h-[593px] items-start relative shrink-0">
      <Container21 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[32px] top-1/2" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3a0993c0} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1adb0100} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[13.924px] shrink-0 size-[58.018px]">
      <Icon16 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[11.604px] items-start not-italic relative shrink-0 w-[504.757px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.688px] relative shrink-0 text-[#1f3471] text-[23.207px] w-[431.654px]">Practical, Industry-Focused Learning</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30.169px] min-w-full relative shrink-0 text-[#333] text-[18.566px] w-[min-content]">Real-world exposure and case-based curriculum designed by working healthcare leaders.</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[23.207px] items-start relative shrink-0 w-full">
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white relative rounded-[24.368px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[34.811px] pr-[23.207px] py-[23.207px] relative size-full">
          <Frame30 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.928px] border-solid inset-0 pointer-events-none rounded-[24.368px]" />
    </div>
  );
}

function Icon17() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[32px] top-1/2" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3c76d900} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[13.924px] shrink-0 size-[58.018px]">
      <Icon17 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[11.604px] items-start not-italic relative shrink-0 w-[504.757px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.688px] relative shrink-0 text-[#1f3471] text-[23.207px] w-[431.654px]">Learn From the Best</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30.169px] min-w-full relative shrink-0 text-[#333] text-[18.566px] w-[min-content]">Mentorship from experienced administrators, clinicians, and quality experts.</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[23.207px] items-start relative shrink-0 w-full">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-white relative rounded-[24.368px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[34.811px] pr-[23.207px] py-[23.207px] relative size-full">
          <Frame34 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.928px] border-solid inset-0 pointer-events-none rounded-[24.368px]" />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute inset-[0.76%_0.76%_0.75%_0.75%]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p261b2200} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function MdiClockOutline() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[32.49px] top-1/2" data-name="mdi:clock-outline">
      <Icon18 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[rgba(37,168,141,0.2)] overflow-clip relative rounded-[13.924px] shrink-0 size-[58.018px]">
      <MdiClockOutline />
    </div>
  );
}

function Frame40() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[11.604px] items-start not-italic relative shrink-0 w-[504.757px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.688px] relative shrink-0 text-[#1f3471] text-[23.207px] w-[431.654px]">Ethical · Quality · Patient-Centric</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30.169px] min-w-full relative shrink-0 text-[#333] text-[18.566px] w-[min-content]">We instill values that matter in healthcare safety, efficiency, and compassion.</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[23.207px] items-start relative shrink-0 w-full">
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white relative rounded-[24.368px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[34.811px] pr-[23.207px] py-[23.207px] relative size-full">
          <Frame38 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dde3ea] border-[0.928px] border-solid inset-0 pointer-events-none rounded-[24.368px]" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[23.207px] items-start relative shrink-0 w-[644px]">
      <Frame31 />
      <Frame33 />
      <Frame37 />
    </div>
  );
}

function About3() {
  return (
    <div id="why-imed" className="-translate-x-1/2 absolute bg-[#f5f7fb] content-stretch flex gap-[40px] items-end justify-end left-1/2 px-[69px] py-[60px] top-[2839px] w-[1440px]" data-name="About">
      <Frame23 />
      <Frame32 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">Why iMED</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-1/2 not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">Why Learn From Industry Leaders</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1274px]">
      <Heading7 />
      <Heading8 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.pa75a70} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1082cc0} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pcc42cc0} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M11.6667 7H16.3333" id="Vector_4" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M11.6667 11.6667H16.3333" id="Vector_5" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M11.6667 16.3333H16.3333" id="Vector_6" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M11.6667 21H16.3333" id="Vector_7" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">Curriculum rooted in live operational environments, not just textbooks.</p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Real Hospital Exposure</p>
      <Paragraph2 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container24 />
      <Frame96 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-0 rounded-[24px] top-0 w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame95 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3da6200} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p394f8700} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pb465bc0} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">Solve real challenges drawn from tertiary care institutions.</p>
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Case-Based Learning</p>
      <Paragraph3 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container26 />
      <Frame98 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-[385.33px] rounded-[24px] top-0 w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame97 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p184ba090} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p5d36b00} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2f1426c0} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p25f79f00} id="Vector_4" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">{`Guidance from leaders who shape India's Healthcare delivery.`}</p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Mentorship From Experts</p>
      <Paragraph4 />
    </div>
  );
}

function Frame99() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container28 />
      <Frame100 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-[770.66px] rounded-[24px] top-0 w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame99 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1fa66600} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p190dabf0} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2a9abe70} id="Vector_3" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">Systems, processes, and quality frameworks built in from day one.</p>
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Operational Thinking</p>
      <Paragraph5 />
    </div>
  );
}

function Frame101() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container30 />
      <Frame102 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-0 rounded-[24px] top-[277.85px] w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame101 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1b228440} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">Continuously updated to mirror the evolving Hospital ecosystem.</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Industry-Relevant Curriculum</p>
      <Paragraph6 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container32 />
      <Frame104 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-[385.33px] rounded-[24px] top-[277.85px] w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame103 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3997a780} id="Vector" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p275e0300} id="Vector_2" stroke="var(--stroke-0, #25A88D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(37,168,141,0.1)] content-stretch flex items-center justify-center px-[14px] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.6px] w-[296px]">We build administrators ready to lead with empathy and execution.</p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108.25px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px not-italic relative text-[#182c7a] text-[20px] w-full">Leadership Development</p>
      <Paragraph7 />
    </div>
  );
}

function Frame105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[32px] top-[32px] w-[295.725px]">
      <Container34 />
      <Frame106 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white border-[#dde3ea] border-[0.8px] border-solid drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[253.85px] left-[770.66px] rounded-[24px] top-[277.85px] w-[361.325px] transition-all duration-300 hover:-translate-y-1 hover:border-[#25a88d] hover:shadow-[0px_12px_30px_rgba(31,52,113,0.14)]" data-name="Container">
      <Frame105 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[559.7px] relative shrink-0 w-[1132px]" data-name="Container">
      <Container23 />
      <Container25 />
      <Container27 />
      <Container29 />
      <Container31 />
      <Container33 />
    </div>
  );
}

function About4() {
  return (
    <div id="learning-advantage" className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[32px] py-[60px] top-[3552px] w-[1440px]" data-name="About">
      <Frame22 />
      <Container22 />
    </div>
  );
}

function Container36() {
  return <div className="absolute h-[359.75px] left-0 top-0 w-[1132px]" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 0.27797%, rgba(0, 0, 0, 0) 0.27797%), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 0%)" }} data-name="Container" />;
}

function Paragraph8() {
  return (
    <div className="h-[87.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-0 not-italic text-[18px] text-[rgba(255,255,255,0.8)] top-[0.6px] w-[672px]">{`Join India's most comprehensive healthcare operations and leadership program. Learn from the best, transform your career, and make a lasting impact on patient care.`}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[231.75px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[60px] not-italic relative shrink-0 text-[48px] text-white w-full">Start Your Healthcare Leadership Journey</p>
        <Paragraph8 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <button
      type="button"
      onClick={() => navigateToHomeSection("career-path")}
      className="bg-white drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)] h-[69px] relative rounded-[10px] shrink-0 w-full"
      data-name="Button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[calc(50%-0.5px)] not-italic text-[#182c7a] text-[20px] text-center top-[calc(50%-11.5px)] whitespace-nowrap">Explore Courses</p>
    </button>
  );
}

function Button2() {
  return (
    <button
      type="button"
      onClick={() => navigateToHomeSection("contact-us")}
      className="bg-[rgba(255,255,255,0.1)] h-[69px] relative rounded-[10px] shrink-0 w-full"
      data-name="Button"
    >
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-1/2 not-italic text-[20px] text-center text-white top-[calc(50%-11.5px)] whitespace-nowrap">Contact iMED</p>
    </button>
  );
}

function Frame107() {
  return (
    <div className="relative shrink-0 w-[220px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[30px] items-start relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[269px] h-[231.75px] items-center left-[64px] top-[64px] w-[1004px]" data-name="Container">
      <Container38 />
      <Frame107 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[360px] overflow-clip relative rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[1306px]" style={{ backgroundImage: "linear-gradient(164.589deg, rgb(37, 168, 141) 0%, rgb(36, 151, 138) 7.1429%, rgb(35, 135, 135) 14.286%, rgb(34, 118, 132) 21.429%, rgb(33, 102, 128) 28.571%, rgb(33, 86, 123) 35.714%, rgb(32, 69, 118) 42.857%, rgb(31, 52, 113) 50%, rgb(29, 51, 115) 60%, rgb(28, 49, 117) 70%, rgb(27, 47, 118) 80%, rgb(25, 46, 120) 90%, rgb(24, 44, 122) 100%)" }} data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function About5() {
  return (
    <div id="blog-contact" className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-center left-1/2 px-[32px] py-[60px] top-[4421.7px] w-[1440px]" data-name="About">
      <Container35 />
    </div>
  );
}

export default function Acha() {
  const designWidth = 1440;
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all(blogCriticalImages.map(preloadBlogImage)).then(() => {
      if (mounted) setImagesReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

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

  if (!imagesReady) {
    return <div className="min-h-screen w-full bg-white" />;
  }

  return (
    <div className="bg-white overflow-x-hidden w-full" style={{ minHeight: scaledHeight ? `${scaledHeight}px` : "100vh" }}>
      <div
        className="fixed left-0 top-0 z-[70] origin-top-left w-[1440px]"
        style={{
          transform: `scale(${pageScale})`,
        }}
      >
        <NavBar />
      </div>
      <div
        ref={pageRef}
        className="relative origin-top-left w-[1440px]"
        style={{
          transform: `scale(${pageScale})`,
        }}
        data-name="ACHA"
      >
        <Frame15 />
        <Frame16 />
        <About />
        <About1 />
        <About2 />
        <About3 />
        <About4 />
        <About5 />
      </div>
    </div>
  );
}
