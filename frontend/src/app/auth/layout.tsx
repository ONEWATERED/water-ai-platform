export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-primary-800/30" />
      </div>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
