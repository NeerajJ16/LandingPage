import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
//import { ModeToggle } from "./mode-toggle";
//import { LogoIcon } from "./Icons";
import { EnterIcon } from "@radix-ui/react-icons";
import { Pencil1Icon } from "@radix-ui/react-icons";
import logo from '../assets/logo.svg';


interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#guide",
    label: "Guide",
  },
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "/roadmap",
    label: "Roadmap",
  },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
          <a
          rel="noreferrer noopener"
          href="/"
          className="ml-2 font-bold text-xl flex items-center space-x-2"
          >
          
          <span>LearnscapeAI</span>
          <img src={logo} alt="Logo" className="w-8 h-8" />
          </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    LearnscapeAI
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
            <a
              rel="noreferrer noopener"
              href="#"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <EnterIcon className="mr-2 w-5 h-5" />
              Sign In
            </a>
            <a
              rel="noreferrer noopener"
              href="#"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <Pencil1Icon className="mr-2 w-5 h-5" />
              Sign Up
            </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              href="#"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <EnterIcon className="mr-2 w-5 h-5" />
              Sign In
            </a>
            <a
              rel="noreferrer noopener"
              href="#"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <Pencil1Icon className="mr-2 w-5 h-5" />
              Sign Up
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
