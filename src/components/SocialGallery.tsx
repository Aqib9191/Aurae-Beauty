import React from 'react';
import { businessConfig } from '../config/business';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const SocialGallery: React.FC = () => {
  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      tag: '#AuraeBlush',
      caption: 'Soft touch warm apricot glow on sunlit afternoons.',
    },
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
      tag: '#GlowSerum',
      caption: '72-hour deep hyaluronic hydration for effortless mornings.',
    },
    {
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
      tag: '#VelvetMatte',
      caption: 'Rose Nude swipe with wild mango butter comfort.',
    },
    {
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
      tag: '#LashDefine',
      caption: 'Sculpted, panoramic length without weight or smudging.',
    },
    {
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
      tag: '#SilkHairCare',
      caption: 'Restoring dry ends with cold-pressed Moroccan argan.',
    },
    {
      image: 'https://images.unsplash.com/photo-1608248597359-2ff9e3b1c676?w=800&auto=format&fit=crop&q=80',
      tag: '#RoseGlowBody',
      caption: 'Pure Damask rose shimmer on collarbones and limbs.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5ECE4] border-t border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans">
            Community &amp; Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
            THE AURAÉ GLOW
          </h2>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Tag <strong className="text-[#211D1B]">@auraebeauty</strong> on Instagram and TikTok to be featured in our seasonal beauty editorial.
          </p>

          <div className="mt-4">
            <a
              href={businessConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFFFF] border border-[#E0D7CE] text-xs font-semibold text-[#211D1B] hover:border-[#8E3E53] hover:text-[#8E3E53] transition-colors shadow-2xs"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>FOLLOW US ON INSTAGRAM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#EAE0D5] border border-[#E5DACF] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#211D1B]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white text-left">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">
                  {item.tag}
                </span>
                <p className="text-[11px] leading-tight text-[#E5DACF] mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
