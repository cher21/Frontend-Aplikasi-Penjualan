import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ChevronDownIcon,
  // PencilIcon,
  // CreditCardIcon,
  // Cog8ToothIcon,
  FaceSmileIcon
} from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import logo from '../image/profile.jpg';
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function TopBar({ showNav, setShowNav }: any) {
  const router = useRouter()

  const handleLogout = async () => {
    localStorage.removeItem('token')
    router.push('/logout');
  }

  return (
    <div
      className={`fixed w-full z-10 h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <FaceSmileIcon className="relative">
          <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
            <BellIcon className="h-6 w-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
          </Transition>
        </FaceSmileIcon>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <Image width={40}
                  src={logo}
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile"
                />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                Hallo
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                {/* <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Billing
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Menu.Item> */}
                <Menu.Item>
                  <Link
                    /* <Link to='/logout' onClick={handleLogout} */
                    href='/logout' onClick={handleLogout}
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <MdLogout className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
