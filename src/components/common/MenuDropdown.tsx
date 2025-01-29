"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import MenuList from "./MenuList";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortByDropdownProps<T> = {
  options: T[];
  children?: React.ReactNode;
};

function SortByDropdown<T extends string | number>({
  options,
}: SortByDropdownProps<T>) {
  const [selectedMenuOption, setSelectedMenuOption] = useState(options?.[0]);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useClickOutside(dropdownRef, onClickOutside);

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) {
      setSelectedMenuOption(sort as T);
    }
  }, [searchParams]);

  // handle outside click
  function onClickOutside() {
    setOpenMenu(false);
  }

  const handleMenu = () => setOpenMenu(!openMenu);

  const handleMenuList = (option: T) => {
    setSelectedMenuOption(option);
    const params = new URLSearchParams(searchParams);
    if (option) {
      params.set("sort", option.toString());
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
    setOpenMenu(false);
  };

  const renderDropdownList = () => {
    return (
      <AnimatePresence>
        {openMenu && (
          <div className="max-w-64 w-full absolute top-12 -z-10">
            <MenuList<T>
              value={selectedMenuOption}
              onChange={handleMenuList}
              listItems={options}
            />
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="sort"
        className="w-full justify-between bg-navy text-white hover:bg-navy/80 hover:text-white/80 transistion-colors duration-250 ease-smooth focus-visible:ring-0 focus-visible:!ring-navy !border-none capitalize"
        onClick={handleMenu}
      >
        <span>Sort by: {selectedMenuOption}</span>
        <motion.div
          animate={{ rotate: openMenu ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-3 w-3 opacity-50" />
        </motion.div>
      </Button>
      {renderDropdownList()}
    </div>
  );
}

export default SortByDropdown;
