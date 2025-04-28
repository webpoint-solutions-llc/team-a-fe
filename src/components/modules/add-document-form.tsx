"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { Form, FormField } from "@/components/ui/form";
import api from "@/lib/api";
import {
  createDocumentSchema,
  type CreateDocumentInput,
} from "@/shcemas/project";

const AddDocumentForm = () => {
  const form = useForm<CreateDocumentInput>({
    defaultValues: {
      title: "",
      description: "",
      link: "",
      tags: "",
      visibility: "public",
      categoryId: "0048be44-b57d-47f4-a2e1-aa314dc5ca68",
    },
    resolver: zodResolver(createDocumentSchema),
  });

  const handleCreateDocument = form.handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        categoryId: "0048be44-b57d-47f4-a2e1-aa314dc5ca68",
      };

      await api.post("/documents", payload);

      form.reset();
      addToast({
        title: "Document created successfully",
        description: "Your document has been created.",
      });
    } catch (error) {
      console.error(error);
    }
  });

  console.log(form.formState.errors);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleCreateDocument} className="space-y-6">
          <div className="flex flex-col gap-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  labelPlacement="outside"
                  label="Document Title"
                  placeholder="Enter document title"
                  errorMessage={form.formState.errors.title?.message}
                  isInvalid={!!form.formState.errors.title}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  labelPlacement="outside"
                  label="Document Description"
                  placeholder="Enter document description"
                  errorMessage={form.formState.errors.description?.message}
                  isInvalid={!!form.formState.errors.description}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <Input
                  labelPlacement="outside"
                  label="Document URL"
                  placeholder="Enter document URL"
                  errorMessage={form.formState.errors.link?.message}
                  isInvalid={!!form.formState.errors.link}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <Input
                  labelPlacement="outside"
                  label="Tags"
                  placeholder="Enter comma-separated tags"
                  errorMessage={form.formState.errors.tags?.message}
                  isInvalid={!!form.formState.errors.tags}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <Select
                  label="Visibility"
                  labelPlacement="outside"
                  placeholder="Select visibility"
                  selectedKey={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  errorMessage={form.formState.errors.visibility?.message}
                  isInvalid={!!form.formState.errors.visibility}
                >
                  <SelectItem key="public" value="public">
                    Public
                  </SelectItem>
                  <SelectItem key="private" value="private">
                    Private
                  </SelectItem>
                </Select>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button color="primary" type="submit">
              Create Document
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddDocumentForm;
