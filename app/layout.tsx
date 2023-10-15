import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import SessionProvider from "./SessionProvider";

export const metadata = {
  title: "AI generator",
  description: "Discover different AI websites",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="relative">
        <ReduxProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
