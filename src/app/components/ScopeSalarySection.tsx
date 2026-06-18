import { useMemo, useState } from "react";

type Role =
  | "Emergency Medical Technician"
  | "Hospital Administration"
  | "General Duty Assistance"
  | "Geriatric Care Assistance";

type Props = {
  defaultRole: Role;
  topClassName?: string;
  allowRoleSelection?: boolean;
};

const HEALTHCARE_ROLE_OPTIONS: Role[] = [
  "Emergency Medical Technician",
  "Hospital Administration",
  "General Duty Assistance",
  "Geriatric Care Assistance",
];

const CITY_TIER_OPTIONS = ["Tier 1 - Metro", "Tier 2 - Large City", "Tier 3 - Small City"];
const HOSPITAL_TYPE_OPTIONS = ["Super-speciality", "Multi-speciality", "Clinic / Standalone Hospital"];
const SHIFT_OPTIONS = ["Day Shift", "Night Shift", "Rotational Shift"];

function formatInr(value: number) {
  return `Rs ${new Intl.NumberFormat("en-IN").format(value)}`;
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

  const [minBase, maxBase] = roleBaseRangeMatrix[selection.healthcareRole]?.[selection.cityTier] ?? [15000, 22000];
  const combinedMultiplier =
    (hospitalMultiplier[selection.hospitalType] ?? 1) *
    (shiftMultiplier[selection.shift] ?? 1) *
    expMultiplier(selection.experienceYears);

  const monthlyMin = Math.round(minBase * combinedMultiplier);
  const monthlyMax = Math.round(maxBase * combinedMultiplier);
  const monthlyGross = Math.round((monthlyMin + monthlyMax) / 2);

  const baseMonthly = Math.round(monthlyGross * 0.7);
  const hraAllowances = monthlyGross - baseMonthly;
  const annualGross = Math.round(monthlyGross * 12);
  const takeHomeMonthly = Math.round(monthlyGross * 0.88);

  return {
    monthlyGross,
    monthlyMin,
    monthlyMax,
    baseMonthly,
    hraAllowances,
    annualGross,
    takeHomeMonthly,
  };
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
  const [experienceYears, setExperienceYears] = useState(0);

  const salary = useMemo(
    () =>
      computeSalaryBreakdown({
        healthcareRole,
        cityTier,
        hospitalType,
        shift,
        experienceYears,
      }),
    [healthcareRole, cityTier, hospitalType, shift, experienceYears],
  );

  return (
    <div className={`-translate-x-1/2 absolute bg-white left-1/2 px-[34px] py-[60px] w-[1440px] ${topClassName}`}>
      <div className="mb-[24px] text-center">
        <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#25a88d]">Scope & Salary</p>
        <p className="font-['Inter:Bold',sans-serif] text-[40px] text-[#1f3471] leading-[48px]">Know Your Career Earning Potential</p>
      </div>
      <div className="mx-auto grid w-[1306px] grid-cols-2 overflow-hidden rounded-[16px] border border-[#e5e9f6] bg-white shadow-[10px_40px_50px_0px_rgba(229,233,246,0.4)]">
        <div className="p-[34px]">
          <div className="mb-[18px] grid gap-[14px]">
            <label className="text-[14px] text-[#364153]">
              <span>Healthcare Role</span>
              {allowRoleSelection ? (
                <select
                  value={healthcareRole}
                  onChange={(e) => setHealthcareRole(e.target.value as Role)}
                  className="mt-[6px] h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[16px] text-[#101828]"
                >
                  {HEALTHCARE_ROLE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  value={healthcareRole}
                  className="mt-[6px] h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[16px] text-[#101828] bg-[#f8fafc]"
                />
              )}
            </label>
            <label className="text-[14px] text-[#364153]">
              <span>City Tier</span>
              <select value={cityTier} onChange={(e) => setCityTier(e.target.value)} className="mt-[6px] h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[16px] text-[#101828]">
                {CITY_TIER_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-[14px] text-[#364153]">
              <span>Hospital Type</span>
              <select value={hospitalType} onChange={(e) => setHospitalType(e.target.value)} className="mt-[6px] h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[16px] text-[#101828]">
                {HOSPITAL_TYPE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-[14px] text-[#364153]">
              <span>Experience: {experienceYears === 0 ? "Fresher" : `${experienceYears} yrs`}</span>
              <input type="range" min={0} max={15} value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} className="mt-[8px] w-full" />
            </label>
            <label className="text-[14px] text-[#364153]">
              <span>Shift</span>
              <select value={shift} onChange={(e) => setShift(e.target.value)} className="mt-[6px] h-[48px] w-full rounded-[10px] border border-[#d1d5dc] px-[14px] text-[16px] text-[#101828]">
                {SHIFT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0f172b] via-[#1c398e] to-[#0f172b] p-[34px] text-white">
          <p className="text-[14px] text-[#46ecd5]">Estimated Monthly Salary</p>
          <p className="mt-[8px] text-[24px] font-bold">{healthcareRole}</p>
          <p className="mt-[4px] text-[14px] text-[#bedbff]">{`${cityTier} · ${hospitalType} · ${experienceYears === 0 ? "Fresher" : `${experienceYears} yrs exp`} · ${shift}`}</p>
          <p className="mt-[20px] text-[48px] font-bold leading-[48px]">{formatInr(salary.monthlyGross)}</p>
          <p className="text-[14px] text-[#bedbff]">per month, gross</p>
          <div className="mt-[24px] rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-[20px]">
            <p className="mb-[8px] text-[18px] font-semibold">Breakdown</p>
            <div className="mb-[8px] flex justify-between text-[16px]"><span className="text-[#bedbff]">Base salary (monthly)</span><span>{formatInr(salary.baseMonthly)}</span></div>
            <div className="mb-[8px] flex justify-between text-[16px]"><span className="text-[#bedbff]">HRA + allowances</span><span>{formatInr(salary.hraAllowances)}</span></div>
            <div className="mb-[8px] flex justify-between text-[16px]"><span className="text-[#bedbff]">Range (monthly)</span><span>{`${formatInr(salary.monthlyMin)} - ${formatInr(salary.monthlyMax)}`}</span></div>
            <div className="mb-[10px] flex justify-between text-[16px]"><span className="text-[#bedbff]">Annual gross (CTC est.)</span><span>{formatInr(salary.annualGross)}</span></div>
            <div className="flex justify-between rounded-[10px] bg-[rgba(0,187,167,0.2)] px-[14px] py-[10px] text-[18px] font-bold text-[#46ecd5]">
              <span>Estimated take-home / mo</span>
              <span>{formatInr(salary.takeHomeMonthly)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


