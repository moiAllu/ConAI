import { Separator } from "@/registry/new-york/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Account
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Update your account details, language, and timezone preferences.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <AccountForm />
      </div>
    </div>
  );
}
