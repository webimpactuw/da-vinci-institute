"use client"

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

export default function Navbar() {
	
    const navItems = [
        {
            id: "about",
            label: "about",
            href: "/about",
        },
        {
            id: "people",
            label: "people",
            href: "/people",
        },
        {
            id: "courses",
            label: "courses",
            href: "/courses",
        },
        {
            id: "classwork",
            label: "classwork",
            href: "/classwork",
        },
        {
            id: "registration",
            label: "registration",
            href: "/registration",
        },
        {
            id: "volunteer",
            label: "volunteer",
            href: "/volunteer",
        },
        {
            id: "experience",
            label: "experience",
            href: "/experience",
        },
        {
            id: "scholarships",
            label: "scholarships",
            href: "/scholarships",
        },
        {
            id: "resources",
            label: "resources",
            href: "/resources",
        },
        {
            id: "organization",
            label: "organization",
            href: "/organization",
        },
        {
            id: "projects",
            label: "projects",
            href: "/projects",
        },
        {
            id: "forums",
            label: "forums",
            href: "/forums",
        },
        {
            id: "information",
            label: "information",
            href: "/information",
        },
        {
            id: "store",
            label: "store",
            href: "/store",
        },
        {
            id: "assistance",
            label: "assistance",
            href: "/assistance",
        },
        {
            id: "donations",
            label: "donations",
            href: "/donations",
        },
        {
            id: "connect",
            label: "connect",
            href: "/connect",
        },
        {
            id: "partnerships",
            label: "partnerships",
            href: "/partnerships",
        },
    ];
    
    const pathname = usePathname();
    const isActive = (path) => pathname === path;
    return (
		<nav className="pb-4 pt-2 flex justify-between items-center pl-4">
            <div className="flex flex-col gap-2 text-base font-medium sm:flex-row">
            <ul className="flex justify-end items-center gap-4">
                {navItems.map((eachItem) => (
                <li key={eachItem.id}>
                    <Link
                    href={eachItem.href}
                    className={`${
                        isActive(eachItem.href) ? "text-spotify-green" : ""
                      }` + "hover:text-gray-600"}
                    >
                    {eachItem.label}
                    </Link>
                </li>
                ))}
            </ul>
            </div>
        </nav>
	);
}
