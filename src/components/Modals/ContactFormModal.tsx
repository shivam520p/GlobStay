import React, { useEffect, useState } from "react";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactFormModal = ({ isOpen, onClose, handleSuccess }: { isOpen: boolean; onClose: () => void, handleSuccess: () => void }) => {
  const intialField = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  }
  const [formData, setFormData] = useState<FormData>(intialField);

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fname") {
      setFname(value);
      setFormData((prev) => ({
        ...prev,
        name: `${value} ${lname}`.trim(),
      }));
    } else if (name === "lname") {
      setLname(value);
      setFormData((prev) => ({
        ...prev,
        name: `${fname} ${value}`.trim(),
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      setFormData(intialField)
      handleSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error || "Failed to submit the form.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F0F1EA] rounded-xl flex flex-col justify-center items-center w-[425px] px-10 py-12 gap-6 relative">
        <i
          className="absolute right-[15px] top-[15px] text-[#595D62] hover:text-black font-bold text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </i>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              id="fname"
              name="fname"
              type="text"
              required
              placeholder="First Name"
              className="text-sm w-full focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
              value={fname}
              onChange={handleNameChange}
            />
            <input
              id="lname"
              name="lname"
              type="text"
              required
              placeholder="Last Name"
              className="text-sm w-full focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
              value={lname}
              onChange={handleNameChange}
            />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            className="text-sm w-full focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            id="phone"
            name="phoneNumber"
            type="tel"
            required
            placeholder="Phone"
            className="text-sm w-full focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] leading-6"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="text-sm w-full focus:outline-none border-[#E2E2E2] border p-3 rounded-md placeholder:text-[#595D62]"
            rows={4}
            required
            value={formData.message}
            onChange={handleInputChange}
          />
          <button
            className="bg-primary hover:bg-primary/90 w-full text-sm font-semibold p-3 rounded-lg text-white"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
