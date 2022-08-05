import Link from 'next/link'

function Footer() {
  return (
    <footer className="sticky bottom-0 flex-none border-t border-gray-300 bg-white transition-colors duration-300 dark:border-gray-500 dark:bg-slate-900">
      <div className="mx-auto flex max-w-[85rem] flex-col-reverse items-center justify-between gap-3 py-4 px-5 md:flex-row md:gap-0 2xl:px-0">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <a className="flex items-center font-medium text-gray-900">
              <span className="text-xl hover:text-red-500/90 dark:text-gray-200 dark:hover:text-red-500/90">
                Blog
              </span>
            </a>
          </Link>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
            © 2022
          </p>
        </div>
        <div className="mt-1 inline-flex justify-center sm:justify-start">
          <Link href="/">
            <a className="text-gray-500 hover:text-indigo-500 dark:text-gray-200">
              Privacy Policy
            </a>
          </Link>
          <Link href="/">
            <a className="ml-3 text-gray-500 hover:text-indigo-500 dark:text-gray-200">
              Terms and Conditions
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
