# Link Token 400 Bad Request Error - Fix Guide

## Issue
Getting `400 Bad Request` when calling `POST /api/v1/banking/link-token`

## Root Causes

### 1. **Request Body Issue** ✅ FIXED
- **Problem**: `apiPost` was sending `JSON.stringify({})` even for empty body
- **Solution**: Modified `apiPost` to not send body when data is `undefined` or `null`
- **Fix Applied**: Now passes `undefined` to avoid sending empty JSON object

### 2. **Backend Configuration Issue** (Possible)
The 400 error could also indicate:
- **Plaid not configured** on backend
- **Missing Plaid credentials** (client_id, secret, environment)
- **Backend validation failing** for the endpoint
- **Endpoint expecting different format**

### 3. **Backend Endpoint Issue** (Possible)
- Endpoint might not be implemented correctly
- Endpoint might require additional parameters
- Endpoint might have validation that's failing

---

## Fixes Applied

### ✅ 1. Fixed Empty Body Handling

**Before:**
```javascript
export const apiPost = (endpoint, data = {}, options = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data), // Always sends "{}" even when empty
  });
};
```

**After:**
```javascript
export const apiPost = (endpoint, data = {}, options = {}) => {
  // If data is undefined or null, don't send a body
  const body = data === undefined || data === null ? undefined : JSON.stringify(data);
  
  return apiRequest(endpoint, {
    method: 'POST',
    body: body, // undefined = no body sent
  });
};
```

### ✅ 2. Updated createBankLinkToken

**Before:**
```javascript
export const createBankLinkToken = async () => {
  const endpoint = API_ENDPOINTS.BANKING.LINK_TOKEN;
  const response = await apiPost(endpoint); // Sends {}
  return response;
};
```

**After:**
```javascript
export const createBankLinkToken = async () => {
  const endpoint = API_ENDPOINTS.BANKING.LINK_TOKEN;
  const response = await apiPost(endpoint, undefined); // Sends no body
  return response;
};
```

### ✅ 3. Improved Error Messages

Now shows the actual backend error message:
```javascript
if (err.status === 400) {
  setLinkError(`Bad Request: ${errorMessage}. This might be a backend configuration issue. Please check if Plaid is properly configured on the backend.`);
}
```

---

## Testing

1. **Try the "Add Account" button again**
   - Should now send request without body
   - Should show detailed error if backend has issue

2. **Check Network Tab**:
   - Open DevTools → Network
   - Click "Add Account"
   - Look for `POST /api/v1/banking/link-token`
   - Check Request Payload - should be empty (not `{}`)

3. **Check Backend Response**:
   - Look at Response tab in Network
   - Should see actual error message from backend
   - Common errors:
     - "Plaid client_id not configured"
     - "Plaid secret not configured"
     - "Invalid request format"
     - "User not found"

---

## Backend Requirements

For the endpoint to work, backend needs:

1. **Plaid Configuration**:
   ```python
   PLAID_CLIENT_ID = "your_client_id"
   PLAID_SECRET = "your_secret"
   PLAID_ENV = "sandbox"  # or "development" or "production"
   ```

2. **Endpoint Implementation**:
   ```python
   @router.post("/banking/link-token")
   async def create_link_token(
       current_user: User = Depends(get_current_user)
   ):
       # Create Plaid link token
       link_token = plaid_client.create_link_token(...)
       return {"link_token": link_token}
   ```

3. **User Authentication**:
   - Endpoint must validate Bearer token
   - Must get current user from token

---

## If Error Persists

### Check Backend Logs

Look for:
- Plaid API errors
- Configuration errors
- Validation errors

### Common Backend Errors

1. **"Plaid client not initialized"**
   - Backend needs to initialize Plaid client
   - Check backend startup code

2. **"Invalid Plaid credentials"**
   - Check Plaid client_id and secret
   - Verify environment matches (sandbox/development/production)

3. **"User not found"**
   - Backend can't find user from token
   - Check authentication middleware

4. **"Missing required fields"**
   - Backend might be expecting additional fields
   - Check backend endpoint implementation

---

## Debug Steps

1. **Check Request in Network Tab**:
   ```
   Method: POST
   URL: /api/v1/banking/link-token
   Headers: Authorization: Bearer <token>
   Body: (empty - should be no body at all)
   ```

2. **Check Response**:
   ```
   Status: 400 Bad Request
   Body: { "detail": "..." }  // Actual error message
   ```

3. **Check Backend Code**:
   - Verify endpoint exists
   - Verify Plaid is configured
   - Check error handling

---

## Next Steps

1. ✅ **Frontend fix applied** - No longer sends empty JSON body
2. ⏳ **Test the button** - Should work or show better error
3. ⏳ **Check backend** - If still 400, check backend logs
4. ⏳ **Verify Plaid config** - Make sure backend has Plaid credentials

---

**Last Updated**: After fixing empty body handling and improving error messages
