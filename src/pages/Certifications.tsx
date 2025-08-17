import React, { useEffect, useState } from "react";
import "./Certifications.css";
import {
  FaExternalLinkAlt,
  FaUniversity,
  FaAws,
  FaGoogle,
  FaMicrosoft,
  FaCertificate,
  FaReact,
  FaDatabase,
} from "react-icons/fa";
import {
  SiUdemy,
  SiCoursera,
  SiIeee,
  SiMongodb,
  SiKubernetes,
  SiDocker,
  SiNetlify,
  SiVercel,
} from "react-icons/si";
import { Certification } from "../types";
import { getCertifications } from "../queries/getCertifications";

const iconData: { [key: string]: JSX.Element } = {
  udemy: <SiUdemy />,
  coursera: <SiCoursera />,
  ieee: <SiIeee />,
  university: <FaUniversity />,
  FaAws: <FaAws />,
  FaGoogle: <FaGoogle />,
  FaMicrosoft: <FaMicrosoft />,
  FaReact: <FaReact />,
  SiMongodb: <SiMongodb />,
  SiKubernetes: <SiKubernetes />,
  SiDocker: <SiDocker />,
  FaDatabase: <FaDatabase />,
  SiNetlify: <SiNetlify />,
  SiVercel: <SiVercel />,
  default: <FaCertificate />,
};

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    async function fetchCertifications() {
      const data = await getCertifications();
      setCertifications(data);
    }

    fetchCertifications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (certifications.length === 0)
    return <div className="loading">Loading...</div>;

  return (
    <div className="certifications-container">
      <div className="certifications-header">
        <h1 className="certifications-title">🏆 Professional Certifications</h1>
        <p className="certifications-subtitle">
          Validating expertise and continuous learning in technology
        </p>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div
            key={cert.title + cert.issuer}
            className="certification-card"
            style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="certification-header">
              <div className="certification-icon">
                {iconData[cert.iconName] || iconData.default}
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-link"
                aria-label={`View ${cert.title} certificate`}
              >
                <FaExternalLinkAlt />
              </a>
            </div>

            <div className="certification-content">
              <h3 className="certification-title">{cert.title}</h3>
              <p className="certification-issuer">{cert.issuer}</p>
              {cert.issuedDate && (
                <div className="certification-date">
                  <span>Issued: {formatDate(cert.issuedDate)}</span>
                </div>
              )}
            </div>

            <div className="certification-actions">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-certificate-btn"
              >
                <FaExternalLinkAlt />
                View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
