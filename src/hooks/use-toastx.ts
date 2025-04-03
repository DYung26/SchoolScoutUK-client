import { toast as sonnerToast } from "sonner";

function toast({ title, description = "An unknown error occurred" }: { title: string; description?: string }) {
  return sonnerToast(title, { description });
}

export { toast };
