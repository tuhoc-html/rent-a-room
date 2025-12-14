import React from 'react';
import { PlayCircle } from 'lucide-react';

const GallerySection = ({ images }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[450px] mb-4">
      {/* Cột 1: Ảnh lớn bên trái */}
      <div className="md:col-span-1 h-full relative group overflow-hidden rounded-l-xl">
        <img src={images[0]} alt="Room 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Cột 2: 2 Ảnh nhỏ ở giữa */}
      <div className="md:col-span-1 flex flex-col gap-2 h-full">
        <div className="h-1/2 overflow-hidden relative group">
          <img src={images[1]} alt="Room 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="h-1/2 overflow-hidden relative group">
          <img src={images[2]} alt="Room 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {/* Overlay số ảnh còn lại nếu cần */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
             <span className="text-white font-bold text-xl">+6</span>
          </div>
        </div>
      </div>

      {/* Cột 3: Ảnh/Video bên phải (Chiếm 2 cột trên 4 cột lưới để giống ảnh mẫu rộng hơn) */}
      <div className="md:col-span-2 h-full relative overflow-hidden rounded-r-xl group cursor-pointer">
        <img src={images[3]} alt="Room Video Thumb" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {/* Giả lập giao diện TikTok overlay như ảnh */}
        <div className="absolute top-4 right-4 z-10">
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" className="w-8 h-8 drop-shadow-lg" alt="tiktok"/>
        </div>
        <div className="absolute bottom-4 left-4 z-10 text-white">
           <div className="flex items-center gap-2">
               <PlayCircle size={32} />
               <span className="font-medium">00:10 / 00:52</span>
           </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default GallerySection;