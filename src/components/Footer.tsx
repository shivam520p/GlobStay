import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import LocationIco from "../assets/images/Icons/LocationIco";
import MailIco from "../assets/images/Icons/MailIco";
import PhoneIco from "../assets/images/Icons/PhoneIco";
import LinkedinIco from "../assets/images/Icons/LinkedinIco";
import FacebookIco from "../assets/images/Icons/FacebookIco";
import TwitterIco from "../assets/images/Icons/TwitterIco";
import InstagramIco from "../assets/images/Icons/InstagramIco";
import ArrowRight from "../assets/images/Icons/ArrowRight";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import YouTubeIco from "@/assets/images/Icons/YouTubeIco";

const Footer = ({ script }: { script: string }) => {
  const { data } = useAppSelector((state) => state.company);
  const aboutLinks = [
    { id: 1, label: "About us", href: "/about" },
    { id: 2, label: "Contact us", href: "/contact" },
    { id: 3, label: "Careers", href: "/careers" },
    { id: 4, label: "Blog", href: "/blog" },
  ];

  const moreInfoLinks = [
    { id: 2, label: "All Properties", href: "/propertiesList" },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: <LinkedinIco width="50px" height="50px" />,
      href: data?.linkedin ?? "#",
    },
    {
      id: 2,
      icon: <FacebookIco width="50px" height="50px" />,
      href: data?.facebook ?? "#",
    },
    {
      id: 3,
      icon: <TwitterIco width="50px" height="50px" />,
      href: data?.twitter ?? "#",
    },
    {
      id: 4,
      icon: <InstagramIco width="50px" height="50px" />,
      href: data?.instagram ?? "#",
    },
    {
      id: 5,
      icon: <YouTubeIco width="50px" height="50px" />,
      href: data?.youtube_link ?? "#",
    },
  ];
  return (
    <>
      <footer className="bg-primarybg mt-2">
        <div className="container mx-auto lg:flex items-center justify-between p-6">
          <div className="block lg:mr-10">
            <span className="bg-white block logoftr">
              <Image src={logo} alt="Logo" width={100} height={48} />
            </span>
          </div>
          <div className="grid lg:grid-cols-3 lg:gap-4 grid-cols-1 lg:space-x-3 mt-10 blg:mt-28 space-y-4 lg:space-y-0">
            <div className="infoCnt px-2">
              <div className="flex items-center text-white text-base mb-5">
                <span className="mr-3">
                  <LocationIco width="24px" height="24px" />
                </span>
                {data?.address}
              </div>
              <div className="flex items-center text-white/70 text-base mb-5">
                <span className="mr-3">
                  <MailIco width="24px" height="24px" />
                </span>
                Email:&nbsp;
                <a className="text-white" href={`mailto:${data?.email}`}>
                  {data?.email}
                </a>
              </div>
              <div className="flex items-center text-white/70 text-base mb-5">
                <span className="mr-3">
                  <PhoneIco width="24px" height="24px" />
                </span>
                Hostline:&nbsp;
                <a className="text-white" href={`tel:${data?.mobile}`}>
                  {data?.mobile}
                </a>
              </div>
            </div>
            <div className="widgets grid lg:grid-cols-2 lg:gap-3 grid-cols-1 space-y-4 lg:space-y-0">
              <div className="ftrwdt px-2">
                <h4 className="text-white font-semibold text-lg">ABOUT</h4>
                <ul>
                  {aboutLinks.map((link) => (
                    <li key={link.id}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ftrwdt px-2">
                <h4 className="text-white font-semibold text-lg">
                  MORE INFORMATION
                </h4>
                <ul>
                  {moreInfoLinks.map((link) => (
                    <li key={link.id}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ftrwdt px-2">
              <h4 className="text-white font-semibold text-lg">Follow us</h4>
              <div className="socialLinks flex text-white mt-4">
                {socialLinks.map((social) => (
                  <Link key={social.id} href={social.href}>
                    {social.icon}
                  </Link>
                ))}
              </div>
              <div className="sbsBox lg:mt-8 mt-4 space-y-4">
                <h4 className="text-white font-semibold text-lg">Blog</h4>
                <form>
                  <div className="sbsInput md:flex block">
                    <input
                      type="email"
                      name="subscribe"
                      placeholder="Email address"
                      className="md:w-auto w-full focus-visible:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center sm:px-4 sm:py-2 md:rounded-r-[8px] md:w-auto w-full max-sm:rounded-md p-4"
                    >
                      Subscribe
                      <i className="ml-2">
                        <ArrowRight width="16px" height="13px" />
                      </i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center items-center p-6 ftrCopRyt">
          <div className="text-primaryLightText ">
            <p>
              Designed & Developed By{" "}
              <a target="_blank" className="text-white font-semibold" href="#">
                Nera Soft
              </a>
            </p>
          </div>
        </div>
        {script && <script type="text/javascript">{script}</script>}
      </footer>
    </>
  );
};

export default Footer;
