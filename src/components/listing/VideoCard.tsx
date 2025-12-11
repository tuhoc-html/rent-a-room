import React from 'react';
import { MapPin, PlayCircle } from 'lucide-react';
import type { VideoListing } from '../../data/video-listings';

interface VideoCardProps {
  data: VideoListing;
  onClick: (video: VideoListing) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={() => onClick(data)}
      // CHỈNH SỬA KÍCH THƯỚC Ở ĐÂY:
      // w-[220px]: Nhỏ gọn hơn (cũ là 280px)
      // rounded-xl: Bo góc vừa phải
      className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group flex-shrink-0 w-[220px] md:w-[240px] border border-gray-100 relative hover:shadow-2xl transition-all duration-300"
    >
      {/* VIDEO THUMBNAIL */}
      <div className="relative aspect-[9/16] bg-gray-900">
        <video
          src={data.videoUrl}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          muted
          preload="metadata"
        />
        
        {/* Overlay tối mờ dưới chân để text rõ hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>

        {/* Nút Play nhỏ gọn hơn */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                <PlayCircle size={24} className="text-white fill-white" />
             </div>
        </div>

        {/* Tags nhỏ xinh */}
        {data.tags && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full px-2 text-center z-10">
            {data.tags.map(tag => (
                <span key={tag} className="inline-block bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase backdrop-blur-sm">
                    {tag}
                </span>
            ))}
          </div>
        )}

        {/* THÔNG TIN ĐÈ LÊN VIDEO (Style TikTok) */}
        {/* Đưa thông tin vào trong ảnh luôn cho gọn, bỏ phần trắng bên dưới */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-sm font-bold line-clamp-2 leading-tight mb-1 drop-shadow-md">
                {data.title}
            </h3>
            <div className="flex items-center gap-1 text-[10px] text-gray-200 mb-1 opacity-90">
                <MapPin size={10} />
                <span className="truncate">{data.location}</span>
            </div>
            <div className="text-[#FFD700] font-bold text-sm drop-shadow-md">
                {data.price}
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default VideoCard;