import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={494}
    viewBox="0 0 280 491"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="136" cy="119" r="118" />
    <rect x="1" y="308" rx="27" ry="27" width="280" height="85" />
    <rect x="0" y="264" rx="11" ry="11" width="279" height="27" />
    <rect x="1" y="421" rx="18" ry="18" width="97" height="31" />
    <rect x="127" y="409" rx="22" ry="22" width="149" height="45" />
  </ContentLoader>
);
