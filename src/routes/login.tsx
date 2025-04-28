import z from "zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/modules/login-form";

const loginPageSearchParams = z.object({
  redirect: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/login")({
  component: LoginPageComponent,
  validateSearch: loginPageSearchParams,
  beforeLoad: ({ search, context }) => {
    if (Boolean(context.authStore.getState().user)) {
      throw redirect({
        to: search.redirect ?? "/dashboard",
      });
    }
  },
});

function LoginPageComponent() {
  return (
    <div className="grid h-screen w-screen md:grid-cols-2">
      {/* Left side graphics */}
      <div className="hidden h-full bg-primary-100 p-5 md:block">
        <img src="/logo.png" alt="" className="mx-auto my-auto mt-96 h-20" />
      </div>

      {/* Right side login form */}
      <div className="flex h-full flex-col items-stretch overflow-y-auto p-6 lg:px-8 lg:py-10">
        <div className="m-auto w-[min(100%,30rem)]">
          <div className="mx-auto">
            <img src="/vault.png" alt="" className="mx-auto h-60" />
          </div>
          <div className="mt-2 mb-8 text-center text-xl font-bold">
            Project Vault
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
