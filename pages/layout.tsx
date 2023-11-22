import { Searchbar } from "@/components/Searchbar";
import React, { PropsWithChildren } from "react";

export default function RootLayout({ children }:PropsWithChildren){
    return (
        <main className="container"><Searchbar/>{children}</main>
    )
}