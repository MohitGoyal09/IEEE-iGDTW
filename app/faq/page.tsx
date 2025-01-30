"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "What is Eyelink and how can it help me?",
    answer:
      "Eyelink is a platform designed to connect patients with healthcare services. We help you find hospitals, book appointments, and access various health resources.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "To schedule an appointment, navigate to the 'Book Appointment' page. You will need to provide your details and select a date and time that works for you.",
  },
  {
    question: "What if I can't find my hospital in the list?",
    answer:
      "If you can't find your hospital, please contact us directly through our contact form or support email. We will do our best to add your hospital to our list promptly.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes, you can reschedule or cancel your appointment. Please do so at least 24 hours in advance through our platform or by contacting our support team.",
  },
  {
    question: "How can I access my previous appointment records?",
    answer:
      "To access your previous appointment records, please log in to your account and navigate to the 'My Appointments' section.",
  },
  {
    question: "Is there a cost to use Eyelink?",
    answer:
      "Using Eyelink to find healthcare services is free. Please note that individual services or appointments may incur costs based on the provider's terms.",
  },
  {
    question: "Is my personal and health information secure?",
    answer:
      "Absolutely. We take the security of your data very seriously. All personal and health information is encrypted and stored securely in compliance with HIPAA regulations.",
  },
  {
    question: "Can I use Eyelink on my mobile device?",
    answer:
      "Yes, Eyelink is fully responsive and can be used on various mobile devices such as smartphones and tablets.",
  },
  {
    question: "What kind of support does Eyelink offer?",
    answer:
      "We offer several support channels including a contact form on our site and direct email support. You can reach us with your questions, and we will respond as soon as we can.",
  },
  {
    question: "How can I provide feedback about Eyelink?",
    answer:
      "We value your feedback. Please use our contact form or email us directly with your comments or suggestions so we can improve Eyelink.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <Accordion type="single" collapsible>
        {filteredFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
