import { LISTING_DETAIL } from '../data/mock-detail';

export const ListingService = {
  getDetail: async (id: string | undefined) => {
    // Giả lập delay mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // --- SAU NÀY GỌI API Ở ĐÂY ---
    // return axios.get(`/api/listings/${id}`);
    
    return LISTING_DETAIL;
  }
};