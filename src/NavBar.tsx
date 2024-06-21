import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import icon from "./icon1.png";
import { useAppSelector } from "./redux/hooks";
const navigation = [
  { name: "My plants", href: "" },
  { name: "Encyclopedia", href: "/encyclopedia" },
  { name: "Devices", href: "/devices" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { token, name } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currNav, setCurrNav] = useState(0);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Disclosure as="nav" className="bg-green">
      {
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div
                className={`flex flex-1 items-center justify-center ${
                  token && "sm:justify-start"
                }`}
              >
                <img className="h-12 w-auto" src={icon} alt="Your Company" />
                <h2 className="text-2xl font-bold text-light-mint mx-4">
                  PlantKeeper
                </h2>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {token &&
                      navigation.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            currNav === index
                              ? "bg-dark-green text-white"
                              : "text-text-green hover:bg-dark-green hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium active:scale-95 text"
                          )}
                          aria-current={currNav === index ? "page" : undefined}
                          onClick={() => setCurrNav(index)}
                        >
                          {item.name}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full text-sm  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {token && (
                        <div className="relative inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-light-grey rounded-full focus:outline-none">
                          <span className="text-xl text-text-green font-mediu">
                            {name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={handleLogout}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      }
    </Disclosure>
  );
}
