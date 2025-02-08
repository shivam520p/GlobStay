import "swiper/css";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import MapIco from "@/assets/images/Icons/MapIco";
import PhoneICo from "@/assets/images/Icons/PhoneIco";
import MailIco from "@/assets/images/Icons/MailIco";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBannerInfo } from "@/store/bannerSlice";
import { contactEnquiry } from "@/utils/api";
import { fetchCompanyInfo } from "@/store/companySlice";
import Image from "next/image";
const SuccessModal = dynamic(() => import("@/components/Modals/SuccessModal"), {
  ssr: false,
});
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}
interface Banner {
  id: number;
  type: string;
  image: string;
  title: string;
  description: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}
export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const { data: fetchBanner } = useAppSelector((state) => state.banner);
  console.log(fetchBanner);
  useEffect(() => {
    dispatch(fetchBannerInfo({ type: "contact" }));
    dispatch(fetchCompanyInfo());
  }, [dispatch]);
  const intialField = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const [formData, setFormData] = useState<FormData>(intialField);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { name, email, phoneNumber, message } = formData;
      const reqBody = {
        name,
        email,
        mobile_no: phoneNumber,
        message,
      };
      const response = await contactEnquiry(JSON.stringify(reqBody));
      if (response === "OK") {
        setModalOpen(true);
        setFormData(intialField);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert(error || "Failed to submit the form.");
      setIsLoading(false);
    }
  };
  return (
    <>
      {fetchBanner &&
        Array.isArray(fetchBanner) &&
        fetchBanner.map((banner: Banner) => (
          <BreadCrumbs
            key={banner.id}
            title={banner.title}
            description={banner.description}
            imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${banner.image}`}
          />
        ))}
      <div className="grid md:grid-cols-2 md:gap-4 grid-cols-1 gap-3 mt-12">
        <div className="col-span-1 px-8 lg:px-28 py-6">
          <div className="bg-white flex items-center justify-start">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${data?.logo}`}
              alt="Logo"
              width={80}
              height={16}
            />
            <p className="text-4xl text-gray-700 font-medium tracking-wide">
              {data?.name}
            </p>
          </div>

          <div className="w-[350px] mt-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-3 bg-primarybg text-white rounded">
                <MapIco width="24px" height="24px" />
              </div>
              <div className="cnt">
                <h4 className="text-base font-bold">Our Location</h4>
                <p>{data?.address ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8">
              <div className="p-3 bg-primarybg text-white rounded">
                <PhoneICo width="24px" height="24px" />
              </div>
              <div className="cnt">
                <h4 className="text-base font-bold">Phone Number</h4>
                <p>
                  <a href={`tel:${data?.mobile}`}>+91-{data?.mobile}</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8">
              <div className="p-3 bg-primarybg text-white rounded">
                <MailIco width="24px" height="24px" />
              </div>
              <div className="cnt">
                <h4 className="text-base font-bold">Email Address</h4>
                <p>
                  <a href={`mailto:${data?.email}`}>{data?.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-start px-8">
          <div className="bg-[#F0F1EA] rounded-xl flex flex-col justify-center items-center w-full md:w-[425px] px-10 py-12">
            <form onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                className="text-sm w-full mb-3 focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="text-sm w-full mb-3 focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <input
                id="phone"
                name="phoneNumber"
                type="tel"
                required
                placeholder="Phone"
                className="text-sm w-full mb-3 focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <textarea
                id="message"
                name="message"
                required
                placeholder="Message"
                className="text-sm w-full mb-3 focus:outline-none border-[#E2E2E2] border p-3 rounded-md placeholder:text-[#595D62]"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                className="bg-primary  w-full text-sm font-semibold p-3 rounded-lg text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="px-4 py-11">
        <h3 className="text-2xl font-bold mb-6">Direction</h3>
        <div className="loctionFrame">
          <iframe
            width="100%"
            height="593.82px"
            frameBorder="0"
            className="rounded-md"
            referrerPolicy="no-referrer-when-downgrade"
            src={
              data?.map_link ??
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.366671815197!2d77.39733047613372!3d28.498613890148423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce90019bb717d%3A0x4317a51203e8e609!2sABC%20Tower%20gate%20no%201!5e0!3m2!1sen!2sin!4v1731939790052!5m2!1sen!2sin"
            }
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
