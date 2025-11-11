// Layout file to handle generateStaticParams for static export
export async function generateStaticParams() {
  return [
    { id: 'lanz-strategy-6' },
    { id: 'ny-liquidity-reversal' },
    { id: 'sweep-liquidity' },
    { id: 'adx-supertrend' },
  ];
}

export default function StrategyLayout({ children }) {
  return children;
}


