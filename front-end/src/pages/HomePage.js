import React from "react";
import BannerSection from "../utils/components/BannerSection";
import ContentSectionFirst from "../components/Home/ContentSectionFirst";

export default function HomePage() {
  return (
    <div className="home_page  h-full my-10 caret-transparent">
      <BannerSection
        img="section-img-1.jpg"
        children={<ContentSectionFirst />}
        background="#00b388"
      />
      <BannerSection
        img="section-img-1.jpg"
        children={<ContentSectionFirst />}
        background="#00b388"
      />
      <BannerSection
        img="section-img-1.jpg"
        children={<ContentSectionFirst />}
        background="#00b388"
      />
      <BannerSection
        img="section-img-1.jpg"
        children={<ContentSectionFirst />}
        background="#00b388"
      />
    </div>
  );
}
