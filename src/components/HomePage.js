// src/components/HomePage.js
import React from "react";
import NavbarComponent from "../components/sections/NavbarComponent";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import CatalogSection from "../components/sections/CatalogSection";

const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <HeroSection />
      <FeaturesSection />
      <CatalogSection />
    </div>
  );
};

export default HomePage;
