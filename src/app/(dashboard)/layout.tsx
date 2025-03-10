
import  SidebarDemo  from "@/components/sidenav";
import { Providers } from "../provider";



export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
  <div className="flex">
    <SidebarDemo></SidebarDemo>
          {children}
  </div>
        
    );
}