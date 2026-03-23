import { useState } from "react";

export const useDrag = () => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    setIsDragging(true);

    e.dataTransfer.setData("id", id);
    e.dataTransfer.effectAllowed = "move";


    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.5";
  };

  const onDragEnd = (e: React.DragEvent) => {
    setDraggedId(null);
    setIsDragging(false);

    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
  };

  return {
    draggedId,
    isDragging,
    onDragStart,
    onDragEnd,
  };
};
