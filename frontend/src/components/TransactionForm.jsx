import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const transactionSchema = z.object({
  valor: z
    .string()
    .min(1, "Value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Value must be a positive number",
    }),
  descricao: z
    .string()
    .min(1, "Description is required")
    .min(3, "Description must be at least 3 characters long"),
});

const TransactionForm = () => {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      valor: "",
      descricao: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert(`Value: $${data.value}\nDescription: ${data.description}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        New Transaction
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a description for the transaction..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TransactionForm;
