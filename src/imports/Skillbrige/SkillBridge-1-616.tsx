import { useEffect, useRef, useState } from "react";
import svgPaths from "./svg-wgdwc3ue3l";
import imgImage1712 from "./36b610493eb683f0e81e17848fd143c365f117fd.png";
import imgContainer from "./b0953757e6b12f75b023f2ff895d21614fa1bfcf.png";
import imgContainer1 from "./e17503bd1080df99af1e9cd7b5026b4e1a5a3e32.png";
import imgContainer2 from "./58e6e8b3158e0407ffa9d2b9220117723aa04792.png";
import imgContainer3 from "./8718d67b8e5eb2df6f564b864ff807a7e445ccc3.png";
import imgContainer4 from "./cc79e02a12a198710377055f7d3afd7210ce5508.png";
import imgContainer5 from "./6a0c6919efdcfb0fdf717cdef03ed736f57ee7c5.png";
import imgContainer6 from "./72cec50c05d5e96341e0c679684973055b26f79d.png";
import imgContainer7 from "./036820f90c65450a1812bbf2552de3f89b748cc5.png";
import imgContainer8 from "./495b45b30e1871660f26078c6433a7e812d8a872.png";
import imgContainer9 from "./b79d75bf2d74efbad2c9618710bdca9e8ece895b.png";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 6516;

function scrollToSkillBridgeSection(sectionId: string) {
  const scale = window.innerWidth / DESIGN_WIDTH;
  const navOffset = 84 * scale;
  const sectionTopMap: Record<string, number> = {
    "sb-modules": 1075,
    "sb-process": 2088,
    "sb-colleges": 2751,
    "sb-pricing": 3722,
    "sb-how-it-works": 5349,
    "sb-contact": 6079,
  };

  const mappedTop = sectionTopMap[sectionId];
  const sectionTop =
    typeof mappedTop === "number"
      ? mappedTop * scale
      : (() => {
          const section = document.getElementById(sectionId);
          if (!section) return window.scrollY;
          return section.getBoundingClientRect().top + window.scrollY;
        })();

  window.scrollTo({
    top: Math.max(0, sectionTop - navOffset),
    behavior: "smooth",
  });
}

function navigateToRoute(route: string) {
  if (route === "") {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (window.location.hash === route) return;
  window.location.hash = route;
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[39.4px] ml-0 mt-0 relative row-1 w-[31.105px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} loading="eager" decoding="async" fetchPriority="high" />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#1f3471] text-[0px] top-[-1.2px] tracking-[-0.55px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <span className="font-['Inter:Semi_Bold',sans-serif] leading-[22px] text-[22px]">Skill</span>
        <span className="font-['Inter:Black',sans-serif] font-black leading-[22px] text-[#0fa98e] text-[22px]">Bridge</span>
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#333] text-[9px] top-[-0.2px] tracking-[1.8px] uppercase whitespace-nowrap">by iMED Academy</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[37.5px] items-start relative shrink-0 w-[116.662px]" data-name="Container">
      <Heading />
      <Text />
    </div>
  );
}

function Frame85() {
  return (
    <button type="button" onClick={() => navigateToRoute("")} className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[203px] text-left">
      <Group4 />
      <Container />
    </button>
  );
}

function Frame78() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-modules")}
      className="group block h-[24px] relative shrink-0 w-[66px] transition-all duration-200 hover:-translate-y-0.5"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[33px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Modules</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[72%]" />
    </button>
  );
}

function Frame79() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-process")}
      className="group block h-[24px] relative shrink-0 w-[62px] transition-all duration-200 hover:-translate-y-0.5"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[31px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Process</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[72%]" />
    </button>
  );
}

function Frame80() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-colleges")}
      className="group block h-[24px] relative shrink-0 w-[96px] transition-all duration-200 hover:-translate-y-0.5"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[48px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">For Colleges</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[78%]" />
    </button>
  );
}

function Frame81() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-pricing")}
      className="group block h-[24px] relative shrink-0 w-[53px] transition-all duration-200 hover:-translate-y-0.5"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[26.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Pricing</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[72%]" />
    </button>
  );
}

function Frame82() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-contact")}
      className="group block h-[24px] relative shrink-0 w-[88px] transition-all duration-200 hover:-translate-y-0.5"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[44px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap transition-colors duration-200 group-hover:text-[#1f3471]">Contact US</p>
      <span aria-hidden="true" className="absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#25a88d] transition-all duration-300 group-hover:w-[74%]" />
    </button>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <Frame78 />
      <Frame79 />
      <Frame80 />
      <Frame81 />
      <Frame82 />
    </div>
  );
}

function Button() {
  return (
    <button onClick={() => scrollToSkillBridgeSection("sb-how-it-works")} className="bg-[#14cca8] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px]" data-name="Button" type="button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Partner With Us</p>
    </button>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex gap-[117px] items-center relative shrink-0">
      <Frame83 />
      <Button />
    </div>
  );
}

function NavBar({ pinned = false }: { pinned?: boolean }) {
  return (
    <div className={`absolute bg-white content-stretch flex gap-[321px] h-[76px] items-center justify-center left-0 overflow-visible px-[38px] py-[15px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] w-[1440px] z-50 ${pinned ? "top-0" : "top-[66px]"}`} data-name="Nav Bar">
      <Frame85 />
      <Frame84 />
    </div>
  );
}

function Text1() {
  return <div className="absolute bg-[#0fa98e] left-0 opacity-52 rounded-[32735422px] size-[7.317px] top-[8.23px]" data-name="Text" />;
}

