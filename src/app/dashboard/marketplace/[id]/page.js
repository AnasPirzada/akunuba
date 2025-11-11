import InvestmentDetailClient from './InvestmentDetailClient';

// Required for static export - generateStaticParams must be in a server component
export async function generateStaticParams() {
  // Return all investment fund IDs from the marketplace
  // IDs match the funds defined in /dashboard/marketplace/page.js
  const fundIds = [1, 2, 3, 4, 5, 6];

  // Also include listing IDs from Active Offers
  const listingIds = [
    'listing_001',
    'listing_002',
    'listing_003',
    'listing_004',
    'listing_005',
    'listing_006',
  ];

  // Combine both numeric IDs and listing IDs
  const allIds = [
    ...fundIds.map(id => id.toString()),
    ...listingIds,
  ];

  // Convert to required format
  return allIds.map(id => ({
    id: id,
  }));
}

export default function InvestmentDetailPage() {
  return <InvestmentDetailClient />;
}
