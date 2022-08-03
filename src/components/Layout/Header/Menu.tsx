import { signOut, useSession } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/future/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function MenuComponent() {
  const { data: session } = useSession()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex cursor-pointer items-center text-gray-700 hover:text-gray-500 ">
          <Image
            className="rounded-full"
            height="30"
            width="30"
            alt=""
            src={session?.user.image as string}
          />
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-44">
          <div className="px-1 py-1 ">
            <Link href="/dashboard/profile">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
            </Link>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                  }}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuComponent
