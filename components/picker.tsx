"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.date({
  required_error: "A date of birth is required.",
});

type CalendarFormProps = {
  control: UseFormReturn<any>["control"];
  name: string;
  disablePast?: boolean;
};
export function CalendarForm({
  control,
  name,
  disablePast = false,
}: CalendarFormProps) {
  const form = useFormContext() as UseFormReturn<any>;
  const fieldValue = form.getValues(name);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !fieldValue && "text-muted-foreground"
            )}
          >
            {fieldValue ? (
              format(fieldValue, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={fieldValue ? new Date(fieldValue) : undefined}
          onSelect={(date) => {
            form.setValue(name, date);
          }}
          disabled={(date) => {
            if (disablePast) {
              return date < new Date();
            }
            return date < new Date("1900-01-01");
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CalendarForm;
