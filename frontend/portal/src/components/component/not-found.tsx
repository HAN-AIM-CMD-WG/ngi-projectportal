import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="container flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for does not exist.
          </p>
          <Link
            className="mt-8 inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to="/"
          >
            Go back home
          </Link>
        </div>
      </div>
    </section>
  );
}
