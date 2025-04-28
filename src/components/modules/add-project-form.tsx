"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/shcemas/project";
import { Button, Input, Textarea } from "@heroui/react";
import { ProjectStatus } from "@/types/project";
import { Form, FormField } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Import shadcn date picker components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button as ShadcnButton } from "@/components/ui/button";

const AddProjectForm = () => {
  const form = useForm<CreateProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      kickoffDate: "",
      deadline: "",
      status: ProjectStatus.Active,
    },
    resolver: zodResolver(createProjectSchema),
  });

  const handleCreateProject = form.handleSubmit((data) => {
    console.log(data);
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

            {/* Kickoff Date Picker */}
            <FormField
              control={form.control}
              name="kickoffDate"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kickoff Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ShadcnButton
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Select kickoff date</span>
                        )}
                      </ShadcnButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState?.errors?.kickoffDate && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.kickoffDate.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Deadline Date Picker */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ShadcnButton
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Select deadline</span>
                        )}
                      </ShadcnButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState?.errors?.deadline && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.deadline.message}
                    </p>
                  )}
                </div>
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
