import { Suspense, lazy, useEffect, useState } from "react";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const loadHomePage = () => import("../imports/HomePage/HomePage");
const loadCareersPage = () => import("../imports/CareersModal/CareersPage");
const loadEmergencyMedicalTechnician = () => import("../imports/EmergencyMedicalTechnician/EmergencyMedicalTechnician");
const loadHospitalAdministration = () => import("../imports/HospitalAdministration/HospitalAdministration");
const loadGeneralDutyAssistance = () => import("../imports/GeneralDutyAssistance/GeneralDutyAssistance");
const loadGeriatricCareAssistance = () => import("../imports/GeriatricCareAssistance/GeriatricCareAssistance");
const loadAcha = () => import("../imports/Acha/Acha.tsx");
const loadOcha = () => import("../imports/Ocha/Ocha");
const loadSkillbridge = () => import("../imports/Skillbrige/Skillbrige.jsx");
const loadPrivacyPolicy = () => import("../imports/PrivacyPolicy/PrivacyPolicy");
const loadTermsAndConditions = () => import("../imports/TermsAndConditions/TermsAndConditions");

const HomePage = lazy(loadHomePage);
const CareersPage = lazy(loadCareersPage);
const EmergencyMedicalTechnician = lazy(loadEmergencyMedicalTechnician);
const HospitalAdministration = lazy(loadHospitalAdministration);
const GeneralDutyAssistance = lazy(loadGeneralDutyAssistance);
const GeriatricCareAssistance = lazy(loadGeriatricCareAssistance);
const Acha = lazy(loadAcha);
const Ocha = lazy(loadOcha);
const Skillbridge = lazy(loadSkillbridge);
const PrivacyPolicy = lazy(loadPrivacyPolicy);
const TermsAndConditions = lazy(loadTermsAndConditions);

const preloadByHash: Record<string, () => Promise<unknown>> = {
  "#emt": loadEmergencyMedicalTechnician,
  "#ha": loadHospitalAdministration,
  "#gda": loadGeneralDutyAssistance,
  "#gca": loadGeriatricCareAssistance,
  "#acha": loadAcha,
  "#ocha": loadOcha,
  "#skillbridge": loadSkillbridge,
  "#careers": loadCareersPage,
  "#privacy-policy": loadPrivacyPolicy,
  "#terms-and-conditions": loadTermsAndConditions,
  "": loadHomePage,
};

type SeoConfig = {
  title: string;
  description: string;
  path: string;
};

