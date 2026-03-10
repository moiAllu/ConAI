import { Separator } from "@/registry/new-york/ui/separator";
import { NotificationsForm } from "./notification-form";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Notifications
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Configure how you receive notifications by email and on mobile.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <NotificationsForm />
      </div>
    </div>
  );
}
