import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#003C70] text-white dark:border-t dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">a-el-key</h3>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Ръчно изработени мебели по поръчка в град София. Качество и стил
              вързани в едно.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Бързи връзки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Начало
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Галерия
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-gray-200"
                >
                  За нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакти</h3>
            <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <p>София, България</p>
              <p>Очаквайте ни скоро!</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-600 pt-8 text-center text-sm text-gray-300 dark:border-gray-700 dark:text-gray-400">
          <p>&copy; 2024 a-el-key. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
