import { createContext, useContext, useState, useRef, useLayoutEffect, type FormEvent } from "react";
import svgPaths from "./svg-hjwn49xw3e";
import imgApp from "./9e3ed55bd7cd40d1450972816add156e9327d2a9.png";
import imgImage2052 from "./22d559004cd56b1e350ec8c06dc87baf6de92650.png";
import imgImage1745 from "./137aad5facdc077606e64b0d1af6c016f938d2dd.png";
import imgImage1712 from "./36b610493eb683f0e81e17848fd143c365f117fd.png";

type ApplyFormContextType = {
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  qualification: string;
  setQualification: (val: string) => void;
  canAttend: "Yes" | "Not sure yet";
  setCanAttend: (val: "Yes" | "Not sure yet") => void;
  isSubmitting: boolean;
  feedback: { type: "success" | "error"; message: string } | null;
  handleSubmit: (e: FormEvent) => void;
  scrollToForm: () => void;
};

const ApplyFormContext = createContext<ApplyFormContextType | null>(null);

function useApplyForm() {
  const ctx = useContext(ApplyFormContext);
  if (!ctx) {
    throw new Error("useApplyForm must be used within ApplyFormContext.Provider");
  }
  return ctx;
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[23.767px] ml-0 mt-[29.74px] relative row-1 w-[37.821px]" data-name="image 1745">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[112.7%] left-[-8.02%] max-w-none top-[-3.17%] w-[114.54%]" src={imgImage1745} />
        </div>
      </div>
      <div className="col-1 h-[7.543px] ml-[3.83px] mt-[21.18px] relative row-1 w-[7.441px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="7.54339" preserveAspectRatio="none" viewBox="0 0 7.44091 7.54339" width="7.44091">
          <path d={svgPaths.p2d486d00} fill="#25C4B5" id="Vector 2" />
        </svg>
      </div>
      <div className="col-1 h-[7.543px] ml-[26.15px] mt-[21.18px] relative row-1 w-[7.441px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="7.54339" preserveAspectRatio="none" viewBox="0 0 7.44091 7.54339" width="7.44091">
          <path d={svgPaths.p2d486d00} fill="#044F96" id="Vector 3" />
        </svg>
      </div>
      <div className="col-1 h-[18.807px] ml-[0.74px] mt-0 relative row-1 w-[36.259px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="18.8068" preserveAspectRatio="none" viewBox="0 0 36.2589 18.8068" width="36.2589">
          <path d={svgPaths.p3f71b680} fill="#102A48" id="Vector 1" />
        </svg>
      </div>
      <div className="col-1 h-[7.027px] ml-[32.44px] mt-[11.78px] relative row-1 w-[2.9px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="7.02672" preserveAspectRatio="none" viewBox="0 0 2.90009 7.02672" width="2.90009">
          <path d={svgPaths.p2c8d0400} fill="url(#paint0_linear_0_37)" id="Vector 22" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_37" x1="-0.306665" x2="1.44999" y1="1.24001" y2="7.02674">
              <stop stopColor="#77570B" />
              <stop offset="1" stopColor="#F9AF02" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#e3f4f0] border-[#c5e6de] border-[0.683px] border-solid content-stretch flex h-[78.514px] items-center px-[14px] py-[11px] relative rounded-[10.241px] shrink-0 w-[66.566px]" data-name="Container">
      <Group2 />
    </div>
  );
}

