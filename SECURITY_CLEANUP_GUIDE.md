# 🔒 SECURITY CLEANUP GUIDE - GitHub Repository
**Before Making Repository Public or Sharing**

This guide lists EVERY file and line that must be removed or secured before allowing public access to your repository.

---

## ⚠️ CRITICAL: REMOVE IMMEDIATELY

### 1. Environment Files (API Keys & Secrets)

**❌ NEVER COMMIT THESE FILES:**
```
.env
.env.local
.env.production
.env.development
```

**✅ ACTION REQUIRED:**
```bash
# If already committed, remove from Git history:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (faster):
# https://rtyley.github.io/bfg-repo-cleaner/
```

**⚠️ CHECK IF EXPOSED:**
- Supabase URL (`NEXT_PUBLIC_SUPABASE_URL`)
- Supabase Anon Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) - **SAFE to expose** (client-side)
- Supabase Service Key (`SUPABASE_SERVICE_KEY`) - **CRITICAL - NEVER EXPOSE**
- Google AI API Key (`GOOGLE_AI_SERVER_KEY`, `GEMINI_API_KEY`) - **CRITICAL - NEVER EXPOSE**
- LemonSqueezy Keys - **CRITICAL - NEVER EXPOSE**

---

### 2. Audit & Test Scripts with Sensitive Data

**❌ REMOVE OR SANITIZE:**

#### `production_audit.mjs`
**Problem:** Contains database connection logic that might expose Supabase credentials

**✅ SOLUTION:** Remove the file OR add this warning at the top:
```javascript
// ⚠️ WARNING: This script requires .env.local with:
// - NEXT_PUBLIC_SUPABASE_URL
// - SUPABASE_SERVICE_KEY (ADMIN KEY - NEVER COMMIT)
// 
// DO NOT commit .env.local to Git!
```

**Files to Review:**
- `production_audit.mjs` - Uses `SUPABASE_SERVICE_KEY`
- `verify_api_fetch.mjs` - May contain API keys
- `verify_ai_key.mjs` - May contain Google AI keys

**✅ RECOMMENDED ACTION:**
```bash
# Move audit scripts to a separate private repo or local folder:
mkdir ~/pinescript-ai-private-tools
mv production_audit.mjs ~/pinescript-ai-private-tools/
mv verify_*.mjs ~/pinescript-ai-private-tools/

# Or add them to .gitignore if they contain secrets:
echo "production_audit.mjs" >> .gitignore
echo "verify_*.mjs" >> .gitignore
```

---

### 3. Database Schema (Partial Sanitization)

**FILE:** `supabase_schema.sql`