function BoldText() {
  return (
    <div className="absolute h-[23.78px] left-[208.2px] top-0 w-[113.855px]" data-name="Bold Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.78px] left-0 not-italic text-[#14cca8] text-[15.853px] top-[0.73px] whitespace-nowrap">iMED Academy</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[23.78px] left-0 top-[14.94px] w-[322.052px]" data-name="Container">
      <Text1 />
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[23.78px] left-[19.51px] not-italic text-[15.853px] text-[rgba(255,255,255,0.5)] top-[0.73px] whitespace-nowrap">{`A workforce initiative by `}</p>
      <BoldText />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[23.78px] left-[400.05px] top-[14.94px] w-[437.523px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.78px] left-0 not-italic text-[#f4a261] text-[15.853px] top-[-0.24px] tracking-[0.3963px] whitespace-nowrap">🎯 Introductory pricing — ₹50,000 per module</p>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[23.78px] relative shrink-0 w-[148.702px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[23.78px] left-0 text-[15.853px] text-[rgba(255,255,255,0.7)] top-[0.73px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          📞 +91 92667 90357
        </p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[23.78px] relative shrink-0 w-[210.393px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[23.78px] left-0 not-italic text-[15.853px] text-[rgba(255,255,255,0.7)] top-[0.73px] whitespace-nowrap">✉ contact@imedacademy.in</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[24.39px] h-[23.78px] items-center left-[915.58px] top-[14.94px] w-[383.484px]" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[54px] relative shrink-0 w-[1306px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function NavBar1() {
  return (
    <div className="absolute content-stretch drop-shadow-[0px_4px_2px_rgba(40,53,147,0.15)] flex h-[66px] items-center justify-center left-0 overflow-clip px-[38px] py-[15px] top-0 w-[1440px] z-50" data-name="Nav Bar">
      <Container1 />
    </div>
  );
}

function Text2() {
  return <div className="bg-[#0fa98e] relative rounded-[32758168px] shadow-[0px_0px_0px_0px_rgba(15,169,142,0.2)] shrink-0 size-[9.763px]" data-name="Text" />;
}

function Frame86() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Text2 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[23.797px] not-italic relative shrink-0 text-[#14cca8] text-[15px] tracking-[0.3966px] whitespace-nowrap">On-campus upskilling for colleges</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(15,169,142,0.1)] content-stretch flex flex-col items-start px-[18px] py-[10px] relative rounded-[7px] shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.976px] border-[rgba(15,169,142,0.2)] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Frame86 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[44px] items-start left-[27.95px] pr-[259.932px] top-0 w-[689px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function AnimatedCareersTomorrow() {
  const word = "Careers Tomorrow.";
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

  return <span className="text-white">{word.slice(0, visibleCount)}</span>;
}

function Container9() {
  return (
    <div className="absolute h-[255px] left-[27.95px] top-[94px] w-[689px]" data-name="Container">
      <style>{`
        @keyframes skillbridgeCareersAchievement {
          0% { opacity: 0; transform: translate3d(0,22px,0) scale(0.98); }
          55% { opacity: 1; transform: translate3d(0,0,0) scale(1.01); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
        }
      `}</style>
      <div className="[word-break:break-word] absolute font-['Fraunces:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[0px] text-white top-[-11.22px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[90px] mb-0 text-[70px]">SkillBridge.</p>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[90px] mb-0 text-[#14cca8] text-[70px]">Skills Today.</p>
        <p
          className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[90px] text-[70px]"
          style={{ animation: "skillbridgeCareersAchievement 900ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <AnimatedCareersTomorrow />
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[115.322px] left-[28px] top-[379px] w-[652.546px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[38.441px] left-0 not-italic text-[20px] text-[rgba(255,255,255,0.7)] top-[-1.22px] w-[652.881px]">Industry-led workshops in AI, Digital Marketing, and Data Analytics delivered on your college campus. We make students career-ready before they graduate.</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[26.542px] left-[229.68px] top-[16.84px] w-[15.712px]" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[26.542px] left-[8px] text-[17.695px] text-center text-white top-[-0.49px] tracking-[0.4424px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        →
      </p>
    </div>
  );
}

function Button1() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-how-it-works")}
      className="absolute bg-[#0fa98e] drop-shadow-[0px_4.881px_12.203px_rgba(15,169,142,0.3)] h-[60.224px] left-[27.95px] rounded-[12px] top-[533.06px] w-[277.124px] cursor-pointer transition-all duration-200 hover:brightness-110"
      data-name="Button"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.542px] left-[124.73px] not-italic text-[18px] text-center text-white top-[16.35px] tracking-[0.4424px] whitespace-nowrap">{`Book a College Demo `}</p>
      <Text3 />
    </button>
  );
}

function Text4() {
  return (
    <div className="absolute h-[26.542px] left-[189.81px] top-[15.86px] w-[14.72px]" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[26.542px] left-[7.5px] text-[17.695px] text-center text-white top-[-0.49px] tracking-[0.4424px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        ↓
      </p>
    </div>
  );
}

function Button2() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-modules")}
      className="absolute border-[0.976px] border-[rgba(255,255,255,0.3)] border-solid h-[60.224px] left-[322.16px] rounded-[12px] top-[533.06px] w-[238.21px] cursor-pointer transition-all duration-200 hover:bg-white/10"
      data-name="Button"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.542px] left-[104.73px] not-italic text-[18px] text-center text-white top-[15.38px] tracking-[0.4424px] whitespace-nowrap">{`Explore Modules `}</p>
      <Text4 />
    </button>
  );
}

function Button3() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-how-it-works")}
      className="absolute border-[0.942px] border-[rgba(255,255,255,0.4)] border-solid h-[64.31px] left-[40.8px] rounded-[4px] top-[445.62px] w-[323.2px] cursor-pointer transition-all duration-200 hover:bg-white/10"
      data-name="Button"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[24.735px] left-[160.98px] text-[16.49px] text-center text-white top-[18.37px] tracking-[0.1649px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get Started {"->"}
      </p>
    </button>
  );
}

function Button4() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-how-it-works")}
      className="absolute bg-[#0fa98e] h-[64.31px] left-[40.8px] rounded-[4px] top-[445.62px] w-[323.2px] cursor-pointer transition-all duration-200 hover:brightness-110"
      data-name="Button"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[24.735px] left-[161.42px] text-[16.49px] text-center text-white top-[19.32px] tracking-[0.1649px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Book a Demo  ->`}</p>
    </button>
  );
}

function Button5() {
  return (
    <button
      onClick={() => scrollToSkillBridgeSection("sb-how-it-works")}
      className="absolute border-[0.942px] border-[rgba(255,255,255,0.4)] border-solid h-[64.31px] left-[40.8px] rounded-[4px] top-[445.62px] w-[323.2px] cursor-pointer transition-all duration-200 hover:bg-white/10"
      data-name="Button"
      type="button"
    >
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[24.735px] left-[160.98px] text-[16.49px] text-center text-white top-[18.37px] tracking-[0.1649px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Talk to Us  ->`}</p>
    </button>
  );
}

function Frame87() {
  return <div className="absolute h-[43px] left-[54.67px] top-[510.11px] w-[336px]" />;
}

function Container11() {
  return (
    <div className="absolute h-[585.763px] left-[712.95px] rounded-[11px] top-[3.75px] w-[621.488px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[11px] size-full" src={imgContainer} loading="eager" decoding="async" fetchPriority="high" />
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame87 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.3)] border-b-[0.976px] border-solid inset-0 pointer-events-none rounded-[11px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[593.283px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container9 />
      <Container10 />
      <Button1 />
      <Button2 />
      <Container11 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[593.283px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[39.051px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute bg-[#0a1f3d] content-stretch flex flex-col h-[728px] items-start left-0 overflow-clip pt-[80px] top-[142px] w-[1440px]" data-name="Hero">
      <Container5 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="h-[57px] relative shrink-0 w-[66px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[56.098px] left-[33.5px] text-[#14cca8] text-[56px] text-center top-0 tracking-[-1.6829px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        30+
      </p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="h-[21px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.122px] left-[49px] not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center top-0 tracking-[1.0732px] uppercase whitespace-nowrap">Workshops</p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[98px]">
      <Frame88 />
      <Frame89 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="h-[57px] relative shrink-0 w-[37px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[56.098px] left-[18.5px] text-[#14cca8] text-[56px] text-center top-0 tracking-[-1.6829px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        3
      </p>
    </div>
  );
}

function Frame90() {
  return (
    <div className="h-[21px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.122px] left-[36.5px] not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center top-0 tracking-[1.0732px] uppercase whitespace-nowrap">Domains</p>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[72px]">
      <Frame91 />
      <Frame90 />
    </div>
  );
}

function Frame92() {
  return (
    <div className="h-[57px] relative shrink-0 w-[77px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[56.098px] left-[38.5px] text-[#14cca8] text-[56px] text-center top-0 tracking-[-1.6829px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        100%
      </p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="h-[21px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.122px] left-[68px] not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center top-0 tracking-[1.0732px] uppercase whitespace-nowrap">Career Focused</p>
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[137px]">
      <Frame92 />
      <Frame93 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="h-[57px] relative shrink-0 w-[107px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[56.098px] left-[53px] text-[#14cca8] text-[56px] text-center top-0 tracking-[-1.6829px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        5K+
      </p>
    </div>
  );
}

function Frame94() {
  return (
    <div className="h-[21px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.122px] left-[82px] not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center top-0 tracking-[1.0732px] uppercase whitespace-nowrap">Students Impacted</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[164px]">
      <Frame95 />
      <Frame94 />
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex gap-[230px] items-center justify-center relative shrink-0">
      <Frame96 />
      <Frame97 />
      <Frame98 />
      <Frame99 />
    </div>
  );
}

function Stats() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#0a1f3d] content-stretch flex flex-col h-[205px] items-center justify-center left-[calc(50%-0.49px)] top-[870px] w-[1439.024px]" data-name="Stats">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-b-[0.976px] border-solid border-t-[0.976px] inset-0 pointer-events-none" />
      <Frame100 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#14cca8] text-[20px] text-center top-[-1px] whitespace-nowrap">Our Modules</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[587.66px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">
        <span className="leading-[48px]">{`Three domains. `}</span>
        <span className="leading-[48px] text-[#14cca8]">Infinite career paths.</span>
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[20px] text-[rgba(255,255,255,0.5)] text-center top-px w-[777px]">Each module is built with industry practitioners, packed with live projects, and ends with a portfolio-ready certification.</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading1 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[247px] left-0 right-0 rounded-[19.458px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[19.458px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[19.458px] size-full transition-transform duration-500 ease-out group-hover:scale-[1.04]" src={imgContainer1} loading="lazy" decoding="async" fetchPriority="low" />
        <div className="absolute bg-gradient-to-b from-[57.085%] from-[rgba(0,0,0,0)] inset-0 rounded-[19.458px] to-[89.065%] to-black" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[41px] right-[41px] top-[174.37px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-white w-[314px]">AI Edge</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[41px] top-[174.37px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium_Italic',sans-serif] font-medium italic leading-[normal] left-[41px] text-[16px] text-[rgba(255,255,255,0.6)] top-[208px] w-[314px]">Master AI. Work Smarter.</p>
      <Frame4 />
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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">2–4 week workshop</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full whitespace-pre-wrap">{`From prompt engineering to building AI workflows  students learn to work alongside AI, not just talk about it.`}</p>
    </div>
  );
}

function Frame101() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">ChatGPT</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Automation</p>
    </div>
  );
}

function Frame103() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">AI Tools</p>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame101 />
      <Frame104 />
      <Frame103 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Prompt Design</p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[343px]">
      <Frame105 />
      <Frame102 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame106 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[268.37px] w-[328px]">
      <Frame2 />
      <Frame11 />
      <Frame48 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="group bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container12 />
      <Group7 />
      <Frame12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[247px] left-0 right-0 rounded-[19.458px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[19.458px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[19.458px] size-full transition-transform duration-500 ease-out group-hover:scale-[1.04]" src={imgContainer2} loading="lazy" decoding="async" fetchPriority="low" />
        <div className="absolute bg-gradient-to-b from-[57.085%] from-[rgba(0,0,0,0)] inset-0 rounded-[19.458px] to-[89.065%] to-black" />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[41px] right-[41px] top-[174.37px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-white w-[314px]">Growth Lab</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[41px] right-[41px] top-[174.37px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium_Italic',sans-serif] font-medium italic leading-[normal] left-[41px] text-[16px] text-[rgba(255,255,255,0.6)] top-[208px] w-[314px]">Digital Marketing for the Real World.</p>
      <Frame7 />
    </div>
  );
}

function Group1() {
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
      <Group1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine1 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">2–4 week workshop</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">SEO, Meta Ads, content strategy, analytics dashboards real campaigns with real budgets and measurable results.</p>
    </div>
  );
}

function Frame109() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Google Ads</p>
    </div>
  );
}

