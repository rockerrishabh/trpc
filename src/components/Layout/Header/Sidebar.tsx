import { Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import Switcher from '../../DarkMode/Switcher'

function Sidebar() {
  const router = useRouter()
  const notHomepage = router.pathname !== '/'
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div className="">
            <Menu.Button className="flex cursor-pointer items-center text-gray-700 hover:text-gray-500 ">
              <MenuIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="fixed top-0 right-0 z-50 h-screen w-44 rounded-lg border-l bg-white transition duration-300 ease-in-out dark:border-gray-300 dark:bg-gray-900">
              <div className="px-1 py-1 ">
                <Menu.Button className="mt-2 flex w-full cursor-pointer items-center justify-between px-2 text-gray-700 hover:text-gray-500 ">
                  <XIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  {notHomepage && <Switcher />}
                </Menu.Button>
                <Link href="/dashboard/profile">
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group mt-4 flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-gray-200`}
                      >
                        Categories
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              </div>
              <div className="px-1 py-1">
                <Link href="/">
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-gray-200`}
                      >
                        About Us
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              </div>
              <div className="px-1 py-1">
                <Link href="/">
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-gray-200`}
                      >
                        Contact Us
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={() => signIn('google')}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-gray-200`}
                    >
                      Sign In
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Sidebar
