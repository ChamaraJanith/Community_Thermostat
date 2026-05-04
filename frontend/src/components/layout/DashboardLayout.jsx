const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1920px] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