const SEO_BY_HASH: Record<string, SeoConfig> = {
  "": {
    title: "iMED Academy | Healthcare Career Training",
    description:
      "iMED Academy offers EMT, GDA, and Hospital Administration training with practical learning and placement support.",
    path: "/",
  },
  "#emt": {
    title: "EMT Course | iMED Academy",
    description:
      "Join iMED Academy's Emergency Medical Technician program and build a healthcare career with practical training.",
    path: "/#emt",
  },
  "#gda": {
    title: "GDA Course | iMED Academy",
    description:
      "Start your General Duty Assistant journey with job-focused healthcare training at iMED Academy.",
    path: "/#gda",
  },
  "#ha": {
    title: "Hospital Administration Course | iMED Academy",
    description:
      "Learn Hospital Administration with structured modules, practical exposure, and career guidance from iMED Academy.",
    path: "/#ha",
  },
  "#privacy-policy": {
    title: "Privacy Policy | iMED Academy",
    description: "Read iMED Academy's Privacy Policy to understand how we collect, use, and protect user information.",
    path: "/#privacy-policy",
  },
  "#terms-and-conditions": {
    title: "Terms and Conditions | iMED Academy",
    description: "Review iMED Academy Terms and Conditions for website and service usage guidelines.",
    path: "/#terms-and-conditions",
  },
  "#gca": {
    title: "GCA Course | iMED Academy",
    description:
      "Join iMED Academy's Geriatric Care Assistance program and build a career in elderly care support.",
    path: "/#gca",
  },
  "#acha": {
    title: "ACHA Program | iMED Academy",
    description: "Explore iMED Academy's Advance Certification in Hospital Administration (ACHA) program.",
    path: "/#acha",
  },
  "#ocha": {
    title: "OCHA Program | iMED Academy",
    description: "Explore iMED Academy's Online Certificate in Hospital Administration (OCHA) program.",
    path: "/#ocha",
  },
  "#careers": {
    title: "Careers | iMED Academy",
    description: "Apply for careers at iMED Academy and share your details with our team.",
    path: "/#careers",
  },
  "#skillbridge": {
    title: "SkillBridge | iMED Academy",
    description: "Explore SkillBridge by iMED Academy.",
    path: "/#skillbridge",
  },
};

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let tag = document.head.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  const preloadRoute = (routeHash: string) => {
    const preload = preloadByHash[routeHash];
    if (preload) {
      void preload();
    }
  };

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const fallback = SEO_BY_HASH[""];
    const seo = SEO_BY_HASH[hash] || fallback;
    const canonical = `${window.location.origin}${seo.path}`;

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertCanonical(canonical);
  }, [hash]);

  useEffect(() => {
    // Warm up likely route chunks to avoid white flashes on first route switch.
    const warm = () => {
      preloadRoute("#emt");
      preloadRoute("#ha");
      preloadRoute("#gda");
      preloadRoute("#gca");
      preloadRoute("#acha");
    };

    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(warm);
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    }

    const timer = window.setTimeout(warm, 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const normalizeLabel = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();
    const applyLabels = new Set(["apply now", "talk to expert", "talk to experts"]);
    const legalRoutes: Record<string, string> = {
      "privacy policy": "#privacy-policy",
      "terms of use": "#terms-and-conditions",
      "terms and conditions": "#terms-and-conditions",
      ocha: "#ocha",
      skillbridge: "#skillbridge",
    };
    const navToId: Record<string, string> = {
      about: "why-imed",
      "about us": "why-imed",
      contact: "contact-us",
      "contact us": "contact-us",
      partners: "trusted-partners",
      "our partners": "trusted-partners",
      "hospital partners": "trusted-partners",
      program: "career-path",
      programs: "career-path",
      online: "imed-online",
      "online programs": "imed-online",
    };
    const footerRoutes: Record<string, string> = {
      "about us": "about-imed",
      "hospital partners": "trusted-partners",
    };

    const scrollToHomeContact = () => {
      const target =
        document.getElementById("contact-us") ||
        (document.querySelector("[data-name='Contact']") as HTMLElement | null);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId) || (document.querySelector(`[data-nav="${sectionId}"]`) as HTMLElement | null);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const explicitTarget = target.closest("[data-nav-target]") as HTMLElement | null;
      if (explicitTarget) {
        const sectionId = explicitTarget.dataset.navTarget;
        if (sectionId) {
          event.preventDefault();
          if (sectionId === "home") {
            preloadRoute("");
            if (window.location.hash !== "") {
              window.location.hash = "";
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          scrollToSection(sectionId);
          return;
        }
      }

      const clickable = target.closest("button, a, [role='button'], [data-name='Button'], [data-name='button'], p, span, div");
      if (!clickable) return;

      const label = normalizeLabel(clickable.textContent || "");

      const legalRoute = legalRoutes[label];
      if (legalRoute) {
        event.preventDefault();
        preloadRoute(legalRoute);
        window.location.hash = legalRoute;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const navRoot = target.closest("[data-name='Nav Bar']");
      if (navRoot) {
        const sectionId = navToId[label];
        if (!sectionId) return;
        event.preventDefault();
        scrollToSection(sectionId);
        return;
      }

      if (applyLabels.has(label)) {
        event.preventDefault();
        preloadRoute("");
        if (window.location.hash !== "") {
          window.location.hash = "";
          setTimeout(scrollToHomeContact, 120);
          return;
        }
        scrollToHomeContact();
        return;
      }

      const sectionId = footerRoutes[label];
      if (!sectionId) return;

      event.preventDefault();

      if (window.location.hash !== "") {
        preloadRoute("");
        window.location.hash = "";
        setTimeout(() => scrollToSection(sectionId), 120);
        return;
      }

      scrollToSection(sectionId);
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const openCareers = () => {
    preloadRoute("#careers");
    window.location.hash = "#careers";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let page = <HomePage onOpenCareers={openCareers} />;
  if (hash === "#emt") {
    page = <EmergencyMedicalTechnician />;
  } else if (hash === "#ha") {
    page = <HospitalAdministration />;
  } else if (hash === "#gda") {
    page = <GeneralDutyAssistance />;
  } else if (hash === "#gca") {
    page = <GeriatricCareAssistance />;
  } else if (hash === "#acha") {
    page = <Acha />;
  } else if (hash === "#ocha") {
    page = <Ocha />;
  } else if (hash === "#careers") {
    page = <CareersPage />;
  } else if (hash === "#skillbridge") {
    page = <Skillbridge />;
  } else if (hash === "#privacy-policy") {
    page = <PrivacyPolicy />;
  } else if (hash === "#terms-and-conditions") {
    page = <TermsAndConditions />;
  }

  return (
    <>
      <style>{`button:not(:disabled), [role='button'], [data-name='Button'], [data-name='button']{cursor:pointer;}`}</style>
      <Suspense fallback={<div className="min-h-screen w-full bg-[#f4f7ff]" />}>{page}</Suspense>
      <FloatingWhatsApp />
    </>
  );
}
