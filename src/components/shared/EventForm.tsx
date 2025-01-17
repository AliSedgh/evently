"use client";
import { eventDefaultValues } from "@/constants";
import { IEvent } from "@/lib/database/models/event.model";
import { eventFormSchema } from "@/lib/validator";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Checkbox,
  InputAdornment,
  styled,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Dropdown from "./Dropdown";
import CustomTextArea from "./CustomTextArea";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import CustomTextField from "./CustomTextField";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import { useRouter } from "next/navigation";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};


const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {


  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          categoryId: event.category._id,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });
  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log("valueeeeeeeee", values);

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <TextField
                    {...field}
                    variant="outlined"
                    className="w-full"
                    label="Event title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    event={event}
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <CustomTextArea
                    {...field}
                    minRows={13}
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5  md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center bg-[#f6f6f6] rounded-full w-full">
                    <TextField
                      className="w-full"
                      label="Event location"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              src="/assets/icons/location-grey.svg"
                              alt="calendar"
                              width={20}
                              height={20}
                            />
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center w-full">
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      customInput={
                        <TextField
                          className="w-full"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {" "}
                                <span className="text-xs">Start Date</span>
                              </InputAdornment>
                            ),
                          }}
                        />
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center w-full">
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      customInput={
                        <TextField
                          className="w-full"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                sx={{ padding: "0px" }}
                                position="start"
                              >
                                {" "}
                                <span className="text-xs">end Date</span>
                              </InputAdornment>
                            ),
                          }}
                        />
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center w-full overflow-hidden rounded-full px-4 py-2">
                    <TextField
                      type="number"
                      label="Price"
                      {...field}
                      className="w-full"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <FormField
                              control={form.control}
                              name="isFree"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center">
                                      <label
                                        htmlFor="isFree"
                                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        Free Ticket
                                      </label>
                                      <Checkbox
                                        onChange={field.onChange}
                                        checked={field.value}
                                        id="isFree"
                                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center placeholder:p-2 w-full overflow-hidden rounded-full px-4 py-2">
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {" "}
                            <Image
                              src="/assets/icons/link.svg"
                              alt="link"
                              width={20}
                              height={20}
                            />
                          </InputAdornment>
                        ),
                      }}
                      label="URL"
                      {...field}
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="default"
          className="mt-4 w-full"
        >
          {form.formState.isSubmitting ? "is sending..." : "send"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
