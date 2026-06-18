import IMedCertificateExact, { type IMedCertificateProps } from "./IMedCertificateExact";

export default function IMedCertificate(props: IMedCertificateProps) {
  return (
    <div className="imed-certificate-exact-frame">
      <IMedCertificateExact {...props} />
    </div>
  );
}
