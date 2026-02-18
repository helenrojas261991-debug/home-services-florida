# Local Testing Guide - Admin Panel with Password Authentication

This guide explains how to test the admin panel locally in WebStorm with password-based authentication (no OAuth required).

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd home-services-florida
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the project root:
```env
DATABASE_URL=your_database_url
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 4. Run the Development Server
```bash
pnpm dev
```

The server will start at `http://localhost:3000`

---

## 🔐 Default Admin Credentials

For local testing, use these credentials:

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |

**Note:** These are default credentials for development only. Change them in production by setting environment variables.

---

## 📝 How to Access the Admin Panel

### Step 1: Navigate to Login Page
Open your browser and go to:
```
http://localhost:3000/admin/login
```

### Step 2: Enter Credentials
- **Username:** `admin`
- **Password:** `admin123`

### Step 3: Click Login
You'll be redirected to the admin dashboard.

---

## 🎯 Admin Panel Features

Once logged in, you can access these features:

### Dashboard Tab
- Overview of admin panel features
- Quick tips for getting started

### Media Upload Tab
- **Upload Images:** JPEG, PNG, WebP, GIF (max 10MB)
- **Upload Videos:** MP4, WebM, MOV (max 100MB)
- Drag-and-drop support
- Automatic S3 storage

### Content Editor Tab
- Edit hero section content
- Edit service descriptions
- Support for English and Spanish
- Real-time preview

### Gallery Tab
- View all uploaded media
- Delete unwanted items
- See upload statistics

### Instagram Tab
- Connect Instagram Business account
- Sync posts automatically
- View sync status

### Google Business Tab
- Connect Google Business Profile
- Sync customer reviews
- View business information

---

## 🔧 Customizing Admin Credentials

### Option 1: Environment Variables
Create `.env.local` with custom credentials:
```env
ADMIN_USERNAME=myusername
ADMIN_PASSWORD=mysecurepassword123
```

### Option 2: Hardcoded (Development Only)
Edit `server/admin-auth.ts`:
```typescript
const DEFAULT_ADMIN_USERNAME = "myusername";
const DEFAULT_ADMIN_PASSWORD = "mysecurepassword";
```

---

## 🧪 Testing the Authentication System

### Run Unit Tests
```bash
pnpm test
```

This runs all tests including authentication tests:
```
✓ server/admin-auth.test.ts (17 tests)
```

### Test Cases Covered
- Valid login with correct credentials
- Invalid login with wrong username
- Invalid login with wrong password
- Session creation and validation
- Session expiration
- Multiple concurrent sessions
- Logout functionality

---

## 📱 Testing in WebStorm

### Setup WebStorm Project
1. **Open Project:** File → Open → Select `home-services-florida` folder
2. **Configure Node.js:** Settings → Languages & Frameworks → Node.js
3. **Set Node Interpreter:** Choose your Node.js version
4. **Configure npm/pnpm:** Settings → Languages & Frameworks → Node.js → npm

### Run Development Server in WebStorm
1. **Open Terminal:** View → Tool Windows → Terminal
2. **Run Command:** `pnpm dev`
3. **Open Browser:** Click the URL in terminal or go to `http://localhost:3000`

### Debug Admin Login
1. **Set Breakpoint:** Click line number in `client/src/pages/AdminLogin.tsx`
2. **Run Debugger:** Run → Debug
3. **Step Through Code:** Use F10 (step over) or F11 (step into)

### View Network Requests
1. **Open DevTools:** F12
2. **Go to Network Tab**
3. **Login:** Enter credentials and submit
4. **Inspect Request:** Look for `adminAuth.login` call

---

## 🔄 Session Management

### Session Lifetime
- **Duration:** 24 hours
- **Storage:** In-memory (cleared on server restart)
- **Cookie:** `admin_session`

### Logout
Click the **Logout** button in the admin dashboard header to end your session.

### Session Expiration
Sessions automatically expire after 24 hours. You'll need to log in again.

---

## 🛡️ Security Notes

### Development Mode
- Credentials are stored in environment variables
- Sessions are stored in memory
- No database persistence

### Production Mode
- Use strong, unique passwords
- Store credentials securely (use a secrets manager)
- Consider using bcrypt for password hashing
- Use Redis or database for session storage
- Enable HTTPS
- Set secure cookie flags

### Best Practices
- Never commit credentials to git
- Use `.env.local` for local testing (add to `.gitignore`)
- Change default credentials immediately
- Use environment variables for all secrets
- Regularly rotate credentials

---

## 🐛 Troubleshooting

### Login Not Working
**Problem:** "Invalid username or password" error

**Solution:**
1. Check credentials are correct (case-sensitive)
2. Verify environment variables are set
3. Restart the development server
4. Clear browser cookies

### Session Expires Immediately
**Problem:** Logged out right after login

**Solution:**
1. Check server logs for errors
2. Verify cookie settings in browser
3. Check browser privacy settings
4. Try incognito/private mode

### Can't Access Admin Panel
**Problem:** Redirected to login page repeatedly

**Solution:**
1. Clear browser cache and cookies
2. Check browser console for errors (F12)
3. Verify server is running (`pnpm dev`)
4. Check network requests in DevTools

### Database Connection Error
**Problem:** "DATABASE_URL not set" error

**Solution:**
1. Create `.env.local` file
2. Add `DATABASE_URL=your_connection_string`
3. Restart development server

---

## 📚 File Structure

Key files for authentication:

```
server/
├── admin-auth.ts              ← Authentication logic
├── admin-auth.router.ts       ← tRPC procedures
├── admin-auth.test.ts         ← Unit tests

client/src/
├── pages/
│   ├── AdminLogin.tsx         ← Login page
│   └── Admin.tsx              ← Admin dashboard
├── hooks/
│   └── useAdminAuth.ts        ← Auth hook
└── App.tsx                    ← Route configuration
```

---

## 🚀 Next Steps

1. **Customize Branding:** Update logo and colors in admin panel
2. **Add More Admins:** Use database UI to promote users
3. **Configure Integrations:** Connect Instagram and Google Business
4. **Test All Features:** Upload media, edit content, manage gallery
5. **Deploy:** Follow deployment guide for production setup

---

## 📞 Support

For issues or questions:
1. Check this guide again
2. Review error messages in browser console (F12)
3. Check server logs in terminal
4. Run tests to verify setup: `pnpm test`

---

**Last Updated:** February 2026  
**Version:** 1.0
