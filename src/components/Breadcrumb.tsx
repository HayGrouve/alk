import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex ${className}`}
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className="flex items-center space-x-2">
        {/* Home link */}
        <li>
          <div>
            <Link
              href="/"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-500"
              aria-label="Начало"
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Начало</span>
            </Link>
          </div>
        </li>

        {/* Breadcrumb items */}
        {items.map((item) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {item.current ? (
                <span
                  className="ml-2 text-sm font-medium text-gray-500"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="ml-2 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-700"
                >
                  {item.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Gallery-specific breadcrumb helper
export function GalleryBreadcrumb({
  category,
  subcategory,
  itemName,
}: {
  category?: string;
  subcategory?: string;
  itemName?: string;
}) {
  const items: BreadcrumbItem[] = [{ name: "Галерия", href: "/gallery" }];

  if (category) {
    // Convert category name to URL slug
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    items.push({
      name: category,
      href: `/gallery/${categorySlug}`,
      current: !subcategory && !itemName, // Current if no subcategory or item
    });
  }

  if (subcategory) {
    items.push({
      name: subcategory,
      href: `/gallery/${category?.toLowerCase().replace(/\s+/g, "-")}/${subcategory.toLowerCase()}`,
      current: !itemName, // Current if no item
    });
  }

  if (itemName) {
    items.push({
      name: itemName,
      href: "#",
      current: true,
    });
  }

  return <Breadcrumb items={items} />;
}

// FAQ-specific breadcrumb helper
export function FaqBreadcrumb() {
  const items: BreadcrumbItem[] = [
    { name: "Често задавани въпроси", href: "/faq", current: true },
  ];

  return <Breadcrumb items={items} />;
}
