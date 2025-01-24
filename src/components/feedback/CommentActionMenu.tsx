"use client";

import { Edit, MoreVertical, Trash } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type CommentActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const CommentActionMenu = ({ onEdit, onDelete }: CommentActionMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    onEdit();
    setOpen(false);
  };
  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="p-2 transition-fast group" aria-label="More options">
          <MoreVertical
            size={16}
            className="text-text-secondary group-hover:text-brand-secondary"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 w-full px-2 text-left text-sm text-brand-primary hover:text-brand-light transition-fast group"
          onClick={handleEdit}
        >
          <Edit
            size={18}
            className="text-brand-primary group-hover:text-brand-light"
          />
          <span>Edit</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 w-full px-2 text-left text-sm text-error hover:text-error-light transition-fast group"
          onClick={handleDelete}
        >
          <Trash
            size={18}
            className="text-error group-hover:text-error-light"
          />
          <span>Delete</span>
        </motion.button>
      </PopoverContent>
    </Popover>
  );
};

export default CommentActionMenu;
