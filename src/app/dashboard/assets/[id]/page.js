import AssetDetailClient from './AssetDetailClient';

// Required for static export - generateStaticParams must be in a server component
export async function generateStaticParams() {
  return [];
}

export default function AssetDetailPage({ params }) {
  return <AssetDetailClient params={params} />;
}
