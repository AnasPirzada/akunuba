# Account Linking Process - Step by Step Guide

Complete guide explaining how a user links their bank account using the integrated APIs.

---

## Overview

The account linking process uses **Plaid Link** to securely connect bank accounts. The flow involves:
1. Getting a Plaid Link token from your backend
2. Opening Plaid Link UI for the user
3. User authenticates with their bank
4. Completing the link with the public token

---

## Complete Flow Diagram

```
User clicks "Add Account"
    ↓
1. Frontend calls: POST /api/v1/banking/link-token
    ↓
2. Backend returns: { link_token: "link-sandbox-xxx" }
    ↓
3. Frontend initializes Plaid Link with link_token
    ↓
4. User selects bank and logs in via Plaid UI
    ↓
5. Plaid returns: public_token
    ↓
6. Frontend calls: POST /api/v1/banking/link { public_token }
    ↓
7. Backend exchanges public_token and links accounts
    ↓
8. Success: { message: "2 account(s) linked successfully" }
    ↓
9. Frontend refreshes account list
```

---

## Step-by-Step Process

### Step 1: User Initiates Account Linking

**User Action**: Clicks "Add Account" or "Link Bank Account" button

**Frontend Code**:
```javascript
import { createBankLinkToken, linkBankAccount } from '@/utils/bankingApi';

const handleAddAccount = async () => {
  try {
    // Step 1: Get Plaid Link Token
    const response = await createBankLinkToken();
    const linkToken = response.data?.linkToken || response.linkToken;
    
    // Step 2: Initialize Plaid Link (see Step 2)
    // ...
  } catch (error) {
    console.error('Failed to create link token:', error);
  }
};
```

---

### Step 2: Get Plaid Link Token

**API Call**: `POST /api/v1/banking/link-token`

**Request**:
- Headers: `Authorization: Bearer <user_token>`
- Body: (empty)

**Response**:
```json
{
  "link_token": "link-sandbox-xxx"
}
```

**What Happens**:
- Backend creates a Plaid Link token for this user session
- Token is valid for a limited time (typically 4 hours)
- Token is user-specific and secure

**Error Cases**:
- `401 Unauthorized`: User not logged in
- `403 Forbidden`: User doesn't have Annual subscription (if required)
- `500 Internal Server Error`: Backend/Plaid issue

---

### Step 3: Initialize Plaid Link UI

**Frontend Code** (using `react-plaid-link`):
```javascript
import { usePlaidLink } from 'react-plaid-link';

const { open, ready } = usePlaidLink({
  token: linkToken, // From Step 2
  onSuccess: async (publicToken, metadata) => {
    // This callback runs when user successfully connects
    // publicToken is what we need for Step 4
    console.log('Plaid Link Success!', publicToken);
    
    // Step 4: Complete the linking
    await completeAccountLinking(publicToken);
  },
  onExit: (err, metadata) => {
    if (err) {
      console.error('Plaid Link Error:', err);
    }
    // User closed the modal or there was an error
  },
});

// Open Plaid Link when ready
useEffect(() => {
  if (ready && linkToken) {
    open();
  }
}, [ready, linkToken, open]);
```

**What Happens**:
- Plaid Link modal opens
- User sees list of banks
- User selects their bank
- User logs in with bank credentials (handled by Plaid securely)
- User may need to verify identity (2FA, security questions, etc.)
- User selects which accounts to link (checking, savings, etc.)

---

### Step 4: Complete Account Linking

**API Call**: `POST /api/v1/banking/link`

**Request**:
- Headers: `Authorization: Bearer <user_token>`
- Body:
```json
{
  "public_token": "public-sandbox-xxx"
}
```

**Response**:
```json
{
  "message": "2 account(s) linked successfully"
}
```

**Frontend Code**:
```javascript
const completeAccountLinking = async (publicToken) => {
  try {
    const response = await linkBankAccount({
      public_token: publicToken
    });
    
    console.log('Account linked:', response.data?.message || response.message);
    
    // Step 5: Refresh account list
    await refreshAccountList();
    
    // Show success message
    showSuccessToast('Account linked successfully!');
  } catch (error) {
    console.error('Failed to link account:', error);
    
    // Handle specific errors
    if (error.status === 403) {
      showErrorToast('Banking integration requires Annual subscription');
    } else if (error.status === 400) {
      showErrorToast('Failed to link account. Please try again.');
    } else {
      showErrorToast('An error occurred. Please try again.');
    }
  }
};
```

**What Happens on Backend**:
1. Backend receives `public_token` from Plaid
2. Backend exchanges `public_token` for `access_token` (Plaid API)
3. Backend fetches account information from Plaid
4. Backend creates linked account records in database
5. Backend may fetch initial balance and transactions
6. Returns success message with count of linked accounts

**Error Responses**:
- `400 Bad Request`: "Failed to link account" or "No accounts found"
- `403 Forbidden`: "Banking integration requires Annual subscription"
- `401 Unauthorized`: Invalid or expired token
- `500 Internal Server Error`: Backend/Plaid issue

---

### Step 5: Refresh Account List

**API Call**: `GET /api/v1/banking/accounts`

**Frontend Code**:
```javascript
import { getBankAccounts } from '@/utils/bankingApi';

const refreshAccountList = async () => {
  try {
    const response = await getBankAccounts();
    const accounts = response.data || response; // Handle different response formats
    
    // Update UI with new accounts
    setAccounts(accounts);
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
  }
};
```

