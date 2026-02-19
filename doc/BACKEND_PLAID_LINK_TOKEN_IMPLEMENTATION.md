# Backend Implementation Guide: Plaid Link Token Endpoint

## Issue
Frontend is getting `400 Bad Request: Failed to create link token` when calling `POST /api/v1/banking/link-token`

## Status
✅ **Frontend is working correctly** - Request is being sent properly  
❌ **Backend needs implementation** - Endpoint is failing to create link token

---

## Required Backend Implementation

### Endpoint: `POST /api/v1/banking/link-token`

**Purpose**: Create a Plaid Link token for the authenticated user to connect their bank account

---

## Step 1: Install Plaid Python SDK

```bash
pip install plaid-python
```

Or if using requirements.txt:
```
plaid-python>=9.0.0
```

---

## Step 2: Configure Plaid Credentials

Add to your `.env` file or environment variables:

```env
# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret_key
PLAID_ENV=sandbox  # Options: sandbox, development, production
```

**Get Plaid Credentials**:
1. Sign up at https://dashboard.plaid.com/signup
2. Go to Team Settings → Keys
3. Copy your `client_id` and `secret` (sandbox keys for testing)
4. Use `sandbox` environment for development/testing

---

## Step 3: Initialize Plaid Client

Create or update `app/core/plaid.py`:

```python
from plaid.api import plaid_api
from plaid.configuration import Configuration
from plaid.model.country_code import CountryCode
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.products import CountryCode as ProductsCountryCode
import os
from plaid.configuration import Configuration
from plaid.api_client import ApiClient

# Get Plaid credentials from environment
PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID")
PLAID_SECRET = os.getenv("PLAID_SECRET")
PLAID_ENV = os.getenv("PLAID_ENV", "sandbox")

# Map environment string to Plaid environment
plaid_environments = {
    "sandbox": plaid.Environment.sandbox,
    "development": plaid.Environment.development,
    "production": plaid.Environment.production,
}

# Initialize Plaid client
configuration = Configuration(
    host=plaid_environments[PLAID_ENV],
    api_key={
        "clientId": PLAID_CLIENT_ID,
        "secret": PLAID_SECRET,
    }
)

api_client = ApiClient(configuration)
plaid_client = plaid_api.PlaidApi(api_client)
```

---

## Step 4: Implement the Endpoint

Create or update `app/api/v1/banking.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.core.plaid import plaid_client
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
from typing import Dict
import os

router = APIRouter()

@router.post("/link-token")
async def create_link_token(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """
    Create a Plaid Link token for the authenticated user.
    
    This token is used to initialize Plaid Link on the frontend.
    The user will use this token to connect their bank account.
    
    Returns:
        Dict with 'link_token' key containing the Plaid Link token
    """
    try:
        # Get user's email for Plaid (optional but recommended)
        user_email = current_user.email if hasattr(current_user, 'email') else None
        
        # Create Link Token Request
        request = LinkTokenCreateRequest(
            products=[Products("transactions"), Products("auth")],
            client_name="Your App Name",  # Change to your app name
            country_codes=[CountryCode("US")],  # Add more countries if needed
            language="en",
            user=LinkTokenCreateRequestUser(
                client_user_id=str(current_user.id),  # Unique user ID
            ),
        )
        
        # Add webhook URL if configured (optional)
        webhook_url = os.getenv("PLAID_WEBHOOK_URL")
        if webhook_url:
            request["webhook"] = webhook_url
        
        # Create the link token
        response = plaid_client.link_token_create(request)
        
        return {
            "link_token": response["link_token"]
        }
        
    except Exception as e:
        # Log the error for debugging
        print(f"Error creating Plaid link token: {str(e)}")
        
        # Return user-friendly error message
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create link token: {str(e)}"
        )
```

---

## Step 5: Error Handling Improvements

For better error messages, handle specific Plaid errors:

```python
from plaid.exceptions import PlaidException

@router.post("/link-token")
async def create_link_token(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    try:
        # ... (code from above)
        
    except PlaidException as e:
        # Handle Plaid-specific errors
        error_message = f"Plaid error: {e.body.get('error_message', str(e))}"
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_message
        )
    except Exception as e:
        # Handle other errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create link token: {str(e)}"
        )
```

---

## Step 6: Register the Router

In your main FastAPI app file (e.g., `app/main.py` or `app/api/v1/__init__.py`):

