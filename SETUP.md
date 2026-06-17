# Setup Guide — Doubt Solver Web App

Follow these steps in order. Each one is short. Don't skip ahead — later steps need things from earlier ones.

---

## Part 1: Create your Firebase project (free)

1. Go to **https://console.firebase.google.com**
2. Click **Add project**
3. Name it anything (e.g. "doubt-solver") → click Continue
4. Disable Google Analytics (not needed) → click **Create project** → wait → click **Continue**

## Part 2: Turn on Google Sign-In

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Click **Google** in the list of providers → toggle **Enable** → pick a support email → **Save**

## Part 3: Turn on the database (Firestore)

1. In the left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Choose a location close to you → **Next**
4. Choose **Start in production mode** → **Create**
5. Once created, click the **Rules** tab and replace everything with this, then click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/history/{historyId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

This makes sure each person can only see their own history.

## Part 4: Get your Firebase config keys

1. Click the **gear icon** (top left, next to "Project Overview") → **Project settings**
2. Scroll down to **Your apps** → click the **</> (web)** icon
3. Give it a nickname (e.g. "doubt-solver-web") → click **Register app**
4. You'll see a code block with `apiKey`, `authDomain`, etc. — keep this tab open
5. Open the file `src/firebase.js` in the project, and replace the placeholder values with your real ones from that code block
6. Click **Continue to console**

## Part 5: Add your domain to allowed sign-in domains

(Do this after Part 7, once you have your live URL — come back to this step then.)

1. Authentication → Settings tab → **Authorized domains** → **Add domain** → paste your live URL's domain (e.g. `doubt-solver.vercel.app`)

---

## Part 6: Get a Claude API key

1. Go to **https://console.anthropic.com**
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy it somewhere safe (you won't be able to see it again) — you'll paste it into Vercel in Part 7, not into any file in this project

Note: this is pay-as-you-go, not free, but inexpensive for personal use (a few dollars covers a lot of questions). Add a small amount of credit under **Billing**.

---

## Part 7: Deploy to Vercel (free hosting, gives you a real URL)

1. Go to **https://vercel.com** → sign up (you can sign up with GitHub or just an email)
2. Once logged in, click **Add New** → **Project**
3. You'll need this project's code in a GitHub repository for Vercel to deploy it. If you don't have GitHub:
   - Go to **https://github.com** → sign up
   - Click **New repository** → name it "doubt-solver-web" → **Create repository**
   - Follow GitHub's instructions to upload this project's files (there's an "uploading an existing file" link on the new repo page — you can drag and drop the whole project folder)
4. Back in Vercel, click **Import** next to your new GitHub repo
5. Before clicking Deploy, expand **Environment Variables** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (paste your Claude API key from Part 6)
6. Click **Deploy** → wait a minute → you'll get a live URL like `doubt-solver-web.vercel.app`

## Part 8: Finish connecting Google Sign-In to your live site

1. Go back to Firebase → Authentication → Settings → Authorized domains
2. Add your Vercel URL's domain (just the domain, e.g. `doubt-solver-web.vercel.app`, no `https://`)

---

## You're done

Visit your Vercel URL. You should see the sign-in screen, sign in with Google, and be able to ask questions, attach files, and see your history saved in the sidebar — accessible from any device once you sign in with the same Google account.

## If something breaks

Tell me exactly what you see (a blank screen, an error message, a button that doesn't work) and I'll help you fix it. Screenshots help a lot if you can paste one.
