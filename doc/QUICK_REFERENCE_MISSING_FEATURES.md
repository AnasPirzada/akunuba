# Quick Reference: Missing Features & APIs

## 🔴 Critical - No API Integration

### 1. Analytics Page (`/dashboard/analytics`)
- **Status**: ❌ **100% Hardcoded Data**
- **Missing APIs**:
  - `GET /api/v1/analytics/portfolio`
  - `GET /api/v1/analytics/performance`
  - `GET /api/v1/analytics/risk`
- **File**: `src/app/dashboard/analytics/page.js`
- **Priority**: 🔥 **HIGHEST** - Complete page with no integration

---

## 🔴 High Priority - Not Integrated

### 2. Investment Management - Extra APIs
**Location**: `src/utils/investmentApi.js` (lines 432-493)

| Feature | API Endpoint | Service Function | UI Integration |
|---------|-------------|------------------|----------------|
| Investment Performance | `GET /investment/performance` | ✅ `getInvestmentPerformance()` | ❌ Missing |
| Investment Analytics | `GET /investment/analytics` | ✅ `getInvestmentAnalytics()` | ❌ Missing |
| Investment Recommendations | `GET /investment/recommendations` | ✅ `getInvestmentRecommendations()` | ❌ Missing |
| Adjust Goal | `POST /investment/goals/{id}/adjust` | ❌ Not implemented | ❌ Missing |
| Strategy Backtest | `POST /investment/strategies/{id}/backtest` | ❌ Not implemented | ❌ Missing |
| Strategy Performance | `GET /investment/strategies/{id}/performance` | ❌ Not implemented | ❌ Missing |
| Clone Strategy | `POST /investment/strategies/{id}/clone` | ❌ Not implemented | ❌ Missing |
| Investment Watchlist | `GET/POST/DELETE /investment/watchlist` | ❌ Not implemented | ❌ Missing |

---

## 🟡 Medium Priority - Partially Integrated

### 3. Marketplace - Remove from Watchlist
- **Status**: ⚠️ TODO comment in code
- **Location**: `src/app/dashboard/marketplace/page.js:791`
- **API Function**: ✅ `removeFromWatchlist()` exists
- **Action**: Replace TODO with API call

### 4. Portfolio APIs - Need Verification
- **Portfolio Risk**: `GET /portfolio/risk` - Function exists, verify UI usage
- **Portfolio Benchmark**: `GET /portfolio/benchmark` - Function exists, verify UI usage

### 5. Reports APIs - Need Verification
- Verify if all report generation, listing, download features are integrated

---

## ✅ Fully Integrated (No Action Needed)

- ✅ Authentication (Login, Register, 2FA, Password Reset)
- ✅ User Profile & Settings
- ✅ Assets Management
- ✅ KYC/KYB Verification
- ✅ Marketplace (Listings, Offers, Escrow)
- ✅ Payments & Billing
- ✅ Accounts & Banking
- ✅ Trading & Trade Engine
- ✅ Documents Management
- ✅ Support Tickets
- ✅ Concierge/Appraisals
- ✅ CRM Dashboard
- ✅ Compliance Center
- ✅ Entity Structure
- ✅ Portfolio Overview (Summary, Performance, Allocation, Holdings)
- ✅ Crypto Portfolio
- ✅ Investment Overview (Assets, Activity, Crypto Prices, Trader Profile)
- ✅ Investment Goals
- ✅ Investment Strategies (List, Create, Update, Delete, Comments, Boost, Apply)

---

## 📋 Quick Action Items

### Immediate (This Week)
1. [ ] **Analytics Page** - Integrate all 3 analytics APIs
2. [ ] **Marketplace Remove Watchlist** - Replace TODO with API call

### Short Term (This Month)
3. [ ] **Investment Recommendations** - Add recommendations section
4. [ ] **Investment Watchlist** - Implement full watchlist feature
5. [ ] **Investment Performance** - Add performance metrics display

### Medium Term (Next Month)
6. [ ] **Strategy Backtest** - Add backtest functionality
7. [ ] **Strategy Performance** - Add performance tracking
8. [ ] **Clone Strategy** - Add clone button
9. [ ] **Adjust Goal** - Add goal adjustment feature

### Verification Tasks
10. [ ] Verify Portfolio Risk API usage
11. [ ] Verify Portfolio Benchmark API usage
12. [ ] Verify Reports APIs integration

---

## 📊 Statistics

- **Total API Endpoints**: ~200+
- **Fully Integrated**: ~85% (170+ endpoints)
- **Partially Integrated**: ~10% (20 endpoints)
- **Not Integrated**: ~5% (10-15 endpoints)

---

## 🔍 How to Find Missing Features

1. **Search for hardcoded data**: Look for static values in UI components
2. **Search for TODO comments**: `grep -r "TODO" src/`
3. **Check service files**: Compare API endpoints with UI usage
4. **Check for "Structure only" comments**: Indicates not integrated

---

**Last Updated**: Based on comprehensive codebase analysis
