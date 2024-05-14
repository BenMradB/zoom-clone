# 📹 ZOOM Clone

#### 🏠 Home Page

<p align="left"> <img src="https://github.com/BenMradB/zoom-clone/blob/main/public/images/home.png?raw=true" alt="zoom-home" /> </p>

#### 🤝 Upcoming Meetings

<p align="left"> <img src="https://github.com/BenMradB/zoom-clone/blob/main/public/images/zoom-upcoming.png?raw=true" alt="zoom-home" /> </p>

<p align="left"> <img src="https://github.com/BenMradB/zoom-clone/blob/main/public/images/all.png?raw=true" alt="zoom-home" /> </p>

#### 👥 Meeting Room

<p align="left"> <img src="https://github.com/BenMradB/zoom-clone/blob/main/public/images/meeting-room.png?raw=true" alt="zoom-home" /> </p>

# 🌟 Getting Started

#### 1 . First Clone The App

```bash
git clone https://github.com/BenMradB/zoom-clone.git
```

#### 2 . Change the working directory => `zoom-clone` directory

```bash
cd ./zoom-clone
```

#### 3 . Install the necessary dependencies

```bash
npm i
# or
npm install
```

#### 4 . Create a `.env.local` file next to your `package.json` file and paste these env variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=your_stream_public_key
STREAM_SECRET_KEY=your_stream_secret_key
NEXT_PUBLIC_BASE_URL=your_base_url # e.g localhost:3000
```

#### 5 . Run your dev server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 🔗 Clerk Website Link

[![Clerk JS Link](<https://github.com/BenMradB/zoom-clone/blob/main/public/images/clerk(1).png?raw=true>)](https://clerk.com/)

### 🔗 Stream Website Link

[![linkedin](<https://github.com/BenMradB/zoom-clone/blob/main/public/images/stream(1).jpg?raw=true>)](https://getstream.io/video/sdk/react/)