function Container5() {
  const { fullName } = useApplyForm();
  return (
    <div className="content-stretch flex flex-col h-[26.456px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className={`[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.498px] not-italic relative shrink-0 text-[23.042px] whitespace-nowrap transition-colors ${fullName.trim() ? "text-[#0d9488]" : "text-[#98a8b8]"}`}>
        {fullName.trim() || "Your name"}
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[21.335px] items-start pt-[3.414px] relative shrink-0 w-[241.996px]" data-name="Container">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[17.922px] relative shrink-0 text-[#4e6178] text-[12.801px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Healthcare Administration trainee
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[17.751px] relative shrink-0 text-[#0b7a66] text-[11.094px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        iMED Academy, Kochi
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[17.751px] relative shrink-0 text-[#0b7a66] text-[11.094px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        2026
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[26.456px] items-start justify-between pt-[8.534px] relative shrink-0 w-[241.996px]" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[74.247px] items-start relative shrink-0 w-[241.996px]" data-name="Container">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="border-[#d3dedc] border-b-[0.683px] border-solid content-stretch flex gap-[21px] items-center pb-[21px] pt-[44px] relative shrink-0" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[25.944px] relative shrink-0 text-[#0a1f3d] text-[16.215px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Request a call from a counsellor
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[23.896px] items-start pt-[3.414px] relative shrink-0 w-[324.297px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[20.482px] relative shrink-0 text-[#4e6178] text-[12.801px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Get the syllabus, fees and next batch date.
      </p>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col h-[24.749px] items-start pb-[5.12px] relative shrink-0 w-[324.297px]" data-name="Label">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[19.116px] relative shrink-0 text-[#1c3556] text-[11.948px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Full name
      </p>
    </div>
  );
}

function TextInput() {
  const { fullName, setFullName } = useApplyForm();
  return (
    <input
      type="text"
      name="fullName"
      required
      placeholder="e.g. Rahul Sharma"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="absolute bg-[#fafcfb] border-[#d3dedc] border-[0.683px] border-solid h-[42.671px] left-0 rounded-[8.534px] top-[0.17px] w-[324.297px] px-[12px] text-[13px] text-[#0a1f3d] font-['Instrument_Sans:Regular',sans-serif] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-colors"
      data-name="Text Input"
    />
  );
}

function Container9() {
  return (
    <div className="h-[42.671px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col h-[84.488px] items-start pt-[17.068px] relative shrink-0 w-[324.297px]" data-name="Container">
      <Label />
      <Container9 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[19.116px] relative shrink-0 text-[#1c3556] text-[11.948px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        WhatsApp number
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#edf2f1] border-[#d3dedc] border-b-[0.683px] border-l-[0.683px] border-solid border-t-[0.683px] grid grid-cols-[_19.46px] grid-rows-[_41.31px] h-full px-[10.241px] relative rounded-bl-[8.534px] rounded-tl-[8.534px] shrink-0 w-[40.964px]" data-name="Text">
      <p className="[word-break:break-word] col-1 font-['Instrument_Sans:SemiBold',sans-serif] font-semibold justify-self-center leading-[20.482px] relative row-1 self-center shrink-0 text-[#1c3556] text-[12.801px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        +91
      </p>
    </div>
  );
}

function PhoneInput() {
  const { phone, setPhone } = useApplyForm();
  return (
    <input
      type="tel"
      name="phone"
      required
      placeholder="98765 43210"
      value={phone}
      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
      className="bg-[#fafcfb] border-[#d3dedc] border-[0.683px] border-solid h-[42.671px] relative rounded-br-[8.534px] rounded-tr-[8.534px] shrink-0 w-[283.333px] px-[12px] text-[13px] text-[#0a1f3d] font-['Instrument_Sans:Regular',sans-serif] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-colors"
      data-name="Phone Input"
    />
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[47.791px] items-start pt-[5.12px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <PhoneInput />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col h-[81.074px] items-start pt-[13.655px] relative shrink-0 w-[324.297px]" data-name="Container">
      <Label1 />
      <Container11 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col h-[24.749px] items-start pb-[5.12px] relative shrink-0 w-[156.175px]" data-name="Label">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[19.116px] relative shrink-0 text-[#1c3556] text-[11.948px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        City
      </p>
    </div>
  );
}

function TextInput1() {
  const { city, setCity } = useApplyForm();
  return (
    <input
      type="text"
      name="city"
      placeholder="e.g. Kochi"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="absolute bg-[#fafcfb] border-[#d3dedc] border-[0.683px] border-solid h-[42.671px] left-0 rounded-[8.534px] top-[0.17px] w-[156.175px] px-[10px] text-[12px] text-[#0a1f3d] font-['Instrument_Sans:Regular',sans-serif] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-colors"
      data-name="Text Input"
    />
  );
}

function Container14() {
  return (
    <div className="h-[42.671px] relative shrink-0 w-full" data-name="Container">
      <TextInput1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col h-[66.566px] items-start relative shrink-0 w-[156.175px]" data-name="Container">
      <Label2 />
      <Container14 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[13.655px] relative row-1 self-stretch shrink-0" data-name="Container:margin">
      <Container13 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col h-[24.749px] items-start pb-[5.12px] relative shrink-0 w-[156.175px]" data-name="Label">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[19.116px] relative shrink-0 text-[#1c3556] text-[11.948px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Highest qualification
      </p>
    </div>
  );
}

function Dropdown() {
  const { qualification, setQualification } = useApplyForm();
  return (
    <select
      name="qualification"
      value={qualification}
      onChange={(e) => setQualification(e.target.value)}
      className="absolute bg-[#fafcfb] border-[#d3dedc] border-[0.683px] border-solid h-[42.671px] left-0 rounded-[8.534px] top-[0.17px] w-[156.175px] px-[6px] text-[11px] text-[#0a1f3d] font-['Instrument_Sans:Regular',sans-serif] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] cursor-pointer transition-colors"
      data-name="Dropdown"
    >
      <option value="">Qualification</option>
      <option value="12th">12th</option>
      <option value="Any Degree / Graduate">Any Degree / Graduate</option>
      <option value="Diploma">Diploma</option>
      <option value="B.Sc / Allied Health">B.Sc / Allied Health</option>
      <option value="Other">Other</option>
    </select>
  );
}

function Container16() {
  return (
    <div className="h-[42.671px] relative shrink-0 w-full" data-name="Container">
      <Dropdown />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col h-[66.566px] items-start relative shrink-0 w-[156.175px]" data-name="Container">
      <Label3 />
      <Container16 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[13.655px] relative row-1 self-stretch shrink-0" data-name="Container:margin">
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="gap-x-[11.94779109954834px] gap-y-[11.94779109954834px] grid grid-cols-[__155.98px_155.99px] grid-rows-[_80.56px] h-[80.221px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <ContainerMargin2 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[13.655px] relative shrink-0 w-full" data-name="Container:margin">
      <Container12 />
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Legend">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[19.116px] relative shrink-0 text-[#1c3556] text-[11.948px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Can you attend classes in Kochi for six months?
      </p>
    </div>
  );
}

function Label4() {
  const { canAttend, setCanAttend } = useApplyForm();
  const isSelected = canAttend === "Yes";
  return (
    <button
      type="button"
      onClick={() => setCanAttend("Yes")}
      className={`border-[0.683px] border-solid col-1 content-stretch flex h-[39.257px] items-center justify-center justify-self-stretch relative rounded-[8.534px] row-1 self-start shrink-0 cursor-pointer transition-all ${
        isSelected
          ? "bg-[#e3f4f0] border-[#0d9488] text-[#0b7a66] font-semibold ring-1 ring-[#0d9488]"
          : "bg-[#fafcfb] border-[#d3dedc] text-[#0a1f3d] hover:bg-slate-50"
      }`}
      data-name="Label"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[20.482px] relative shrink-0 text-[12.801px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Yes
      </p>
    </button>
  );
}

function Label5() {
  const { canAttend, setCanAttend } = useApplyForm();
  const isSelected = canAttend === "Not sure yet";
  return (
    <button
      type="button"
      onClick={() => setCanAttend("Not sure yet")}
      className={`border-[0.683px] border-solid col-2 content-stretch flex h-[39.257px] items-center justify-center justify-self-stretch relative rounded-[8.534px] row-1 self-start shrink-0 cursor-pointer transition-all ${
        isSelected
          ? "bg-[#e3f4f0] border-[#0d9488] text-[#0b7a66] font-semibold ring-1 ring-[#0d9488]"
          : "bg-[#fafcfb] border-[#d3dedc] text-[#0a1f3d] hover:bg-slate-50"
      }`}
      data-name="Label"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[20.482px] relative shrink-0 text-[12.801px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Not sure yet
      </p>
    </button>
  );
}

function Container17() {
  return (
    <div className="gap-x-[8.534135818481445px] gap-y-[8.534135818481445px] grid grid-cols-[__157.69px_157.70px] grid-rows-[_39.26px] relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Label5 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[5.12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container17 />
    </div>
  );
}

function FieldSet() {
  return (
    <div className="content-stretch flex flex-col h-[77.661px] items-start pb-[13.655px] relative shrink-0 w-[324.297px]" data-name="Field Set">
      <Legend />
      <ContainerMargin3 />
    </div>
  );
}

function Button() {
  const { isSubmitting } = useApplyForm();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="absolute border-[0.683px] border-[rgba(0,0,0,0)] border-solid content-stretch flex h-[47.791px] items-center justify-center left-0 min-h-[47.79116439819336px] px-[20.482px] rounded-[10.241px] top-[5.29px] w-[324.297px] cursor-pointer hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 shadow-sm"
      style={{ backgroundImage: "linear-gradient(171.6167513454805deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }}
      data-name="Button"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[27.2px] relative shrink-0 text-[17px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </p>
    </button>
  );
}

function Container18() {
  return (
    <div className="h-[52.997px] relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[28.163px] items-center pt-[10.241px] relative shrink-0 w-[324.297px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[17.751px] relative shrink-0 text-[#4e6178] text-[11.094px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`We'll contact you by call or WhatsApp about admissions.`}</p>
    </div>
  );
}

function Form() {
  const { handleSubmit, feedback } = useApplyForm();
  return (
    <form onSubmit={handleSubmit} id="apply-form" className="content-stretch flex flex-col items-start pb-[25.602px] pt-[20.482px] px-[25.602px] relative shrink-0 w-[375.502px]" data-name="Form">
      <Heading1 />
      <Paragraph />
      {feedback && (
        <div className={`mt-[10px] mb-[6px] w-full rounded-[8px] px-[12px] py-[8px] text-[12px] font-['Instrument_Sans:Regular',sans-serif] ${feedback.type === 'success' ? 'bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]' : 'bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]'}`}>
          {feedback.message}
        </div>
      )}
      <Container8 />
      <Container10 />
      <ContainerMargin />
      <FieldSet />
      <Container18 />
      <Paragraph1 />
    </form>
  );
}

function Text3() {
  return (
    <div className="-translate-x-1/2 absolute h-[9.388px] left-[calc(50%-0.32px)] pointer-events-none rounded-[5.12px] top-[13.57px] w-[52.912px]" data-name="Text">
      <div aria-hidden className="absolute bg-[#edf2f1] inset-0 rounded-[5.12px]" />
      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.853px_1.707px_0px_rgba(10,31,61,0.2)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white border-[#d3dedc] border-[0.683px] border-solid content-stretch drop-shadow-[0px_34.137px_29.869px_rgba(10,31,61,0.4),0px_1.707px_0px_rgba(10,31,61,0.03)] flex flex-col items-center left-0 rounded-[18.775px] top-[136px] w-[425px]" data-name="Container">
      <Container2 />
      <Form />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute flex h-[136.117px] items-center justify-center left-[175px] top-0 w-[49.127px]">
      <div className="-rotate-11 flex-none">
        <div className="h-[134px] pointer-events-none relative w-[24px]" data-name="Text">
          <div aria-hidden className="absolute bg-[#0fa98e] inset-0" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_3px_0px_0px_0px_rgba(0,0,0,0.1),inset_-3px_0px_0px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute flex h-[136.117px] items-center justify-center left-[200.57px] top-0 w-[49.127px]">
      <div className="flex-none rotate-11">
        <div className="h-[134px] pointer-events-none relative w-[24px]" data-name="Text">
          <div aria-hidden className="absolute bg-[#0fa98e] inset-0" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_3px_0px_0px_0px_rgba(0,0,0,0.1),inset_-3px_0px_0px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return <div className="absolute bg-[#7d8d8b] h-[8px] left-[10px] rounded-[4px] top-[19px] w-[20px]" data-name="Text" />;
}

function Text6() {
  return (
    <div className="absolute bg-gradient-to-b drop-shadow-[0px_2px_1.5px_rgba(10,31,61,0.25)] from-[#e6eceb] h-[34px] left-[192.35px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[8px] rounded-tr-[8px] to-[#aebbb9] top-[121.83px] w-[40px]" data-name="Text">
      <Text7 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[175px] top-0">
      <Text4 />
      <Text5 />
      <Text6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute h-[791px] left-[944px] top-[-29px] w-[425px] z-20">
      <Container1 />
      <Group3 />
    </div>
  );
}

function Button1() {
  const { scrollToForm } = useApplyForm();
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className="relative content-stretch flex items-center px-[24px] py-[12px] rounded-[6px] cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all shadow-md"
      style={{ backgroundImage: "linear-gradient(164.24882633654698deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }}
      data-name="Button"
    >
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Request a call</p>
    </button>
  );
}

function Button2() {
  const openWhatsApp = () => {
    window.open("https://wa.me/919266790357?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20admissions%20at%20iMED%20Academy.", "_blank");
  };
  return (
    <button
      type="button"
      onClick={openWhatsApp}
      className="relative content-stretch flex items-center px-[24.8px] py-[12px] rounded-[6px] cursor-pointer hover:bg-white/10 active:scale-[0.98] transition-all border-[0.8px] border-[rgba(255,255,255,0.35)] border-solid backdrop-blur-sm"
      data-name="Button"
    >
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Chat on WhatsApp</p>
    </button>
  );
}

function Container19() {
  return (
    <div className="relative flex gap-[16px] items-center" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[880px] left-0 top-0 w-[1440px] pointer-events-none" style={{ backgroundImage: "linear-gradient(113.67563944858165deg, rgba(13, 34, 64, 0.92) 7.735%, rgba(13, 34, 64, 0.82) 54.226%, rgba(13, 34, 64, 0.55) 92.265%)" }} data-name="Container">
      <div className="absolute h-[880px] left-0 top-0 w-[1520px] pointer-events-none" data-name="image 2052">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2052} />
      </div>
      <div className="absolute h-[874px] left-0 top-0 w-[844px] pointer-events-none" style={{ backgroundImage: "linear-gradient(89.9999999999999deg, rgb(31, 52, 113) 0%, rgba(31, 52, 113, 0.91) 25.962%, rgba(31, 52, 113, 0.5) 60.577%, rgba(31, 52, 113, 0) 100%)" }} />
      <div className="absolute h-[578px] left-[460px] top-[81px] w-[289px] pointer-events-none">
        <div className="absolute inset-[-69.2%_-138.41%] pointer-events-none">
          <svg className="block size-full pointer-events-none" fill="none" height="1378" preserveAspectRatio="none" viewBox="0 0 1089 1378" width="1089">
            <g filter="url(#filter0_f_0_89)" id="Ellipse 11">
              <ellipse cx="544.5" cy="689" fill="#1F3471" rx="144.5" ry="289" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1378" id="filter0_f_0_89" width="1089" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_89" stdDeviation="200" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold','Noto_Sans:SemiBold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:SemiBold','Noto_Sans_Symbols2:Regular',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#2dd4bf] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">✦</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="relative content-stretch flex gap-[8px] items-center px-[16.8px] py-[6.8px] rounded-[26843500px] border-[0.8px] border-[rgba(255,255,255,0.3)] border-solid backdrop-blur-sm" data-name="Text">
      <Text9 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.95)] tracking-[1.2px] uppercase whitespace-nowrap">Advanced Healthcare Administration Programme</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <Text8 />
    </div>
  );
}

function Heading() {
  return (
    <div className="relative content-stretch flex flex-col items-start pt-[16px] w-full" data-name="Heading 1">
      <h1 className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold not-italic text-white w-[640px] m-0 text-[56px] leading-[66px] tracking-tight">
        <span>{`Study in Kochi. `}</span>
        <span className="text-[#2dd4bf]">Start your Healthcare Career.</span>
      </h1>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative content-stretch flex flex-col items-start pt-[18px] w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[17px] text-[rgba(255,255,255,0.85)] w-[599px]">Advance your future with industry-focused healthcare administration training designed for aspiring professionals. Gain practical knowledge, leadership skills and career support from healthcare experts.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="Icon">
          <path d={svgPaths.p3f0cd700} id="Vector" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.p3806c300} id="Vector_2" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.pb340c80} id="Vector_3" stroke="white" strokeLinecap="round" strokeWidth="2.1" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[44px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }} data-name="Container">
      <Icon />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">Internship with</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">Stipend</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.025px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="Icon">
          <path d={svgPaths.p2a281500} id="Vector" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.p295c8e00} id="Vector_2" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.p1ab60500} id="Vector_3" stroke="white" strokeLinecap="round" strokeWidth="2.1" />
          <path d={svgPaths.p1d9853f0} id="Vector_4" stroke="white" strokeLinecap="round" strokeWidth="2.1" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[44px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }} data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">{`Placement `}</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">assistance</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.025px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container29() {
  return (
    <div className="col-2 content-stretch flex gap-[12px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="Icon">
          <path d={svgPaths.p18eadc00} id="Vector" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.p3e1f1200} id="Vector_2" stroke="white" strokeWidth="1.75" />
          <path d={svgPaths.p3e677a00} id="Vector_3" stroke="white" strokeLinecap="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[44px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }} data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">{`Free tablet `}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">for learners</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.025px]" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container34() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="Icon">
          <path d={svgPaths.p170b7380} id="Vector" stroke="white" strokeWidth="2.1" />
          <path d={svgPaths.p3c41f1f0} id="Vector_2" stroke="white" strokeLinecap="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[44px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }} data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">{`Global `}</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Arimo:Regular',sans-serif] font-normal leading-[20.25px] relative shrink-0 text-[13.5px] text-white whitespace-nowrap">curriculum</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.025px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container39() {
  return (
    <div className="col-2 content-stretch flex gap-[12px] items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[24px] gap-y-[16px] grid grid-cols-[__227px_227px] grid-rows-[___44px_44px_44px] relative size-full">
        <Container24 />
        <Container29 />
        <Container34 />
        <Container39 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative content-stretch flex flex-col items-start pt-[24px] w-[576px]" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute left-[67px] top-[50px] w-[640px] flex flex-col items-start z-10" data-name="Container">
      <Container21 />
      <Heading />
      <Paragraph2 />
      <Container22 />
      <div className="pt-[28px]">
        <Container19 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute h-[880px] left-0 top-[66px] w-[1440px] bg-[#0d2240]" data-name="App">
      <Container />
      <Container20 />
      <Frame11 />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[40px] not-italic relative shrink-0 text-[#0d2240] text-[36px] text-center whitespace-nowrap">1000+</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140.275px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">STUDENTS TRAINED</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-[140.275px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Container50() {
  return <div className="bg-[#e5e7eb] h-[40px] relative shrink-0 w-px" data-name="Container" />;
}

function Container46() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container47 />
      <Container50 />
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[40px] not-italic relative shrink-0 text-[#0d2240] text-[36px] text-center whitespace-nowrap">98%</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140.275px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">LEARNERS PLACED</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-[140.275px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Container55() {
  return <div className="bg-[#e5e7eb] h-[40px] relative shrink-0 w-px" data-name="Container" />;
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container52 />
      <Container55 />
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[40px] not-italic relative shrink-0 text-[#0d2240] text-[36px] text-center whitespace-nowrap">100+</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[20px] relative shrink-0 w-[125.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">HIRING PARTNERS</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[125.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Container60() {
  return <div className="bg-[#e5e7eb] h-[40px] relative shrink-0 w-px" data-name="Container" />;
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container57 />
      <Container60 />
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[40px] not-italic relative shrink-0 text-[#0d2240] text-[36px] text-center whitespace-nowrap">100%</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[20px] relative shrink-0 w-[177.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">PLACEMENT ASSISTANCE</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-[177.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Container65() {
  return <div className="bg-[#e5e7eb] h-[40px] relative shrink-0 w-px" data-name="Container" />;
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container62 />
      <Container65 />
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[40px] not-italic relative shrink-0 text-[#0d2240] text-[36px] text-center whitespace-nowrap">20-35K</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[20px] relative shrink-0 w-[162.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">AVERAGE SALARY</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-[162.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container68 />
        <Container69 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container67 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[28px] items-center left-0 top-0">
      <Container46 />
      <Container51 />
      <Container56 />
      <Container61 />
      <Container66 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[59.987px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame12 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1024px] px-[24px] relative shrink-0 w-[1008px]" data-name="Container">
      <Container45 />
    </div>
  );
}

function ContainerMargin5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container44 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[48.8px] pt-[48px] top-[946px] w-[1440px]" data-name="Section">
      <div aria-hidden className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <ContainerMargin5 />
    </div>
  );
}

function TealBadge() {
  return (
    <div className="absolute bg-[rgba(45,212,191,0.08)] border-[#2dd4bf] border-[0.976px] border-solid h-[36.107px] left-[572.13px] rounded-[32758168px] top-0 w-[202.988px]" data-name="TealBadge">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.525px] left-[99.53px] not-italic text-[#25a88d] text-[14.644px] text-center top-[7.32px] tracking-[1.4644px] uppercase whitespace-nowrap">THE OPPORTUNITY</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[36.107px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TealBadge />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[68.339px] relative shrink-0 w-[1347.254px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#1f3471] text-[43.932px] text-center whitespace-nowrap">
          <span className="leading-[48.814px]">{`Why `}</span>
          <span className="leading-[48.814px] text-[#25a88d]">Healthcare Administration?</span>
        </p>
      </div>
    </div>
  );
}

function ParagraphMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[27.763px] not-italic relative shrink-0 text-[#333] text-[17.085px] text-center w-[702.915px]">Healthcare is no longer just about doctors and nurses. Behind every great hospital is a team of administrators making care possible — and the world needs more of them.</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container72 />
        <Heading2 />
        <ParagraphMargin />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p109f3580} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Healthcare Industry Growth</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">One of the fastest expanding sectors globally with double-digit growth.</p>
      </div>
    </div>
  );
}

function FeatureCard() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-0 p-[30.264px] rounded-[19.525px] top-0 w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container74 />
      <Heading3 />
      <Paragraph3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p34aec980} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p498b580} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p1caefb80} id="Vector_3" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1695 6.10158H14.2373" id="Vector_4" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1695 10.169H14.2373" id="Vector_5" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 14.2373H14.2372" id="Vector_6" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 18.3047H14.2372" id="Vector_7" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Hospital Expansion</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Rapid private hospital growth across Tier 1, 2 and 3 cities in India.</p>
      </div>
    </div>
  );
}

function FeatureCard1() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[342.92px] p-[30.264px] rounded-[19.525px] top-0 w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container75 />
      <Heading4 />
      <Paragraph4 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p8df0000} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p1049c340} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Career Opportunities</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Diverse roles across hospitals, clinics, insurance and health-tech.</p>
      </div>
    </div>
  );
}

