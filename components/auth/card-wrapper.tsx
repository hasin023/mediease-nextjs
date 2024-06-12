"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Header } from "./header"
import { BackButton } from "./back-button"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonHref: string
  backButtonLabel: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className='w-[25rem] bg-transparent text-white rounded-lg border-2 border-white/20 backdrop-blur-lg shadow-lg'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
