import { useEffect, useMemo, useState } from "react";

export type Role =
  | "Emergency Medical Technician"
  | "Hospital Administration"
  | "Advanced Healthcare Administration"
  | "General Duty Assistance"
  | "Geriatric Care Assistance"
  | "Medical Laboratory Technician"
  | "Radiology X-Ray Technician"
  | "Operation Theatre and Anaesthesia";

type Props = {
  defaultRole: Role;
  topClassName?: string;
  allowRoleSelection?: boolean;
};

export const HEALTHCARE_ROLE_OPTIONS: Role[] = [
  "Emergency Medical Technician",
  "Hospital Administration",
  "Advanced Healthcare Administration",
  "General Duty Assistance",
  "Geriatric Care Assistance",
  "Medical Laboratory Technician",
  "Radiology X-Ray Technician",
  "Operation Theatre and Anaesthesia",
];

export const CITY_TIER_OPTIONS = ["Tier 1 - Metro", "Tier 2 - Large City", "Tier 3 - Small City"];
export const HOSPITAL_TYPE_OPTIONS = ["Super-speciality", "Multi-speciality", "Clinic / Standalone Hospital"];
export const SHIFT_OPTIONS = ["Day Shift", "Night Shift", "Rotational Shift"];

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function computeSalaryBreakdown(selection: {
  healthcareRole: string;
  cityTier: string;
  hospitalType: string;
  shift: string;
  experienceYears: number;
}) {
  const roleBaseRangeMatrix: Record<string, Record<string, [number, number]>> = {
    "Emergency Medical Technician": {
      "Tier 1 - Metro": [22000, 35000],
      "Tier 2 - Large City": [17000, 26000],
      "Tier 3 - Small City": [14000, 20000],
    },
    "Hospital Administration": {
      "Tier 1 - Metro": [35000, 58000],
      "Tier 2 - Large City": [26000, 42000],
      "Tier 3 - Small City": [20000, 30000],
    },
    "Advanced Healthcare Administration": {
      "Tier 1 - Metro": [35000, 58000],
      "Tier 2 - Large City": [26000, 42000],
      "Tier 3 - Small City": [20000, 30000],
    },
    "General Duty Assistance": {
      "Tier 1 - Metro": [15000, 22000],
      "Tier 2 - Large City": [12000, 18000],
      "Tier 3 - Small City": [10000, 15000],
    },
    "Geriatric Care Assistance": {
      "Tier 1 - Metro": [18000, 30000],
      "Tier 2 - Large City": [15000, 24000],
      "Tier 3 - Small City": [12000, 18000],
    },
    "Medical Laboratory Technician": {
      "Tier 1 - Metro": [22000, 36000],
      "Tier 2 - Large City": [18000, 30000],
      "Tier 3 - Small City": [15000, 24000],
    },
    "Radiology X-Ray Technician": {
      "Tier 1 - Metro": [24000, 38000],
      "Tier 2 - Large City": [19000, 32000],
      "Tier 3 - Small City": [16000, 26000],
    },
    "Operation Theatre and Anaesthesia": {
      "Tier 1 - Metro": [24000, 38000],
      "Tier 2 - Large City": [19000, 30000],
      "Tier 3 - Small City": [15000, 24000],
    },
  };

  const hospitalMultiplier: Record<string, number> = {
    "Super-speciality": 1.12,
    "Multi-speciality": 1,
    "Clinic / Standalone Hospital": 0.85,
  };

  const shiftMultiplier: Record<string, number> = {
    "Day Shift": 1,
    "Night Shift": 1.15,
    "Rotational Shift": 1.08,
  };

  const expMultiplier = (years: number) => {
    if (years <= 0) return 1;
    let multiplier = 1;
    for (let year = 1; year <= Math.min(years, 5); year += 1) {
      multiplier *= 1.1;
    }
    for (let year = 6; year <= Math.min(years, 10); year += 1) {
      multiplier *= 1.07;
    }
    return multiplier;
  };

  const [minBase, maxBase] =
    roleBaseRangeMatrix[selection.healthcareRole]?.[selection.cityTier] ?? [18000, 28000];
  const combinedMultiplier =
    (hospitalMultiplier[selection.hospitalType] ?? 1) *
    (shiftMultiplier[selection.shift] ?? 1) *
    expMultiplier(selection.experienceYears);

  const monthlyMin = minBase * combinedMultiplier;
  const monthlyMax = maxBase * combinedMultiplier;
  const monthlyGross = (monthlyMin + monthlyMax) / 2;

  const baseMonthly = Math.round(monthlyGross * 0.7);
  const hraAllowances = monthlyGross - baseMonthly;
  const annualGross = monthlyGross * 12;
  const takeHomeMonthly = Math.round(monthlyGross * 0.88);

  return {
    monthlyGross: Math.round(monthlyGross),
    monthlyMin: Math.round(monthlyMin),
    monthlyMax: Math.round(monthlyMax),
    baseMonthly,
    hraAllowances,
    annualGross: Math.round(annualGross),
    takeHomeMonthly,
  };
}