function Frame110() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">SEO</p>
    </div>
  );
}

function Frame111() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Content</p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame109 />
      <Frame110 />
      <Frame111 />
    </div>
  );
}

function Frame112() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Analytics</p>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[343px]">
      <Frame108 />
      <Frame112 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame107 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[268.37px] w-[328px]">
      <Frame3 />
      <Frame14 />
      <Frame49 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="group bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container13 />
      <Group8 />
      <Frame13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[247px] left-0 right-0 rounded-[19.458px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[19.458px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[19.458px] size-full transition-transform duration-500 ease-out group-hover:scale-[1.04]" src={imgContainer3} loading="lazy" decoding="async" fetchPriority="low" />
        <div className="absolute bg-gradient-to-b from-[57.085%] from-[rgba(0,0,0,0)] inset-0 rounded-[19.458px] to-[89.065%] to-black" />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[41px] right-[41px] top-[174.37px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-white w-[314px]">InsightIQ</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[41px] right-[41px] top-[174.37px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium_Italic',sans-serif] font-medium italic leading-[normal] left-[41px] text-[16px] text-[rgba(255,255,255,0.6)] top-[208px] w-[314px]">{`Analytics & Business Intelligence.`}</p>
      <Frame9 />
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

function MingcuteTimeLine2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:time-line">
      <Group2 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <MingcuteTimeLine2 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">2–4 week workshop</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame17 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">Excel mastery, SQL basics, data visualization with Power BI — students learn to turn raw data into business decisions.</p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Excel</p>
    </div>
  );
}

function Frame116() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Dashboards</p>
    </div>
  );
}

function Frame117() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">SQL</p>
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Frame115 />
      <Frame116 />
      <Frame117 />
    </div>
  );
}

function Frame118() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center px-[15px] py-[5px] relative rounded-[5px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Power BI</p>
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[343px]">
      <Frame114 />
      <Frame118 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] min-w-full not-italic relative shrink-0 text-[#25a88d] text-[14px] w-[min-content]">Program Highlights</p>
      <Frame113 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[41px] top-[268.37px] w-[328px]">
      <Frame10 />
      <Frame18 />
      <Frame50 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="group bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container14 />
      <Group9 />
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0">
      <Frame5 />
      <Frame6 />
      <Frame8 />
    </div>
  );
}

function About() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#061529] content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[92px] top-[1075px] w-[1440px]" data-name="About">
      <Frame62 />
      <Frame16 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#14cca8] text-[20px] text-center top-[-1px] whitespace-nowrap">How It Works</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[587.66px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">
        <span className="leading-[48px]">{`Four steps from `}</span>
        <span className="leading-[48px] text-[#14cca8]">Partnership</span>
        <span className="leading-[48px]">{` to `}</span>
        <span className="leading-[48px] text-[#14cca8]">Placement</span>
        <span className="leading-[48px]">.</span>
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[20px] text-[rgba(255,255,255,0.5)] text-center top-px w-[777px]">We handle everything curriculum, trainers, materials, certifications. Your college just provides the students and the space.</p>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading3 />
      <Heading4 />
      <Paragraph1 />
    </div>
  );
}

function Frame27() {
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
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[calc(50%+0.5px)] not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">1</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-white w-full">Connect</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-full">Your college partners with SkillBridge. We understand your students, their branches, and their career gaps.</p>
    </div>
  );
}

function Frame31({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute content-stretch flex flex-col gap-[40px] items-center left-0 top-0 w-[237px] ${className}`}>
      <Frame27 />
      <Frame23 />
    </div>
  );
}

function Frame28() {
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
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">
        <p className="leading-[20px] mb-0">2</p>
        <p className="leading-[20px]">​</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[20px] text-white w-full">Customize</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-full whitespace-pre-wrap">
        <p className="leading-[20px] mb-0">{`We tailor the module mix AI, Marketing, or Analytics  based on your students' profile and industry demand.`}</p>
        <p className="leading-[20px]">​</p>
      </div>
    </div>
  );
}

