import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteHistoryByIdHandler } from "@/lib/helper/deleteHandler";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

interface Props {
  mode: string;
  userId: string;
  _id: string;
  history: any;
  setHistory: any;
}
const DeleteAlert = ({ mode, userId, _id, setHistory }: Props) => {
  const router = useRouter();
  const deleteHandler = async () => {
    const result = await deleteHistoryByIdHandler({ userId, _id, mode });
    if (result.status === 200) {
      setHistory((prev: any) => prev.filter((doc: any) => doc._id !== _id));
      toast.success("Successfully deleted.");
      router.push(`/dashboard/ai-writing`);
      return;
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="h-full flex items-center space-x-2  p-2 rounded-sm justify-start rounded-l-none text-red-500 bg-muted hover:bg-muted/70">
          <Trash2 size={20} color={`red`} />
          {mode === "aichat" && <span>Delete</span>}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster richColors />
    </AlertDialog>
  );
};
export default DeleteAlert;