function FeatureCard2() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[685.83px] p-[30.264px] rounded-[19.525px] top-0 w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container76 />
      <Heading5 />
      <Paragraph5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p1e978f80} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p9db77f0} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p1d764fc0} id="Vector_3" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p29ee240} id="Vector_4" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Leadership Roles</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Pathway to operational, strategic and senior management positions.</p>
      </div>
    </div>
  );
}

function FeatureCard3() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[1028.75px] p-[30.264px] rounded-[19.525px] top-0 w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container77 />
      <Heading6 />
      <Paragraph6 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p352deb00} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container78() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Job Stability</p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Recession-resilient profession with long-term demand security.</p>
      </div>
    </div>
  );
}

function FeatureCard4() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-0 p-[30.264px] rounded-[19.525px] top-[235.04px] w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container78 />
      <Heading7 />
      <Paragraph7 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.pa8d6800} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p3a64c440} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p389320f0} id="Vector_3" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">High Demand</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Skilled administrators consistently outpace available talent supply.</p>
      </div>
    </div>
  );
}

function FeatureCard5() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[342.92px] p-[30.264px] rounded-[19.525px] top-[235.04px] w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container79 />
      <Heading8 />
      <Paragraph8 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.pa8d6800} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p3869280} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M2.03375 12.203H22.3727" id="Vector_3" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Global Opportunities</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Internationally recognised skill set with cross-border mobility.</p>
      </div>
    </div>
  );
}