function Frame32({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute content-stretch flex flex-col gap-[40px] items-center left-[337px] top-0 w-[237px] ${className}`}>
      <Frame28 />
      <Frame24 />
    </div>
  );
}

function Frame29() {
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
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[calc(50%+0.5px)] not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">3</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-white w-full">Deliver</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-full">Our certified trainers come to your campus. Live workshops, hands-on projects, real tools no boring lectures.</p>
    </div>
  );
}

function Frame33({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute content-stretch flex flex-col gap-[40px] items-center left-[674px] top-0 w-[237px] ${className}`}>
      <Frame29 />
      <Frame25 />
    </div>
  );
}

function Frame30() {
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
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-1/2 not-italic text-[35px] text-center text-white top-[calc(50%-10px)] whitespace-nowrap">4</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-center leading-[20px] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-white w-full">Certify</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-full">Students receive industry-recognized certificates, project portfolios, and career readiness assessments.</p>
    </div>
  );
}

function Frame34({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute content-stretch flex flex-col gap-[40px] items-center left-[1011px] top-0 w-[237px] ${className}`}>
      <Frame30 />
      <Frame26 />
    </div>
  );
}

function Frame35() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const [flowStage, setFlowStage] = useState(0);

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
    `transition-all duration-500 ${
      state.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    } ${state.active ? "drop-shadow-[0_0_12px_rgba(37,168,141,0.35)]" : ""}`;

  const lineFillClass = (state: { filled: boolean; animating: boolean }) =>
    `absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#25a88d] ${
      state.animating ? "transition-all duration-700" : "transition-all duration-300"
    } ${state.filled || state.animating ? "w-full" : "w-0"}`;

  return (
    <div ref={sectionRef} className="h-[204px] relative shrink-0 w-[1248px]">
      <Frame31 className={stepClass(s1)} />
      <Frame32 className={stepClass(s2)} />
      <Frame33 className={stepClass(s3)} />
      <Frame34 className={stepClass(s4)} />
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

function About1() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#0a1f3d] content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[92px] top-[2088px] w-[1440px]" data-name="About">
      <Frame63 />
      <Frame35 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#14cca8] text-[20px] text-center top-[-1px] whitespace-nowrap">For Colleges</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[587.66px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">
        <span className="leading-[48px]">{`Add `}</span>
        <span className="leading-[48px] text-[#14cca8]">{`Industry Skills `}</span>
        <span className="leading-[48px]">to your campus effortlessly.</span>
      </p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading5 />
      <Heading6 />
    </div>
  );
}

function MaterialSymbolsBookOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:book-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:book-outline">
          <path d={svgPaths.p164c1800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[93.356px] left-[63.46px] top-[209px] w-[505.22px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[31.119px] left-0 not-italic text-[20px] text-[rgba(255,255,255,0.75)] top-[-20.98px] w-[505.22px] whitespace-pre-wrap">{`Because placements improve, student satisfaction goes up, and your institution gets positioned as industry forward  without any overhead.`}</p>
    </div>
  );
}

function BoldText1() {
  return (
    <div className="h-[54.915px] relative shrink-0 w-full" data-name="Bold Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[54.915px] left-[97.37px] not-italic text-[36.61px] text-center text-white top-[-0.98px] whitespace-nowrap">Zero</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.136px] left-[96.43px] not-italic text-[13.424px] text-[rgba(255,255,255,0.6)] text-center top-[-0.24px] tracking-[1.0739px] uppercase whitespace-nowrap">Infrastructure Cost</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[rgba(255,255,255,0.12)] justify-self-stretch relative rounded-[17.085px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.976px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[17.085px]" />
      <div className="content-stretch flex flex-col gap-[4.881px] items-start pb-[0.976px] pt-[25.383px] px-[25.383px] relative size-full">
        <BoldText1 />
        <Text5 />
      </div>
    </div>
  );
}

function BoldText2() {
  return (
    <div className="h-[54.915px] relative shrink-0 w-full" data-name="Bold Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[54.915px] left-[96.61px] not-italic text-[36.61px] text-center text-white top-[-0.98px] whitespace-nowrap">100%</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.136px] left-[96.49px] not-italic text-[13.424px] text-[rgba(255,255,255,0.6)] text-center top-[-0.24px] tracking-[1.0739px] uppercase whitespace-nowrap">On-campus Delivery</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(255,255,255,0.12)] justify-self-stretch relative rounded-[17.085px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.976px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[17.085px]" />
      <div className="content-stretch flex flex-col gap-[4.881px] items-start pb-[0.976px] pt-[25.383px] px-[25.383px] relative size-full">
        <BoldText2 />
        <Text6 />
      </div>
    </div>
  );
}

function BoldText3() {
  return (
    <div className="h-[54.915px] relative shrink-0 w-full" data-name="Bold Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[54.915px] left-[96.54px] not-italic text-[36.61px] text-center text-white top-[-0.98px] whitespace-nowrap">3x</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.136px] left-[96.83px] not-italic text-[13.424px] text-[rgba(255,255,255,0.6)] text-center top-[-0.24px] tracking-[1.0739px] uppercase whitespace-nowrap">Placement Uplift</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.12)] justify-self-stretch relative rounded-[17.085px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.976px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[17.085px]" />
      <div className="content-stretch flex flex-col gap-[4.881px] items-start pb-[0.976px] pt-[25.383px] px-[25.383px] relative size-full">
        <BoldText3 />
        <Text7 />
      </div>
    </div>
  );
}

function BoldText4() {
  return (
    <div className="h-[54.915px] relative shrink-0 w-full" data-name="Bold Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[54.915px] left-[96.01px] not-italic text-[36.61px] text-center text-white top-[-0.98px] whitespace-nowrap">₹50K</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.136px] left-[96.19px] not-italic text-[13.424px] text-[rgba(255,255,255,0.6)] text-center top-[-0.24px] tracking-[1.0739px] uppercase whitespace-nowrap">Per Module Only</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[rgba(255,255,255,0.12)] justify-self-stretch relative rounded-[17.085px] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.976px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[17.085px]" />
      <div className="content-stretch flex flex-col gap-[4.881px] items-start pb-[0.976px] pt-[25.383px] px-[25.383px] relative size-full">
        <BoldText4 />
        <Text8 />
      </div>
    </div>
  );
}

function Frame119() {
  return (
    <div className="absolute gap-x-[20px] gap-y-[19px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[281.397px] left-[63.46px] top-[316px] w-[508.135px]">
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[661px] overflow-clip relative rounded-[29.288px] shrink-0 w-[632px]" style={{ backgroundImage: "linear-gradient(133.715deg, rgb(11, 132, 112) 0%, rgb(15, 169, 142) 100%)" }} data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[51.254px] left-[63.46px] not-italic text-[35px] text-white top-[63.7px] w-[505.22px]">Why 50+ colleges already partner with us</p>
      <Paragraph2 />
      <Frame119 />
    </div>
  );
}

function BoxiconsBookFilled() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="boxicons:book-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="boxicons:book-filled">
          <path d={svgPaths.p21d11d80} fill="var(--fill-0, #14CCA8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] relative rounded-[12.214px] shrink-0 size-[53.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BoxiconsBookFilled />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[29.314px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[29.314px] left-0 not-italic text-[24px] text-white top-[-0.49px] whitespace-nowrap">No infrastructure needed</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] h-[90.384px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4.58px] items-start pt-[0.305px] relative size-full">
        <Heading7 />
        <p className="[word-break:break-word] font-['Inter:Light',sans-serif] font-light leading-[27.787px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] w-full">We bring trainers, materials, and tools. You provide the room and the students.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[119.697px] relative shrink-0 w-[613.144px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8e4dc] border-b-[0.977px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24.428px] items-start pb-[30.291px] pt-[-0.489px] relative size-full">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function MdiTeacher() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mdi:teacher">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="mdi:teacher">
          <path d={svgPaths.p23120640} fill="var(--fill-0, #14CCA8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] relative rounded-[12.214px] shrink-0 size-[53.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <MdiTeacher />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[29.314px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[29.314px] left-0 not-italic text-[24px] text-white top-[-0.49px] whitespace-nowrap">{`AICTE & NEP aligned`}</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[90.384px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4.58px] items-start pt-[0.305px] relative size-full">
        <Heading8 />
        <p className="[word-break:break-word] font-['Inter:Light',sans-serif] font-light leading-[27.787px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] w-full">Our curriculum maps to national education policy skill development mandates.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[149.011px] relative shrink-0 w-[613.144px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8e4dc] border-b-[0.977px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24.428px] items-start pb-[30.291px] pt-[28.825px] relative size-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[12.5%_12.5%_0.78%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.75 26.0175">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p1db3a580} fill="var(--fill-0, #14CCA8)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcutePaperFill() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="mingcute:paper-fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group3 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] relative rounded-[12.214px] shrink-0 size-[53.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <MingcutePaperFill />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[29.314px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[29.314px] left-0 not-italic text-[24px] text-white top-[-0.49px] whitespace-nowrap">{`Boost NAAC & placement scores`}</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[145.347px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4.886px] items-start relative size-full">
        <Heading9 />
        <p className="[word-break:break-word] font-['Inter:Light',sans-serif] font-light leading-[27.787px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] w-full">Industry partnerships and certified outcomes directly improve your institutional metrics.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[160px] relative shrink-0 w-[613px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8e4dc] border-b-[0.977px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24.428px] items-start pb-[30.291px] pt-[29.436px] relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function BasilBagSolid() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="basil:bag-solid">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="basil:bag-solid">
          <path clipRule="evenodd" d={svgPaths.p1d262400} fill="var(--fill-0, #14CCA8)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p11627900} fill="var(--fill-0, #14CCA8)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(37,168,141,0.27)] relative rounded-[12.214px] shrink-0 size-[53.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BasilBagSolid />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[29.314px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[29.314px] left-0 not-italic text-[24px] text-white top-[-0.49px] whitespace-nowrap">Detailed outcome reports</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[83.055px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Light',sans-serif] font-light leading-[27.787px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.5)] top-[0.09px] w-[534.974px]">Post-workshop analytics on attendance, performance, and skill benchmarks — shared with management.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[117.255px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5.038px] items-start pt-[-0.153px] relative size-full">
        <Heading10 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[175.882px] relative shrink-0 w-[613.144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24.428px] items-start pb-[29.314px] pt-[29.161px] relative size-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[0.366px] h-[566px] items-start pt-[0.183px] relative shrink-0 w-[613px]" data-name="Container">
      <Container21 />
      <Container24 />
      <Container27 />
      <Container30 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex gap-[60px] h-[661px] items-center justify-center relative shrink-0 w-[1324px]">
      <MaterialSymbolsBookOutline />
      <Container15 />
      <Container20 />
    </div>
  );
}

function About2() {
  return (
    <div className="absolute bg-[#061529] content-stretch flex flex-col gap-[70px] items-center left-0 py-[60px] top-[2751px] w-[1440px]" data-name="About">
      <Frame64 />
      <Frame77 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#14cca8] text-[20px] text-center top-[-1px] whitespace-nowrap">Voices</p>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[588.16px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">
        <span className="leading-[48px]">{`What Colleges and `}</span>
        <span className="leading-[48px] text-[#14cca8]">Students say</span>
      </p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading11 />
      <Heading12 />
    </div>
  );
}

function Container33() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]" data-name="Container">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-1%] w-full" src={imgContainer4} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#14cca8] text-[14px] w-[min-content]">Dr. Raghav Menon</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[249px]">Dean, KIMS University College</p>
    </div>
  );
}


function Frame37() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container33 />
      <Frame38 />
    </div>
  );
}

function Container35() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-0.75%] w-full" src={imgContainer5} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#14cca8] text-[14px] w-[min-content]">Prof. Sunita Verma</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[249px]">TPO, Indore Engineering College</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container35 />
      <Frame40 />
    </div>
  );
}

function Container37() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.76%] left-0 max-w-none top-[-0.64%] w-full" src={imgContainer6} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container37 />
      <Frame42 />
    </div>
  );
}

function Container39() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-1.04%] w-full" src={imgContainer7} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame44() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#14cca8] text-[14px] w-[min-content]">Aindrila Paul</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[249px]">MBA Student, Jaipur</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container39 />
      <Frame44 />
    </div>
  );
}

function Container41() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-1.87%] w-full" src={imgContainer8} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container41 />
      <Frame46 />
    </div>
  );
}

function Container43() {
  return (
    <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
      <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
        <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-3.95%] w-full" src={imgContainer9} loading="lazy" decoding="async" fetchPriority="low" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#14cca8] text-[14px] w-[min-content]">Vikrant Kulkarni</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[249px]">BCA Student, Pune</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
      <Container43 />
      <Frame51 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{`"The AI workshop completely changed how our students think about technology. They were building real projects by day three, and their confidence was visibly higher by the end."`}</p>
      <Frame37 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame120() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{`"Our placement numbers jumped after the Digital Marketing module. Students had practical portfolios and campaign case studies that impressed recruiters."`}</p>
      <Frame39 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame122() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{`"Zero hassle for our administration team. SkillBridge handled everything from scheduling to certification, and student feedback remained excellent throughout."`}</p>
      <Frame41 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame123() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{`"I had no clue about data analytics before this module. Now I am interning at a startup and creating dashboard reports confidently. It was a career breakthrough."`}</p>
      <Frame43 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame124() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px] whitespace-pre-wrap">{`"The trainers were not just academic instructors, they were active industry professionals. That real-world context made all the difference for our students."`}</p>
      <Frame45 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[24px] left-[37px] top-[36.6px] w-[306px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[-0.2px] text-[#f4a261] text-[16px] top-0 tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
    </div>
  );
}

function Frame125() {
  return (
    <div className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{`"I learned more in three weeks than I did in an entire semester. The hands-on approach, mentor support, and practical assignments were outstanding."`}</p>
      <Frame47 />
      <Container44 />
    </div>
  );
}

function Frame121() {
  const voices = [
    {
      quote:
        "\"The AI workshop completely changed how our students think about technology. They were building real projects by day three, and their confidence was visibly higher by the end.\"",
      name: "Dr. Raghav Menon",
      role: "Dean, KIMS University College",
      image: imgContainer4,
    },
    {
      quote:
        "\"Our placement numbers jumped after the Digital Marketing module. Students had practical portfolios and campaign case studies that impressed recruiters.\"",
      name: "Prof. Sunita Verma",
      role: "TPO, Indore Engineering College",
      image: imgContainer5,
    },
    {
      quote:
        "\"Zero hassle for our administration team. SkillBridge handled everything from scheduling to certification, and student feedback remained excellent throughout.\"",
      name: "Dr. Amit Joshi",
      role: "Principal, Lucknow Institute of Management",
      image: imgContainer6,
    },
    {
      quote:
        "\"I had no clue about data analytics before this module. Now I am interning at a startup and creating dashboard reports confidently. It was a career breakthrough.\"",
      name: "Aindrila Paul",
      role: "MBA Student, Jaipur",
      image: imgContainer7,
    },
    {
      quote:
        "\"The trainers were not just academic instructors, they were active industry professionals. That real-world context made all the difference for our students.\"",
      name: "K. Lakshmi",
      role: "HOD, Computer Science",
      image: imgContainer8,
    },
    {
      quote:
        "\"I learned more in three weeks than I did in an entire semester. The hands-on approach, mentor support, and practical assignments were outstanding.\"",
      name: "Vikrant Kulkarni",
      role: "BCA Student, Pune",
      image: imgContainer9,
    },
  ];

  const renderCard = (voice: { quote: string; name: string; role: string; image: string }, index: number) => (
    <div key={`${voice.name}-${index}`} className="bg-[#0f2a50] h-[264px] overflow-clip relative rounded-[14.667px] shrink-0 w-[399.667px]">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[37px] text-[#f4a261] text-[16px] top-[36.6px] tracking-[3px] whitespace-nowrap">{"\u2605\u2605\u2605\u2605\u2605"}</p>
      <p className="[word-break:break-word] absolute bottom-[43.41%] font-['Inter:Light_Italic',sans-serif] font-light italic leading-[26.25px] left-[calc(50%-163.17px)] text-[15px] text-[rgba(255,255,255,0.7)] top-[26.67%] w-[326.333px]">{voice.quote}</p>
      <div className="absolute content-stretch flex gap-[15.4px] items-center left-[30.07px] top-[192.13px]">
        <div className="pointer-events-none relative rounded-[26843500px] shrink-0 size-[44px]">
          <div className="absolute inset-0 overflow-hidden rounded-[26843500px]">
            <img alt="" className="absolute h-[124.96%] left-0 max-w-none top-[-1%] w-full" src={voice.image} loading="lazy" decoding="async" fetchPriority="low" />
          </div>
          <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 rounded-[26843500px]" />
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[19.8px] not-italic relative shrink-0 w-[203.867px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#14cca8] text-[14px] w-[min-content]">{voice.name}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[249px]">{voice.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative shrink-0 w-[1324px] overflow-hidden group">
      <style>{`
        @keyframes skillbridgeVoicesMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 20.5px)); }
        }
      `}</style>
      <div className="flex w-max items-center gap-[41px] group-hover:[animation-play-state:paused]" style={{ animation: "skillbridgeVoicesMarquee 35s linear infinite" }}>
        {voices.map(renderCard)}
        {voices.map(renderCard)}
      </div>
    </div>
  );
}

function About3() {
  return (
    <div id="sb-pricing" className="-translate-x-1/2 absolute bg-[#0a1f3d] content-stretch flex flex-col gap-[70px] items-center left-1/2 py-[80px] top-[3722px] w-[1440px]" data-name="About">
      <Frame65 />
      <Frame121 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[588.16px] not-italic text-[#14cca8] text-[20px] text-center top-[-1px] whitespace-nowrap">Pricing</p>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[587.66px] not-italic text-[40px] text-center text-white top-[-1px] whitespace-nowrap">
        <span className="leading-[48px]">{`Simple, Transparent `}</span>
        <span className="leading-[48px] text-[#14cca8]">Module Pricing.</span>
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1070px]" data-name="Paragraph">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[calc(50%+0.5px)] not-italic text-[20px] text-[rgba(255,255,255,0.5)] text-center top-px w-[777px]">No hidden fees. No long-term contracts. Pick one module or bundle all three for the best value.</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
      <Heading13 />
      <Heading14 />
      <Paragraph4 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[19.434px] left-[40.8px] top-[40.8px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.434px] left-0 not-italic text-[#0fa98e] text-[12.956px] top-[-0.24px] tracking-[2.3321px] uppercase whitespace-nowrap">Single Module</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[54.181px] left-[40.8px] top-[76.72px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-white top-[-0.71px] tracking-[-1.6254px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <span className="font-['Inter:Semi_Bold',sans-serif] leading-[54.181px] text-[54.181px]">{`₹50K `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.845px] text-[18.845px] text-[rgba(255,255,255,0.3)]">/ module</span>
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[167.39px] w-[328px]">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-white w-full">Perfect for colleges testing one domain first.</p>
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

function Frame54() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">One domain — AI, Marketing, or Analytics</p>
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

function Frame55() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">2–4 weeks on-campus delivery</p>
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

function Frame56() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Certified completion for all students</p>
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

function Frame57() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick3 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Post-workshop performance report</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame54 />
      <Frame55 />
      <Frame56 />
      <Frame57 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[210.39px] w-[328px]">
      <Frame53 />
    </div>
  );
}


function Frame19() {
  return (
    <div className="bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container45 />
      <Container46 />
      <Frame20 />
      <Frame52 />
      <Button3 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[19.434px] left-[40.8px] top-[40.8px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.434px] left-0 not-italic text-[#0fa98e] text-[12.956px] top-[-0.24px] tracking-[2.3321px] uppercase whitespace-nowrap">DUAL Module</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[54.181px] left-[40.8px] top-[76.72px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-white top-[-0.71px] tracking-[-1.6254px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <span className="font-['Inter:Semi_Bold',sans-serif] leading-[54.181px] text-[54.181px]">{`₹90K `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.845px] text-[18.845px] text-[rgba(255,255,255,0.3)]">/ 2module</span>
      </p>
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

function Frame60() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick4 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Any two domains combined</p>
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

function Frame61() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick5 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">4–6 weeks total campus delivery</p>
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

function Frame67() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick6 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Dual certification per student</p>
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

function Frame68() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick7 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">{`Priority scheduling & dedicated trainer`}</p>
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

function Frame69() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick8 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Career readiness assessment included</p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame60 />
      <Frame61 />
      <Frame67 />
      <Frame68 />
      <Frame69 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[210.39px] w-[328px]">
      <Frame59 />
    </div>
  );
}


function Frame21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[167.39px] w-[328px]">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-pre-wrap">{`Most popular  two complementary skill domains.`}</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#0fa98e] h-[27px] left-[266px] rounded-[7px] top-[41px] w-[98px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[15px] left-[calc(50%-35px)] text-[10px] text-white top-[calc(50%-7.3px)] tracking-[1px] uppercase whitespace-nowrap">BEST VALUE</p>
    </div>
  );
}

function Frame127() {
  return (
    <div className="bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container47 />
      <Container48 />
      <Frame58 />
      <Button4 />
      <Frame21 />
      <Container49 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[19.434px] left-[40.8px] top-[40.8px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.434px] left-0 not-italic text-[#0fa98e] text-[12.956px] top-[-0.24px] tracking-[2.3321px] uppercase whitespace-nowrap">FULL SUIT</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[54.181px] left-[40.8px] top-[76.72px] w-[323.2px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-white top-[-0.71px] tracking-[-1.6254px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <span className="font-['Inter:Semi_Bold',sans-serif] leading-[54.181px] text-[54.181px]">{`₹1.2L `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.845px] text-[18.845px] text-[rgba(255,255,255,0.3)]">/ all 3</span>
      </p>
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

function Frame72() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick9 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">All three domains — AI + Marketing + Analytics</p>
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

function Frame73() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <MdiTick10 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">6–10 weeks comprehensive delivery</p>
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

function Frame74() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick11 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Triple certification per student</p>
    </div>
  );
}

function MdiTick12() {
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

function Frame75() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick12 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Dedicated relationship manager</p>
    </div>
  );
}

function MdiTick13() {
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

function Frame76() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <MdiTick13 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">{`Placement support & industry connect`}</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[271px]">
      <Frame72 />
      <Frame73 />
      <Frame74 />
      <Frame75 />
      <Frame76 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[237.39px] w-[328px]">
      <Frame71 />
    </div>
  );
}


function Frame22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.8px] top-[167.39px] w-[328px]">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-pre-wrap">{`Complete transformation  all three domains delivered.`}</p>
    </div>
  );
}

function Frame128() {
  return (
    <div className="bg-[#0a1f3d] h-[554px] overflow-clip relative rounded-[20px] shrink-0 w-[410px] border border-transparent transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(37,168,141,0.45)] hover:shadow-[0_16px_36px_rgba(10,31,61,0.45)]">
      <Container50 />
      <Container51 />
      <Frame70 />
      <Button5 />
      <Frame22 />
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex gap-[39px] items-center relative shrink-0">
      <Frame19 />
      <Frame127 />
      <Frame128 />
    </div>
  );
}

function About4() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#061529] content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[92px] top-[4336px] w-[1440px]" data-name="About">
      <Frame66 />
      <Frame126 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[15px] items-center left-[calc(50%-0.5px)] top-[67.15px] w-[553px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[48px] min-w-full relative shrink-0 text-[#14cca8] text-[20px] w-[min-content]">How It Works</p>
      <div className="font-['Fraunces:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] text-white tracking-[-1.5059px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[60px] mb-0 text-[50.198px]">Ready to make your</p>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[50.198px]">
          <span className="leading-[60px]">{`students `}</span>
          <span className="leading-[60px] text-[#14cca8] tracking-[-1.5059px]">career-ready?</span>
        </p>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28.9px] min-w-full relative shrink-0 text-[20px] text-[rgba(255,255,255,0.5)] w-[min-content]">{`Book a free 30-minute demo. We'll show you exactly how SkillBridge works on your campus — no commitments.`}</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[546px] relative rounded-[18px] shrink-0 w-[1312px]" style={{ backgroundImage: "linear-gradient(163.754deg, rgb(15, 42, 80) 6.1733%, rgb(21, 47, 85) 93.827%)" }} data-name="Container">
      <div className="[word-break:break-word] not-italic overflow-clip relative rounded-[inherit] size-full text-center">
        <Frame129 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-1/2 text-[18px] text-[rgba(255,255,255,0.8)] top-[433.2px] whitespace-nowrap">Or WhatsApp us directly at +91 92667 90357</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[18px]" />
    </div>
  );
}

