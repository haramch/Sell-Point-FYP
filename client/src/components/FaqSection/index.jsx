import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Do I require coding knowledge to launch an eCommerce platform with Yo!Kart?",
    answer:
      "No, there is no need to have any coding knowledge to use Yo!Kart. One of the key reasons behind Yo!Kart’s global success is its suitability to diverse users and businesses. The software is a readymade solution and can be installed on a server of your choice."
  },
  {
    question: "Can I customize my eCommerce store design?",
    answer:
      "Yes, Yo!Kart provides a range of templates and customization options. You can modify layouts, colors, and other design elements to match your brand identity without needing to code."
  },
  {
    question: "Is Yo!Kart scalable for large businesses?",
    answer:
      "Absolutely. Yo!Kart is designed to support businesses of all sizes, from startups to large enterprises. Its architecture ensures smooth performance as your business grows."
  },
  {
    question: "Is support provided after purchase?",
    answer: "Yes, Yo!Kart offers full technical support and assistance to ensure your platform runs smoothly after installation."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-12 bg-[#ffffff]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-sm bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-4 text-[--text] font-extrabold hover:bg-gray-50 focus:outline-none"
              >
                {item.question}
                <ChevronDown
                  className={`w-5 h-5 text-[--text] transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Only render content if open */}
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-screen py-4" : "max-h-0 py-0"
                }`}
              >
                <p className="text-[--text]">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
