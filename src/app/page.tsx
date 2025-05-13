// app/page.tsx or app/home/page.tsx
'use client';

import {  SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/log-ip')
      .then((res) => res.json())
      .then((data) => {
        console.log('Client IP:', data.ip);
        setIp(data.ip);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-80">
        {isSignedIn ? (
          <>
            <h2 className="text-2xl text-black font-semibold mb-4">Welcome, {user?.firstName || "User"}!</h2>
            <p className="text-black mb-4">Your Email: {user?.primaryEmailAddress?.emailAddress}</p>
            <p className="text-black mb-4">Your IP: {ip || 'Loading...'}</p>
            <UserButton />
          </>
        ) : (
          <>
            <h2 className="text-2xl text-black font-semibold mb-2">Welcome to the App</h2>
            <p className="text-gray-600 mb-6">Please sign in or sign up to continue</p>
            <div className="flex justify-center gap-4">
              <SignUpButton mode="modal">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Login</button>
              </SignUpButton>
        
            </div>
          </>
        )}
      </div>
    </div>
  );
}
