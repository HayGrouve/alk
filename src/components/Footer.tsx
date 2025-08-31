import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#003C70] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">a-el-key</h3>
            <p className="text-sm text-gray-300">
              Ръчно изработени мебели по поръчка в град София. Качество и стил
              свързани в едно.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Бързи връзки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Начало
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Галерия
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  За нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакти</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Нови Искър, София</p>
              <p>България</p>
              <p className="mt-3">
                <a
                  href="tel:+359876566262"
                  className="transition-colors hover:text-white"
                >
                  +359 87 656 6262
                </a>
              </p>
              <p>
                <a
                  href="mailto:kakrinski@abv.bg"
                  className="transition-colors hover:text-white"
                >
                  kakrinski@abv.bg
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 a-el-key. Всички права запазени.</p>
          {/* Subtle admin link - barely visible to average users */}
          <div className="mt-2">
            <Link
              href="/admin"
              className="text-xs text-gray-500 transition-colors hover:text-gray-400"
              title="Admin Panel"
            >
              ⚙️
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
