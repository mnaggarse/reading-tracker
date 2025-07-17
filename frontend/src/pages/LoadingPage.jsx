import { Spinner } from "@heroui/react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner variant="wave" size="lg" />
    </div>
  );
};

export default LoadingPage;
