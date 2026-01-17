# Next.js User Authentication with Lucia

## 📸 Project Preview

<p align="center">
  <img src="https://github.com/Figrac0/Next_User_Authentication-LuciaAdapter/blob/main/public/main.gif" alt="Project Demo GIF - Full Authentication Flow" width="800"/><br/>
  <em>Full authentication flow: Registration → Login → Dashboard Access</em>
</p>

---

<p align="center">
  <img src="https://github.com/Figrac0/Next_User_Authentication-LuciaAdapter/blob/main/public/1.png" alt="Login Page - Secure Authentication Interface" width="400"/><br/>
  <em>Modern login interface with real-time validation</em>
</p>

---

<p align="center">
  <img src="https://github.com/Figrac0/Next_User_Authentication-LuciaAdapter/blob/main/public/2.png" alt="Training Dashboard - Premium Fitness Platform" width="400"/><br/>
  <em>Premium training dashboard accessible only to authenticated users</em>
</p>

---

## 🚀 Overview

A modern, secure authentication system built with Next.js 14 App Router and Lucia Auth. This project demonstrates professional-grade user authentication with session management, password hashing, and protected routes.

## 🛠️ Tech Stack

- **Next.js 14** - App Router with Server Actions
- **Lucia Auth** - Authentication library
- **SQLite** - Database with better-sqlite3
- **TypeScript** - Type-safe implementation
- **CSS Modules** - Modern styling with variables

## 🔐 Authentication Architecture

### Core Components

#### 1. **Lucia Auth Configuration**
Lucia is the backbone of our authentication system. It provides a simple, secure way to manage sessions and users:

```javascript
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

const adapter = new BetterSqlite3Adapter(db, {
    user: "users",
    session: "sessions",
});

const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
});
```

**Key Lucia Features Used:**

- **Session-based authentication** - Stateless sessions stored in database
- **Cookie management** - Secure HTTP-only cookies
- **Session validation** - Automatic session verification
- **CSRF protection** - Built-in security features

## 2. **Session Management Functions**

**`createAuthSession(userId)`** - Creates a new session for authenticated users:

```javascript
export async function createAuthSession(userId) {
    // Create session in database
    const session = await lucia.createSession(userId, {});
    
    // Generate secure session cookie
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    // Set cookie in response headers
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}
```

**`verifyAuth()`** - Verifies current user session on each request:

```javascript
export async function verifyAuth() {
    // Get session cookie from request
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    
    // Validate session with Lucia
    const result = await lucia.validateSession(sessionId);
    
    // Handle session refresh if needed
    if (result.session && result.session.fresh) {
        // Refresh the session cookie
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(...);
    }
    
    // Return user and session data
    return result;
}
```

**`destroySession()`** - Logs user out by invalidating session:

```javascript
export async function destroySession() {
    // Get current session
    const { session } = await verifyAuth();
    
    // Invalidate session in database
    await lucia.invalidateSession(session.id);
    
    // Clear session cookie
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(...);
}
```

## 3. **Password Security**

Using Node.js crypto module for secure password hashing:

```javascript
import crypto from "node:crypto";

export function hashUserPassword(password) {
    // Generate unique salt for each user
    const salt = crypto.randomBytes(16).toString("hex");
    
    // Hash password with scrypt (memory-hard algorithm)
    const hashedPassword = crypto.scryptSync(password, salt, 64);
    
    // Store as "hash:salt" format
    return hashedPassword.toString("hex") + ":" + salt;
}

export function verifyPassword(storedPassword, suppliedPassword) {
    // Split stored hash and salt
    const [hashedPassword, salt] = storedPassword.split(":");
    
    // Hash supplied password with same salt
    const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    
    // Compare with timing-safe comparison
    return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
```

**Security Features:**

- **Salt per user** - Unique salt for each password
- **Scrypt algorithm** - Memory-hard KDF resistant to brute force
- **Timing-safe comparison** - Prevents timing attacks

## 📁 **Project Structure**
```text
auth-project/
├── app/
│ ├── layout.js # Root layout
│ ├── page.js # Auth form page
│ ├── globals.css # Global styles
│ └── (auth)/ # Protected routes group
│ ├── layout.js # Authenticated layout
│ └── training/
│ └── page.js # Protected training page
├── actions/
│ └── auth-actions.js # Server actions for auth
├── components/
│ └── auth-form.js # Client auth form
├── lib/
│ ├── auth.js # Lucia auth functions
│ ├── db.js # Database configuration
│ ├── hash.js # Password utilities
│ ├── training.js # Training data
│ └── user.js # User database operations
└── public/
└── trainings/ # Training images
```

## 🔒 **Protected Routes Implementation**

The App Router's route groups `(auth)` create protected sections:

```javascript
// app/(auth)/training/page.js
export default async function TrainingPage() {
    const result = await verifyAuth();
    
    // Redirect if not authenticated
    if (!result.user) {
        return redirect("/");
    }
    
    // Show protected content
    return <TrainingDashboard />;
}
```
## 🎯 **Key Features**

### 1. **Server-Side Authentication**
- All auth logic runs on server
- No client-side secrets exposed
- Secure session validation

### 2. **Progressive Enhancement**
- Client-side form validation
- Server-side final validation
- Real-time error feedback

### 3. **Session Security**
- HTTP-only cookies
- Secure flag in production
- Automatic session refresh
- CSRF protection via Lucia

### 4. **Password Security**
- Strong hashing with scrypt
- Unique salts per user
- Timing-safe comparison

### 5. **Database Security**
- Prepared statements (prevents SQL injection)
- Unique email constraints
- Session expiration management

## 🔧 **API Reference**

### **Server Actions**
- **`signup(formData)`** - Register new user
- **`login(formData)`** - Authenticate existing user
- **`logout()`** - Destroy session
- **`auth(mode, formData)`** - Unified auth handler

### **Database Functions**
- **`createUser(email, password)`** - Insert new user
- **`getUserByEmail(email)`** - Find user by email
- **`getTrainings()`** - Get all training sessions

## 🛡️ **Security Best Practices**

1. **Never store plain text passwords** - Always hash with salt
2. **Use HTTP-only cookies** - Prevent XSS attacks
3. **Validate on server** - Client validation is for UX only
4. **Use prepared statements** - Prevent SQL injection
5. **Implement rate limiting** - Prevent brute force attacks
6. **Use secure cookies in production** - HTTPS only

## 🔄 **Session Flow**

```text
User Action → Server Action → Session Management → Response
    ↓           ↓               ↓                   ↓
  Login → verifyCredentials() → createAuthSession() → Redirect
  Access → verifyAuth() → validateSession() → Render Page
  Logout → verifyAuth() → destroySession() → Redirect
```

## 📚 **Learning Resources**

- [Lucia Auth Documentation](https://lucia-auth.com)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [OWASP Authentication Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)