```python
from fastapi import FastAPI
from app.api.v1.banking import router as banking_router

app = FastAPI()

# Register banking router
app.include_router(
    banking_router,
    prefix="/api/v1/banking",
    tags=["banking"]
)
```

---

## Step 7: Verify Implementation

### Test the Endpoint

1. **Start your backend server**
2. **Make a test request**:
   ```bash
   curl -X POST http://localhost:8000/api/v1/banking/link-token \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json"
   ```

3. **Expected Response** (200 OK):
   ```json
   {
     "link_token": "link-sandbox-xxx-xxx-xxx"
   }
   ```

4. **If you get 400 Bad Request**, check:
   - Plaid credentials are set correctly
   - Plaid client is initialized properly
   - Error logs for specific Plaid errors

---

## Common Issues & Solutions

### Issue 1: "Plaid client not initialized"
**Solution**: Make sure `plaid_client` is initialized before the endpoint is called

### Issue 2: "Invalid Plaid credentials"
**Solution**: 
- Verify `PLAID_CLIENT_ID` and `PLAID_SECRET` are correct
- Make sure environment matches (sandbox keys for sandbox environment)
- Check for extra spaces or quotes in environment variables

### Issue 3: "Country code not supported"
**Solution**: 
- Make sure `CountryCode("US")` is valid
- Add more countries if needed: `[CountryCode("US"), CountryCode("CA")]`

### Issue 4: "Products not available"
**Solution**: 
- Verify products are available for your Plaid account
- Check if you need to enable products in Plaid dashboard
- Common products: `["transactions", "auth", "identity", "assets"]`

### Issue 5: "User ID format error"
**Solution**: 
- Make sure `client_user_id` is a string
- Use `str(current_user.id)` to convert UUID to string

---

## Complete Example (Full Implementation)

```python
# app/api/v1/banking.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.core.plaid import plaid_client
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
from plaid.exceptions import PlaidException
from typing import Dict
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/link-token")
async def create_link_token(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """
    Create a Plaid Link token for the authenticated user.
    
    Returns:
        {
            "link_token": "link-sandbox-xxx"
        }
    """
    try:
        # Prepare user information
        user_id = str(current_user.id)
        user_email = getattr(current_user, 'email', None)
        
        # Create Link Token Request
        request = LinkTokenCreateRequest(
            products=[Products("transactions"), Products("auth")],
            client_name="FullEgo",  # Your app name
            country_codes=[CountryCode("US")],
            language="en",
            user=LinkTokenCreateRequestUser(
                client_user_id=user_id,
            ),
        )
        
        # Add webhook if configured
        webhook_url = os.getenv("PLAID_WEBHOOK_URL")
        if webhook_url:
            request["webhook"] = webhook_url
        
        # Create the link token via Plaid API
        response = plaid_client.link_token_create(request)
        
        link_token = response["link_token"]
        
        logger.info(f"Link token created for user {user_id}")
        
        return {
            "link_token": link_token
        }
        
    except PlaidException as e:
        logger.error(f"Plaid error creating link token: {e}")
        error_body = e.body if hasattr(e, 'body') else {}
        error_message = error_body.get('error_message', str(e))
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create link token: {error_message}"
        )
    except Exception as e:
        logger.error(f"Unexpected error creating link token: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create link token: {str(e)}"
        )
```

---

## Testing Checklist

- [ ] Plaid SDK installed (`pip install plaid-python`)
- [ ] Environment variables set (`PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_ENV`)
- [ ] Plaid client initialized in `app/core/plaid.py`
- [ ] Endpoint implemented in `app/api/v1/banking.py`
- [ ] Router registered in main app
- [ ] Test endpoint with curl or Postman
- [ ] Verify response contains `link_token`
- [ ] Check backend logs for any errors

---

## Next Steps After Implementation

1. **Test the endpoint** - Make sure it returns a link token
2. **Test from frontend** - Click "Add Account" button
3. **Verify Plaid Link opens** - Should see Plaid bank selection screen
4. **Complete the flow** - Test linking a sandbox account

---

## Additional Resources

- **Plaid Python SDK Docs**: https://github.com/plaid/plaid-python
- **Plaid Link Docs**: https://plaid.com/docs/link/
- **Plaid Dashboard**: https://dashboard.plaid.com/
- **Plaid Sandbox Testing**: https://plaid.com/docs/sandbox/

---

**Last Updated**: After identifying backend implementation needed  
**Priority**: 🔥 **HIGH** - Required for Linked Accounts feature to work
