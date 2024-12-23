import React from "react";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center bg-black"
        >
          <div className="text-center space-y-4 p-8">
            <h2 className="text-2xl font-bold text-primary">
              Something went wrong
            </h2>
            <p className="text-gray-400">Please try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary rounded-lg text-white"
            >
              Refresh Page
            </button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