function FeatureCard6() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[685.83px] p-[30.264px] rounded-[19.525px] top-[235.04px] w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container80 />
      <Heading9 />
      <Paragraph9 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p3f36cac0} id="Vector" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p3a4f6000} id="Vector_2" stroke="#0D9488" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container81() {
  return (
    <div className="bg-[rgba(45,212,191,0.15)] relative rounded-[24.407px] shrink-0 size-[48.814px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[257.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#1f3471] text-[17.085px] whitespace-nowrap">Professional Growth</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative shrink-0 w-[257.98px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#333] text-[14.644px] w-[258.712px]">Structured ladder from executive to CXO-level management roles.</p>
      </div>
    </div>
  );
}

function FeatureCard7() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[210.631px] items-start left-[1028.75px] p-[30.264px] rounded-[19.525px] top-[235.04px] w-[318.508px]" data-name="FeatureCard">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container81 />
      <Heading10 />
      <Paragraph10 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[445.668px] relative shrink-0 w-full" data-name="Container">
      <FeatureCard />
      <FeatureCard1 />
      <FeatureCard2 />
      <FeatureCard3 />
      <FeatureCard4 />
      <FeatureCard5 />
      <FeatureCard6 />
      <FeatureCard7 />
    </div>
  );
}

function ContainerMargin7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[58.576px] relative size-full">
        <Container73 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1405.8304443359375px] px-[29.288px] relative shrink-0 w-[1405.83px]" data-name="Container">
      <Container71 />
      <ContainerMargin7 />
    </div>
  );
}

function ContainerMargin6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container70 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-[#f0fdf9] content-stretch flex flex-col items-start left-0 py-[97.627px] top-[1103px] w-[1440px]" data-name="Section">
      <ContainerMargin6 />
    </div>
  );
}

