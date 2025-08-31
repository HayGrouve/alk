"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Името трябва да бъде поне 2 символа")
    .max(50, "Името не може да бъде повече от 50 символа"),
  email: z
    .string()
    .email("Моля, въведете валиден имейл адрес")
    .min(1, "Имейлът е задължителен"),
  phone: z
    .string()
    .min(10, "Телефонният номер трябва да бъде поне 10 цифри")
    .regex(/^[0-9+\-\s()]+$/, "Моля, въведете валиден телефонен номер"),
  projectType: z.string().min(1, "Моля, изберете тип проект"),
  budget: z.string().min(1, "Моля, изберете бюджетен диапазон"),
  message: z
    .string()
    .min(10, "Съобщението трябва да бъде поне 10 символа")
    .max(1000, "Съобщението не може да бъде повече от 1000 символа"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const projectTypes = [
  { value: "kitchen", label: "Кухня" },
  { value: "wardrobe", label: "Гардероб" },
  { value: "living-room", label: "Всекидневна" },
  { value: "bedroom", label: "Спалня" },
  { value: "office", label: "Офис" },
  { value: "custom", label: "Персонализиран проект" },
];

const budgetRanges = [
  { value: "under-5000", label: "Под 5,000 лв." },
  { value: "5000-10000", label: "5,000 - 10,000 лв." },
  { value: "10000-20000", label: "10,000 - 20,000 лв." },
  { value: "20000-50000", label: "20,000 - 50,000 лв." },
  { value: "over-50000", label: "Над 50,000 лв." },
];

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);

      // For now, we'll just show a success message
      alert("Благодарим ви! Ще се свържем с вас скоро.");

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Възникна грешка при изпращане на формата. Моля, опитайте отново.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#003C70]">
          Изпратете запитване
        </CardTitle>
        <CardDescription>
          Попълнете формата по-долу и ще се свържем с вас в рамките на 24 часа
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Вашето име"
                      {...field}
                      className="transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имейл *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ваш@имейл.com"
                      {...field}
                      className="transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+359 88 526 0083"
                      {...field}
                      className="transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Type Field */}
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип проект *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]">
                        <SelectValue placeholder="Изберете тип проект" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget Field */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бюджет *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]">
                        <SelectValue placeholder="Изберете бюджетен диапазон" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Съобщение *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Опишете вашия проект, предпочитания и въпроси..."
                      className="min-h-[120px] transition-colors duration-200 focus:ring-2 focus:ring-[#003C70]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Изпращане..."
                : "Изпрати запитване"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
