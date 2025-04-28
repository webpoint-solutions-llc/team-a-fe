import React from "react";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import { Input, Button, Checkbox } from "@heroui/react";
import { cn } from "@/utils/cn";
import { useLogin } from "@/hooks/use-login";

interface ILoginFormProps {
  className?: string;
}
export const LoginForm: React.FC<ILoginFormProps> = ({ className }) => {
  const [email, setEmail] = React.useState("gopal.pokhrel@webpoint.io");
  const [password, setPassword] = React.useState("Gopal123@");
  const [remember, setRemember] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const { login, isLoggingIn } = useLogin();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn(["space-y-6", className])}>
      <Input
        label="Email Address"
        type="email"
        value={email}
        onValueChange={setEmail}
        variant="bordered"
        isRequired
      />

      <Input
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        value={password}
        onValueChange={setPassword}
        variant="bordered"
        endContent={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none"
          >
            {isPasswordVisible ? (
              <EyeIcon className="text-lg text-default-400" />
            ) : (
              <EyeClosedIcon className="text-lg text-default-400" />
            )}
          </button>
        }
        isRequired
      />

      <div className="flex items-center justify-between">
        <Checkbox
          isSelected={remember}
          onValueChange={setRemember}
          size="sm"
          color="primary"
        >
          Remember me
        </Checkbox>
      </div>

      <Button
        type="submit"
        color="primary"
        fullWidth
        isLoading={isLoggingIn}
        className="font-medium"
      >
        Sign In
      </Button>
    </form>
  );
};
