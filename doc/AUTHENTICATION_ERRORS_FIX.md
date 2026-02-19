# Authentication Errors Fix Guide

## Issues Identified

### 1. **401 Unauthorized Errors**
All API requests are failing with `401 Unauthorized` because:
- The authentication token (`access_token`) is missing from `localStorage`
- The token may have expired
- User may not be logged in

### 2. **Failed to Create Link Token**
The "Add Account" button fails because:
- It requires authentication (401 error)
- The token is not being sent with the request

### 3. **Build Error: Duplicate fetchAccounts**
There was a duplicate function declaration (now fixed)

---

## Solutions Implemented

### ✅ 1. Added Authentication Checks

**Before making API calls:**
```javascript
// Check if user is authenticated
if (typeof window !== 'undefined') {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    setError('You must be logged in to link accounts.');
    return;
  }
}
```

### ✅ 2. Improved Error Handling

**Better error messages for different scenarios:**
- `401 Unauthorized`: "Authentication failed. Please log out and log in again."
- `403 Forbidden`: "Banking integration requires Annual subscription."
- `400 Bad Request`: "Invalid request. Please try again."

### ✅ 3. Auto-redirect to Login

**If user is not authenticated, redirect to login:**
```javascript
useEffect(() => {
  if (!isAuthenticated()) {
    router.push('/login');
  }
}, [router]);
```

---

## How to Fix the 401 Errors

### Option 1: Log In Again (Recommended)

1. **Go to the login page**: `/login`
2. **Enter your credentials**
3. **After successful login**, the token will be stored in `localStorage`
4. **Try the "Add Account" button again**

### Option 2: Check Token in Browser

1. **Open Browser DevTools** (F12)
2. **Go to Application/Storage tab**
3. **Check Local Storage**
4. **Look for `access_token`**
5. **If missing or expired**, log in again

### Option 3: Clear and Re-login

If tokens are corrupted:

```javascript
// In browser console:
localStorage.clear();
// Then go to /login and log in again
```

---

## Token Storage

The app stores authentication tokens in `localStorage`:
- **Key**: `access_token`
- **Value**: JWT token from backend
- **Location**: `src/lib/api/client.js` - `getDefaultHeaders()`

**How it works:**
```javascript
const accessToken = localStorage.getItem('access_token');
if (accessToken) {
  headers['Authorization'] = `Bearer ${accessToken}`;
}
```

---

## Testing the Fix

1. **Make sure you're logged in**
   - Go to `/login`
   - Enter credentials
   - Verify token is in localStorage

2. **Test "Add Account" button**
   - Go to `/dashboard/settings`
   - Click "Linked Accounts" tab
   - Click "Add Account"
   - Should get link token (or show proper error if subscription required)

3. **Check for errors**
   - Open DevTools Console
   - Should see successful API calls
   - No more 401 errors

---

## Common Issues

### Issue: "Invalid authentication credentials"
**Solution**: Token expired or invalid. Log out and log in again.

### Issue: "Failed to create link token"
**Solution**: 
1. Check if you're logged in
2. Check if you have Annual subscription (if required)
3. Check backend logs for Plaid configuration

### Issue: Multiple 401 errors on page load
**Solution**: 
- This is normal if you're not logged in
- The app will redirect to login automatically
- After login, errors should stop

---

## Backend Requirements

For the link token endpoint to work:
1. **Backend must have Plaid configured**
2. **Backend must validate the auth token**
3. **Backend must return `link_token` in response**

**Expected Response:**
```json
{
  "link_token": "link-sandbox-xxx"
}
```

---

## Next Steps

1. ✅ **Authentication checks added**
2. ✅ **Error handling improved**
3. ✅ **Auto-redirect to login**
4. ⏳ **User needs to log in**
5. ⏳ **Test "Add Account" button**
6. ⏳ **Complete Plaid Link integration** (install `react-plaid-link`)

---

## Debugging

If errors persist:

1. **Check Network Tab**:
   - Look for `/api/v1/banking/link-token` request
   - Check if `Authorization` header is present
   - Check response status

2. **Check Console**:
   - Look for error messages
   - Check if token exists: `localStorage.getItem('access_token')`

3. **Check Backend**:
   - Verify Plaid is configured
   - Check backend logs for errors
   - Verify endpoint is working: `POST /api/v1/banking/link-token`

---

**Last Updated**: After fixing authentication checks and error handling
