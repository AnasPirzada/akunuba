// Required for static export - generateStaticParams must be in a server component
export function generateStaticParams() {
  // Return placeholder for static export - routes will be handled client-side
  return [{ id: 'placeholder' }];
}

import InvestmentDetailClient from './InvestmentDetailClient';

export default function InvestmentDetailPage({ params }) {
  return <InvestmentDetailClient params={params} />;
}
