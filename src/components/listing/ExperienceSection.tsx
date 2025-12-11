import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { VIDEO_LISTINGS } from '../../data/video-listings';     
import type { VideoListing } from '../../data/video-listings';  

import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

const FILTERS = ["Tất cả", "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Thừa Thiên Huế", "Bình Dương", "Hà Giang"];

const ExperienceSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoListing | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 280; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    // Giảm padding vertical (py-12) cho đỡ trống
    <section className="bg-[#00419E] py-12 text-white overflow-hidden relative">
      
      {/* Họa tiết nền mờ để đỡ đơn điệu */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Thêm max-w-6xl để giới hạn chiều rộng, giúp nút mũi tên gần card hơn */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold uppercase mb-5 tracking-wide">
            Trải nghiệm trọ mới tại các tỉnh thành
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter, index) => (
              <button 
                key={filter}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  index === 0 
                  ? 'bg-white text-[#00419E] border-white' 
                  : 'bg-transparent text-white border-white/30 hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* LIST CAROUSEL */}
        <div className="relative group px-2 md:px-8"> 
            {/* Nút Previous - Thu nhỏ lại và đặt sát hơn */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-[#00419E] p-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 -ml-4"
            >
                <ChevronLeft size={20} strokeWidth={3} />
            </button>

            <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {VIDEO_LISTINGS.map((item) => (
                    <div key={item.id} className="snap-center transform transition-transform duration-300 hover:-translate-y-1">
                        <VideoCard 
                            data={item} 
                            onClick={(video) => setSelectedVideo(video)} 
                        />
                    </div>
                ))}
            </div>

             {/* Nút Next */}
             <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-[#00419E] p-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 -mr-4"
            >
                <ChevronRight size={20} strokeWidth={3} />
            </button>
        </div>

        {/* FOOTER BUTTON */}
        <div className="text-center mt-4">
            <button className="bg-white text-[#00419E] font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition shadow-lg text-xs uppercase tracking-wider hover:shadow-xl transform active:scale-95">
                Xem thêm nhiều hơn
            </button>
        </div>

      </div>

      {selectedVideo && (
        <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
        />
      )}

    </section>
  );
};

export default ExperienceSection;