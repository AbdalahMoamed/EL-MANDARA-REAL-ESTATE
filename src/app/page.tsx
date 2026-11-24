'use client';

import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutPreviewSection from '../components/AboutPreviewSection';
import FeaturesSection from '../components/FeaturesSection';
import UnitTypesSection from '../components/UnitTypesSection';
import VideoSection from '../components/VideoSection';
import ImagePreviewSection from '../components/ImagePreviewSection';
import LocationSection from '../components/LocationSection';
import LeadForm from '../components/LeadForm';

export default function HomePage() {
  const [selectedUnitType, setSelectedUnitType] = useState('residential');

  return (
    <>
      {/* SECTION 1: HERO SECTION */}
      <HeroSection />

      {/* SECTION 2: ABOUT THE PROJECT */}
      <AboutPreviewSection />

      {/* SECTION 3: PROJECT FEATURES */}
      <FeaturesSection />

      {/* SECTION 4: UNIT TYPES */}
      <UnitTypesSection onSelectUnit={(unitId) => setSelectedUnitType(unitId)} />

      {/* SECTION 5: PROJECT VIDEO */}
      <VideoSection />

      {/* SECTION 6: PROJECT IMAGE PREVIEW */}
      <ImagePreviewSection />

      {/* SECTION 7: PROJECT LOCATION */}
      <LocationSection />

      {/* SECTION 8: LEAD GENERATION FORM */}
      <LeadForm initialUnitType={selectedUnitType} />
    </>
  );
}
