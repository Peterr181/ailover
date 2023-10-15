"use client";

import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
