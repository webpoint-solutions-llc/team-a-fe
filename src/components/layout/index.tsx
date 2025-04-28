import Sidebar from "./sidebar";
import { Header } from "./header";
import { SidebarProvider } from "./sidebar/sidebar-context";

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: IAppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex h-full grow flex-col">
          <Header />
          <div className="grow overflow-y-auto">{props.children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