function ChevronDownIcon({ stroke = "#6A7282" }: { stroke?: string }) {
  return (
    <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
      <path
        d="M4.16699 10H15.8337"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d="M10.8335 5L15.8335 10L10.8335 15"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

export default function ScopeSalarySection({
  defaultRole,
  topClassName = "top-[2954px]",
  allowRoleSelection = false,
}: Props) {
  const [healthcareRole, setHealthcareRole] = useState<Role>(defaultRole);
  const [cityTier, setCityTier] = useState(CITY_TIER_OPTIONS[0]);
  const [hospitalType, setHospitalType] = useState(HOSPITAL_TYPE_OPTIONS[1]);
  const [shift, setShift] = useState(SHIFT_OPTIONS[0]);
  const [experienceYears, setExperienceYears] = useState(2);

  useEffect(() => {
    setHealthcareRole(defaultRole);
  }, [defaultRole]);

  const activeRole = allowRoleSelection ? healthcareRole : defaultRole;

  const salary = useMemo(
    () =>
      computeSalaryBreakdown({
        healthcareRole: activeRole,
        cityTier,
        hospitalType,
        shift,
        experienceYears,
      }),
    [activeRole, cityTier, hospitalType, shift, experienceYears]
  );

  return (
    <div
      className={`-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[70px] items-center left-1/2 px-[34px] py-[60px] w-[1440px] ${topClassName}`}
      data-name="About"
    >
      {/* Section Headings */}
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[1176px]">
        <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
          <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#25a88d] text-[20px] text-center top-[-1px] whitespace-nowrap">
            Scope & Salary
          </p>
        </div>
        <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
          <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-[587.66px] not-italic text-[#1f3471] text-[40px] text-center top-[-1px] whitespace-nowrap">
            Know Your Career Earning Potential
          </p>
        </div>
      </div>

      {/* Main Calculator Card (Exact OCHA style: Container4) */}
      <div
        className="bg-white content-stretch flex flex-col h-[831px] items-start overflow-clip relative rounded-[16px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.1),10px_40px_50px_0px_rgba(229,233,246,0.4)] shrink-0 w-[1306px]"
        data-name="Container"
      >
        <div className="h-[830.588px] relative shrink-0 w-full">
          {/* LEFT COLUMN: Input Form (Container6) */}
          <div
            className="absolute content-stretch flex flex-col gap-[32px] h-[831px] items-start left-0 pt-[48px] px-[48px] top-0 w-[636px]"
            data-name="Container"
          >
            {/* Header: Tell us about you */}
            <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full">
              <div className="h-[36px] relative shrink-0 w-full">
                <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.6px] whitespace-nowrap">
                  Tell us about you
                </p>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] w-[351px]">
                Estimates are Monthly, gross based on iMED Placement data & HSSC industry benchmarks.
              </p>
            </div>

            {/* Inputs Container */}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              {/* Career Growth Button */}
              <div className="h-[73.6px] relative shrink-0 w-full">
                <div className="absolute bg-[#25a88d] content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24px] w-[540px]">
                  <div
                    aria-hidden="true"
                    className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
                  />
                  <span className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] text-[16px] text-white">
                    Career Growth
                  </span>
                  <ChevronDownIcon stroke="white" />
                </div>
              </div>

              {/* Healthcare Role */}
              <div className="h-[73.6px] relative shrink-0 w-full">
                <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[3px] w-[120px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px] whitespace-nowrap">
                    Healthcare Role
                  </p>
                </div>
                <div className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24px] w-[540px]">
                  <div
                    aria-hidden="true"
                    className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
                  />
                  {allowRoleSelection ? (
                    <>
                      <select
                        aria-label="Healthcare Role"
                        className="bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium h-full leading-[24px] not-italic outline-none pr-[28px] text-[#101828] text-[16px] w-full appearance-none"
                        value={healthcareRole}
                        onChange={(e) => setHealthcareRole(e.target.value as Role)}
                      >
                        {HEALTHCARE_ROLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-[16.8px] top-[15px]">
                        <ChevronDownIcon />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between w-full h-full select-none cursor-default">
                      <span className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] text-[#101828] text-[16px]">
                        {defaultRole}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* City Tier */}
              <div className="h-[73.6px] relative shrink-0 w-full">
                <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.4px] w-[60px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px] whitespace-nowrap">
                    City Tier
                  </p>
                </div>
                <div className="absolute bg-white content-stretch flex h-[49px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[24.4px] w-[540px]">
                  <div
                    aria-hidden="true"
                    className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
                  />
                  <select
                    aria-label="City Tier"
                    className="bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium h-full leading-[24px] not-italic outline-none pr-[28px] text-[#101828] text-[16px] w-full appearance-none"
                    value={cityTier}
                    onChange={(e) => setCityTier(e.target.value)}
                  >
                    {CITY_TIER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-[16.8px] top-[15px]">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Hospital Type */}
              <div className="h-[73.6px] relative shrink-0 w-full">
                <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[2.8px] w-[92px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px] whitespace-nowrap">
                    Hospital Type
                  </p>
                </div>
                <div className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[23.8px] w-[540px]">
                  <div
                    aria-hidden="true"
                    className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
                  />
                  <select
                    aria-label="Hospital Type"
                    className="bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium h-full leading-[24px] not-italic outline-none pr-[28px] text-[#101828] text-[16px] w-full appearance-none"
                    value={hospitalType}
                    onChange={(e) => setHospitalType(e.target.value)}
                  >
                    {HOSPITAL_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-[16.8px] top-[15px]">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Experience Slider */}
              <div className="h-[70.388px] relative shrink-0 w-full" data-name="ExperienceSlider">
                <div className="absolute content-stretch flex h-[20px] items-center justify-between left-0 top-[0.2px] w-[540px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px] whitespace-nowrap">
                    Experience
                  </p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#101828] text-[14px] whitespace-nowrap">
                    {experienceYears === 0 ? "Fresher" : `${experienceYears} yrs`}
                  </p>
                </div>
                <input
                  aria-label="Experience in years"
                  className="absolute left-0 top-[34px] w-[540px] accent-[#25a88d] cursor-pointer"
                  max={15}
                  min={0}
                  step={1}
                  type="range"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                />
                <div className="absolute content-stretch flex h-[16px] items-start justify-between left-0 top-[54.2px] w-[540px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#6a7282] text-[12px] whitespace-nowrap">
                    0 yrs
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#6a7282] text-[12px] whitespace-nowrap">
                    15 yrs
                  </p>
                </div>
              </div>

              {/* Shift */}
              <div className="h-[73.6px] relative shrink-0 w-full">
                <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[2.81px] w-[34px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#364153] text-[14px] whitespace-nowrap">
                    Shift
                  </p>
                </div>
                <div className="absolute bg-white content-stretch flex h-[50px] items-center justify-between left-0 px-[16.8px] py-[12.8px] rounded-[10px] top-[23.81px] w-[540px]">
                  <div
                    aria-hidden="true"
                    className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]"
                  />
                  <select
                    aria-label="Shift"
                    className="bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium h-full leading-[24px] not-italic outline-none pr-[28px] text-[#101828] text-[16px] w-full appearance-none"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    {SHIFT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-[16.8px] top-[15px]">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Salary Breakdown & Highlights (Container11) */}
          <div
            className="absolute h-[831px] left-[636px] overflow-clip top-0 w-[670px]"
            style={{
              backgroundImage:
                "linear-gradient(128.878deg, rgb(15, 23, 43) 0%, rgb(28, 57, 142) 50%, rgb(15, 23, 43) 100%)",
            }}
            data-name="Container"
          >
            <div className="absolute content-stretch flex flex-col gap-[32px] h-[734.588px] items-start left-[48px] top-[48px] w-[573.6px]">
              {/* Estimated Monthly Salary Badge & Header */}
              <div className="h-[115.988px] relative shrink-0 w-full">
                <div className="absolute bg-[rgba(0,187,167,0.2)] h-[32px] left-0 rounded-[26843500px] top-0 px-[16px] flex items-center">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#46ecd5] text-[14px] whitespace-nowrap">
                    Estimated Monthly Salary
                  </p>
                </div>
                <div className="absolute content-stretch flex h-[31.988px] items-start left-0 top-[48px] w-[573.6px]">
                  <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-px not-italic relative text-[24px] text-white">
                    {activeRole}
                  </p>
                </div>
                <div className="absolute h-[20px] left-0 top-[95.99px] w-[573.6px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
                    {`${cityTier} · ${hospitalType} · ${experienceYears === 0 ? "Fresher" : `${experienceYears} yrs exp`} · ${shift}`}
                  </p>
                </div>
              </div>

              {/* Big Monthly Gross Salary */}
              <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full">
                <div className="h-[48px] relative shrink-0 w-full">
                  <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[48px] left-0 not-italic text-[48px] text-white top-[-3px] whitespace-nowrap">
                    {`Rs ${formatInr(salary.monthlyGross)}`}
                  </p>
                </div>
                <div className="h-[20px] relative shrink-0 w-full">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bedbff] text-[14px] top-[-0.2px] whitespace-nowrap">
                    per month, gross
                  </p>
                </div>
              </div>

              {/* Min / Max Progress Indicator */}
              <div className="content-stretch flex flex-col gap-[12px] h-[76px] items-start relative shrink-0 w-full">
                <div className="h-[20px] relative shrink-0 w-full flex items-start justify-between">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#bedbff] text-[14px]">
                    Min
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#bedbff] text-[14px]">
                    Max
                  </p>
                </div>
                <div className="bg-[#162456] h-[12px] relative rounded-[26843500px] shrink-0 w-full overflow-hidden">
                  <div className="content-stretch flex flex-col items-start pl-[86px] pr-[86px] relative size-full">
                    <div className="bg-gradient-to-r from-[#00bba7] h-[12px] relative rounded-[26843500px] shrink-0 to-[#00d5be] w-full" />
                  </div>
                </div>
                <div className="h-[20px] relative shrink-0 w-full flex items-start justify-between">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-white">
                    {`Rs ${formatInr(salary.monthlyMin)}`}
                  </p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-white">
                    {`Rs ${formatInr(salary.monthlyMax)}`}
                  </p>
                </div>
              </div>

              {/* Breakdown Details Container */}
              <div className="bg-[rgba(255,255,255,0.05)] h-[282.6px] relative rounded-[14px] shrink-0 w-full">
                <div
                  aria-hidden="true"
                  className="absolute border-[0.8px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]"
                />
                <div className="absolute h-[28px] left-[24.8px] top-[24.8px] w-[524px]">
                  <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px] whitespace-nowrap">
                    Breakdown
                  </p>
                </div>
                <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[68.8px] w-[524px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#bedbff] text-[16px]">
                    Base salary (monthly)
                  </p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[16px] text-white">
                    {formatInr(salary.baseMonthly)}
                  </p>
                </div>
                <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[108.8px] w-[524px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#bedbff] text-[16px]">
                    HRA + allowances
                  </p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[16px] text-white">
                    {formatInr(salary.hraAllowances)}
                  </p>
                </div>
                <div className="absolute bg-[rgba(255,255,255,0.1)] h-px left-[24.8px] top-[148.8px] w-[524px]" />
                <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24.8px] top-[165.8px] w-[524px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#bedbff] text-[16px]">
                    Annual gross (CTC est.)
                  </p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[16px] text-white">
                    {formatInr(salary.annualGross)}
                  </p>
                </div>
                <div className="absolute bg-[rgba(0,187,167,0.2)] content-stretch flex h-[52px] items-center justify-between left-[0.8px] px-[24px] py-[12px] rounded-[10px] top-[205.8px] w-[572px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic text-[#46ecd5] text-[16px]">
                    Estimated take-home / mo
                  </p>
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#46ecd5] text-[18px]">
                    {formatInr(salary.takeHomeMonthly)}
                  </p>
                </div>
              </div>

              {/* Talk to a Career Counsellor CTA */}
              <div
                onClick={() => {
                  const target =
                    document.getElementById("contact-us") ||
                    document.getElementById("career-path");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "#contact-us";
                  }
                }}
                className="bg-[#00bba7] hover:bg-[#00a392] transition-colors h-[56px] relative rounded-[26843500px] shrink-0 w-full cursor-pointer flex items-center justify-center gap-[10px]"
                data-name="Button"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[16px] text-center text-white whitespace-nowrap">
                  Talk to a Career Counsellor
                </p>
                <ArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