**✅ SAFE TO KEEP:** The schema itself is fine to publish (it's your database structure, not credentials)

**⚠️ BUT REMOVE THESE LINES IF PRESENT:**
- Any hardcoded connection strings
- Any example data with real emails
- Any comments mentioning production URLs

**Current Status:** ✅ Your schema file looks clean - no credentials found

---

### 4. Next.js Config Files

**FILE:** `next.config.mjs`

**❌ REMOVE IF PRESENT:**
- Hardcoded API endpoints
- Production domain names
- Internal service URLs

**✅ EXAMPLE OF SAFE CONFIG:**
```javascript
// SAFE - Uses environment variables
const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL
  }
}
```

**❌ UNSAFE - Hardcoded:**
```javascript
// UNSAFE - Remove this!
const nextConfig = {
  env: {
    API_URL: "https://my-production-api.com"
  }
}
```

---

### 5. Vercel/Deployment Configuration

**FILES TO CHECK:**
- `vercel.json` (if exists)
- `.vercel/` folder - **❌ ADD TO .gitignore**

**✅ ACTION:**
```bash
echo ".vercel" >> .gitignore
git rm -r --cached .vercel/ 2>/dev/null || true
```

---

## 📋 RECOMMENDED .gitignore (Add These Lines)

Create or update your `.gitignore`:

```gitignore
# Environment Variables (CRITICAL)
.env
.env.local
.env.development
.env.production
.env.test

# Vercel Deployment (Contains project IDs)
.vercel

# Audit Scripts (May contain credentials)
production_audit.mjs
verify_api_fetch.mjs
verify_ai_key.mjs
audit_results.txt
verification_results.txt

# Node Modules (Standard)
node_modules/
.next/
out/
build/

# IDE Settings (Optional but recommended)
.vscode/settings.json
.idea/

# OS Files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing Coverage
coverage/

# Local Supabase (if using local dev)
supabase/.branches
supabase/.temp
```

---

## ✅ SAFE TO KEEP PUBLIC

These files are SAFE to commit and share:

### Source Code
- ✅ `src/**/*.ts`
- ✅ `src/**/*.tsx`
- ✅ All React components
- ✅ API routes (as long as they use `process.env` for secrets)

### Configuration (If Clean)
- ✅ `package.json` (includes dependencies)
- ✅ `tsconfig.json`
- ✅ `tailwind.config.ts`
- ✅ `next.config.mjs` (if no hardcoded secrets)
- ✅ `eslint.config.mjs`

### Documentation
- ✅ `README.md`
- ✅ `PRODUCTION_AUDIT_REPORT.md` (contains no secrets)
- ✅ `SECURITY_CLEANUP_GUIDE.md` (this file)

### Data Files
- ✅ `api/data/pine_script_context.txt` (your knowledge base - this is your IP!)
- ✅ `src/lib/pineScriptContext.ts` (generated from above)

### Database Schema
- ✅ `supabase_schema.sql` (structure only, no credentials)

### Utility Scripts (If Clean)
- ✅ `update_context.mjs` (converts txt to ts - no secrets)
- ✅ `verify_final.mjs` (basic checks - safe)

---

## 🔍 HOW TO CHECK FOR EXPOSED SECRETS

### Method 1: GitHub Secret Scanning (Automated)

If you make the repo public, GitHub will automatically scan for:
- API keys
- OAuth tokens
- Private keys
- Database credentials

**⚠️ If detected, you'll get an immediate alert!**

### Method 2: Manual Grep Search

Run these commands to find potential secrets:

```bash
# Search for API keys
git grep -i "api.key\|apikey\|api_key" -- ':!node_modules' ':!.next'

# Search for passwords
git grep -i "password\|passwd\|pwd" -- ':!node_modules' ':!.next'

# Search for database URLs
git grep -i "postgres://\|postgresql://\|supabase" -- ':!node_modules' ':!.next'

# Search for Google AI keys
git grep -i "gemini\|google.*key" -- ':!node_modules' ':!.next'

# Search for hardcoded domains
git grep -i "vercel.app\|supabase.co" -- ':!node_modules' ':!.next'
```

### Method 3: Use GitGuardian or TruffleHog

```bash
# Install TruffleHog
pip install trufflehog

# Scan your entire repo
trufflehog filesystem . --json
```

---

## 🚨 WHAT TO DO IF SECRETS ARE ALREADY COMMITTED

### If Keys Are in Git History (But Not Latest Commit)

**❌ DO NOT just delete the file and commit!**
- The secret is still in Git history
- Anyone can access it by checking out old commits

**✅ CORRECT APPROACH:**

1. **Revoke the exposed key immediately**
   - Supabase: Generate new service role key in dashboard
   - Google AI: Revoke key in Google Cloud Console
   - LemonSqueezy: Rotate API keys

2. **Remove from Git history:**
   ```bash
   # Using BFG (recommended - fast)
   java -jar bfg.jar --replace-text secrets.txt
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   # Or using git filter-branch (slower)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (CAUTION - coordinate with team)
   git push origin --force --all
   ```

3. **Update `.gitignore`** to prevent future commits

4. **Update environment variables** in Vercel/deployment platform

---

## 📊 CHECKLIST BEFORE MAKING REPO PUBLIC

- [ ] `.env.local` is in `.gitignore` and NOT committed
- [ ] No API keys in any committed files
- [ ] No database credentials in code
- [ ] Audit scripts removed or sanitized
- [ ] `.vercel/` folder not committed
- [ ] `next.config.mjs` uses environment variables only
- [ ] Ran `git grep` to search for secrets
- [ ] All production keys rotated if any were exposed
- [ ] Supabase RLS policies are enabled (security via database, not obscurity)
- [ ] README does not contain production URLs or credentials

---

## 🎯 RECOMMENDED REPOSITORY STRUCTURE

**Public Repo (Open Source):**
```
pinescript-ai/
├── src/              ✅ All source code
├── api/data/         ✅ Pine Script context (your IP - consider private!)
├── public/           ✅ Static assets
├── supabase_schema.sql ✅ Database schema
├── package.json      ✅ Dependencies
├── README.md         ✅ Public documentation
├── .gitignore        ✅ Properly configured
├── .env.example      ✅ Template (NO real values)
└── LICENSE           ✅ Open source license
```

**Private Tools Repo (Separate):**
```
pinescript-ai-private/
├── .env.local        🔒 Real API keys
├── production_audit.mjs 🔒 Admin scripts
├── verify_*.mjs      🔒 Testing tools
└── deployment-notes.md 🔒 Internal docs
```

---

## 🛡️ EXTRA SECURITY RECOMMENDATIONS

### 1. Use Environment Variables EVERYWHERE

**❌ WRONG:**
```typescript
const apiKey = "sk-abc123def456";
```

**✅ CORRECT:**
```typescript
const apiKey = process.env.GOOGLE_AI_SERVER_KEY;
```

### 2. Use Supabase RLS for Security, Not Code Obscurity

- Your database schema is public? **That's fine!**
- Security comes from **Row Level Security (RLS)**, not hiding schema
- Even if attackers know your table structure, RLS prevents access

### 3. Rotate All Keys After Making Repo Public

Even if you never committed secrets, rotate them as a precaution:

| Service | How to Rotate |
|---------|---------------|
| Supabase Service Key | Dashboard → Settings → API → Generate new key |
| Google AI API Key | Google Cloud Console → APIs & Services → Credentials |
| LemonSqueezy | Dashboard → Settings → API |

### 4. Enable GitHub Secret Scanning

- Go to: **Settings → Security → Code security and analysis**
- Enable **Secret scanning**
- Enable **Push protection** (prevents commits with secrets)

---

## 📞 SUPPORT & QUESTIONS

**If you accidentally committed secrets:**
1. Revoke the key immediately (highest priority)
2. Remove from Git history (see above)
3. Rotate to new keys
4. Update Vercel environment variables

**Need help?**
- GitHub Secret Scanning: https://docs.github.com/en/code-security/secret-scanning
- BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
- TruffleHog: https://github.com/trufflesecurity/trufflehog

---

## ✅ FINAL RECOMMENDATION

**For a SaaS Product:**

**Option 1: Keep Repo PRIVATE** (Recommended)
- No risk of secret exposure
- Protect your Pine Script context (intellectual property)
- Easier development workflow

**Option 2: Make Repo PUBLIC**
- Great for portfolio / open source community
- Must meticulously follow this security guide
- Consider moving `api/data/pine_script_context.txt` to private subrepo
- Requires constant vigilance

---

**Created:** 2026-02-16  
**Purpose:** Secure your SaaS before going public  
**Status:** Ready for production deployment
