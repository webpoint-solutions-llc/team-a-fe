import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/shcemas/project";
import { Button, Input, Textarea } from "@heroui/react";
import { ProjectStatus } from "@/types/project";
import { Form, FormField } from "@/components/ui/form";

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
                  errorMessage={form.formState?.errors?.title?.message}
                  isInvalid={!!form.formState?.errors?.title}
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
