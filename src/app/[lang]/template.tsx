import React from 'react'

export default async function Template({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  return <>{children}</>
}
