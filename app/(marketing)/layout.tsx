 

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
