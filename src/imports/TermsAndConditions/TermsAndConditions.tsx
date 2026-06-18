import { useLayoutEffect, useRef, useState } from "react";
import svgPaths from "./svg-26urjlinza";
import imgImage1712 from "../HomePage/imedLogo.png";

function EpBack() {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.hash = "";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="absolute block cursor-pointer left-[20px] size-[32px] top-[98px]"
      data-name="ep:back"
    >
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ep:back">
          <path d={svgPaths.p2e267df0} fill="var(--fill-0, #25A88D)" id="Vector" />
          <path d={svgPaths.p2cab3e80} fill="var(--fill-0, #25A88D)" id="Vector_2" />
        </g>
      </svg>
    </button>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[72px] top-[100px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#25a88d] text-[20px] whitespace-nowrap">Terms and Conditions</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Introduction</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[540px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="mb-0">
          <span className="leading-[30px]">{`The website `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[30px] underline" href="https://imedacademy.in/" target="_blank">
            <span className="[text-decoration-skip-ink:none] decoration-solid underline" href="https://imedacademy.in/" target="_blank">{`https://imedacademy.in/`}</span>
          </a>
          <span className="leading-[30px]">, including all pages within it (hereinafter referred to as the “Website”), and the information, services, and materials contained therein are owned, operated, and managed by IMED Academy Private Limited (hereinafter referred to as “we”, “us”, or “IMED Academy”).</span>
        </p>
        <p className="leading-[30px] mb-0">IMED Academy offers curated and industry-relevant education and training programs designed to equip learners with practical skills in healthcare and allied sectors. These programs may be delivered through proprietary learning platforms and in collaboration with recognized academic institutions, industry partners, and training organizations. The Website enables users to explore, access, and enroll in the various courses and services offered by IMED Academy.</p>
        <p className="leading-[30px] mb-0">As a user (“User” / “You”), which includes any individual or entity who accesses, browses, registers, or uses the Website in any manner, you are required to carefully review and agree to our Terms and Conditions, Privacy Policy, and any other applicable policies available on the Website (collectively referred to as the “Terms”). These Terms govern your access to and use of the Website and apply to all users without limitation.</p>
        <p className="leading-[30px] mb-0">Please read these Terms carefully before using the Website or any part of it. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree to these Terms, you must not access the Website or use any services provided by IMED Academy through the Website.</p>
        <p className="leading-[30px] mb-0">These Terms constitute a legally binding agreement between you and IMED Academy and are governed in accordance with applicable laws, including the provisions of the Information Technology Act, 2000. Subject to your compliance with these Terms, IMED Academy grants you a limited, non-exclusive, non-transferable right to access and use the Website for personal and lawful purposes. By accepting these Terms, you also agree to be bound by our policies, including the Privacy Policy, as may be updated from time to time and incorporated herein by reference.</p>
        <p className="leading-[30px]">IMED Academy makes no representations or warranties that the Website, its content, or the services offered will be available or appropriate for use in all geographic locations. Accessing the Website from locations where its content or services are restricted or illegal is prohibited. If you choose to access the Website from such locations, you do so at your own initiative and risk, and you are solely responsible for compliance with applicable local laws.</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">General Terms</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[930px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You represent and confirm that:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` You are at least 18 (eighteen) years of age. If you are below 18 years, you confirm that you are accessing and using the website under the supervision of a parent or legal guardian who has provided consent;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` You are legally capable of entering into a binding agreement under the applicable laws of India, including the Indian Contract Act, 1872;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` You have not been previously suspended, restricted, or prohibited from accessing or using the iMED Academy website or services due to any violation of terms.`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">All content available on this website, including but not limited to text, graphics, logos, images, videos, course materials, software, design elements, and overall structure (“Content”), is the property of iMED Academy or is licensed to it, and is protected under applicable intellectual property laws.</p>
        <ul className="mb-0">
          <ul className="list-disc">
            <li className="mb-0 ms-[54px]">
              <span className="leading-[30px]">{` You may view, download, and print content strictly for personal and non-commercial use;`}</span>
            </li>
            <li className="mb-0 ms-[54px]">
              <span className="leading-[30px]">{` You must not modify, alter, remove, or tamper with any copyright, trademark, or proprietary notices;`}</span>
            </li>
            <li className="ms-[54px]">
              <span className="leading-[30px]">{` Any unauthorized use of content without prior written permission from iMED Academy is strictly prohibited.`}</span>
            </li>
          </ul>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You agree that you shall not:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Copy, reproduce, store, distribute, transmit, publish, modify, or create derivative works from any part of the website or its content without prior written consent from iMED Academy;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Use the website or its content for:`}</span>
          </li>
          <ul>
            <li className="mb-0 ms-[54px]">
              <span className="leading-[30px]">{` Any unlawful purpose or in violation of applicable laws;`}</span>
            </li>
            <li className="mb-0 ms-[54px]">
              <span className="leading-[30px]">{` Any commercial activity without prior written approval;`}</span>
            </li>
            <li className="ms-[54px]">
              <span className="leading-[30px]">{` Any activity that may mislead users or harm the reputation of iMED Academy;`}</span>
            </li>
          </ul>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You further agree that you will not:</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Create or establish links to the website from any external platform without prior written consent;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Reverse engineer, decompile, or attempt to extract the source code or underlying structure of the platform;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Engage in any activity that disrupts or interferes with the functioning of the website;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Attempt to gain unauthorized access to any part of the platform, servers, or networks;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Introduce malicious software such as viruses, malware, or any harmful code;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Attempt to exploit or identify vulnerabilities in the system;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Encourage or assist others in performing any of the prohibited activities listed above;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Make false, misleading, defamatory, or damaging statements about iMED Academy, its staff, services, or partners.`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` The website may contain general information about courses, fee structures, and related services offered by iMED Academy.`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Certain sections of the website may be accessible without registration;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` iMED Academy reserves the right to introduce features that may require user registration or authentication;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Information on the website is subject to updates without prior notice.`}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">{`Acceptance of Terms & Conditions`}</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[180px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">{`iMED Academy reserves the right, at its sole discretion, to update, modify, add, or remove any part of these Terms & Conditions at any time without prior notice. It is the responsibility of the user to review these terms periodically for any changes. Continued use of the website or services after any modifications constitutes acceptance of the updated Terms & Conditions.`}</p>
        <p className="leading-[30px]">By using the website or submitting your details, you expressly consent to be contacted by iMED Academy through phone calls, SMS, WhatsApp messages, email, or any other communication channels regarding courses, programs, or related services you have shown interest in. This consent applies even if your contact number is registered under the Do Not Disturb (DND) or Do Not Call (DNC) registry.</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Registration for Programs or Courses</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[360px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap" dir="auto">
          Users who visit the iMED Academy website through digital platforms or choose to register for any course or program may be required to provide certain information, including but not limited to:
        </p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Full name`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Mobile number`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Preferred course or program`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Location or city`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Interest in financing or payment options offered by iMED Academy or its partners`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap" dir="auto">
          The mobile number provided at the time of enquiry or registration may be verified a one-time password (OTP) sent by iMED Academy. Users are responsible for ensuring that accurate and valid contact details are submitted. Failure to provide correct information may result in unsuccessful registration, for which iMED Academy shall not be held responsible.
        </p>
        <p className="leading-[30px] whitespace-pre-wrap" dir="auto">
          Upon successful verification of the mobile number, users may proceed to explore available courses and complete their enrollment based on their preferences and eligibility.
        </p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Disclaimer</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[510px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">The iMED Academy platform, website, and programs may occasionally contain typographical errors, inaccuracies, or incomplete information. iMED Academy reserves the right to correct, update, or modify any such errors or omissions at any time without prior notice, including after a user has submitted an application or inquiry.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">All content, information, and services provided on the website are made available on an “as is” and “as available” basis, without any guarantees of completeness, accuracy, or reliability.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy does not make any representations or warranties of any kind, whether express or implied, regarding the website, its content, or the services offered. This includes, but is not limited to:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Implied warranties of merchantability`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Fitness for a particular purpose`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Non-infringement`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy does not guarantee that:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` The website or services will meet user expectations`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Access will be uninterrupted, timely, secure, or error-free`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` The results obtained from using the services will be accurate or reliable`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Any defects or errors will be corrected`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">Users acknowledge that any content, material, or data downloaded or otherwise obtained through the website is accessed at their own discretion and risk. iMED Academy shall not be held responsible for any damage to devices, systems, or loss of data resulting from such use.</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Changes to Terms</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[90px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">{`iMED Academy reserves the right to update, modify, or revise these Terms & Conditions at any time at its sole discretion. Where permitted by applicable law, continued use of the website or services after such updates constitutes your acceptance of the revised terms. Users are encouraged to review these Terms periodically to stay informed of any changes.`}</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Governing Law and Dispute Resolution</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[90px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">{`These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.`}</p>
        <p className="leading-[30px]">Any disputes arising out of or in connection with these Terms, including their interpretation or enforcement, shall be resolved through arbitration in accordance with applicable laws. Subject to arbitration, the courts located in [Your City, India] shall have exclusive jurisdiction over such matters.</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Grievance Redressal</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">For any concerns, complaints, or queries related to the website or these Terms, users may contact the designated Grievance Officer at the details provided below:</p>
        <p className="leading-[30px] mb-0">
          Name: [Grievance Officer Name]
          <br aria-hidden="true" />
          Email: support@imedacademy.com
        </p>
        <p className="leading-[30px] mb-0">iMED Academy will make reasonable efforts to address and resolve grievances in a timely and efficient manner.</p>
        <p className="leading-[30px]">For additional details, users may also refer to the Privacy Policy available on the website.</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Termination</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">Users may discontinue use of the website or services at any time. iMED Academy reserves the right to suspend or terminate access to the website or services at its discretion, particularly in cases of violation of these Terms.</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Survival</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">Certain provisions of these Terms, including but not limited to those relating to indemnity, limitation of liability, disclaimers, and intellectual property, shall survive termination and continue to remain in effect.</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Severability</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">If any provision of these Terms is found to be invalid, unlawful, or unenforceable under applicable law, such provision shall be deemed severable and shall not affect the validity or enforceability of the remaining provisions.</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Indemnity and Limitation of Liability</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[480px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">To the maximum extent permitted under applicable law, iMED Academy, along with its affiliates, partners, and associated entities, shall not be held liable for any loss, damage, or inconvenience arising directly or indirectly from:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Your access to, use of, or inability to use the website or services;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Any information, content, or materials available on the website;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Any interruptions, delays, errors, or failures in the operation or transmission of data through the platform.`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Under no circumstances shall iMED Academy or its affiliates be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, revenue, data, or business opportunities, arising out of or in connection with the use of the website or services, even if advised of the possibility of such damages.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">In any event, the total liability of iMED Academy, if any, shall not exceed the amount paid by the user, if applicable, for accessing the specific service or program giving rise to the claim.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You agree to indemnify, defend, and hold harmless iMED Academy, its parent entity (if any), affiliates, partners, officers, directors, employees, and representatives from and against any claims, demands, losses, damages, liabilities, costs, or expenses (including reasonable legal fees) arising out of or related to:</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Your use or misuse of the website or services;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Your violation of these Terms & Conditions;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Your infringement of any third-party rights, including intellectual property or privacy rights.`}</span>
          </li>
        </ul>
      </div>
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-center left-1/2 -translate-x-1/2 not-italic top-[170px] w-full max-w-[1384px] px-4">
      <Frame8 />
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-1/2 -translate-x-1/2 top-[170px]" data-name="Content">
      <Frame1 />
    </div>
  );
}

function WeAreExpertsInBuildingDreams() {
  return (
    <div className="absolute contents left-1/2 -translate-x-1/2 top-[170px]" data-name="We Are Experts in Building Dreams">
      <Content />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <div className="col-1 h-[19px] ml-0 mt-0 relative row-1 w-[15px]" data-name="image 1712">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[131.58%] left-[-33.33%] max-w-none top-[-15.79%] w-[166.67%]" src={imgImage1712} />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 font-['Inter:Bold',sans-serif] font-bold h-[14px] ml-[19.68px] mt-[4.3px] not-italic relative row-1 text-[#333] text-[22.992px] text-center w-[170px]">
        <span className="leading-[11.036px]">{`iMED `}</span>
        <span className="leading-[11.036px] text-[#25a88d]">Academy</span>
      </p>
      <Group />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[56px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap">Program</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[79px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[39.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap">Online</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[66px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[33.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap">Institution</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[109px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[54.5px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap">About</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[62px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[31px] not-italic text-[#333] text-[16px] text-center top-0 whitespace-nowrap">Contact</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0">
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#25a88d] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[140px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Apply Now `}</p>
    </div>
  );
}

function NavBar() {
  return (
    <div className="fixed z-[200] bg-white content-stretch flex gap-[242px] min-h-[66px] items-center justify-center left-0 overflow-visible px-[38px] py-[15px] shadow-[0px_4px_4px_0px_rgba(40,53,147,0.15)] top-0 w-full" data-name="Nav Bar">
      <Group1 />
      <Frame7 />
      <Button />
    </div>
  );
}

export default function TermsAndConditions() {
  const designWidth = 1440;
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);

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
      data-name="Terms and Conditions"
      style={{ height: scaledHeight ? `${scaledHeight}px` : "100vh" }}
    >
      <div
        ref={pageRef}
        className="origin-top-left"
        style={{ transform: `scale(${pageScale})`, width: `${designWidth}px` }}
      >
        <div className="bg-white relative size-full">
          <EpBack />
          <Frame />
          <WeAreExpertsInBuildingDreams />
        </div>
      </div>
    </div>
  );
}
