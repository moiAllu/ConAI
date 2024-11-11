import { BellRing } from "lucide-react";
import Link from "next/link";
const ReactivateSubscription = () => (
  <Link
    className="flex justify-end items-end cursor-pointer absolute right-4 sm:right-12 top-18 sm:top-8"
    href="/forms/account"
  >
    <div className="flex px-2 py-2 items-end gap-2 justify-center rounded bg-red-300 border border-red-300 text-red-800 shadow-sm hover:bg-red-500 transition-colors">
      <BellRing size={18} className="text-red-800" />
      <h1 className="font-medium text-sm font-sans hidden sm:flex">
        Reactivate your subscription
      </h1>
    </div>
  </Link>
);

export default ReactivateSubscription;
