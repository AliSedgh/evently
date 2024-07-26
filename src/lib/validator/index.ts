import * as z from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z
      .string({ required_error: "this filed is required" })
      .nonempty({ message: "this filed is required" }),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
  })
  .refine((data) => data.isFree || data.price, {
    message: "Price is required if the event is not free",
    path: ["price"],
  });
