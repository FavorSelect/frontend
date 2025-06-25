/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import toast from "react-hot-toast";
import {
  useGetAccountDeletionStatusQuery,
  useRequestAccountDeletionMutation,
} from "@/store/api/userDashboardApi";
import Link from "next/link";
import { setAccountDeletionStatus } from "@/store/slices/user/accountDeletionStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SkeletonDeleteAccount from "./SkeletonDeleteAccount";

const reasons = [
  "Concerned about data privacy and security",
  "Transitioning to a different shopping platform",
  "Receiving excessive emails or promotional content",
  "No longer finding the platform relevant or useful",
  "Dissatisfied with customer support experience",
  "Encountering unresolved technical issues",
  "Product pricing does not meet expectations",
  "Found a platform that better suits my needs",
  "Creating a new account for business or personal use",
  "Other (please specify)",
];

const reasonOptions = reasons.map((r) => ({ label: r, value: r }));

function DeleteAccount() {
  const dispatch = useDispatch();

  const [selectedReason, setSelectedReason] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [requestAccountDeletion, { isLoading }] =
    useRequestAccountDeletionMutation();

  const { data, isLoading: isFetchingStatus } =
    useGetAccountDeletionStatusQuery();
  console.log(data);
  const reduxDeletionStatus = useSelector(
    (state: RootState) => state.acccountDeletionStatus.hasRequestedDeletion
  );
  const reduxRequestId = useSelector(
    (state: RootState) => state.acccountDeletionStatus.requestId
  );

  useEffect(() => {
    if (data?.request) {
      dispatch(
        setAccountDeletionStatus({
          hasRequested: true,
          requestId: data.request.uniqueAccountDeletedId,
        })
      );
    }
  }, [data, dispatch]);

  const handleDelete = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason", { duration: 4000 });
      return;
    }

    try {
      const res = await requestAccountDeletion({
        reason: selectedReason.value,
      }).unwrap();

      if (res?.request?.uniqueAccountDeletedId) {
        const id = res.request.uniqueAccountDeletedId;
        dispatch(
          setAccountDeletionStatus({
            hasRequested: true,
            requestId: id,
          })
        );
        setSelectedReason(null);
      }

      toast.success(res.message || "Account deletion requested", {
        duration: 5000,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", {
        duration: 5000,
      });
    }
  };

  if (isFetchingStatus) {
    return <SkeletonDeleteAccount />;
  }

  return (
    <div className="pb-3">
      <h3 className="text-base text-gray-800 mb-2 font-semibold">
        Delete Account
      </h3>
      <Paragraph className="text-gray-600 mb-4 text-sm">
        Submitting this request will notify our support team. Your account will
        not be deleted immediately — we’ll follow up shortly to confirm.
      </Paragraph>

      <Select
        options={reasonOptions}
        value={selectedReason}
        onChange={setSelectedReason}
        placeholder="Select a reason"
        isClearable
        isDisabled={isLoading || reduxDeletionStatus}
        className="mb-4 text-sm"
      />

      <Button
        onClick={handleDelete}
        disabled={isLoading || reduxDeletionStatus}
        className="px-6 py-2 rounded-md text-sm transition bg-scarlet-red text-white hover:bg-red-600 font-semibold"
      >
        {isLoading ? "Submitting..." : "Request Account Deletion"}
      </Button>

      {reduxRequestId && (
        <Paragraph className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 border border-gray-200 rounded-md">
          ✅ Your account deletion request has been submitted. You can{" "}
          <Link
            href={`/dashboard/account-setting/account-status`}
            className="text-scarlet-red font-semibold underline"
          >
            track the status here
          </Link>
        </Paragraph>
      )}
    </div>
  );
}

export default DeleteAccount;
