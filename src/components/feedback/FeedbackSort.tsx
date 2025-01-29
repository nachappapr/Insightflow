"use client";

import { SortOptions } from "@/constants/feedback";
import SortByDropdown from "../common/MenuDropdown";

function FeedbackSort() {
  return <SortByDropdown options={SortOptions} />;
}

export default FeedbackSort;
