"use client"
import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "motion/react"
import Image from "next/image"
import TaskukuLogo from "./tasuku-logo"

export default function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "/home",
      icon: <IconBrandTabler className="text-white dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
    {
      label: "Manage Todos",
      href: "/todo",
      icon: <IconSettings className="text-white dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-white dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "built by mochakrs",
              href: "#",
              icon: (
               <div className="bg-white h-6 w-6 rounded-full"></div>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}

export const Logo = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20">
      <TaskukuLogo></TaskukuLogo>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white dark:text-white whitespace-pre"
      >
        Tasuku
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
       <TaskukuLogo></TaskukuLogo>
    </Link>
  )
}

