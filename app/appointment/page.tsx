"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalendarForm from "@/components/picker";
import { Hospital, Calendar, User, Phone, Clock } from "lucide-react";

// Define the schema for the form
const appointmentSchema = z.object({
  hospitalName: z.string().nonempty("Hospital name is required"),
  modeOfAppointment: z.enum(["in-person", "online"], {
    required_error: "Please select a mode of appointment.",
  }),
  patientName: z.string().nonempty("Patient name is required"),
  contactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Date is required",
  }),
  time: z.string().nonempty("Time is required"),
});

type AppointmentFormInputs = z.infer<typeof appointmentSchema>;

function AppointmentForm() {
  const form = useForm<AppointmentFormInputs>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      hospitalName: "",
      modeOfAppointment: undefined,
      patientName: "",
      contactNumber: "",
      date: undefined,
      time: "",
    },
  });

  const onSubmit = (data: AppointmentFormInputs) => {
    toast({
      title: "Appointment Scheduled",
      description: `Hospital: ${data.hospitalName}, Mode: ${
        data.modeOfAppointment
      }, Date: ${data.date.toDateString()}, Time: ${data.time}`,
    });
    console.log(data); // For debugging
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hospital Name */}
        <FormField
          control={form.control}
          name="hospitalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Hospital className="h-4 w-4" /> Hospital Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter hospital name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the hospital or clinic.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mode of Appointment */}
        <FormField
          control={form.control}
          name="modeOfAppointment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Mode of Appointment
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the mode of your appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Patient Name */}
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                {" "}
                <User className="h-4 w-4" /> Patient Name{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter patient name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the full name of the patient.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                {" "}
                <Phone className="h-4 w-4" /> Contact Number{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter contact number" {...field} />
              </FormControl>
              <FormDescription>
                Enter a 10-digit contact number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2">
                {" "}
                <Calendar className="h-4 w-4" /> Select Date{" "}
              </FormLabel>
              <FormControl>
                <CalendarForm control={form.control} name="date" />
              </FormControl>
              <FormDescription>
                Choose a date for your appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Input */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                {" "}
                <Clock className="h-4 w-4" /> Select Time
              </FormLabel>
              <FormControl>
                <Input
                  type="time"
                  {...field}
                  className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </FormControl>
              <FormDescription>
                Choose a time for your appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          Schedule Appointment
        </Button>
      </form>
    </Form>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Schedule an Appointment</h1>
      <AppointmentForm />
    </div>
  );
}
