import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Check, ShoppingBag, Sparkles, Droplets, Sun, Sparkle } from 'lucide-react';

export const RoutineBuilder: React.FC = () => {
  const { products, addToCart, navigateTo } = useShop();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);

  const steps = [
    {
      stepNumber: '01',
      title: 'Cleanse',
      category: 'Skincare',
      icon: Droplets,
      explanation: 'Wash away impurities, environmental pollutants, and makeup while preserving the skin’s natural lipid mantle.',
      productId: 'lum-06', // Gentle Foaming Cleanser
    },
    {
      stepNumber: '02',
      title: 'Treat',
      category: 'Skincare',
      icon: Sparkles,
      explanation: 'Target dehydration and uneven tone with concentrated hyaluronic peptides and clarifying botanicals.',
      productId: 'lum-01', // Hydrating Glow Serum
    },
    {
      stepNumber: '03',
      title: 'Moisturize',
      category: 'Skincare',
      icon: Sun,
      explanation: 'Lock in 72-hour deep hydration, reinforce barrier ceramides, and cushion skin with a lightweight veil.',
      productId: 'lum-03', // Daily Radiance Moisturizer
    },
    {
      stepNumber: '04',
      title: 'Glow',
      category: 'Lips & Body',
      icon: Sparkle,
      explanation: 'Complete your daily ritual with velvety tinted hydration and luminous all-day comfort.',
      productId: 'lum-16', // Tinted Lip Glow Oil
    },
  ];

  const currentStep = steps[activeStep];
  const recommendedProduct = products.find((p) => p.id === currentStep.productId) || products[0];

  const handleAddCurrentToCart = () => {
    setIsAdding(true);
    addToCart(recommendedProduct, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans">
            Specialized Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
            BUILD YOUR ROUTINE
          </h2>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Follow our four-step ritual curated by beauty specialists to achieve effortless, lit-from-within radiance every single day.
          </p>
        </div>

        {/* 4 Step Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#211D1B] text-[#FAF8F5] border-[#211D1B] shadow-md -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#524A45] border-[#E8E1D9] hover:border-[#D4C8BD] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isSelected ? 'text-[#D4AF37]' : 'text-[#8E3E53]'}`}>
                    Step {step.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#A89F91]'}`} />
                </div>
                <h3 className="font-serif text-lg font-bold block mb-1">
                  {step.title}
                </h3>
                <span className={`text-[11px] block font-sans ${isSelected ? 'text-[#D8CCC4]' : 'text-[#8C7E77]'}`}>
                  {step.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Card */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DACF] p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="md:col-span-5">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFEA] border border-[#E8E1D9] group">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#8E3E53] text-[#FAF8F5] text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full">
                  Step {currentStep.stepNumber} Essential
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#8E3E53] uppercase tracking-wider block">
                  {currentStep.title} Phase • {currentStep.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B] mt-1">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#615752] mt-2 leading-relaxed">
                  {currentStep.explanation}
                </p>
              </div>

              {/* Product Benefits list */}
              <div className="space-y-1.5 pt-2">
                {recommendedProduct.benefits.slice(0, 2).map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-[#524A45]">
                    <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action buttons */}
              <div className="pt-4 border-t border-[#F0EBE5] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#8C7E77] block">Price</span>
                  <span className="font-serif text-2xl font-bold text-[#211D1B]">
                    Rs. {recommendedProduct.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => navigateTo(`/product/${recommendedProduct.id}`)}
                    className="px-4 py-2.5 bg-[#F5EFEA] hover:bg-[#EFE9E2] text-[#211D1B] text-xs font-semibold rounded-xl transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={handleAddCurrentToCart}
                    className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      isAdding
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] shadow-xs'
                    }`}
                  >
                    {isAdding ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{isAdding ? 'Added to Bag' : 'Add to Routine'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
