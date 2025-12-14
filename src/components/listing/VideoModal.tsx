import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { VideoListing } from '../../data/video-listings';

interface VideoModalProps {
  video: VideoListing;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Nút đóng */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
      >
        <X size={32} />
      </button>

      {/* Container chứa Video */}
      <div className="relative w-full h-full max-w-[500px] max-h-[90vh] flex flex-col bg-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Video Player */}
        <video 
          src={video.videoUrl}
          className="w-full h-full object-contain bg-black"
          controls 
          autoPlay 
        />


      </div>
    </div>
  );
};

export default VideoModal;