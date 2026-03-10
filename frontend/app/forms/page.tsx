import { Separator } from "@/registry/new-york/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Profile
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <ProfileForm />
      </div>
    </div>
  );
}
