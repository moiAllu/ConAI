import { Separator } from "@/registry/new-york/ui/separator";
import { DevicesForm } from "./devices-form";

export default function SettingsDevicesPage() {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Devices
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Manage devices that are logged into your account. You can have up to 5
          devices. Remove any you no longer use.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <DevicesForm />
      </div>
    </div>
  );
}
