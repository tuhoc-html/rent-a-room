// src/data/mockDetail.ts
export const roomData = {
  id: "308",
  title: "NHÀ TRỌ SỐ 308 VÀNH ĐAI TRONG, BÌNH HƯNG HÒA B, BÌNH TÂN, HỒ CHÍ MINH",
  address: "308 Vành Đai Trong, Bình Hưng Hoà B, Bình Tân, Hồ Chí Minh",
  price: 3000000,
  priceText: "3 triệu/tháng",
  description: `
    CHÍNH CHỦ CHO THUÊ PHÒNG TRỌ TẠI QUẬN BÌNH TÂN
    - Địa Chỉ: 308 Vành Đai Trong, Bình Hưng Hòa B, Bình Tân
    - Giá: 3tr - 4tr5, Hiện đang trống 5 phòng
    - Liên hệ chị Nhung: 0932732131 Call/Zalo (Chính Chủ)
    - Nội thất: Máy lạnh, giường nệm, tủ đồ, bàn ghế, cửa sổ lớn, vệ sinh trong
    - Điện 4k, Nước 100k, Dịch vụ 200k
    - Có sân thượng phơi đồ, có máy giặt chung
    - Giờ giấc tự do, không chung chủ, bãi xe riêng
    - Khu trọ nằm ngay mặt tiền đường lớn
    - Gần các cửa hàng tiện lợi, aeon mall bình tân
    - Thuận tiện di chuyển qua quận 5, quận 6, quận 10, quận 11
    - Hợp đồng tối thiểu 6 tháng, cọc 1 tháng
  `,
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070", // Ảnh trái lớn
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070", // Ảnh giữa trên
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980", // Ảnh giữa dưới
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", // Ảnh phải (Video thumb)
  ],
  owner: {
    name: "Chị Nhung",
    phone: "0932732131",
    avatar: "https://ui-avatars.com/api/?name=Chi+Nhung&background=random"
  },
  createdAt: "06-12-2025",
  target: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
  amenities: [
    "Wifi", "Vệ sinh trong", "Phòng tắm",
    "Bình nóng lạnh", "Kệ bếp", "Máy giặt",
    "Điều hòa", "Tủ lạnh", "Giường nệm",
    "Tủ áo quần", "Ban công/sân thượng", "Bãi để xe riêng",
    "Camera an ninh"
  ],
  coordinates: { lat: 10.755, lng: 106.608 } // Tọa độ giả lập khu Bình Tân
};