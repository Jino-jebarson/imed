import React from "react";

const sections = [
  {
    title: "Introduction",
    body: [
      "These Terms and Conditions govern your access to and use of iMED Academy website and services.",
      "By using the website, you acknowledge that you have read, understood, and agree to be bound by these terms.",
      "If you do not agree, you must not use the website or related services."
    ]
  },
  {
    title: "General Terms",
    body: [
      "You must use the platform lawfully and not misuse content or systems.",
      "Website content is protected by intellectual property laws.",
      "Unauthorized copying, reverse engineering, or harmful activity is prohibited."
    ]
  },
  {
    title: "Registration and Communication",
    body: [
      "For some programs, users may provide name, contact number, course preference, and related details.",
      "By submitting details, you consent to communication regarding courses and services.",
      "Users are responsible for accurate and valid information."
    ]
  },
  {
    title: "Disclaimer and Liability",
    body: [
      "Website information may contain updates, omissions, or changes without prior notice.",
      "Services are provided on an \"as is\" and \"as available\" basis.",
      "iMED Academy shall not be liable for indirect or consequential damages to the extent permitted by law."
    ]
  }
];

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-5xl text-[#334155]">
        <h1 className="text-3xl font-semibold text-[#25a88d] sm:text-4xl">Terms and Conditions</h1>
        <p className="mt-4 leading-7">
          Source adapted from your local file: E:\\terms and conditions\\src\\imports\\TermsAndConditions\\TermsAndConditions.tsx
        </p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold text-[#25a88d]">{section.title}</h2>
              <div className="mt-3 space-y-3 leading-7">
                {section.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
