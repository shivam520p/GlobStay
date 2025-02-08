import { contactEnquiry } from "@/utils/api";
import React, { useState, ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialField = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const GlobelPopUp: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialField);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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

      console.log("Submitting:", reqBody); 

      const response = await contactEnquiry(JSON.stringify(reqBody));

      if (response === "OK") {
        setFormData(initialField); 
        
        alert("Message sent successfully!");
      } else {
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error || "Failed to submit the form.");
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#F0F1EA] rounded-xl flex flex-col justify-center items-center w-full md:w-[425px] p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-xl font-bold p-2"
        >
          <RxCross2 />
        </button>

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
            type="text"
            required
            placeholder="Phone"
            className="text-sm w-full mb-3 focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={isLoading} // Disables the input if loading is true
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
            className="bg-primary w-full text-sm font-semibold p-3 rounded-lg text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlobelPopUp;
