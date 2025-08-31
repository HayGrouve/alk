"use client";

import { useState } from "react";
import { FaqSearch } from "./FaqSearch";
import { ContactForm } from "./ContactForm";
import { faqData } from "@/data/faq-data";

import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";

export function FaqPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Често задавани въпроси
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Намерете отговори на най-често задаваните въпроси за нашите мебели и
            услуги. Ако не намерите това, което търсите, не се колебайте да се
            свържете с нас.
          </p>
        </div>

        {/* FAQ Search */}
        <div className="mb-12">
          <FaqSearch faqs={faqData} />
        </div>

        {/* Contact Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Не намерихте отговора?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Нашият екип е готов да ви помогне с всички въпроси относно
              мебелите и услугите ни.
            </p>

            {!showContactForm ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setShowContactForm(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Свържете се с нас
                </Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Или се обадете на <strong>+359 87 656 6262</strong>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-2xl">
                <ContactForm />
                <Button
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="mt-4"
                >
                  Назад към въпросите
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
