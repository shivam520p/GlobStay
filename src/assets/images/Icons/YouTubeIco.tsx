import React from "react";

const YouTubeIco: React.FC<{ width: string; height: string }> = ({
  width,
  height,
}) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.168 33.327C33.4724 33.4158 35.41 31.5134 35.5 29.0736V22.7564C35.41 20.3167 33.4724 18.4142 31.168 18.503H19.832C17.5276 18.4142 15.59 20.3167 15.5 22.7564V29.0736C15.59 31.5134 17.5276 33.4158 19.832 33.327H31.168Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.008 22.9238L28.169 25.1981C28.3738 25.3248 28.4997 25.557 28.4997 25.808C28.4997 26.0592 28.3738 26.2914 28.169 26.4179L25.008 28.9063C24.408 29.3372 23.5 28.9698 23.5 28.2964V23.5315C23.5 22.8613 24.409 22.4928 25.008 22.9238Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default YouTubeIco;
