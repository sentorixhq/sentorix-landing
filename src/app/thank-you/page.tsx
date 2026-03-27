import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Thanks — we&apos;ll be in touch within 24 hours
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          While you wait, explore the Sentorix docs or try the live gateway.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/sentorixhq/sentorix-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-brand-500/25 text-center"
          >
            View documentation
          </a>
          <a
            href="https://api.sentorix.io/v1/health"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-white hover:border-brand-300 rounded-lg transition-all text-center"
          >
            Try the API
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-brand-500 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
