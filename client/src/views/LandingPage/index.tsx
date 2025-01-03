import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import styles from "./landingPage.module.css";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function LandingPage() {
  return (
    <main className={styles.pageWrapper}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
