import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import router from "next/router";
import { fetchCompanyInfo } from "@/store/companySlice";

const Header = ({ pathName, script }: { pathName: string; script: string }) => {

  const { data, loading, error } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  const companyLogo =
    data?.logo && `${process.env.NEXT_PUBLIC_API_URL}${data?.logo}`;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact" },
    { path: "/career", label: "Career" },
    { path: "/blog", label: "Blog" },
  ];
  if (error) return <div>Error...</div>;
  return (
    <>
      <head>{script && <script type="text/javascript">{script}</script>}</head>
      <div className="relative">
        <header className="shadow-md">
          <div className="container mx-auto flex items-center justify-between p-6">
            <div className="flex items-center">
              <div className="logoImg">
                <Link href="/">
                  {!loading ? (
                    <Image
                      src={companyLogo ?? logo}
                      className="w-full h-full object-contain"
                      alt="Logo"
                      width={125}
                      height={74}
                    />
                  ) : (
                    "loading..."
                  )}
                </Link>
              </div>
              <nav className="lg:flex hidden pl-16">
                <ul className="flex space-x-6 font-medium text-gray-800">
                  {navLinks.map(({ path, label }) => (
                    <li key={path}>
                      <Link
                        href={path}
                        className={`hover:text-primary ${
                          pathName === path ? "active" : ""
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="lg:flex hidden">
              <button
                onClick={() => {
                  router.push("/contact");
                }}
                className="border mr-2 lg:px-8 lg:py-3 px-4 py-2 rounded-lg border-primary font-semibold hover:shadow-md"
              >
                Contact us
              </button>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${data?.brochure}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border lg:px-8 lg:py-3 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-md cursor-pointer"
                download
              >
                Get Brochure
              </a>
            </div>
            <button
              onClick={toggleDrawer}
              className="lg:hidden text-3xl text-gray-700 focus:outline-none"
            >
              {isDrawerOpen ? <HiOutlineX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <div
          className={`absolute lg:hidden top-full left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out z-50 ${
            isDrawerOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-6 space-y-4 font-medium text-gray-800">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`hover:text-primary ${
                    pathName === path ? "active" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${data?.brochure}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary" 
                download
              >
                Get Brochure
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-primary ${
                  pathName === "/contact" ? "active" : ""
                }`}
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
