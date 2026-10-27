import { Loader2 } from "lucide-react";
import Button from "../../../shared/components/Button";

export default function AuthSubmit({ loading, idleLabel, loadingLabel }) {
  return (
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? <><Loader2 size={18} className="animate-spin" /> {loadingLabel}</> : idleLabel}
    </Button>
  );
}