function TealBadge1() {
  return (
    <div className="absolute bg-[rgba(45,212,191,0.08)] border-[#2dd4bf] border-[0.976px] border-solid h-[36.107px] left-[583.32px] rounded-[32758168px] top-0 w-[180.595px]" data-name="TealBadge">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.525px] left-[89.75px] not-italic text-[#25a88d] text-[14.644px] text-center top-[7.32px] tracking-[1.4644px] uppercase whitespace-nowrap">WHAT YOU GAIN</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[36.107px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TealBadge1 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[68.339px] relative shrink-0 w-[1347.254px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[48.814px] not-italic relative shrink-0 text-[#0d2240] text-[43.932px] text-center whitespace-nowrap">Benefits that go beyond a certificate</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container84 />
        <Heading11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p28011180} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p13915300} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative rounded-[24.407px] shrink-0 size-[53.695px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[372.28px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#0d2240] text-[17.085px] whitespace-nowrap">Job-Ready Skills</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="relative shrink-0 w-[372.28px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#6a7282] text-[14.644px] w-[373.424px]">Industry-mapped curriculum aligned to real hospital roles.</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[215.512px] items-start p-[30.264px] relative rounded-[19.525px] shrink-0 w-[432.808px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container87 />
      <Heading12 />
      <Paragraph11 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p2788db00} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p1a4fa800} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p1c04bec0} id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p3276fe80} id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative rounded-[24.407px] shrink-0 size-[53.695px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[372.28px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#0d2240] text-[17.085px] whitespace-nowrap">Mentor Support</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="relative shrink-0 w-[372.28px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#6a7282] text-[14.644px] w-[373.424px]">One-on-one guidance from active healthcare professionals.</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[215.512px] items-start p-[30.264px] relative rounded-[19.525px] shrink-0 w-[432.808px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container89 />
      <Heading13 />
      <Paragraph12 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p50cfb00} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p2e6d4da0} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container91() {
  return (
    <div className="relative rounded-[24.407px] shrink-0 size-[53.695px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[372.295px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#0d2240] text-[17.085px] whitespace-nowrap">Lifetime Access</p>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="relative shrink-0 w-[372.295px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#6a7282] text-[14.644px] w-[373.424px]">Lifetime access to LMS resources and alumni network.</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[215.512px] items-start p-[30.264px] relative rounded-[19.525px] shrink-0 w-[432.824px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container91 />
      <Heading14 />
      <Paragraph13 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <Container86 />
      <Container88 />
      <Container90 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.p36458240} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M18.3052 17.2879V9.15234" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M13.2202 17.2874V5.08398" id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M8.13525 17.2872V14.2363" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container93() {
  return (
    <div className="relative rounded-[24.407px] shrink-0 size-[53.695px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[372.28px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#0d2240] text-[17.085px] whitespace-nowrap">Live Projects</p>
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="relative shrink-0 w-[372.28px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#6a7282] text-[14.644px] w-[373.424px]">Work on 5 real hospital case studies during the program.</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[215.512px] items-start p-[30.264px] relative rounded-[19.525px] shrink-0 w-[432.808px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container93 />
      <Heading15 />
      <Paragraph14 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[24.407px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="24.4068" preserveAspectRatio="none" viewBox="0 0 24.4068 24.4068" width="24.4068">
        <g id="Icon">
          <path d={svgPaths.pc1f5000} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p22a84c00} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d={svgPaths.p3e4aa40} id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 6.10156H14.2372" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 10.1719H14.2372" id="Vector_5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 14.2363H14.2372" id="Vector_6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
          <path d="M10.1694 18.3066H14.2372" id="Vector_7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0339" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative rounded-[24.407px] shrink-0 size-[53.695px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[43.932px] relative shrink-0 w-[372.28px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[19.525px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.407px] not-italic relative shrink-0 text-[#0d2240] text-[17.085px] whitespace-nowrap">Hospital Exposure</p>
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="relative shrink-0 w-[372.28px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.763px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.797px] not-italic relative shrink-0 text-[#6a7282] text-[14.644px] w-[373.424px]">Site visits and guest lectures from senior administrators.</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1.22px_1.831px_rgba(0,0,0,0.1),0px_1.22px_1.22px_rgba(0,0,0,0.1)] flex flex-col h-[215.512px] items-start p-[30.264px] relative rounded-[19.525px] shrink-0 w-[432.808px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.976px] border-solid inset-0 pointer-events-none rounded-[19.525px]" />
      <Container95 />
      <Heading16 />
      <Paragraph15 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Container92 />
      <Container94 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-0 top-0 w-[1346.441px]">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[455.431px] relative shrink-0 w-full" data-name="Container">
      <Frame10 />
    </div>
  );
}

function ContainerMargin9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[58.576px] relative size-full">
        <Container85 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1405.8304443359375px] px-[29.288px] relative shrink-0 w-[1405.83px]" data-name="Container">
      <Container83 />
      <ContainerMargin9 />
    </div>
  );
}

function ContainerMargin8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container82 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex flex-col items-start left-0 py-[97.627px] top-[2645.83px] w-[1440px]" data-name="Section">
      <ContainerMargin8 />
    </div>
  );
}

function TealBadge2() {
  return (
    <div className="absolute bg-[rgba(45,212,191,0.08)] border-[#2dd4bf] border-[0.978px] border-solid h-[36.182px] left-[590.88px] rounded-[32826414px] top-0 w-[168.299px]" data-name="TealBadge">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.566px] left-[83.79px] not-italic text-[#25a88d] text-[14.675px] text-center top-[7.34px] tracking-[1.4675px] uppercase whitespace-nowrap">CAREER PATHS</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[36.182px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TealBadge2 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[68.481px] relative shrink-0 w-[1350.061px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.566px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#1f3471] text-[44.024px] text-center whitespace-nowrap">
          <span className="leading-[48.915px]">{`Roles you can `}</span>
          <span className="leading-[48.915px] text-[#25a88d]">step into</span>
        </p>
      </div>
    </div>
  );
}

function ParagraphMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.566px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24.458px] not-italic relative shrink-0 text-[#333] text-[17.12px] text-center w-[547.851px]">iMED graduates work across hospitals, clinics, insurance companies and health-tech firms.</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container98 />
        <Heading17 />
        <ParagraphMargin1 />
      </div>
    </div>
  );
}

function Container101() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text10() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Hospital Administrator</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-0 px-[25.436px] py-[20.544px] rounded-[19.566px] top-0 w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container101 />
      <Text10 />
    </div>
  );
}

function Container103() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text11() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Operations Manager</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[342.41px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-0 w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container103 />
      <Text11 />
    </div>
  );
}

function Container105() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text12() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Patient Relations Executive</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[684.81px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-0 w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container105 />
      <Text12 />
    </div>
  );
}

function Container107() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text13() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Healthcare Consultant</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[1027.22px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-0 w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container107 />
      <Text13 />
    </div>
  );
}

function Container109() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text14() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Medical Office Manager</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-0 px-[25.436px] py-[20.544px] rounded-[19.566px] top-[85.11px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container109 />
      <Text14 />
    </div>
  );
}

function Container111() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text15() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Health Insurance Manager</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[342.41px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[85.11px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container111 />
      <Text15 />
    </div>
  );
}

function Container113() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text16() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Quality Assurance Officer</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[684.81px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[85.11px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container113 />
      <Text16 />
    </div>
  );
}

function Container115() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text17() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Clinical Coordinator</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[1027.22px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[85.11px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container115 />
      <Text17 />
    </div>
  );
}

function Container117() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text18() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Healthcare IT Manager</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-0 px-[25.436px] py-[20.544px] rounded-[19.566px] top-[170.22px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container117 />
      <Text18 />
    </div>
  );
}

function Container119() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text19() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Revenue Cycle Analyst</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[342.41px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[170.22px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container119 />
      <Text19 />
    </div>
  );
}

function Container121() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text20() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Public Health Administrator</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[684.81px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[170.22px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container121 />
      <Text20 />
    </div>
  );
}

function Container123() {
  return <div className="bg-[#2dd4bf] relative rounded-[32826414px] shrink-0 size-[9.783px]" data-name="Container" />;
}

function Text21() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24.458px] not-italic relative shrink-0 text-[#1f3471] text-[17.12px] whitespace-nowrap">Medical Practice Manager</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1.223px_1.834px_rgba(0,0,0,0.1),0px_1.223px_1.223px_rgba(0,0,0,0.1)] flex gap-[14.675px] items-center left-[1027.22px] px-[25.436px] py-[20.544px] rounded-[19.566px] top-[170.22px] w-[322.841px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.566px]" />
      <Container123 />
      <Text21 />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[235.772px] relative shrink-0 w-full" data-name="Container">
      <Container100 />
      <Container102 />
      <Container104 />
      <Container106 />
      <Container108 />
      <Container110 />
      <Container112 />
      <Container114 />
      <Container116 />
      <Container118 />
      <Container120 />
      <Container122 />
    </div>
  );
}

function ContainerMargin11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[58.698px] relative size-full">
        <Container99 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1408.75927734375px] px-[29.349px] relative shrink-0 w-[1408.759px]" data-name="Container">
      <Container97 />
      <ContainerMargin11 />
    </div>
  );
}

function ContainerMargin10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container96 />
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[-2px] py-[97.831px] top-[1982.47px] w-[1443px]" data-name="Section">
      <ContainerMargin10 />
    </div>
  );
}

