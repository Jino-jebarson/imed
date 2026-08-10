# Admin CRM Feature Inventory

Source reviewed:
- `src/imports/AdminCrm/AdminCrm.tsx`
- `src/imports/AdminCrm/IMedCertificate.tsx`
- `src/imports/AdminCrm/IMedCertificateExact/index.tsx`
- `src/app/App.tsx`
- `server/index.js`

## Entry Points

- Admin route: `#admin`
- Certificate verification route: `#verify=<certificateNumber>`
- Floating WhatsApp is hidden on admin and verification routes.

## Auth And Roles

- Login and signup/request admin access.
- Signup requires admin setup passcode and has an admin account limit.
- JWT session stored in `localStorage` as `imed_crm_token`.
- Password show/hide on auth form.
- Logout clears token and CRM state.
- Change password from Settings.
- Roles:
  - `superadmin`
  - `admin`
  - `counsellor`
  - `franchise_superadmin`
  - `franchise_counsellor`
- Role scope behavior:
  - Head super admin can switch between all branches/franchises or a specific location.
  - Head admin/admin and counsellor can be branch scoped.
  - Franchise users are restricted to their assigned franchise.
  - Counsellor accounts see a limited navigation set.

## Navigation Panels

- Dashboard
- Leads
- Add lead
- Admissions
- Batch strength
- My students
- Attendance
- Attendance logs
- Attendance detail
- All students
- Receipts
- Certificates
- Finance
- EMI reminders
- Settings
- Profile

## Global Filters

- Date preset filter:
  - All dates
  - Today
  - Yesterday
  - Specific date
- Clear date filter.
- Super admin branch/franchise scope filter.
- Pagination defaults to 25 rows.

## Dashboard

- Metrics:
  - Active leads
  - Enrolled
  - Conversion
  - Collected
  - Due
- Funnel stages:
  - New Lead
  - Contacted
  - Demo / Visit
  - Counselling
  - Enrolled
  - In Training
  - Course Completed
  - Placed
- Performance by centre.
- Recent admissions.

## Lead Management

- Lead fields:
  - Full name
  - Phone
  - Parent mobile number
  - Email
  - Government proof document
  - Highest educational qualification certificate
  - Source
  - Centre
  - Franchise ID
  - Course
  - Counsellor
  - Stage
  - Priority
  - City
  - Expected fee
  - Next follow-up
  - Notes
  - Activities
- Sources:
  - Meta
  - BTL
  - College
  - Referral
- Lead document support:
  - PDF, JPG, JPEG, PNG, WEBP
  - Frontend max 2 MB per file
  - Backend max 2 MB per lead document upload
- Add lead form auto-sets:
  - Stage: New Lead
  - Priority: Warm
  - Expected fee including 18% GST based on selected course
  - Counsellor defaults to selected centre or Unassigned
- Leads table:
  - Search by query with Enter-to-search
  - Stage, centre, course filtering
  - Assign centre from row
  - Assign counsellor from row for admins
  - Update stage from row
  - Open profile by clicking row
- Lead import:
  - Upload `.xls`, `.xlsx`, `.csv`, `.tsv`
  - Parses HTML table, CSV, TSV, and XLSX
  - Header aliases for name, phone, email, parent mobile, expected fee, notes, etc.
  - Validates at least one row and phone number per row
  - Saves imported rows as actual leads
- Lead export:
  - Download Excel with contact, document labels, source, centre, course, counsellor, stage, priority, city, expected fee, notes, created date.
- Lead profile:
  - Journey timeline
  - Document download
  - Centre assignment
  - Counsellor assignment
  - Admission action

## Admissions

- Admissions panel shows leads in:
  - Contacted
  - Demo / Visit
  - Counselling
- Admit action converts lead to student.
- Conversion:
  - Copies lead details and uploaded documents
  - Creates admission number `IMED-<year>-<sequence>`
  - Sets student fee from course fee including GST or lead expected fee
  - Marks lead stage as Enrolled
  - Adds activity logs

## Student Management

