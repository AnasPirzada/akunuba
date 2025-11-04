'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import AssetSearchBar from './components/AssetSearchBar';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';
import RecentTrades from './components/RecentTrades';

export default function TradeEnginePage() {
  const { isDarkMode } = useTheme();

  // State Management
  const [assetClass, setAssetClass] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [orderMode, setOrderMode] = useState('market');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [quantity, setQuantity] = useState('10');
  const [limitPrice, setLimitPrice] = useState('185.92');
  const [openUntil, setOpenUntil] = useState('2023-09-15');
  const [brokerageAccount, setBrokerageAccount] = useState('****4321');
  const [orderDuration, setOrderDuration] = useState('day-only');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Data
  const recentTrades = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '$185.92',
      change: '+1.2%',
      positive: true,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: '$354.58',
      change: '-0.5%',
      positive: false,
    },
    {
      symbol: 'GOOGLE',
      name: 'Alphabet Inc.',
      price: '$131.74',
      change: '+0.8%',
      positive: true,
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: '$137.85',
      change: '-0.3%',
      positive: false,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: '$242.68',
      change: '-1.5%',
      positive: false,
    },
  ];

  const recentAAPlTrades = [
    { type: 'Buy', shares: 5, price: '$184.63', date: '09/10/2023' },
    { type: 'Sell', shares: 7, price: '$179.21', date: '08/25/2023' },
  ];

  // Handlers
  const handlePlaceOrder = () => {
    setShowConfirmation(true);
  };

  const calculateTotal = () => {
    const total = parseFloat(quantity || 0) * parseFloat(limitPrice || 0);
    return total.toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className=''>
        {/* Header */}
        <div className='mb-6'>
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Trade Engine
          </h1>
        </div>

        {/* Asset Search Bar */}
        <AssetSearchBar
          assetClass={assetClass}
          setAssetClass={setAssetClass}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
        />

        {/* Recent Trades */}
        <RecentTrades
          trades={recentTrades}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
          isDarkMode={isDarkMode}
        />

        {/* Main Trading Interface */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Order Form */}
          <OrderForm
            orderType={orderType}
            setOrderType={setOrderType}
            orderMode={orderMode}
            setOrderMode={setOrderMode}
            selectedStock={selectedStock}
            quantity={quantity}
            setQuantity={setQuantity}
            limitPrice={limitPrice}
            setLimitPrice={setLimitPrice}
            openUntil={openUntil}
            setOpenUntil={setOpenUntil}
            brokerageAccount={brokerageAccount}
            setBrokerageAccount={setBrokerageAccount}
            orderDuration={orderDuration}
            setOrderDuration={setOrderDuration}
            notes={notes}
            setNotes={setNotes}
            calculateTotal={calculateTotal}
            handlePlaceOrder={handlePlaceOrder}
            isDarkMode={isDarkMode}
          />

          {/* Order Summary */}
          <OrderSummary
            quantity={quantity}
            limitPrice={limitPrice}
            calculateTotal={calculateTotal}
            recentTrades={recentAAPlTrades}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Order Confirmation Modal */}
        {showConfirmation && (
          <OrderConfirmationModal
            isDarkMode={isDarkMode}
            orderType={orderType}
            stock={selectedStock}
            quantity={quantity}
            pricePerUnit={limitPrice}
            totalValue={calculateTotal()}
            onClose={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
