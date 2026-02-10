import React, { useState } from "react";
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
import { API_ENDPOINTS } from "../config/api";

const transactionSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Value must be a positive number",
    }),
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "Description must be at least 3 characters long"),
});

const TransactionForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      value: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const postResponse = await fetch(API_ENDPOINTS.transactions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: Number(data.value),
          description: data.description,
        }),
      });

      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }

      const postData = await postResponse.json();
      const transactionId = postData.transaction.id;

      console.log("Transaction created:", postData);

      const getResponse = await fetch(`${API_ENDPOINTS.transactions}/${transactionId}`);

      if (!getResponse.ok) {
        throw new Error("Failed to fetch transaction");
      }

      const transactionData = await getResponse.json();

      console.log("Transaction fetched:", transactionData);

      const formattedDate = new Date(transactionData.createdAt).toLocaleString('pt-BR');
      
      alert(
        `Transaction Created Successfully!\n\n` +
        `ID: ${transactionData.id}\n` +
        `Value: $${transactionData.value.toFixed(2)}\n` +
        `Description: ${transactionData.description}\n` +
        `Created at: ${formattedDate}`
      );

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TransactionForm;
