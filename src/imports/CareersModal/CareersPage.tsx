import { useState, type FormEvent } from "react";
import careerBg from "./career-bg.webp";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || "";

export default function CareersPage() {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    interestedRole: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const submitCareer = async (event: FormEvent<HTMLFormElement>) => {
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
      setTimeout(() => {
        window.location.hash = "";
      }, 800);
    } catch {
      setFeedback("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fb] px-[14px] py-[24px] md:px-[28px] md:py-[32px]">
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-[18px] bg-white shadow-[0px_24px_45px_rgba(15,23,43,0.25)]">
        <div className="grid min-h-[909px] grid-cols-1 md:grid-cols-[466px_1fr]">
          <div className="relative overflow-hidden md:rounded-l-[18px]">
            <img loading="lazy" decoding="async" src={careerBg} alt="Careers" className="h-full w-full object-cover" />
            <div className="absolute left-[44px] top-[41px] w-[320px]">
              <div className="mb-[18px] inline-flex h-[60px] w-[60px] items-center justify-center rounded-[12px] bg-[rgba(37,168,141,0.15)] text-[28px] text-[#25a88d]">+</div>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[44px] leading-[56px] text-[#0f172a]">Your Future</p>
              <p className="font-['Inter:Bold',sans-serif] text-[44px] leading-[56px] text-[#25a88d]">Starts Here</p>
              <p className="mt-[14px] max-w-[350px] font-['Inter:Regular',sans-serif] text-[16px] leading-[27px] text-[#333]">Take the next step toward a rewarding career. We're excited to meet you!</p>
              <div className="mt-[16px] h-[4px] w-[48px] rounded-full bg-[#25a88d]" />
            </div>
          </div>

          <div className="px-[22px] py-[24px] md:px-[34px] md:py-[29px]">
            <div className="mb-[28px] flex items-start justify-between">
              <div>
                <p className="font-['Inter:Bold',sans-serif] text-[36px] leading-[54px] text-[#0f172a]">Careers</p>
                <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[22px] text-[#6b7280]">Share your details and we will contact you.</p>
              </div>
              <button type="button" onClick={() => { window.location.hash = ""; }} className="inline-flex h-[53px] w-[53px] items-center justify-center rounded-[10px] bg-[rgba(37,168,141,0.15)] text-[28px] leading-none text-[#25a88d]">&times;</button>
            </div>

            <form onSubmit={submitCareer} className="space-y-[22px]">
              <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-[34px]">
                <label className="block">
                  <span className="mb-[10px] block font-['Inter:Semi_Bold',sans-serif] text-[16px] text-black">Name</span>
                  <input type="text" value={values.name} onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))} placeholder="Enter your name" className="h-[57px] w-full rounded-[10px] border border-[#d1d5dc] px-[16px] text-[16px] outline-none focus:border-[#25a88d]" />
                </label>

                <label className="block">
                  <span className="mb-[10px] block font-['Inter:Semi_Bold',sans-serif] text-[16px] text-black">Mobile No</span>
                  <input type="tel" value={values.mobile} onChange={(e) => setValues((p) => ({ ...p, mobile: e.target.value }))} placeholder="Enter mobile number" className="h-[57px] w-full rounded-[10px] border border-[#d1d5dc] px-[16px] text-[16px] outline-none focus:border-[#25a88d]" />
                </label>
              </div>

              <label className="block">
                <span className="mb-[10px] block font-['Inter:Semi_Bold',sans-serif] text-[16px] text-black">Mail ID</span>
                <input type="email" value={values.email} onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))} placeholder="Enter email address" className="h-[57px] w-full rounded-[10px] border border-[#d1d5dc] px-[16px] text-[16px] outline-none focus:border-[#25a88d]" />
              </label>

              <label className="block">
                <span className="mb-[10px] block font-['Inter:Semi_Bold',sans-serif] text-[16px] text-black">Interested Role</span>
                <input type="text" value={values.interestedRole} onChange={(e) => setValues((p) => ({ ...p, interestedRole: e.target.value }))} placeholder="Enter interested role" className="h-[57px] w-full rounded-[10px] border border-[#d1d5dc] px-[16px] text-[16px] outline-none focus:border-[#25a88d]" />
              </label>

              <label className="block">
                <span className="mb-[10px] block font-['Inter:Semi_Bold',sans-serif] text-[16px] text-black">Resume Upload</span>
                <div className="rounded-[12px] border-2 border-dashed border-[#e5e7eb] p-[18px]">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files?.[0] || null)} className="w-full text-[14px] text-[#4a5565] file:mr-[12px] file:my-[5px] file:h-[36px] file:rounded-[10px] file:border-2 file:border-[#25a88d] file:bg-white file:px-[14px] file:text-[14px] file:font-medium file:text-[#25a88d]" />
                  <p className="mt-[8px] text-center text-[12px] text-[#6b7280]">PDF, DOC, DOCX (Max. 5MB)</p>
                </div>
              </label>

              {feedback ? <p className="text-[13px] text-[#1f3471]">{feedback}</p> : null}

              <div className="flex flex-col-reverse gap-[12px] pt-[6px] sm:flex-row sm:justify-end">
                <button type="button" onClick={() => { window.location.hash = ""; }} className="h-[54px] rounded-[5px] border border-[#25a88d] px-[34px] font-['Inter:Medium',sans-serif] text-[19px] text-[#25a88d]">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="h-[54px] rounded-[5px] bg-[#25a88d] px-[43px] font-['Inter:Medium',sans-serif] text-[19px] text-white shadow-[0px_5px_8px_rgba(0,0,0,0.1),0px_2px_5px_rgba(0,0,0,0.1)] disabled:opacity-70">{isSubmitting ? "Submitting..." : "Submit"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

