import { forwardRef, LegacyRef} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '../image/logo-2150297__340.jpg'
import { MdCottage, MdCategory, MdSupervisedUserCircle } from "react-icons/md"
import Image from "next/image";

const SideBar = forwardRef(({  }, ref: LegacyRef<HTMLDivElement>) => {
  const router = useRouter();
  const listMenu = [
    { to: 'home', path: '/home', icon: <MdCottage />, name: 'Home' },
    { to: 'user', path: '/user', icon: <MdSupervisedUserCircle />, name: 'User' },
    { to: 'product', path: '/product', icon: <MdCategory />, name: 'Products' },
    // { to: 'logout', path: '/logout', icon: <MdLogout />, name: 'Logout' },
  ]


  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <Image width={120}
            className="h-auto"
            src={logo}
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        {
          (listMenu || []).map((mn) => (
            <Link href={`${mn.to}`} key={mn.name}>
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname === mn.path
                    ? "bg-orange-100 text-orange-500"
                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                  }`}
              >
                <div className="mr-2">
                  {mn.icon}
                </div>
                <div>
                  <p>{mn.name}</p>
                </div>

              </div>
            </Link>
          ))}

      </div>
    </div>
  );
});


SideBar.displayName = "SideBar";

export default SideBar;
