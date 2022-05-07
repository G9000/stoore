const Layout = ({ children }: any) => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return (
      <div className="max-w-[90%] 2xl:max-w-[1400px] w-full mx-auto py-6">
        <h1>Stoore</h1>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
