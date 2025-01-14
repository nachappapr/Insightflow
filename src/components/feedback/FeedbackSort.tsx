"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortOptions } from "@/constants/feedback";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

function FeedbackSort() {
  const [selectedOption, setSelectedOption] = useState("Most Upvotes");

  return (
    // <div className="min-h-screen bg-[#373C5B] p-8">
    <div className="max-w-[280px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="sort"
            className="w-full justify-between bg-navy text-white hover:bg-navy/80 hover:text-white/80 transistion-colors duration-250 ease-smooth focus-visible:ring-0 focus-visible:!ring-navy !border-none"
          >
            <span>Sort by: {selectedOption}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px] bg-white rounded-lg p-0 data-[side=bottom]:animate-slideDownAndFade data-[side=top]:animate-slideUpAndFade mt-8">
          {SortOptions.map((option, index) => (
            <div key={option} className="relative">
              <DropdownMenuItem
                className="flex items-center justify-between py-3 px-4 cursor-pointer focus:bg-transparent"
                onClick={() => setSelectedOption(option)}
              >
                <span
                  className={clsx(
                    {
                      "text-brand-secondary": selectedOption === option,
                      "text-text-secondary": selectedOption !== option,
                    },
                    "hover:text-brand-secondary transition-hover duration-250 ease-smooth"
                  )}
                >
                  {option}
                </span>
                {selectedOption === option && (
                  <Check className="h-4 w-4 text-[#AD1FEA]" />
                )}
              </DropdownMenuItem>
              {index !== SortOptions.length - 1 && (
                <div className="h-[1px] bg-text-primary/20" />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    // </div>
  );
}

export default FeedbackSort;
