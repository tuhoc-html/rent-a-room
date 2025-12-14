export interface VideoListing {
  id: number;
  title: string;
  location: string;
  price: string;
  videoUrl: string;
  rating: number;
  tags?: string[];
}

export const VIDEO_LISTINGS: VideoListing[] = [ 
  {
    id: 1,
    title: "Review trọ mới tại Quận 7",
    location: "Quận 7, TP.HCM",
    price: "3,5 triệu/tháng",
    videoUrl: "../../public/videos/hostel-1.mp4", 
    rating: 4.8,
    tags: ["REVIEW CHÂN THỰC"]
  },
];