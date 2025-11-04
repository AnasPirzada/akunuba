# Trade Engine Components

This directory contains all the reusable components for the Trade Engine page, professionally organized for better maintainability and scalability.

## Component Structure

```
components/
├── AssetSearchBar.js           # Asset class selector and search input
├── RecentTrades.js             # Carousel of recent trading instruments
├── OrderForm.js                # Left column - Complete order form with all inputs
├── OrderSummary.js             # Right column - Order details, stats, and timeline
├── OrderConfirmationModal.js   # Modal displayed after placing an order
└── README.md                   # This file
```

## Components Overview

### 1. **AssetSearchBar.js**
- **Purpose**: Allows users to select asset class and search for instruments
- **Props**:
  - `assetClass`, `setAssetClass` - Asset class state management
  - `searchQuery`, `setSearchQuery` - Search query state management
  - `isDarkMode` - Theme state

### 2. **RecentTrades.js**
- **Purpose**: Displays a carousel of recent trading instruments
- **Props**:
  - `trades` - Array of trade objects with symbol, name, price, change
  - `selectedStock`, `setSelectedStock` - Selected stock state management
  - `isDarkMode` - Theme state

### 3. **OrderForm.js**
- **Purpose**: Main order form with buy/sell toggle, quantity, price, and settings
- **Props**:
  - All order-related states and setters
  - `calculateTotal` - Function to calculate order total
  - `handlePlaceOrder` - Order submission handler
  - `isDarkMode` - Theme state

### 4. **OrderSummary.js**
- **Purpose**: Displays order summary, market stats, recent trades, and execution timeline
- **Props**:
  - `quantity`, `limitPrice` - Order details
  - `calculateTotal` - Function to calculate total
  - `recentTrades` - Array of recent AAPL trades
  - `isDarkMode` - Theme state

### 5. **OrderConfirmationModal.js**
- **Purpose**: Modal shown after placing an order with confirmation details and status
- **Props**:
  - `orderType`, `stock`, `quantity`, `pricePerUnit`, `totalValue` - Order details
  - `onClose` - Function to close modal
  - `isDarkMode` - Theme state

## Benefits of This Structure

✅ **Maintainability**: Each component has a single responsibility
✅ **Reusability**: Components can be reused in other parts of the app
✅ **Testability**: Easier to write unit tests for individual components
✅ **Scalability**: Easy to add new features without cluttering main file
✅ **Readability**: Main page file is now clean and easy to understand
✅ **Performance**: Components can be optimized individually

## Usage Example

```jsx
import AssetSearchBar from './components/AssetSearchBar';
import OrderForm from './components/OrderForm';

// In your page component
<AssetSearchBar
  assetClass={assetClass}
  setAssetClass={setAssetClass}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  isDarkMode={isDarkMode}
/>

<OrderForm
  orderType={orderType}
  setOrderType={setOrderType}
  // ... other props
/>
```

## Future Enhancements

Consider adding:
- Custom hooks for state management (e.g., `useOrderForm`, `useTrade`)
- TypeScript types/interfaces for better type safety
- Storybook documentation for component library
- Unit tests using Jest/React Testing Library
- Performance optimization with React.memo where needed

## Code Standards

- All components are client-side ('use client')
- Consistent naming conventions (PascalCase for components)
- Props are destructured for clarity
- Responsive design using Tailwind CSS
- Dark mode support via isDarkMode prop