function TealBadge3() {
  return (
    <div className="absolute bg-[rgba(45,212,191,0.08)] border-[#2dd4bf] border-[0.978px] border-solid h-[36.158px] left-[604.64px] rounded-[32804894px] top-0 w-[139.882px]" data-name="TealBadge">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.553px] left-[68.05px] not-italic text-[#25a88d] text-[14.665px] text-center top-[7.33px] tracking-[1.4665px] uppercase whitespace-nowrap">ELIGIBILITY</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[36.159px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TealBadge3 />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[68.436px] relative shrink-0 w-[1349.176px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[48.883px] not-italic relative shrink-0 text-[#1f3471] text-[43.995px] text-center whitespace-nowrap">Who is this program for?</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container126 />
        <Heading18 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[26.886px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="26.8858" preserveAspectRatio="none" viewBox="0 0 26.8858 26.8858" width="26.8858">
        <g id="Icon">
          <path d={svgPaths.pc8c5970} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d="M24.645 11.2012V17.9226" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d={svgPaths.p1517c680} id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
        </g>
      </svg>
    </div>
  );
}

function Container129() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.442px] shrink-0 size-[58.66px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <Icon17 />
    </div>
  );
}

function ContainerMargin14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container129 />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="h-[43.995px] relative shrink-0 w-[203.354px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.442px] not-italic relative shrink-0 text-[#1f3471] text-[17.109px] text-center whitespace-nowrap">Fresh Graduates</p>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="relative shrink-0 w-[203.354px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[9.777px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.831px] not-italic relative shrink-0 text-[#333] text-[14.665px] text-center w-[204.087px]">Any UG or PG degree, any stream</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute content-stretch flex flex-col h-[210.931px] items-start left-0 p-[25.42px] rounded-[19.553px] top-0 w-[254.193px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.553px]" />
      <ContainerMargin14 />
      <Heading19 />
      <Paragraph16 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[26.886px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="26.8858" preserveAspectRatio="none" viewBox="0 0 26.8858 26.8858" width="26.8858">
        <g id="Icon">
          <path d={svgPaths.p12031680} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d={svgPaths.p3b802760} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
        </g>
      </svg>
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.442px] shrink-0 size-[58.66px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <Icon18 />
    </div>
  );
}

function ContainerMargin15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container131 />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="h-[43.995px] relative shrink-0 w-[203.354px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.442px] not-italic relative shrink-0 text-[#1f3471] text-[17.109px] text-center whitespace-nowrap">Working Professionals</p>
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="relative shrink-0 w-[203.354px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[9.777px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.831px] not-italic relative shrink-0 text-[#333] text-[14.665px] text-center w-[204.087px]">Seeking career growth in healthcare</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute content-stretch flex flex-col h-[210.931px] items-start left-[273.75px] p-[25.42px] rounded-[19.553px] top-0 w-[254.193px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.553px]" />
      <ContainerMargin15 />
      <Heading20 />
      <Paragraph17 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[26.886px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="26.8858" preserveAspectRatio="none" viewBox="0 0 26.8858 26.8858" width="26.8858">
        <g id="Icon">
          <path d={svgPaths.pdaa33e0} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d={svgPaths.p18a0a360} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
        </g>
      </svg>
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.442px] shrink-0 size-[58.66px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <Icon19 />
    </div>
  );
}

function ContainerMargin16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container133 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="h-[43.995px] relative shrink-0 w-[203.354px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.442px] not-italic relative shrink-0 text-[#1f3471] text-[17.109px] text-center whitespace-nowrap">Career Switchers</p>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="relative shrink-0 w-[203.354px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[9.777px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.831px] not-italic relative shrink-0 text-[#333] text-[14.665px] text-center w-[204.087px]">Transitioning into the healthcare sector</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute content-stretch flex flex-col h-[210.931px] items-start left-[547.49px] p-[25.42px] rounded-[19.553px] top-0 w-[254.193px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.553px]" />
      <ContainerMargin16 />
      <Heading21 />
      <Paragraph18 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[26.886px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="26.8858" preserveAspectRatio="none" viewBox="0 0 26.8858 26.8858" width="26.8858">
        <g id="Icon">
          <path d={svgPaths.p2b015280} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d={svgPaths.p2ee64c40} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
        </g>
      </svg>
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.442px] shrink-0 size-[58.66px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <Icon20 />
    </div>
  );
}

function ContainerMargin17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container135 />
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="h-[43.995px] relative shrink-0 w-[203.354px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.442px] not-italic relative shrink-0 text-[#1f3471] text-[17.109px] text-center whitespace-nowrap">Healthcare Workers</p>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="relative shrink-0 w-[203.354px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[9.777px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.831px] not-italic relative shrink-0 text-[#333] text-[14.665px] text-center w-[204.087px]">{`Nurses, technicians & para-medical staff`}</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute content-stretch flex flex-col h-[210.931px] items-start left-[821.24px] p-[25.42px] rounded-[19.553px] top-0 w-[254.193px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.553px]" />
      <ContainerMargin17 />
      <Heading22 />
      <Paragraph19 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[26.886px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="26.8858" preserveAspectRatio="none" viewBox="0 0 26.8858 26.8858" width="26.8858">
        <g id="Icon">
          <path d={svgPaths.p1e854c80} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d="M20.1646 19.0439V10.082" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d="M14.563 19.0444V5.60156" id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
          <path d="M8.9624 19.0463V15.6855" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24048" />
        </g>
      </svg>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.442px] shrink-0 size-[58.66px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(13, 148, 136) 100%)" }} data-name="Container">
      <Icon21 />
    </div>
  );
}

function ContainerMargin18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container137 />
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="h-[43.995px] relative shrink-0 w-[203.354px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.553px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24.442px] not-italic relative shrink-0 text-[#1f3471] text-[17.109px] text-center whitespace-nowrap">Entrepreneurs</p>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="relative shrink-0 w-[203.354px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[9.777px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[23.831px] not-italic relative shrink-0 text-[#333] text-[14.665px] text-center w-[204.087px]">Building or managing a healthcare business</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute content-stretch flex flex-col h-[210.931px] items-start left-[1094.98px] p-[25.42px] rounded-[19.553px] top-0 w-[254.193px]" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.978px] border-solid inset-0 pointer-events-none rounded-[19.553px]" />
      <ContainerMargin18 />
      <Heading23 />
      <Paragraph20 />
    </div>
  );
}

function Container127() {
  return (
    <div className="h-[210.931px] relative shrink-0 w-full" data-name="Container">
      <Container128 />
      <Container130 />
      <Container132 />
      <Container134 />
      <Container136 />
    </div>
  );
}

function ContainerMargin13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[58.66px] relative size-full">
        <Container127 />
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1407.835693359375px] px-[29.33px] relative shrink-0 w-[1407.836px]" data-name="Container">
      <Container125 />
      <ContainerMargin13 />
    </div>
  );
}

function ContainerMargin12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container124 />
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[-1px] py-[97.766px] top-[3459.54px] w-[1442.054px]" data-name="Section">
      <ContainerMargin12 />
    </div>
  );
}

function TealBadge4() {
  return (
    <div className="absolute bg-[rgba(45,212,191,0.08)] border-[#2dd4bf] border-[0.975px] border-solid h-[36.042px] left-[331.52px] rounded-[32699830px] top-0 w-[214.016px]" data-name="TealBadge">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.491px] left-[106.21px] not-italic text-[#0d9488] text-[14.618px] text-center top-[7.31px] tracking-[1.4618px] uppercase whitespace-nowrap">FREQUENTLY ASKED</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="h-[36.043px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TealBadge4 />
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="h-[68.217px] relative shrink-0 w-[877.079px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[19.491px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[48.727px] not-italic relative shrink-0 text-[#1f3471] text-[43.854px] text-center whitespace-nowrap">Common questions answered</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container140 />
        <Heading24 />
      </div>
    </div>
  );
}

