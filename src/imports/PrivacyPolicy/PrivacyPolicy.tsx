import { useLayoutEffect, useRef, useState } from "react";
import svgPaths from "./svg-csb04couvb";
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
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#25a88d] text-[20px] whitespace-nowrap">Privacy Policy</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Privacy Policy</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[330px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">iMED Academy (hereinafter referred to as “we”, “our”, or “us”, and includes our affiliates, if any) recognizes the importance of maintaining the privacy and security of the personal information shared by users accessing our website, platforms, and applications (collectively referred to as the “Platform”). This Privacy Policy explains how we collect, use, store, process, and protect your information when you interact with our services.</p>
        <p className="leading-[30px] mb-0">This Privacy Policy is prepared in accordance with the applicable laws of India, including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. It outlines the types of personal information we may collect, the purposes for which such information is used, and the measures taken to safeguard it.</p>
        <p className="leading-[30px] mb-0">By accessing or using our Platform, or by submitting your personal information, you consent to the collection, storage, processing, and use of your information in accordance with this Privacy Policy. If you do not agree with any part of this policy, you are advised not to use our services or provide your personal information.</p>
        <p className="leading-[30px] mb-0">Any information shared with iMED Academy, or collected by us through your use of the Platform, will be handled in accordance with this Privacy Policy. Continued use of the Platform will be deemed as your acceptance of the terms outlined herein.</p>
        <p className="leading-[30px]">{`This Privacy Policy should be read together with the Terms & Conditions governing the use of our Platform.`}</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[544px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Your Consent</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[480px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Acceptance of this Privacy Policy is a prerequisite for accessing and using the iMED Academy platform and its services. This Privacy Policy applies to all individuals and entities interacting with our Platform. By providing your consent, you are permitted to:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Access and use the Platform;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Register for courses or programs in accordance with the Terms & Conditions;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Submit your personal information for enquiries, registrations, or other purposes;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Utilize the various features and services offered by iMED Academy.`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">If you choose to register on the Platform, iMED Academy may send you routine communications, including administrative updates, service-related notifications, and important announcements via email, SMS, in-app notifications, or other available communication channels. By using our services, you agree to receive such communications, including phone calls where necessary.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You also consent to receiving periodic promotional and informational communications from iMED Academy through email, SMS, WhatsApp, or other communication methods, based on your interests and interactions with our services. You may opt out of receiving such promotional messages at any time by using the unsubscribe option provided in the communication or by contacting us directly.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You are responsible for ensuring that all information provided during registration or use of the Platform is accurate, complete, and up to date. iMED Academy shall not be held responsible for any issues arising due to incorrect or outdated information provided by you.</p>
        <p className="leading-[30px] whitespace-pre-wrap">At any time, you may request access to, correction of, or deletion of your personal information by contacting us at our official support email. You may also withdraw your consent for the use of your personal data; however, this may limit or discontinue your access to certain services offered by iMED Academy.</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Usage and Technical Information</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[270px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">When you access or use the iMED Academy platform, we may automatically collect certain technical details about your device and usage, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` IP address`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Device type, model, and operating system`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Browser type, version, and configuration`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Time zone settings`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Approximate geographic location`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Unique device identifiers`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Pages visited, navigation paths, and timestamps of access`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">This information helps us understand how users interact with our platform and enables us to improve performance, usability, and security.</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Automatic Data Collection</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[180px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">While you use our website or application, certain technical data may be collected automatically through standard internet protocols and tracking technologies. This may include:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Details about your system and internet connection`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Browser plug-ins and configurations`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Access times and session duration`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">Such data is collected to ensure smooth functionality, diagnose technical issues, and enhance overall user experience.</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Usage Analytics</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[180px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may gather insights about how you interact with our platform, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Pages viewed and time spent on each page`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Referring URLs (how you arrived at our website)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Clickstream data and navigation behavior`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Errors encountered, including download or page load issues`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">This information is used to analyze trends, understand user preferences, and optimize our services.</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Credit-Related Information</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">Where applicable, iMED Academy may receive or process limited credit-related or financial assessment information from third-party partners such as financial institutions or service providers. This is typically used to evaluate eligibility for financing options or payment plans, in compliance with applicable laws.</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Marketing and Communications Information</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[210px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may collect and maintain records related to your interaction with our communications and marketing efforts, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Communication with customer support`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Responses to surveys, feedback forms, or campaigns`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Preferences regarding promotional communications`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Data collected through cookies or similar tracking technologies`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Records of your consent to receive or opt out of marketing messages`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">This information helps us personalize communication, improve engagement, and ensure relevant information is shared with you.</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Information in Your Device(s)</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[570px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">iMED Academy may, with your permission and in compliance with applicable laws, access certain information stored on your device to enable and enhance the delivery of our services. This may include location data and other device-related information necessary for platform functionality.</p>
        <p className="leading-[30px] mb-0">We may also collect and process non-personal, anonymized, or aggregated data (such as statistical or demographic information) for analytical purposes, service improvement, and business insights, in accordance with this Privacy Policy.</p>
        <p className="leading-[30px] mb-0">iMED Academy may maintain records of communications, including telephone calls, for purposes such as quality assurance, training, service improvement, and handling user enquiries or support requests.</p>
        <p className="leading-[30px] mb-0">Information that is publicly available or obtained from lawful public sources will not be treated as personal information under this Privacy Policy.</p>
        <p className="leading-[30px] mb-0">We do not knowingly collect personal information from minors. If any personal information is provided by individuals below the applicable age threshold, it is assumed that such information has been shared with the consent of a parent or legal guardian.</p>
        <p className="leading-[30px] mb-0">In certain cases, iMED Academy may collect Sensitive Personal Information where required to provide specific services, such as payment processing or verification. Such information will be handled with appropriate safeguards and in compliance with applicable legal requirements.</p>
        <p className="leading-[30px] mb-0">iMED Academy may also request additional optional information to personalize your experience and improve service delivery. Any such information voluntarily provided by you will be processed in accordance with this Privacy Policy.</p>
        <p className="leading-[30px] mb-0">Users are responsible for ensuring that the information they provide is accurate and up to date. iMED Academy shall not be liable for any issues arising due to incorrect, incomplete, or outdated information. We reserve the right to suspend or restrict access to services if any information provided is found to be false or misleading.</p>
        <p className="leading-[30px]">We implement reasonable security practices and safeguards to protect your information from unauthorized access, misuse, or disclosure. However, due to the inherent nature of internet-based systems, complete security cannot be guaranteed. iMED Academy will continue to take appropriate measures to protect your data in line with industry standards.</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">How Do We Collect Your Personal Information?</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">The manner in which iMED Academy collects Personal Information (including Sensitive Personal Information, where applicable) depends on how you interact with our Platform, services, and communication channels.</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Information Collected Directly from You</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[390px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may collect information directly from you through various interactions on our website, application, or through offline and partner channels. This may occur when you:</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Provide your contact details to enquire about courses, services, or offerings;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Register for a program or create an account on our Platform;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Verify your identity through OTP, email verification, or other authentication methods;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Fill out forms, applications, or submit information during course enrollment or onboarding;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Make payments or provide financial details required to complete a transaction;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Contact us for support, raise queries, or submit complaints;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Apply for programs through third-party platforms such as partner websites, institutions, or affiliates;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Submit required details on checkout or payment pages to complete enrollment;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Participate in surveys, promotional campaigns, or marketing activities;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Opt in to receive communications, updates, or promotional materials;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Access, browse, or use our Platform and services.`}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Collection from Third Parties, Business Partners, or Public Sources</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[210px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy may receive and process Personal Information (including Sensitive Personal Information, where applicable) from third-party sources such as:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Educational institutions and training partners`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Marketing and lead generation platforms`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Payment service providers and financial partners`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Service providers assisting in operations`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Publicly available sources, where permitted by law`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">All such information is collected and handled in compliance with applicable laws and this Privacy Policy.</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Use of Personal Information</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[570px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy collects and processes Personal Information only to the extent necessary for providing services, fulfilling legal obligations, and improving user experience. Your information may be used for the following purposes:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To register and manage your account on the Platform;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To process course enrollments, applications, and service requests;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To deliver and improve our services and platform functionality;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To personalize your experience and provide relevant content;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To communicate important updates, notifications, and service-related information;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To send promotional offers, marketing communications, and program updates (subject to your preferences);`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To conduct internal research, analytics, and performance monitoring;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To ensure platform security, prevent fraud, and enforce our Terms & Conditions;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To provide customer support and resolve user queries or complaints;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To track user activity, preferences, and engagement for service enhancement;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To follow up on enquiries, campus visits, or program participation;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To comply with applicable legal, regulatory, and contractual obligations;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To support legitimate business interests, where permitted by law;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To use anonymized or aggregated data for statistical analysis and business insights;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To share non-identifiable data with partners for research and improvement purposes;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` To act based on your explicit consent for specific purposes.`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">All usage of Personal Information is carried out in accordance with applicable data protection laws and is limited to legitimate and necessary purposes.</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">How Long Will Personal Information Be Retained</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[30px] relative shrink-0 text-[#4a5565] text-[18px] w-full">iMED Academy retains Personal Information (including Sensitive Personal Information, where applicable) only for as long as necessary to fulfill the purposes for which it was collected, or as required under applicable laws in India.</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Security Policy</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[510px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy is committed to protecting your Personal Information and implements reasonable security measures to safeguard it against unauthorized access, misuse, alteration, disclosure, or destruction.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We adopt industry-standard security practices and procedures, including administrative, technical, and physical safeguards, to ensure that your information is handled securely. These measures may include:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Secure servers and controlled access environments`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Encryption protocols such as SSL (Secure Socket Layer)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Firewalls and network security systems`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Access controls and authentication mechanisms`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Your Personal Information may be stored and processed on secure cloud infrastructure operated by trusted service providers, which may be located within or outside India, in compliance with applicable laws.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">While we take reasonable steps to protect your information, it is important to understand that no method of data transmission over the internet or electronic storage is completely secure. Despite our best efforts, we cannot guarantee absolute security of your data.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Users are also responsible for maintaining the confidentiality of their account credentials and for taking necessary precautions, such as using strong passwords and securing their devices.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy shall not be held liable for any unauthorized access, disclosure, or loss of information caused by factors beyond our reasonable control, including but not limited to cyberattacks, system vulnerabilities, or internet transmission risks.</p>
        <p className="leading-[30px] whitespace-pre-wrap">We continuously review and update our security practices to align with industry standards and applicable legal requirements.</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">User Responsibilities</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[120px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">Users are expected to access and use the iMED Academy platform responsibly and in compliance with applicable laws and these policies.</p>
        <p className="leading-[30px]">Any unauthorized attempt to access restricted areas of the platform, systems, or APIs without proper authorization will be considered a violation of these Terms and Privacy Policy. iMED Academy reserves the right to take appropriate action, including suspension of access and legal proceedings, against any individual or entity found engaging in such activities.</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Third-Party Links</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[210px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">The iMED Academy platform may contain links to third-party websites, applications, or services (“Third-Party Links”) that are operated independently and are not controlled or managed by iMED Academy.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">By accessing such third-party links, you acknowledge and agree that:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` iMED Academy does not have control over the content, policies, or practices of such third-party platforms;`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` We are not responsible for the collection, use, storage, or disclosure of your information by such third parties;`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Any information you provide to third-party platforms will be governed by their respective privacy policies and terms of use.`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">Users are encouraged to review the privacy policies of any third-party services before sharing personal information.</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Cookies</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[510px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy uses cookies and similar tracking technologies to enhance user experience, analyze platform usage, and improve our services.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Cookies are small data files stored on your device that help us understand user behavior and preferences. Through cookies and related technologies, we may collect information such as:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Pages visited and time spent on the platform`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Search queries and interactions with content`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Device and browser information`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` IP address and approximate location`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Customer support interactions`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We use cookies for purposes including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Ensuring proper functioning of the platform`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Improving performance and user experience`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Analyzing usage patterns and trends`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Supporting marketing and advertising efforts`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Some cookies may be placed by authorized third-party service providers to assist with analytics and advertising. These third parties may collect information about your interactions with our platform in accordance with their own privacy policies.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy does not store sensitive personal information directly within cookies.</p>
        <p className="leading-[30px] whitespace-pre-wrap">You can manage or disable cookies through your browser settings. However, disabling cookies may affect certain functionalities of the platform.</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Marketing and Communications</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[330px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">iMED Academy and its partners may send you communications related to courses, services, offers, or updates through various channels such as email, SMS, WhatsApp, phone calls, or digital platforms, based on the information you have provided and your interaction with our services.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">These communications may include:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Information about new programs, features, or services`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Promotional offers and campaigns`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Surveys, feedback requests, and engagement activities`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may also use your preferences and interaction data to personalize marketing content and improve communication relevance.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">You have the option to opt out of receiving promotional communications at any time by:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Clicking on the unsubscribe link provided in communications; or`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Contacting us through our official support channels`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">Please note that even if you opt out of marketing communications, you may still receive essential service-related or transactional communications.</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Amendment of Privacy Policy</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[150px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">iMED Academy reserves the right to update or modify this Privacy Policy at any time, without prior notice, to reflect changes in legal, regulatory, or operational requirements.</p>
        <p className="leading-[30px] mb-0">Users are encouraged to review this page periodically to stay informed of any updates. Continued use of the platform after changes are made will be considered as acceptance of the revised Privacy Policy.</p>
        <p className="leading-[30px]">If you do not agree with any updates, you may discontinue use of the platform or request withdrawal of your personal data, subject to applicable laws.</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Governing Law and Jurisdiction</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[120px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">This Privacy Policy shall be governed by and interpreted in accordance with the laws of India.</p>
        <p className="leading-[30px] mb-0">Any disputes arising out of or in connection with this Privacy Policy shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration proceedings shall be conducted in English, and the seat of arbitration shall be [Your City, India].</p>
        <p className="leading-[30px]">Subject to arbitration, the courts located in [Your City, India] shall have exclusive jurisdiction over such disputes.</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Minor’s Privacy</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[90px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">iMED Academy’s services are not intended for individuals under the age of 18 years (“Minors”). We do not knowingly collect Personal Information from Minors.</p>
        <p className="leading-[30px]">If you are a parent or legal guardian and become aware that a Minor has provided us with Personal Information without appropriate consent, please contact us immediately. Upon verification, we will take necessary steps to delete such information from our records in accordance with applicable laws.</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Grievance Officer</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[180px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0">If you have any complaints, concerns, or grievances regarding the processing of your Personal Information or this Privacy Policy, you may contact our designated Grievance Officer using the details below:</p>
        <p className="leading-[30px] mb-0">
          Name: [Grievance Officer Name]
          <br aria-hidden="true" />
          Email: support@imedacademy.com
          <br aria-hidden="true" />
          Designation: Grievance Officer
        </p>
        <p className="leading-[30px]">iMED Academy will make reasonable efforts to acknowledge and resolve grievances in a timely manner, in compliance with applicable legal requirements.</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Disclosure of Personal Information</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[1380px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">In the course of providing our services, iMED Academy may share or transfer your Personal Information (including Sensitive Personal Information, where applicable) with third parties for legitimate business purposes, as outlined in this Privacy Policy and in compliance with applicable laws.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">1. Service Providers</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Third-party vendors and service providers who support our operations, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Marketing and advertising partners`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` IT infrastructure and cloud service providers`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Customer support and communication platforms`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Payment processing partners`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">These entities are authorized to use your information only as necessary to provide services on our behalf.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">2. Affiliates and Group Entities</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Our affiliated entities or partners may access your information for purposes consistent with this Privacy Policy and to support service delivery.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">3. Employees and Authorized Personnel</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Your information may be accessed by employees, consultants, or representatives of iMED Academy on a need-to-know basis and subject to confidentiality obligations.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">4. Legal and Regulatory Authorities</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may disclose your information to government authorities, regulators, or law enforcement agencies when required:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` To comply with applicable laws, regulations, or legal processes`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` In response to lawful requests or orders`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` For investigation or prevention of fraud, cyber incidents, or illegal activities`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` To protect the rights, property, or safety of iMED Academy, its users, or others`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">5. Advertising and Analytics Partners</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may share limited information with third-party advertising networks, analytics providers, and technology platforms to:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Deliver relevant advertisements`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Measure campaign performance`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Improve marketing effectiveness`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">6. Business Transfers</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">In the event of a merger, acquisition, restructuring, or sale of assets, your information may be transferred as part of the business transaction. We will ensure that such parties adhere to appropriate data protection standards.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">7. Promotional Activities</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">With your consent, we may use and share certain information such as your name, testimonials, achievements, or course participation details for promotional purposes across digital platforms, social media, or marketing campaigns.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">8. Protection of Rights</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may disclose information where necessary to:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Enforce our Terms & Conditions`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Detect, prevent, or address security or technical issues`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Take action against misuse of our platform`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">9. Payment Processing</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">For transactions, your payment information may be shared with secure third-party payment gateways. These providers process payments in compliance with industry security standards and applicable regulations.</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">10. Financial and Loan Partners</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">If you opt for financing or loan services, your relevant information may be shared with financial institutions or partners to:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Assess eligibility`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Process loan applications`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Facilitate approvals and disbursements`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">All disclosures are made strictly for legitimate purposes and in accordance with applicable data protection laws. iMED Academy does not sell your personal information to third parties.</p>
      </div>
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[1114px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Categories of Personal Information</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[1050px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] mb-0 text-[#25a88d] whitespace-pre-wrap">1. Identity and Account Information</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may collect basic personal details required to identify and manage your account, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Full name`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Age and date of birth`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Gender (if voluntarily provided)`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` User ID or registration details`}</span>
          </li>
        </ul>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] mb-0 text-[#25a88d] whitespace-pre-wrap">2. Contact Information</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">To communicate with you and provide our services, we may collect:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Mobile or telephone number`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Email address`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Residential address (current and permanent)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` City, state, country, and postal code`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Billing address (if applicable)`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Parent or guardian details (where required)`}</span>
          </li>
        </ul>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] mb-0 text-[#25a88d] whitespace-pre-wrap">3. Financial Information</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">For processing payments and related services, we may collect:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Bank account details (where applicable)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Payment method information such as UPI ID, net banking, or other digital payment identifiers`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Limited card-related details (processed securely via payment gateways)`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Note: iMED Academy does not store complete card details and relies on secure third-party payment providers.</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] mb-0 text-[#25a88d] whitespace-pre-wrap">4. Identification and Sensitive Personal Information</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Where required for verification or compliance purposes, we may collect:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Identity proof documents (such as Aadhaar, PAN, or other government-issued IDs)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Address proof documents`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Photographs (if required for enrollment or certification)`}</span>
          </li>
          <li className="leading-[30px] ms-[27px]">
            {` Any other identifiers such as device ID, cookies, or similar tracking technologie`}
            <span className="font-['Inter:Bold',sans-serif] font-bold not-italic text-[#25a88d]">s</span>
          </li>
        </ul>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] mb-0 text-[#25a88d] whitespace-pre-wrap">5. Payment and Transaction Information</p>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">We may maintain records of transactions carried out through our platform, including:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Payment reference or transaction ID`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Mode of payment and payment provider details`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Date, time, and amount of transaction`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Payment status (successful, failed, pending)`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Any additional information shared by payment partners or service providers`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">All information collected is used strictly for legitimate business purposes such as providing services, processing enrollments, improving user experience, ensuring security, and complying with applicable laws.</p>
      </div>
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[934px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[50px] leading-[50px] relative shrink-0 text-[#25a88d] text-[25px] tracking-[1px] w-full">Personal Information and Types of Personal Information We Collect</p>
      <div className="font-['Inter:Medium',sans-serif] font-medium h-[870px] leading-[0] relative shrink-0 text-[#4a5565] text-[18px] w-full">
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">Personal Information</span>
          <span className="leading-[30px]">{` - refers to any information that relates to an individual and can directly or indirectly identify that individual, either on its own or when combined with other information available to iMED Academy, in accordance with applicabl`}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">e laws.</span>
        </p>
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">Sensitive Personal Information</span>
          <span className="leading-[30px]">{` - includes personal data that requires a higher level of protection under applicable laws. This may include, but is not limited to:`}</span>
        </p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Financial information such as bank account details, payment card details, or billing information`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Account credentials such as passwords`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Biometric data (if collected)`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Health-related or medical information (if voluntarily provided)`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Any other data classified as sensitive under applicable regulations`}</span>
          </li>
        </ul>
        <p className="leading-[30px] mb-0 whitespace-pre-wrap">Information that is freely available in the public domain or accessible through lawful means shall not be considered Sensitive Personal Information.</p>
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">{`Information We May Collect - `}</span>
          <span className="leading-[30px]">Depending on your interaction with iMED Academy (such as website browsing, enquiry submission, course registration, or communication with us), we may collect and process the following categories of information:</span>
        </p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">Identity Information: Name, age, gender (if provided)</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">Contact Information: Mobile number, email address, location</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">Educational Information: Academic background, course preferences</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">Technical Information: IP address, browser type, device details, usage data</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">Communication Data: Messages, enquiries, feedback, or responses shared with us</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">Transaction Information: Payment details and billing information (where applicable)</span>
          </li>
        </ul>
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">{`How We Collect Information - `}</span>
          <span className="leading-[30px]">We may collect your information through various channels, including:</span>
        </p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Directly from you when you fill forms, register, or contact us`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Automatically through your use of the website (cookies, analytics tools, etc.)`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Through third-party platforms such as advertising partners or lead generation services`}</span>
          </li>
        </ul>
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic">{`Processing of Information - `}</span>
          <span className="leading-[30px]">iMED Academy may collect, store, use, analyze, share, or otherwise process your Personal Information (including Sensitive Personal Information, where applicable) for purposes such as:</span>
        </p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Providing and improving our services`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Managing course registrations and user accounts`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Communicating updates, offers, and important information`}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[30px]">{` Ensuring security and preventing fraud`}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[30px]">{` Complying with legal and regulatory requirements`}</span>
          </li>
        </ul>
        <p className="leading-[30px] whitespace-pre-wrap">Further details on specific categories of data collected and their usage may be provided in additional sections of this Privacy Policy.</p>
      </div>
      <Frame11 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-center left-1/2 -translate-x-1/2 not-italic top-[170px] w-full max-w-[1384px] px-4">
      <Frame8 />
      <Frame9 />
      <Frame10 />
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

export default function PrivacyPolicy() {
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
      data-name="Privacy Policy"
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