- Student fields:
  - Lead ID
  - Full name
  - Phone
  - Parent mobile number
  - Email
  - Documents
  - Centre
  - Franchise ID
  - Course
  - Counsellor
  - Batch
  - Batch commence date
  - Admission number
  - Discount amount
  - Status
  - Total fee
  - Paid amount
  - EMI details
  - Placement company
  - Placement salary
  - Certificate number
  - Certificate issue date
  - Certificate status
  - Payment records
  - Activities
- Student statuses:
  - Enrolled
  - In Training
  - Course Completed
  - Placed
  - Backend also supports Dropped
- All students:
  - Search inside loaded page
  - Export Excel
  - Assign counsellor
  - Update status
  - Open profile
- My students:
  - Counsellor-scoped student list
  - Export Excel
  - Update status
  - Open profile
- Student profile:
  - Fee summary
  - Journey timeline
  - Document download
  - Counsellor assignment
  - Batch assignment with commence date
  - Payment collection
  - EMI plan management
  - Certificate preview/actions when eligible

## Attendance

- Attendance statuses:
  - Present
  - Absent
  - Late
  - Leave
- Attendance panel:
  - Date picker
  - Refresh
  - Save attendance
  - Counts by status
  - Per-student status and note
  - Shows saved status and marker
  - Counsellors can mark only assigned students
- Attendance logs:
  - Student search
  - Summary by student
  - Present/Absent/Late/Leave/Total counts
  - View detail
- Attendance detail:
  - Back to logs
  - Download Excel
  - Calendar visualization
  - Legend
  - Filters by from date, to date, status
  - Stats by status
  - Day-wise table with date, status, course, batch, marked by, note

## Batch Strength

- Metrics:
  - Students in batches
  - Total batches
  - No batch assigned
- Batch selector.
- Batch list with course/centre, start date, student count.
- Selected batch student list.
- Student profile open from batch list.

## Finance

- Finance metrics:
  - Total billed including GST
  - Collected
  - Pending due
  - Students
- Fee collection table:
  - Student
  - Centre
  - Course
  - Fee including GST
  - Paid
  - Due
  - Paid/Partial status

## Payments And EMI

- Payment modes:
  - Cash
  - UPI
  - Card
  - Bank Transfer
  - EMI installment / plan
- Record payment with:
  - Amount
  - Mode
  - Note
  - Recorded by current user
- Payment can optionally open WhatsApp message.
- EMI plan:
  - Select months from 2 to 12
  - Next EMI date
  - Auto-calculates monthly EMI from pending due
  - Save EMI plan
  - Close EMI plan
  - Warning when draft EMI amount differs from saved plan
- EMI reminders:
  - Shows active EMI students with pending due and next EMI date
  - Due/overdue first
  - Metrics for due/overdue count, EMI due now, upcoming EMI
  - Download Excel
  - Send reminder opens WhatsApp with prefilled message

## Receipts And Invoices

- Receipts list:
  - Student
  - Admission number
  - Course
  - Count of payment receipts
  - Paid and due
  - View receipts
- Profile receipt mode:
  - Tax Invoice
  - Payment Receipt per payment
  - EMI Receipt label for EMI payments
- Tax invoice includes:
  - Seller billing entity
  - Buyer/student details
  - Invoice number
  - GSTIN/state/place of supply
  - HSN/SAC `999294`
  - Course fee
  - Discount
  - CGST 9%
  - SGST 9%
  - Amount in words
  - Tax summary
  - Bank details
  - Paid/balance
  - Computer generated invoice footer
- Payment receipt includes:
  - Receipt number
  - Payment type
  - Payment mode
  - Admission number
  - Course/centre
  - Installment number
  - Paid before
  - This payment
  - Paid till date
  - Balance after payment
  - Amount in words
  - Bank details
- Receipt actions:
  - Print/save PDF
  - Share PDF to WhatsApp when Web Share API supports files
  - Fallback opens WhatsApp Web message

## Certificates

- Certificates list:
  - Student
  - Admission/course
  - Certificate number or readiness state
  - Issued date or current status
  - View
  - Issue
  - WhatsApp Web when issued
  - Not-ready state