const applyNowFaqItems = [
  {
    question: "Who is this program designed for?",
    answer:
      "This program is designed for 12th pass students, graduates from any stream, and diploma holders looking to enter the healthcare administration sector, as well as working professionals aiming to upgrade into administrative and managerial roles in hospitals and healthcare facilities.",
  },
  {
    question: "What is the duration of the program?",
    answer:
      "The program is structured over 6 months of comprehensive classroom and hands-on practical training in Kochi, followed by dedicated internship exposure and hospital placement assistance.",
  },
  {
    question: "Is the certification recognised by the industry?",
    answer:
      "Yes. iMED Academy is an NSDC Authorised Training Partner and MSME Registered institution. Our certifications are recognized by leading private and multi-specialty hospital chains across Kerala, India, and overseas healthcare facilities.",
  },
  {
    question: "What kind of placement support is provided?",
    answer:
      "We provide 100% placement assistance, including hospital interview preparation, resume building, healthcare communication coaching, and direct recruitment drives with our network of 50+ partner hospitals.",
  },
  {
    question: "Are there any EMI or scholarship options?",
    answer:
      "Yes. Flexible monthly EMI options with zero-cost EMI plans are available to make fee payments affordable. Merit-based fee concessions and early enrollment benefits are also offered upon counselling.",
  },
  {
    question: "What is the minimum eligibility to enrol?",
    answer:
      "The minimum eligibility is successful completion of 12th standard (Plus Two / Higher Secondary) in any stream (Science, Commerce, or Humanities) or any recognized diploma/degree. No prior healthcare background is required.",
  },
];

