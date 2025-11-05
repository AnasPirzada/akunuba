// Required for static export - generateStaticParams must be in a server component
export function generateStaticParams() {
  // Return placeholder for static export - routes will be handled client-side
  return [{ id: 'placeholder' }];
}

import AssetDetailClient from './AssetDetailClient';

export default function AssetDetailPage({ params }) {
  return <AssetDetailClient params={params} />;
}