- Eligibility:
  - Course Completed
  - Placed
  - Already Issued
- Issuing certificate:
  - Backend requires Course Completed or Placed
  - Generates `IMED-CERT-<year>-<sequence>` if missing
  - Sets issue date and status
  - Adds certificate activity
- Certificate preview:
  - Exact iMED certificate artwork
  - Student name
  - Course name
  - Certificate number
  - Duration
  - Issue date
  - Verification URL
  - QR code
- Certificate actions:
  - Generate certificate
  - Print/save PDF
  - Create/share certificate PDF
  - WhatsApp/Web WhatsApp message
- Not-ready certificate view:
  - Course incomplete animation
  - Explains current status and required status
  - Links back to students

## Settings

- Staff Access:
  - Add staff with name, email, password, role, assigned branch/franchise
  - Staff directory in expandable details
  - Staff search
  - Role labels
- Branches and franchise billing:
  - Add branch/franchise location
  - Search location
  - Select location
  - Edit location name, type, city, manager
  - Edit legal/billing details:
    - Company legal name
    - GSTIN
    - State name/code
    - Billing email/phone
    - Billing address
    - Account holder name
    - Bank name
    - Account number
    - IFSC
    - Bank branch
  - Blank billing fields fall back to iMED default billing entity.
- Course Fees:
  - Add course name, code, base fee before GST
  - Optional global or branch/franchise-specific course fee
  - Display base fee, 18% GST, payable fee
  - Save updated fee
  - Franchise updating global course creates franchise-specific override
- Batches:
  - Add batch name
  - Centre
  - Course
  - Commence date
  - List batch pills with date
- Security:
  - Change password

## Backend Models

- AdminUser
- Centre
- Course
- Batch
- Lead
- Student
- Attendance
- Activity subdocument
- Document file subdocument
- Payment subdocument

## Public/Non-CRM Backend Touchpoints Related To CRM

- `/api/contact` creates/sends website enquiry email but is not currently wired directly into CRM lead creation in the reviewed code.
- `/api/careers` handles career form with resume upload.
- `/api/centres` exposes active centres publicly.
- `/api/certificates/verify/:certificateNumber` verifies issued certificates publicly.

## Static Defaults

- Default centres:
  - Delhi
  - Kochi
  - Bangalore
- Courses:
  - HA
  - EMT
  - GDA
  - OCHA
  - AAHP
  - MLT
  - RADIOLOGY
- GST rate:
  - 18%
- Default billing entity:
  - IMED HEALTHCARE ACADEMY LLP
  - GSTIN `07AALFI7868F1ZT`
  - Delhi state code `07`
  - IDFC FIRST Bank account details

## Backend API Surface

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/admin/me/password`
- `GET /api/certificates/verify/:certificateNumber`
- `GET /api/centres`
- `GET /api/admin/dashboard/summary`
- `GET /api/admin/dashboard/funnel`
- `GET /api/admin/dashboard/centres`
- `GET /api/admin/leads`
- `POST /api/admin/leads`
- `PATCH /api/admin/leads/:id`
- `POST /api/admin/leads/:id/activities`
- `POST /api/admin/leads/:id/convert`
- `GET /api/admin/documents/:type/:id/:field`
- `GET /api/admin/students`
- `PATCH /api/admin/students/:id`
- `POST /api/admin/students/:id/certificate`
- `POST /api/admin/students/:id/payments`
- `GET /api/admin/attendance`
- `GET /api/admin/attendance/logs`
- `GET /api/admin/attendance/summary`
- `POST /api/admin/attendance`
- `GET /api/admin/counsellors`
- `POST /api/admin/counsellors`
- `GET /api/admin/centres`
- `POST /api/admin/centres`
- `PATCH /api/admin/centres/:id`
- `GET /api/admin/courses`
- `POST /api/admin/courses`
- `PATCH /api/admin/courses/:id`
- `GET /api/admin/batches`
- `POST /api/admin/batches`
