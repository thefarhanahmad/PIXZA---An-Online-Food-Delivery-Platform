"use client";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting Form...");
    // console.log("Submitted Data:", formData);
    try {
      const response = await axios.post("/api/contact", formData);
      // console.log("contact api response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        router.push("/");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      console.log("error in send contact message : ", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#ff6b6b] px-3 py-1 text-sm text-gray-50 dark:bg-[#ff8c8c]">
              Get in Touch
            </div>
            <h2 className="text-3xl text-gray-50 font-bold tracking-tighter sm:text-5xl">
              Contact Us
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Have a question, comment, or feedback? We'd love to hear from you!
              Fill out the form below and one of our team members will get back
              to you as soon as possible.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-sm space-y-2"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full outline-none text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full outline-none text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
            <button
              type="submit"
              className="w-full outline-none bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
