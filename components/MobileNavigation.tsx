"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { logoutUser } from "@/lib/actions/user.actions";

interface MobileNavigationProps {
  fullName: string;
  email: string;
  avatar: string;
  ownerId: string;
  accountId: string;
}

const MobileNavigation = ({
  fullName,
  email,
  avatar,
  ownerId,
  accountId,
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="mobile-header">
      <Image
        src={"/assets/icons/logo-full-brand.svg"}
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="hamburger"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const active = pathname === item.url;

                return (
                  <Link href={item.url} key={item.name}>
                    <li
                      className={cn("mobile-nav-item", active && "shad-active")}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        className={cn("nav-icon", active && "nav-icon-active")}
                      />
                      <p>{item.name}</p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            {/* FileUploader */}
            <FileUploader accountId={accountId} ownerId={ownerId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={logoutUser}
            >
              <Image
                src={"/assets/icons/logout.svg"}
                alt="Logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