**Response**:
```json
[
  {
    "id": "uuid-1",
    "institution_name": "Chase Bank",
    "account_name": "Checking Account",
    "account_type": "banking",
    "balance": 5000.00,
    "currency": "USD"
  },
  {
    "id": "uuid-2",
    "institution_name": "Chase Bank",
    "account_name": "Savings Account",
    "account_type": "banking",
    "balance": 10000.00,
    "currency": "USD"
  }
]
```

---

## Complete Example Implementation

### React Component Example

```javascript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { 
  createBankLinkToken, 
  linkBankAccount, 
  getBankAccounts 
} from '@/utils/bankingApi';

export default function LinkedAccountsPage() {
  const [linkToken, setLinkToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 1: Get link token when user clicks "Add Account"
  const handleAddAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await createBankLinkToken();
      const token = response.data?.linkToken || response.linkToken;
      
      if (token) {
        setLinkToken(token);
      } else {
        throw new Error('Failed to get link token');
      }
    } catch (err) {
      setError(err.message || 'Failed to initialize account linking');
      setLoading(false);
    }
  };

  // Step 4: Complete linking after Plaid success
  const handlePlaidSuccess = useCallback(async (publicToken, metadata) => {
    try {
      setLoading(true);
      setError(null);
      
      // Complete the linking
      const response = await linkBankAccount({
        public_token: publicToken
      });
      
      console.log('Linked:', response.data?.message || response.message);
      
      // Refresh account list
      await loadAccounts();
      
      // Reset link token
      setLinkToken(null);
      
      alert('Account linked successfully!');
    } catch (err) {
      if (err.status === 403) {
        setError('Banking integration requires Annual subscription');
      } else {
        setError(err.message || 'Failed to link account');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Plaid Link configuration
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handlePlaidSuccess,
    onExit: (err, metadata) => {
      if (err) {
        setError(err.message || 'Plaid Link exited with error');
      }
      setLinkToken(null);
      setLoading(false);
    },
  });

  // Open Plaid Link when token is ready
  useEffect(() => {
    if (linkToken && ready) {
      open();
      setLoading(false);
    }
  }, [linkToken, ready, open]);

  // Load accounts on mount
  const loadAccounts = useCallback(async () => {
    try {
      const response = await getBankAccounts();
      const accountsList = response.data || response;
      setAccounts(Array.isArray(accountsList) ? accountsList : []);
    } catch (err) {
      console.error('Failed to load accounts:', err);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return (
    <div>
      <h1>Linked Accounts</h1>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <button 
        onClick={handleAddAccount}
        disabled={loading || !ready}
      >
        {loading ? 'Connecting...' : 'Add Account'}
      </button>
      
      <div className="accounts-list">
        {accounts.map(account => (
          <div key={account.id} className="account-card">
            <h3>{account.accountName}</h3>
            <p>{account.institutionName}</p>
            <p>Balance: ${account.balance?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Prerequisites

### 1. User Must Be Authenticated
- User must have a valid authentication token
- Token is automatically included in API requests via `apiClient`

### 2. Subscription Check (Optional)
- Some implementations require Annual subscription
- Backend returns `403 Forbidden` if subscription required but not active
- Frontend should check subscription before showing "Add Account" button

### 3. Plaid Link Library
```bash
npm install react-plaid-link
```

---

## Error Handling

### Common Errors

1. **403 Forbidden - Subscription Required**
   ```javascript
   if (error.status === 403) {
     // Show upgrade prompt
     showUpgradeModal();
   }
   ```

2. **400 Bad Request - No Accounts Found**
   ```javascript
   if (error.status === 400) {
     // User connected but no accounts available
     showError('No accounts found. Please try a different bank.');
   }
   ```

3. **Network Errors**
   ```javascript
   if (!error.status) {
     // Network issue
     showError('Connection error. Please check your internet.');
   }
   ```

---

## Security Notes

1. **Link Token**: 
   - Short-lived (4 hours)
   - User-specific
   - Cannot be reused

2. **Public Token**:
   - One-time use
   - Must be exchanged immediately
   - Expires quickly

3. **Access Token** (Backend):
   - Stored securely on backend
   - Never exposed to frontend
   - Used for ongoing account access

---

## Post-Linking Actions

After successfully linking an account, you may want to:

1. **Refresh Balance**:
   ```javascript
   await refreshBankAccount(accountId);
   ```

2. **Sync Transactions**:
   ```javascript
   await syncBankTransactions(accountId);
   ```

3. **Get Account Details**:
   ```javascript
   const details = await getBankAccount(accountId);
   ```

---

## Summary

**The Complete Flow**:
1. ✅ User clicks "Add Account"
2. ✅ Frontend gets `link_token` from backend
3. ✅ Plaid Link UI opens with `link_token`
4. ✅ User authenticates with bank via Plaid
5. ✅ Plaid returns `public_token`
6. ✅ Frontend sends `public_token` to backend
7. ✅ Backend links accounts and returns success
8. ✅ Frontend refreshes account list
9. ✅ User sees newly linked accounts

**Key APIs Used**:
- `POST /api/v1/banking/link-token` - Get Plaid Link token
- `POST /api/v1/banking/link` - Complete linking with public token
- `GET /api/v1/banking/accounts` - List all linked accounts

**Functions Available**:
- `createBankLinkToken()` - Step 1
- `linkBankAccount({ public_token })` - Step 4
- `getBankAccounts()` - Step 5
