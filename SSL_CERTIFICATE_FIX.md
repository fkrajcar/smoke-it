# SSL Certificate Configuration

## Issue: Self-Signed Certificate Error

If you encounter the error:

```
Network Error: self-signed certificate in certificate chain
```

This means your Node.js environment is encountering a self-signed SSL certificate.

## Solution

The project is now configured to handle this automatically:

### 1. Development Environment (Automatic)

The API client automatically accepts self-signed certificates in development mode:

- `NODE_ENV !== 'production'` → Accepts self-signed certificates
- `NODE_ENV === 'production'` → Requires valid certificates (secure)

### 2. Environment Variable (Optional)

You can also explicitly control SSL verification by adding to your `.env` file:

```bash
# Disable SSL verification (development only - not recommended for production)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**⚠️ WARNING**: Only use `NODE_TLS_REJECT_UNAUTHORIZED=0` in development. Never use this in production as it disables security checks.

### 3. For Server-Side Rendering (Next.js)

If you're still experiencing issues during server-side rendering, you can temporarily run with:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
```

### 4. Better Solution: Install Certificate

For a production-like development environment, install the self-signed certificate in your system's trust store:

**macOS:**

```bash
# Export the certificate (if you have access to it)
# Then double-click and add to Keychain Access, marking it as trusted
```

**Linux:**

```bash
# Copy certificate to trusted certificates
sudo cp your-cert.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

**Windows:**

```bash
# Import certificate via certmgr.msc
# Place in "Trusted Root Certification Authorities"
```

## What Changed

The `src/lib/apiClient.ts` now includes:

```typescript
const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === 'production',
})
```

This configuration:

- ✅ Accepts self-signed certificates in development
- ✅ Requires valid certificates in production (secure)
- ✅ Adds 30-second timeout to prevent hanging requests
- ✅ Works for both client-side and server-side requests

## Testing

Run your app:

```bash
npm run dev
```

The SSL certificate error should now be resolved in development mode.

## Security Note

The solution maintains security by:

- Only relaxing SSL checks in development (`NODE_ENV !== 'production'`)
- Always requiring valid certificates in production
- Making it explicit in the code why certificates are being accepted

## Need More Help?

If you're still experiencing issues:

1. Check your `.env` file exists with `NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN`
2. Verify the API endpoint is correct
3. Check network connectivity
4. Review console logs for detailed error messages
