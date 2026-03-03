import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ImagePlus } from "lucide-react";

const UploadZone = ({ onFile }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) onFile(f);
    },
    [onFile]
  );

  const handleInput = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`w-full flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed min-h-[400px] w-full transition-all ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-primary/[0.02]"
        }`}
      >
        <input type="file" accept="image/*" onChange={handleInput} className="hidden" />
        <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition ${
          dragging ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
        }`}>
          {dragging ? <ImagePlus className="h-7 w-7" /> : <Upload className="h-7 w-7" />}
        </div>
        <p className="text-sm font-medium text-foreground">
          {dragging ? "Drop your image here" : "Drag & drop an image or click to browse"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, WEBP up to 10MB
        </p>
      </label>
    </motion.div>
  );
};

export default UploadZone;