function About5() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#0a1f3d] content-stretch flex flex-col items-center left-[calc(50%+3px)] px-[34px] py-[92px] top-[5349px] w-[1440px]" data-name="About">
      <Container52 />
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 h-[51.093px] ml-0 mt-0 relative row-1 w-[35.862px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.862 51.0929">
        <g id="Group 1171275645">
          <path d={svgPaths.p8fefa80} fill="var(--fill-0, white)" id="Vector 101" />
          <path d={svgPaths.p14ccac00} fill="var(--fill-0, white)" id="Vector 102" />
          <path d={svgPaths.pbd2ff00} fill="var(--fill-0, white)" id="Vector 103" />
          <path d={svgPaths.p27f6c452} fill="var(--fill-0, white)" id="Vector 104" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group6 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[26.763px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-white top-[-1.46px] tracking-[-0.6691px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <span className="font-['Inter:Semi_Bold',sans-serif] leading-[26.763px] text-[26.763px]">Skill</span>
        <span className="font-['Inter:Black',sans-serif] font-black leading-[26.763px] text-[#0fa98e] text-[26.763px]">Bridge</span>
      </p>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16.423px] relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.423px] left-0 not-italic text-[10.948px] text-[rgba(255,255,255,0.8)] top-[-0.24px] tracking-[2.1897px] uppercase whitespace-nowrap">by iMED Academy</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[2.433px] h-[45.619px] items-start relative shrink-0 w-[141.92px]" data-name="Container">
      <Heading15 />
      <Text9 />
    </div>
  );
}

