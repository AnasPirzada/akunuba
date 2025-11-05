import InvestmentDetailClient from './InvestmentDetailClient';

// Required for static export - generateStaticParams must be in a server component
export async function generateStaticParams() {
  return [];
}

export default function InvestmentDetailPage({ params }) {
  return <InvestmentDetailClient params={params} />;
}
