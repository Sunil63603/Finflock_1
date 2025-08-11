import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

const SLOTS = [
  { id: "now", label: "Deliver in 10–20 min (Now)" },
  { id: "morning", label: "Today, 9:00–11:00 AM" },
  { id: "noon", label: "Today, 12:00–2:00 PM" },
  { id: "evening", label: "Today, 6:00–8:00 PM" },
];

export default function DeliverySlotDialog({
  open,
  onOpenChange,
  slot,
  setSlot,
}) {
  const [selected, setSelected] = React.useState(slot?.id || "now");

  React.useEffect(() => {
    setSelected(slot?.id || "now");
  }, [slot]);

  const confirm = () => {
    const found = SLOTS.find((s) => s.id === selected);
    setSlot(found);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Select delivery slot</DialogTitle>
          <DialogDescription>
            Pick a convenient time window for your order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-2">
          {SLOTS.map((s) => (
            <label
              key={s.id}
              className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                selected === s.id
                  ? "bg-primary/5 border-primary"
                  : "hover:bg-muted/60"
              }`}
            >
              <input
                type="radio"
                name="slot"
                value={s.id}
                checked={selected === s.id}
                onChange={() => setSelected(s.id)}
                className="accent-[--color-primary]"
              />
              <span className="text-sm font-medium">{s.label}</span>
            </label>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground"
            onClick={confirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
