import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  buttonText: string
  href: string
  from: string
  to: string
}

export const ServiceCard = ({
  title,
  description,
  buttonText,
  href,
  from,
  to,
}: ServiceCardProps) => {
  return (
    <>
      <Card
        className={`shadow-xl bg-gradient-to-r ${from} ${to} hover:bg-gradient-to-l`}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-gray-700'>
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={href}>
            <Button
              size='sm'
              variant='secondary'
              className='hover:text-white hover:bg-gray-900 font-semibold'
            >
              {buttonText} &rarr;
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