function Frame130() {
  return (
    <button type="button" onClick={() => navigateToRoute("")} className="absolute content-stretch flex gap-[12.165px] items-center left-[27.95px] top-0 w-[246.949px] text-left">
      <Group5 />
      <Container55 />
    </button>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[87.132px] left-[27.95px] top-[87.36px] w-[390.508px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.044px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[0.24px] w-[390.508px]">An employability vertical by iMED Academy. Bridging the gap between campus education and career readiness across India.</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[20.136px] left-[27.95px] top-[198.9px] w-[474.468px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.136px] left-0 not-italic text-[#14cca8] text-[13.424px] top-[-0.24px] tracking-[2.0136px] uppercase whitespace-nowrap">Educate. Equip. Employ.</p>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.136px] left-0 not-italic text-[#14cca8] text-[13.424px] top-[-0.24px] tracking-[2.4163px] uppercase whitespace-nowrap">Modules</p>
    </div>
  );
}

function ListItem() {
  return (
    <button
      type="button"
      onClick={() => scrollToSkillBridgeSection("sb-modules")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">AI Edge</p>
      </div>
    </button>
  );
}

function ListItem1() {
  return (
    <button
      type="button"
      onClick={() => scrollToSkillBridgeSection("sb-modules")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">Growth Lab</p>
      </div>
    </button>
  );
}

function ListItem2() {
  return (
    <button
      type="button"
      onClick={() => scrollToSkillBridgeSection("sb-modules")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">InsightIQ</p>
      </div>
    </button>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[17.085px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24.407px] h-[198.305px] items-start left-[533.04px] top-0 w-[237.234px]" data-name="Container">
      <Heading16 />
      <List />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.136px] left-0 not-italic text-[#14cca8] text-[13.424px] top-[-0.24px] tracking-[2.4163px] uppercase whitespace-nowrap">Company</p>
    </div>
  );
}

function ListItem3() {
  return (
    <button
      type="button"
      onClick={() => navigateToRoute("")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">About iMED</p>
      </div>
    </button>
  );
}

function ListItem4() {
  return (
    <button
      type="button"
      onClick={() => scrollToSkillBridgeSection("sb-process")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">Our Team</p>
      </div>
    </button>
  );
}

function ListItem5() {
  return (
    <button
      type="button"
      onClick={() => navigateToRoute("#careers")}
      className="h-[25.627px] relative shrink-0 w-[237.234px] text-left transition-colors duration-200 hover:text-[#8ee2d2]"
      data-name="List Item"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">Careers</p>
      </div>
    </button>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[17.085px] h-[111.051px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24.407px] h-[198.305px] items-start left-[828.85px] top-0 w-[237.234px]" data-name="Container">
      <Heading17 />
      <List1 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[20.136px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20.136px] left-0 not-italic text-[#14cca8] text-[13.424px] top-[-0.24px] tracking-[2.4163px] uppercase whitespace-nowrap">Contact</p>
    </div>
  );
}

function MaterialSymbolsCall() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:call">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:call">
          <path d={svgPaths.pcecdf2} fill="var(--fill-0, #14CCA8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[25.627px] relative shrink-0 w-[237.234px]" data-name="List Item">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">+91 92667 90357</p>
    </div>
  );
}

function Frame131() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-0 top-[-0.49px]">
      <MaterialSymbolsCall />
      <ListItem8 />
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[25.627px] relative shrink-0 w-[237.234px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame131 />
      </div>
    </div>
  );
}

function MaterialSymbolsMail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:mail">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:mail">
          <path d={svgPaths.p217a0c10} fill="var(--fill-0, #14CCA8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[25.627px] relative shrink-0 w-[237.234px]" data-name="List Item">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">contact@imedacademy.in</p>
    </div>
  );
}

function Frame132() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-0 top-[-0.49px]">
      <MaterialSymbolsMail />
      <ListItem10 />
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[25.627px] relative shrink-0 w-[237.234px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame132 />
      </div>
    </div>
  );
}

function MdiLocation() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:location">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:location">
          <path d={svgPaths.p3aac8400} fill="var(--fill-0, #14CCA8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ListItem12() {
  return (
    <div className="h-[25.627px] relative shrink-0 w-[237.234px]" data-name="List Item">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.627px] left-0 not-italic text-[17.085px] text-[rgba(255,255,255,0.8)] top-[-0.49px] whitespace-nowrap">Bangalore, India</p>
    </div>
  );
}

