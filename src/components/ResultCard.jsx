import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react";

const ResultCard = ({ result, onReset }) => {
  const isReal = result.status === "real";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-xl border p-6 text-center ${
        isReal
          ? "border-success/30 bg-success/5"
          : "border-destructive/30 bg-destructive/5"
      }`}
    >
      <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
        isReal ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
      }`}>
        {isReal ? <ShieldCheck className="h-7 w-7" /> : <ShieldAlert className="h-7 w-7" />}
      </div>

      <h3 className={`font-display text-2xl font-bold ${isReal ? "text-success" : "text-destructive"}`}>
        {isReal ? "Authentic Image" : "Deepfake Detected"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {isReal
          ? "No signs of AI manipulation were found."
          : "This image shows signs of AI-generated manipulation."}
      </p>

      <div className="mx-auto mt-5 max-w-xs">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Confidence</span>
          <span className="font-mono font-semibold text-foreground">{result.confidence}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${isReal ? "bg-success" : "bg-destructive"}`}
          />
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-5 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
      >
        <RotateCcw className="h-4 w-4" />
        Analyze Another
      </button>
    </motion.div>
  );
};

export default ResultCard;