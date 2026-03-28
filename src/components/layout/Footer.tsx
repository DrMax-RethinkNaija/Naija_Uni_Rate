import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Built by students, for students. Rethinking Nigeria.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/disclaimer"
              className="text-gray-400 hover:text-naija-green transition-colors"
            >
              Disclaimer & Terms
            </Link>
            <Link
              href="/universities"
              className="text-gray-400 hover:text-naija-green transition-colors"
            >
              Universities
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
