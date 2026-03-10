"use client";

import React from "react";
import Logo from "@/components/navbar/logo";

const footerData = [
  {
    title: "Company",
    links: [
      { title: "About", link: "#" },
      { title: "Contact", link: "#" },
      { title: "Careers", link: "#" },
      { title: "Terms", link: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { title: "Features", link: "/#features" },
      { title: "Models", link: "/#models" },
      { title: "Pricing", link: "/#plans" },
      { title: "API", link: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Blog", link: "#" },
      { title: "Help", link: "#" },
      { title: "Status", link: "#" },
    ],
  },
];

const socialIcons = [
  {
    label: "Twitter",
    href: "#",
    svg: (
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "GitHub",
    href: "#",
    svg: (
      <path
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        fill="currentColor"
      />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-border/50 bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo href="/" width={120} height={44} className="inline-flex" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              One platform for the latest AI models — rewrite, humanize, detect,
              and create with a single workflow.
            </p>
          </div>
          {footerData.map((group, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-10 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ConAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialIcons.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  {social.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
