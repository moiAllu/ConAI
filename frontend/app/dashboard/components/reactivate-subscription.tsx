import React from "react";
import Link from "next/link";
import { BellRing } from "lucide-react";
const ReactivateSubscription = () => {
  return (
    <Link
      className="flex justify-end items-end cursor-pointer"
      href="/forms/account"
    >
      <div className=" flex px-2 py-1 items-end mr-20 gap-2 justify-center rounded outline outline-gray-400 shadow-sm">
        <BellRing size={18} />
        <h1 className="font-medium text-sm font-sans hidden sm:flex">
          {"Reactivate your subscription"}
        </h1>
      </div>
    </Link>
  );
};

export default ReactivateSubscription;
