export interface Owner {
  name: string;
  phone: string;
  avatar: string;
}

export interface RoomDetail {
  id: string;
  title: string;
  address: string;
  price: number;
  priceText: string;
  description: string;
  images: string[];
  owner: Owner;
  createdAt: string;
  target: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}