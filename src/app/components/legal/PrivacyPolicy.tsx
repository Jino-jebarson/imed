import React from "react";

const sections = [
  {
    title: "Privacy Policy",
    body: [
      "iMED Academy (\"we\", \"our\", \"us\") recognizes the importance of maintaining the privacy and security of personal information shared by users accessing our website and platforms.",
      "This Privacy Policy explains how we collect, use, store, process, and protect information when you interact with our services.",
      "By accessing or using our platform, or by submitting personal information, you consent to handling of your information in accordance with this policy."
    ]
  },
  {
    title: "Your Consent",
    body: [
      "Acceptance of this Privacy Policy is required to access and use iMED Academy services.",
      "By using the platform, you agree to receive administrative and service communications.",
      "You may request access, correction, or deletion of your personal data by contacting support."
    ]
  },
  {
    title: "Categories of Information",
    body: [
      "Identity and account information.",
      "Contact information such as mobile number and email.",
      "Educational, technical, communication, and transaction information where applicable."
    ]
  },
  {
    title: "How Information Is Used",
    body: [
      "To provide and improve services.",
      "To manage registrations and support.",
      "To ensure security, prevent misuse, and comply with legal obligations."
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-5xl text-[#334155]">
        <h1 className="text-3xl font-semibold text-[#25a88d] sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 leading-7">
          Source adapted from your local file: E:\\privacypolicy\\src\\imports\\PrivacyPolicy-1\\PrivacyPolicy.tsx
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
