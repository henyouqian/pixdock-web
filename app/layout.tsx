// app/layout.tsx (全局根布局)

// 这个文件不处理任何语言逻辑，只提供 HTML 骨架
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
