export interface Listing {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  area?: string; 
  location: string;
  isHot?: boolean;
}

export const HOT_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Nhà Trọ Số 153 Trần Quý, Phường 4, Quận 11",
    price: "2,2 triệu/tháng",
    image: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nhà trọ, phòng trọ",
    location: "Quận 11, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 2,
    title: "Nhà Trọ Số 308 Vành Đai Trong, Bình Tân",
    price: "3 triệu/tháng",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
    category: "Nhà trọ, phòng trọ",
    location: "Bình Tân, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 3,
    title: "Mặt Bằng 153 Trần Quý, Phường 7, Quận 11",
    price: "8 triệu/tháng",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    category: "Nhà nguyên căn",
    location: "Quận 11, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 4,
    title: "Phòng cao cấp, full nội thất tại Giáp Nhất",
    price: "4,9 triệu/tháng",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
    category: "Nhà trọ, phòng trọ",
    location: "Thanh Xuân, Thành phố Hà Nội",
    isHot: true,
  },
  {
    id: 5,
    title: "Ký Túc Xá Và Sleepbox Trần Thị Nghỉ",
    price: "1,9 triệu/tháng",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
    category: "Nhà trọ, phòng trọ",
    location: "Gò Vấp, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 6,
    title: "Nhà Trọ 557/14 Hương Lộ 3, Bình Hưng Hòa",
    price: "3,7 triệu/tháng",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    category: "Nhà trọ, phòng trọ",
    area: "30m²",
    location: "Bình Tân, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 7,
    title: "Nhà Trọ 170/32 Bến Vân Đồn, Quận 4",
    price: "2 triệu/tháng",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    category: "Nhà trọ, phòng trọ",
    location: "Quận 4, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 8,
    title: "Nhà Trọ Số 16, Đường T6, Tây Thạnh",
    price: "1,3 triệu/tháng",
    image: "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nhà trọ, phòng trọ",
    area: "20m²",
    location: "Tân Phú, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 9,
    title: "Nhà Trọ 297/20 Phan Huy Ích, Gò Vấp",
    price: "2,3 triệu/tháng",
    image: "https://images.unsplash.com/photo-1608198399988-341f712c3711?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nhà trọ, phòng trọ",
    area: "25m²",
    location: "Gò Vấp, Thành phố Hồ Chí Minh",
    isHot: true,
  },
  {
    id: 10,
    title: "Nhà Nguyên Căn Tại Máy Tơ, Ngô Quyền",
    price: "30 triệu/tháng",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    category: "Nhà nguyên căn",
    location: "Ngô Quyền, Thành phố Hải Phòng",
    isHot: true,
  },
];