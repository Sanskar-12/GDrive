"use client";

import Chart from "@/components/Chart";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import {
  convertFileSize,
  getRecentFilesSummary,
  getUsageSummary,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import FormattedDateTime from "./FormattedDateTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Models } from "node-appwrite";

interface DashboardProps {
  totalSpaceUsed: {
    image: { size: number; latestDate: string };
    document: { size: number; latestDate: string };
    video: { size: number; latestDate: string };
    audio: { size: number; latestDate: string };
    other: { size: number; latestDate: string };
    used: number;
    all: number;
  };
  recentFiles: Models.DocumentList<Models.Document>;
}

const Dashboard = ({ totalSpaceUsed, recentFiles }: DashboardProps) => {
  const usageSummary = getUsageSummary(totalSpaceUsed);
  const recentFileSummary = getRecentFilesSummary(recentFiles.documents);

  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

  console.log(recentFileSummary);

  return (
    <div className="dashboard-container">
      {/* Charts and Files Summary */}
      <section>
        <Chart used={totalSpaceUsed.used} />

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="Image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size)}
                  </h4>
                </div>
                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <h2 className="text-center text-gray-400">Last update</h2>
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center text-dark-100"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent Files Uploaded */}
      <section className="dashboard-recent-files">
        <h1 className="font-medium text-[25px] text-[#333F4E]">
          Recent files uploaded
        </h1>
        <div className="recent-file-details">
          <div className="flex-col w-full">
            {recentFileSummary.map((recentFile, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-4 w-full"
              >
                <Link href={recentFile?.url as string}>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={recentFile?.icon as string}
                      alt="Icon"
                      height={80}
                      width={80}
                    />
                    <div className="flex flex-col">
                      <h4 className="recent-file-name">
                        {recentFile?.name as string}
                      </h4>
                      <FormattedDateTime
                        date={recentFile?.date as string}
                        className="recent-file-date"
                      />
                    </div>
                  </div>
                </Link>
                <DropdownMenu
                  open={isDropdownOpen === index}
                  onOpenChange={(prev) =>
                    setIsDropdownOpen(prev ? index : null)
                  }
                >
                  <DropdownMenuTrigger className="shad-no-focus">
                    <Image
                      src={"/assets/icons/dots.svg"}
                      alt="dots"
                      width={30}
                      height={30}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="max-w-[200px] truncate">
                      {recentFile?.name as string}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      key={index}
                      className="shad-dropdown-item"
                    >
                      <Link
                        href={recentFile?.fileUrl as string}
                        target="_blank"
                        className="w-full"
                      >
                        View File
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
