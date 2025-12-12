import { useState, useEffect } from 'react';
import { ListingService } from '../services/listing.service';
import { LISTING_DETAIL } from '../data/mock-detail';

type DetailType = typeof LISTING_DETAIL;

export const useListingDetail = (id: string | undefined) => {
  const [data, setData] = useState<DetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await ListingService.getDetail(id);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { data, loading };
};