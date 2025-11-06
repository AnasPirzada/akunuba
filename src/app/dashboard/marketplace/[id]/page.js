// Required for static export - generateStaticParams must be in a server component
export function generateStaticParams() {
  // Return placeholder - actual IDs handled client-side via URL
  return [{ id: 'placeholder' }];
}

import InvestmentDetailClient from './InvestmentDetailClient';

export default function InvestmentDetailPage() {
  // Don't pass params - let client component read from URL directly
  return <InvestmentDetailClient />;
}
