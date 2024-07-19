"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export const SiteList = ({
  site,
  selectAll,
}: {
  site: string;
  selectAll: boolean;
}) => {
  const [checkedState, setCheckedState] = useState(true);

  useEffect(() => {
    setCheckedState(selectAll);
  }, [selectAll]);

  return (
    <li>
      <Checkbox
        name="sites"
        checked={checkedState}
        onCheckedChange={(checked) => setCheckedState(checked as boolean)}
      />
      <label htmlFor="sites">{site}</label>
    </li>
  );
};