function Container141({
  openIndex,
  onToggle,
  faqRef,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  faqRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={faqRef}
      className="bg-white relative rounded-[19.491px] shrink-0 w-full shadow-[0px_1.218px_3.654px_0px_rgba(0,0,0,0.1),0px_1.218px_2.436px_-1.218px_rgba(0,0,0,0.1)] border-[#f3f4f6] border-[0.975px] border-solid overflow-hidden transition-all duration-200"
      data-name="Container"
    >
      <div className="flex flex-col items-start w-full">
        {applyNowFaqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const isLast = index === applyNowFaqItems.length - 1;
          return (
            <div
              key={index}
              className={`w-full transition-colors ${!isLast ? "border-b border-[#f3f4f6]" : ""}`}
            >
              <button
                type="button"
                onClick={() => onToggle(index)}
                className="w-full text-left flex items-center justify-between px-[34px] py-[24px] cursor-pointer hover:bg-[#f0fdf9]/40 transition-colors group"
                aria-expanded={isOpen}
              >
                <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[17px] leading-[24px] pr-[16px] transition-colors ${isOpen ? "text-[#0d9488]" : "text-black group-hover:text-[#0d9488]"}`}>
                  {item.question}
                </p>
                <div className="shrink-0 size-[22px] flex items-center justify-center">
                  <svg
                    className={`size-[20px] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#0d9488]" : "text-[#0d9488]"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="px-[34px] pb-[24px] pt-[2px] animate-fadeIn">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[15px] leading-[24px] text-[#4e6178]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContainerMargin20({
  openIndex,
  onToggle,
  faqRef,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  faqRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[58.472px] relative size-full">
        <Container141 openIndex={openIndex} onToggle={onToggle} faqRef={faqRef} />
      </div>
    </div>
  );
}

function Container138({
  openIndex,
  onToggle,
  faqRef,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  faqRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[935.5512084960938px] px-[29.236px] relative shrink-0 w-[935.551px]" data-name="Container">
      <Container139 />
      <ContainerMargin20 openIndex={openIndex} onToggle={onToggle} faqRef={faqRef} />
    </div>
  );
}

function ContainerMargin19({
  openIndex,
  onToggle,
  faqRef,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  faqRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container138 openIndex={openIndex} onToggle={onToggle} faqRef={faqRef} />
      </div>
    </div>
  );
}

function Section5({
  openIndex,
  onToggle,
  faqRef,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  faqRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute bg-[#f0fdf9] content-stretch flex flex-col items-start left-px py-[97.453px] top-[4029.26px] w-[1437.435px]" data-name="Section">
      <ContainerMargin19 openIndex={openIndex} onToggle={onToggle} faqRef={faqRef} />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 h-[29px] ml-0 mt-0 relative row-1 w-[22.895px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  const goHome = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div onClick={goHome} className="content-stretch flex gap-[10px] items-center leading-[0] relative shrink-0 w-[203px] cursor-pointer hover:opacity-90 transition-opacity">
      <Group />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold h-[18px] not-italic relative shrink-0 text-[#1f3471] text-[22.992px] text-center w-[170px]">
        <span className="leading-[21px]">{`iMED `}</span>
        <span className="leading-[21px] text-[#25a88d]">Academy</span>
      </p>
    </div>
  );
}

function Frame2() {
  const goToPrograms = () => {
    window.location.hash = "";
    setTimeout(() => {
      document.getElementById("career-path")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };
  return (
    <button type="button" onClick={goToPrograms} className="h-[24px] relative shrink-0 w-[74px] cursor-pointer hover:text-[#0d9488] transition-colors">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[37px] not-italic text-[#333] hover:text-[#0d9488] text-[16px] text-center top-0 whitespace-nowrap">Programs</p>
    </button>
  );
}

function Frame3() {
  const goToCareers = () => {
    window.location.hash = "#careers";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button type="button" onClick={goToCareers} className="h-[24px] relative shrink-0 w-[63px] cursor-pointer hover:text-[#0d9488] transition-colors">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[30px] not-italic text-[#333] hover:text-[#0d9488] text-[16px] text-center top-0 whitespace-nowrap">Careers</p>
    </button>
  );
}

function Frame4() {
  const goToReviews = () => {
    window.location.hash = "";
    setTimeout(() => {
      document.getElementById("student-reviews")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };
  return (
    <button type="button" onClick={goToReviews} className="h-[24px] relative shrink-0 w-[120px] cursor-pointer hover:text-[#0d9488] transition-colors">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[60px] not-italic text-[#333] hover:text-[#0d9488] text-[16px] text-center top-0 whitespace-nowrap">Student Stories</p>
    </button>
  );
}

function Frame5() {
  const goToAbout = () => {
    window.location.hash = "";
    setTimeout(() => {
      document.getElementById("why-imed")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };
  return (
    <button type="button" onClick={goToAbout} className="h-[24px] relative shrink-0 w-[71px] cursor-pointer hover:text-[#0d9488] transition-colors">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[35.5px] not-italic text-[#333] hover:text-[#0d9488] text-[16px] text-center top-0 whitespace-nowrap">About Us</p>
    </button>
  );
}

function Frame6() {
  const goToContact = () => {
    window.location.hash = "";
    setTimeout(() => {
      document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };
  return (
    <button type="button" onClick={goToContact} className="h-[24px] relative shrink-0 w-[86px] cursor-pointer hover:text-[#0d9488] transition-colors">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[43px] not-italic text-[#333] hover:text-[#0d9488] text-[16px] text-center top-0 whitespace-nowrap">Contact</p>
    </button>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Button9() {
  const { scrollToForm } = useApplyForm();
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className="content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px] cursor-pointer hover:opacity-95 transition-opacity shadow-sm"
      style={{ backgroundImage: "linear-gradient(165.57922687248902deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%)" }}
      data-name="Button"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Apply Now `}</p>
    </button>
  );
}

function NavBar() {
  return (
    <div className="bg-white content-stretch flex gap-[194px] h-[66px] items-center justify-center left-0 overflow-clip px-[38px] py-[15px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] top-0 w-[1440px]" data-name="Nav Bar">
      <Frame />
      <Frame7 />
      <Button9 />
    </div>
  );
}

function Heading25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[58.8px] not-italic relative shrink-0 text-[56px] text-white tracking-[-0.84px] w-[641px]">Come see the centre before you decide</p>
    </div>
  );
}

function ParagraphMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[18px] relative shrink-0" data-name="Paragraph:margin">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] not-italic relative shrink-0 text-[18px] text-white w-[576px]">Bring your parents to our centre in Kaloor. A counsellor will take you through the syllabus, the internship, the fees and the batch schedule in person.</p>
    </div>
  );
}

function Container148() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[222px] items-start justify-self-stretch relative row-1 self-end shrink-0" data-name="Container">
      <Heading25 />
      <ParagraphMargin2 />
    </div>
  );
}

function Link() {
  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=iMED+Academy+Kaloor+Kochi"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border-[0.8px] border-[rgba(0,0,0,0)] border-solid col-1 content-stretch flex items-center justify-center justify-self-start min-h-[52px] px-[24px] relative rounded-[12px] row-1 self-stretch shrink-0 w-[427.2px] hover:bg-slate-100 active:scale-[0.98] transition-all shadow-md cursor-pointer no-underline group"
      data-name="Link"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[25.6px] relative shrink-0 text-[#0a1f3d] text-[16px] whitespace-nowrap group-hover:text-[#0d9488] transition-colors" style={{ fontVariationSettings: '"wdth" 100' }}>
        Get directions
      </p>
    </a>
  );
}

function Link1() {
  return (
    <a
      href="https://wa.me/919266790357?text=Hi%2C%20I%20would%20like%20to%20book%20a%20visit%20to%20the%20iMED%20Academy%20Kaloor%20centre%20with%20my%20parents."
      target="_blank"
      rel="noopener noreferrer"
      className="border-[0.8px] border-[rgba(255,255,255,0.4)] border-solid col-1 content-stretch flex items-center justify-center justify-self-start min-h-[52px] px-[24px] relative rounded-[12px] row-2 self-stretch shrink-0 w-[427.2px] hover:bg-white/15 active:scale-[0.98] transition-all cursor-pointer no-underline"
      data-name="Link"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[25.6px] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Book a visit on WhatsApp
      </p>
    </a>
  );
}

function Link2() {
  return (
    <a
      href="tel:+919266790357"
      className="border-[0.8px] border-[rgba(255,255,255,0.4)] border-solid col-1 content-stretch flex items-center justify-center justify-self-start min-h-[52px] px-[24px] relative rounded-[12px] row-3 self-stretch shrink-0 w-[427.2px] hover:bg-white/15 active:scale-[0.98] transition-all cursor-pointer no-underline"
      data-name="Link"
    >
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[25.6px] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Call +91 92667 90357
      </p>
    </a>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex flex-col h-[28.8px] items-center max-w-[576px] relative shrink-0 w-[427.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[28.8px]">{`Or email `}</span>
        <a
          href="mailto:admissions@imedacademy.in?subject=Enquiry%20-%20iMED%20Academy%20Admission"
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[28.8px] underline text-white hover:text-[#d1fae5] transition-colors cursor-pointer"
        >
          admissions@imedacademy.in
        </a>
      </p>
    </div>
  );
}

function ParagraphMargin3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pt-[6px] relative row-4 self-stretch shrink-0" data-name="Paragraph:margin">
      <Paragraph21 />
    </div>
  );
}

function Container149() {
  return (
    <div className="col-2 gap-x-[12px] gap-y-[12px] grid grid-cols-[_427.20px] grid-rows-[____52px_52px_52px_34.80px] justify-self-stretch relative row-1 self-end shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <ParagraphMargin3 />
    </div>
  );
}

function Container147() {
  return (
    <div className="gap-x-[64px] gap-y-[64px] grid-cols-[__640.80px_427.20px] grid-rows-[_226.80px] inline-grid max-w-[1180px] px-[24px] relative shrink-0" data-name="Container">
      <Container148 />
      <Container149 />
    </div>
  );
}

function ContainerMargin21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container147 />
    </div>
  );
}

function Section6({ extraTop = 0 }: { extraTop?: number }) {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 py-[96px] w-[1536px] transition-[top] duration-200"
      style={{
        top: `${4832.26 + extraTop}px`,
        backgroundImage: "linear-gradient(164.74866831104615deg, rgb(13, 148, 136) 0%, rgb(45, 212, 191) 100%), linear-gradient(164.74866831104615deg, rgb(37, 168, 141) 0%, rgb(36, 151, 138) 7.1429%, rgb(35, 135, 135) 14.286%, rgb(34, 118, 132) 21.429%, rgb(33, 102, 128) 28.571%, rgb(33, 86, 123) 35.714%, rgb(32, 69, 118) 42.857%, rgb(31, 52, 113) 50%, rgb(29, 51, 115) 60%, rgb(28, 49, 117) 70%, rgb(27, 47, 118) 80%, rgb(25, 46, 120) 90%, rgb(24, 44, 122) 100%), linear-gradient(90deg, rgb(10, 31, 61) 0%, rgb(10, 31, 61) 100%)",
      }}
      data-name="Section"
    >
      <ContainerMargin21 />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 h-[29px] ml-0 mt-0 relative row-1 w-[22.895px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  const goHome = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div onClick={goHome} className="content-stretch flex gap-[10px] items-center leading-[0] relative shrink-0 w-[203px] cursor-pointer hover:opacity-90 transition-opacity">
      <Group1 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold h-[18px] not-italic relative shrink-0 text-[#1f3471] text-[22.992px] text-center w-[170px]">
        <span className="leading-[21px]">{`iMED `}</span>
        <span className="leading-[21px] text-[#25a88d]">Academy</span>
      </p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#333] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        iMED Healthcare Academy LLP, Kaloor, Kochi, Kerala. Ac 2026
      </p>
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex gap-[711px] items-center relative shrink-0 w-[1306px]" data-name="Container">
      <Frame1 />
      <Paragraph22 />
    </div>
  );
}

function ContainerMargin22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container150 />
    </div>
  );
}

function Footer({ extraTop = 0 }: { extraTop?: number }) {
  return (
    <div
      className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-start left-1/2 py-[20px] w-[1536px] transition-[top] duration-200"
      style={{ top: `${5251.06 + extraTop}px` }}
      data-name="Footer"
    >
      <ContainerMargin22 />
    </div>
  );
}

export default function ApplyNow() {
  const designWidth = 1440;
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [faqExtraHeight, setFaqExtraHeight] = useState(0);
  const faqRef = useRef<HTMLDivElement>(null);

  const handleToggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  useLayoutEffect(() => {
    if (faqRef.current) {
      const extra = Math.max(0, faqRef.current.offsetHeight - 445);
      setFaqExtraHeight(extra);
    }
  }, [openFaqIndex]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [qualification, setQualification] = useState("");
  const [canAttend, setCanAttend] = useState<"Yes" | "Not sure yet">("Yes");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

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
  }, [faqExtraHeight]);

  const scrollToForm = () => {
    const formEl = document.getElementById("apply-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!fullName.trim() || !phone.trim()) {
      setFeedback({ type: "error", message: "Please fill in your name and phone number." });
      return;
    }

    try {
      setIsSubmitting(true);
      const API_BASE_URL = (
        (import.meta.env.PROD
          ? (import.meta.env.VITE_PROD_API_BASE_URL as string | undefined)
          : (import.meta.env.VITE_API_BASE_URL as string | undefined)) ||
        (import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) ||
        (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
        (import.meta.env.VITE_API_URL as string | undefined) ||
        ""
      ).replace(/\/$/, "");
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          preferredProgram: `Apply Now (${qualification || "Healthcare Administration"})`,
          message: `City: ${city || "Not provided"}, Qualification: ${qualification || "Not provided"}, Can attend 6-month Kochi classes: ${canAttend}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setFeedback({
        type: "success",
        message: "Thank you! Your application enquiry has been received. Our admissions team will contact you shortly.",
      });
      setFullName("");
      setPhone("");
      setCity("");
      setQualification("");
      setCanAttend("Yes");
    } catch {
      setFeedback({ type: "error", message: "Failed to submit enquiry. Please try again or reach out on WhatsApp." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: ApplyFormContextType = {
    fullName,
    setFullName,
    phone,
    setPhone,
    city,
    setCity,
    qualification,
    setQualification,
    canAttend,
    setCanAttend,
    isSubmitting,
    feedback,
    handleSubmit,
    scrollToForm,
  };

  return (
    <ApplyFormContext.Provider value={contextValue}>
      <div
        className="bg-white overflow-x-hidden relative w-full"
        data-name="Apply Now Page"
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
            <App />
            <Section />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 openIndex={openFaqIndex} onToggle={handleToggleFaq} faqRef={faqRef} />
            <Section6 extraTop={faqExtraHeight} />
            <Footer extraTop={faqExtraHeight} />
          </div>
        </div>
      </div>
    </ApplyFormContext.Provider>
  );
}