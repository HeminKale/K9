import Link from "next/link";
import { Mail, MapPin, PawPrint, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { business } from "@/lib/constants";
import { footerLinks } from "@/lib/navLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary-300 bg-secondary-100 dark:border-primary-800 dark:bg-primary-900">
      <div className="container section-padding grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-semibold text-primary-600 dark:text-primary-300"
          >
            <PawPrint className="size-6" aria-hidden="true" />
            <span>{business.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-text-500 dark:text-text-300">
            {business.tagline}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={business.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
            >
              <YoutubeIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-600 dark:text-text-100">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-600 dark:text-text-100">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-text-500 dark:text-text-300">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={business.phoneHref} className="hover:text-primary-600 dark:hover:text-primary-300">
                {business.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a
                href={`mailto:${business.email}`}
                className="hover:text-primary-600 dark:hover:text-primary-300"
              >
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {business.address.street}, {business.address.city},{" "}
                {business.address.state} {business.address.zip}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-300 py-6 dark:border-primary-800">
        <p className="container text-center text-xs text-text-500 dark:text-text-400">
          &copy; {year} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
