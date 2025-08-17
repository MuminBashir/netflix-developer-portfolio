import React, { useEffect, useState } from "react";
import "./Recommendations.css";
import { Recommendation } from "../types";
import { getRecommendations } from "../queries/getRecommendations";
import { FaUser } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const data = await getRecommendations();
      setRecommendations(data);
    }

    fetchRecommendations();
  }, []);

  const renderProfileImage = (rec: Recommendation) => {
    if (rec.profileImage && rec.profileImage !== "") {
      return (
        <img
          src={rec.profileImage}
          alt={rec.name}
          className="profile-pic"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
      );
    }
    return null;
  };

  if (recommendations.length === 0)
    return <div className="loading">Loading...</div>;

  return (
    <div className="timeline-container">
      {recommendations.map((rec, index) => (
        <div
          key={rec.id}
          className="recommendation-card"
          style={{ "--delay": `${index * 0.2}s` } as React.CSSProperties}
        >
          <div className="recommendation-header">
            <div className="profile-image-container">
              {renderProfileImage(rec)}
              <div
                className={`profile-icon-fallback ${
                  rec.profileImage ? "hidden" : ""
                }`}
              >
                <FaUser />
              </div>
            </div>
            <div className="header-info">
              <h3>{rec.name}</h3>
              <p className="title">{rec.title}</p>
              <p className="company">{rec.company}</p>
              <p className="date">{rec.date}</p>
            </div>
          </div>
          <div className="recommendation-body">
            {rec.recommendation.map((paragraph, pIndex) => (
              <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
