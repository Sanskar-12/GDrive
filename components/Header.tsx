import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { logoutUser } from "@/lib/actions/user.actions";

interface HeaderProps {
  ownerId: string;
  accountId: string;
}

const Header = ({ ownerId, accountId }: HeaderProps) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={ownerId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await logoutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src={"/assets/icons/logout.svg"}
              alt="Logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
