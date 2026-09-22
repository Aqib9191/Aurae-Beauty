import React from 'react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { BeautyPhilosophy } from '../components/BeautyPhilosophy';
import { RoutineBuilder } from '../components/RoutineBuilder';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { SpecialOfferSection } from '../components/SpecialOfferSection';
import { NewArrivals } from '../components/NewArrivals';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { SocialGallery } from '../components/SocialGallery';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <BeautyPhilosophy />
      <RoutineBuilder />
      <PromotionalBanner />
      <SpecialOfferSection />
      <NewArrivals />
      <CustomerReviewsSection />
      <SocialGallery />
      <Newsletter />
    </div>
  );
};
