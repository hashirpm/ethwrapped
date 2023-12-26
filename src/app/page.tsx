'use client'

import { fetchDetailsOfYear } from "@/lib/helper";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="">2023 Recap</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
        <button
          onClick={() =>
            fetchDetailsOfYear("0xa4da350702f06fb8ade5eba73cdf63dcbbd3a426")
          }
        >
          Generate Year Data
        </button>
      </div>
    </main>
  );
}
