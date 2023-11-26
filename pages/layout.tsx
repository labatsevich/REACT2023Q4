import { Searchbar } from "@/components/Searchbar";
import React, { PropsWithChildren } from "react";

import { Roboto } from 'next/font/google';
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Roboto({
  subsets: ['cyrillic-ext'],
  display: 'swap',
  weight: "400",
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <main className={inter.className + ' container'}><Searchbar />{children}</main>
    </ErrorBoundary>
  )
}