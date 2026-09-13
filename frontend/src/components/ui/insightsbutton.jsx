import React from "react";

const InsightsButton = () => {
  const phoneNumber = "917758936968"; // Replace with your WhatsApp number (no "+" or spaces)
  const message = "Hello, I would like to know more about your services!";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button
        className="insights-button"
        style={{ "--clr": "#00ad54" }}
      >
        <span className="button-decor"></span>
        <div className="button-content">
          <div className="button__icon">
            <svg
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
            >
              <g clipPath="url(#clip0)">
                <circle
                  opacity="0.5"
                  cx="23"
                  cy="23"
                  r="23"
                  fill="url(#paint0_linear)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.35 12.65a2.3 2.3 0 012.3 2.3V27.6a2.3 2.3 0 01-2.3 2.3H22.373c-.304 0-.596.12-.811.334l-4.723 4.694c-.725.721-1.96.207-1.96-.816V31.05a1.15 1.15 0 00-1.15-1.15H12.65a2.3 2.3 0 01-2.3-2.3V14.95a2.3 2.3 0 012.3-2.3h20.7zm-18.4 5.75c0-.635.515-1.15 1.15-1.15h12.65a1.15 1.15 0 010 2.3H16.1a1.15 1.15 0 01-1.15-1.15zm0 4.6c0-.635.515-1.15 1.15-1.15h10.35a1.15 1.15 0 010 2.3H16.1A1.15 1.15 0 0114.95 23z"
                  fill="#fff"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="23"
                  y1="0"
                  x2="23"
                  y2="46"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" stopOpacity="0.71" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id="clip0">
                  <rect width="46" height="46" fill="#fff" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span className="button__text">WhatsApp</span>
        </div>

        <style>{`
          .insights-button {
            text-decoration: none;
            line-height: 1;
            border-radius: 1.5rem;
            overflow: hidden;
            position: relative;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
            background-color: #fff;
            color: #121212;
            border: none;
            cursor: pointer;
          }

          .button-decor {
            position: absolute;
            inset: 0;
            background-color: var(--clr);
            transform: translateX(-100%);
            transition: transform 0.3s;
            z-index: 0;
          }

          .button-content {
            display: flex;
            align-items: center;
            font-weight: 600;
            position: relative;
            overflow: hidden;
          }

          .button__icon {
            width: 48px;
            height: 40px;
            background-color: var(--clr);
            display: grid;
            place-items: center;
          }

          .button__text {
            display: inline-block;
            transition: color 0.2s;
            padding: 2px 1.5rem 2px;
            padding-left: 0.75rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .insights-button:hover .button__text {
            color: #fff;
          }

          .insights-button:hover .button-decor {
            transform: translate(0);
          }
        `}</style>
      </button>
    </a>
  );
};

export default InsightsButton;