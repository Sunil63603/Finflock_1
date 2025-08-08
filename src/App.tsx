// @ts-nocheck
// App.tsx
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-xl font-bold">Hello, Framer Motion!</h1>
    </motion.div>
  );
}

export default App;
