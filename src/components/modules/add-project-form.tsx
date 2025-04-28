"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/shcemas/project";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { ProjectStatus } from "@/types/project";
import { Form, FormField } from "@/components/ui/form";
import api from "@/lib/api";

const AddProjectForm = () => {
  const form = useForm<CreateProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      status: ProjectStatus.Active,
    },
    resolver: zodResolver(createProjectSchema),
  });

  const handleCreateProject = form.handleSubmit(async (data) => {
    try {
      const response = await api.post("/projects", data);
      if (response.data) {
        addToast({
          title: "Project Created",
          description: "Your project has been created successfully.",
        });
      } else {
        addToast({
          title: "Project Creation Failed",
          description: "There was an error creating your project.",
          color: "danger",
        });
        console.error("Project creation failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during project creation:", error);
    }
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleCreateProject} className="space-y-6">
          <div className="flex flex-col gap-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  labelPlacement="outside"
                  label="Project Title"
                  placeholder="Project Title Here"
                  errorMessage={form.formState?.errors?.title?.message}
                  isInvalid={!!form.formState?.errors?.title}
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
                  label="Project Description"
                  placeholder="Project Description Here"
                  errorMessage={form.formState?.errors?.description?.message}
                  isInvalid={!!form.formState?.errors?.description}
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button color="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectForm;