function Frame133() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-0 top-[-0.49px]">
      <MdiLocation />
      <ListItem12 />
    </div>
  );
}

function ListItem11() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[237.234px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame133 />
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[17.085px] h-[111.051px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem7 />
      <ListItem9 />
      <ListItem11 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24.407px] h-[198.305px] items-start left-[1096.95px] top-0 w-[237.234px]" data-name="Container">
      <Heading18 />
      <List2 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[198.305px] relative shrink-0 w-full" data-name="Container">
      <Frame130 />
      <Paragraph5 />
      <Container56 />
      <Container57 />
      <Container58 />
      <Container59 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[21.966px] left-[27.95px] top-[35.15px] w-[492.041px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.966px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] top-[-0.24px] whitespace-nowrap">© 2026 SkillBridge by iMED Academy. All rights reserved.</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[21.966px] left-[1071.95px] top-[35.15px] w-[289.953px]" data-name="Text">
      <div className="absolute left-[47px] top-[-0.24px] flex items-center gap-[6px] whitespace-nowrap">
        <button
          type="button"
          onClick={() => navigateToRoute("#privacy-policy")}
          className="font-normal leading-[21.966px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] transition-colors duration-200 hover:text-[#8ee2d2]"
        >
          Privacy Policy
        </button>
        <span className="font-normal leading-[21.966px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">.</span>
        <button
          type="button"
          onClick={() => navigateToRoute("#terms-and-conditions")}
          className="font-normal leading-[21.966px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] transition-colors duration-200 hover:text-[#8ee2d2]"
        >
          Terms of Service
        </button>
      </div>
    </div>
  );
}
function Container60() {
  return (
    <div className="h-[57.112px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-solid border-t-[0.976px] inset-0 pointer-events-none" />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[318.875px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[63.458px] items-start px-[39.051px] relative size-full">
        <Container54 />
        <Container60 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#061529] content-stretch flex flex-col h-[437.003px] items-start left-0 pt-[79.078px] top-[6079px] w-[1440px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-solid border-t-[0.976px] inset-0 pointer-events-none" />
      <Container53 />
    </div>
  );
}

function MaterialSymbolsCall1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="material-symbols:call">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="material-symbols:call">
          <path d={svgPaths.p2a135600} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame135() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-[29px] top-[13.4px]">
      <MaterialSymbolsCall1 />
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[21.75px] relative shrink-0 text-[14.5px] text-center text-white tracking-[0.3625px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Call Us Now `}</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[21.75px] left-[143.05px] top-[13.8px] w-[12.875px]" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[21.75px] left-[6.5px] text-[14.5px] text-center text-white top-[-0.4px] tracking-[0.3625px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        →
      </p>
    </div>
  );
}


function IcBaselineWhatsapp() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ic:baseline-whatsapp">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ic:baseline-whatsapp">
          <path d={svgPaths.p1d70c800} fill="var(--fill-0, #25A88D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame136() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-[29px] top-[13.4px]">
      <IcBaselineWhatsapp />
      <p className="[word-break:break-word] font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[21.75px] relative shrink-0 text-[#25a88d] text-[14.5px] text-center tracking-[0.3625px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`WhatsApp Us `}</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[21.75px] left-[157.85px] top-[13.8px] w-[12.875px]" data-name="Text">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[21.75px] left-[6.5px] text-[#25a88d] text-[14.5px] text-center top-[-0.4px] tracking-[0.3625px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        →
      </p>
    </div>
  );
}

function Link2() {
  return (
    <a href="tel:+919266790357" className="bg-[#0fa98e] drop-shadow-[0px_4px_10px_rgba(15,169,142,0.3)] h-[49.35px] relative rounded-[5px] shrink-0 w-[181.925px] cursor-pointer transition-all duration-200 hover:brightness-110" data-name="Link">
      <Frame135 />
      <Text12 />
    </a>
  );
}

function Link3() {
  return (
    <a href="https://wa.me/919266790357" target="_blank" rel="noreferrer" className="bg-white h-[49.35px] relative rounded-[5px] shrink-0 w-[196.725px] cursor-pointer transition-all duration-200 hover:bg-[#ecfffa]" data-name="Link">
      <Frame136 />
      <Text13 />
    </a>
  );
}

function Link4() {
  return (
    <a href="mailto:contact@imedacademy.in" className="content-stretch flex h-[49.35px] items-center px-[26.8px] py-[13.8px] relative rounded-[5px] shrink-0 w-[132.538px] cursor-pointer transition-all duration-200 hover:bg-white/10" data-name="Link">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame137 />
    </a>
  );
}


function MaterialSymbolsMail1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="material-symbols:mail">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="material-symbols:mail">
          <path d={svgPaths.p39bf6a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame137() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5px] items-center justify-center relative size-full">
        <MaterialSymbolsMail1 />
        <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[21.75px] relative shrink-0 text-[14.5px] text-center text-white tracking-[0.3625px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Email Us
        </p>
      </div>
    </div>
  );
}


function Frame134() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[15px] items-center left-[calc(50%+2.59px)] top-[5794px]">
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

export default function SkillBridge() {
  const [scale, setScale] = useState(1);
  const [isNavPinned, setIsNavPinned] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      const nextScale = window.innerWidth / DESIGN_WIDTH;
      setScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const navTop = 66;
    const onScroll = () => {
      setIsNavPinned(window.scrollY >= navTop * scale);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scale]);

  return (
    <div className="bg-[#0a1f3d] relative w-full overflow-x-hidden" data-name="SkillBridge" style={{ height: DESIGN_HEIGHT * scale }}>
      {isNavPinned ? (
        <div
          className="fixed left-1/2 top-0 z-50"
          style={{ width: DESIGN_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <NavBar pinned />
        </div>
      ) : null}
      <div
        className="absolute left-1/2 top-0"
        style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
      >
        <div className="absolute left-0 top-[1075px] h-px w-px" id="sb-modules" />
        <div className="absolute left-0 top-[2088px] h-px w-px" id="sb-process" />
        <div className="absolute left-0 top-[2751px] h-px w-px" id="sb-colleges" />
        <div className="absolute left-0 top-[5349px] h-px w-px" id="sb-how-it-works" />
        <div className="absolute left-0 top-[6079px] h-px w-px" id="sb-contact" />
        <NavBar1 />
        {!isNavPinned ? <NavBar /> : null}
        <Hero />
        <Stats />
        <About />
        <About1 />
        <About2 />
        <About3 />
        <About4 />
        <About5 />
        <Footer />
        <Frame134 />
      </div>
    </div>
  );
}



