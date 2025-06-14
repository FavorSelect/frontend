/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useTransition } from "react";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { sortOptions } from "@/data/sortOptions";
import { useDispatch } from "react-redux";
import { setPending } from "@/store/slices/filterUI.slice";
import { Button } from "@/components/atoms/Button";

const SortByFilter = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const raw = searchParams.get("sortBy");
    setSortBy(raw ? raw : "latest");
  }, [searchParams]);

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  const updateURL = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleChange = (selected: any) => {
    const value = selected?.value || "";
    setSortBy(value);
    updateURL(value);
  };

  const handleResetSort = () => {
    setSortBy("latest");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={sortOptions.find((opt) => opt.value === sortBy)}
        onChange={handleChange}
        options={sortOptions}
        placeholder="Sort by"
        className="text-sm w-44"
      />
      {sortBy !== "latest" && !isPending && (
        <Button onClick={handleResetSort} variant="resetBtn">
          Reset
        </Button>
      )}
    </div>
  );
};

export default SortByFilter;
