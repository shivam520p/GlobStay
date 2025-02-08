import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCareerInfo } from "@/store/careerSlice";
import { careerEnquiry } from "@/utils/api";
import { fetchBannerInfo } from "@/store/bannerSlice";
import BreadCrumbs from "@/components/BreadCrumbs";
import { fetchAboutInfo } from "@/store/aboutUsSlice";

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

interface FormData {
  name: string;
  email: string;
  mobile_no: string;
  description: string;
  resume: string;
  job_id: string;
}

interface CareerData {
  title: string;
  exp: string;
  id: number;
  data: string;
}

const Career: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { data: fetchBanner } = useAppSelector((state) => state.banner);
  const { data: fetchCareer } = useAppSelector((state) => state.career);
  const { data: fetchAboutUs } = useAppSelector((state) => state.aboutUs);

  useEffect(() => {
    dispatch(fetchCareerInfo());
    dispatch(fetchAboutInfo());
    dispatch(fetchBannerInfo({ type: "career" }));
  }, [dispatch]);

  const intialField = {
    name: "",
    email: "",
    mobile_no: "",
    description: "",
    resume: "",
    job_id: "",
  };

  const [formData, setFormData] = useState<FormData>(intialField);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { name, email, mobile_no, description, job_id } = formData;
      const reqBody = {
        name,
        email,
        mobile_no,
        description,
        job_id, // This should now be set correctly
        resume: fileName,
      };

      const response = await careerEnquiry(JSON.stringify(reqBody));

      if (response === "OK") {
        setFormData(intialField);
        setFileName(null);
        setIsLoading(false);
        alert("Form submitted successfully!");
      } else {
        setIsLoading(false);
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert(error || "Failed to submit the form.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Career Page Hero section */}
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

      {/* Career Page Form section */}
      {Array.isArray(fetchAboutUs) &&
        fetchAboutUs
          .filter((item) => item.page_name === "career")
          .map((abt) => (
            <div key={abt.id} className="container mx-auto py-12 px-4">
              <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-16">
                {/* Left Section with Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start justify-center space-y-6">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {abt.title}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl">
                  {abt.paragraph}
                  </p>
                </div>

                {/* Right Section with Form */}
                <div className="w-full lg:w-1/2 lg:pl-32">
                  <form
                    className="flex flex-col space-y-6 lg:space-y-1 py-6 px-6 lg:px-8 border rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col">
                      <label
                        htmlFor="fullName"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="name"
                        value={formData.name}
                        placeholder="Enter Your Full Name"
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base shadow-sm rounded-lg"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="emailAddress"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="email"
                        value={formData.email}
                        placeholder="Enter Your Email Address"
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base shadow-sm rounded-lg"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="mobile"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile_no"
                        value={formData.mobile_no}
                        placeholder="Enter Your Mobile Number"
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base shadow-sm rounded-lg"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Job Title Section */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="jobTitle"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Job Title
                      </label>
                      <select
                        id="jobTitle"
                        name="job_id"
                        value={formData.job_id}
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base text-gray-400 shadow-sm rounded-lg"
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          Select Your Job Title
                        </option>
                        {fetchCareer &&
                          Array.isArray(fetchCareer) &&
                          fetchCareer.map((career: CareerData) => (
                            <option key={career.id} value={career.id}>
                              {career.title}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Experience Level Section */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="experience"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Experience Level
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base text-gray-400 shadow-sm rounded-lg"
                        required
                      >
                        <option value="" disabled>
                          Select Your Experience Level
                        </option>
                        {fetchCareer &&
                          Array.isArray(fetchCareer) &&
                          fetchCareer.map((career: CareerData) => (
                            <option key={career.exp} value={career.exp}>
                              {career.exp}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Resume Upload Section */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="resume"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Attach Your Resume
                      </label>
                      <div className="border-dashed border-2 border-gray-400 rounded-md p-2 text-center cursor-pointer hover:border-gray-600">
                        <input
                          type="file"
                          id="resume"
                          className="hidden"
                          onChange={handleFileChange}
                          required
                        />
                        <label
                          htmlFor="resume"
                          className="flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <FaLink />
                          <span className="text-gray-600 font-medium">
                            Attach Resume/ CV
                          </span>
                        </label>
                      </div>
                      {fileName && (
                        <p className="mt-2 text-gray-600">
                          Selected file: {fileName}
                        </p>
                      )}
                    </div>

                    {/* Description Section */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="description"
                        className="text-base font-medium text-gray-700 py-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        placeholder="Brief Description..."
                        className="px-4 py-2 border border-gray-500 outline-gray-600 placeholder:text-base shadow-sm rounded-lg"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center lg:justify-end pt-3">
                      <button
                        type="submit"
                        className="w-full px-8 py-2 border border-gray-500 hover:bg-primary hover:text-white font-medium rounded-full duration-500"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit Details"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Career;
