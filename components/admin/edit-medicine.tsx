"use client"

import { useState, useTransition } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MedicineSchema } from "@/schemas"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { updateMedicine } from "@/actions/update-medicine"

export const EditMedicine = ({ medicineData }: any) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof MedicineSchema>>({
    resolver: zodResolver(MedicineSchema),
    defaultValues: medicineData,
  })

  const onSubmit = (values: z.infer<typeof MedicineSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      updateMedicine(medicineData.id, values).then((data) => {
        setError(data.Error)
        setSuccess(data.Success)
      })
    })
  }

  return (
    <div className='py-8 px-12'>
      <Card>
        <CardHeader>
          <CardTitle>Edit Medicine</CardTitle>
          <CardDescription>
            Fill the form to edit the current medicine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='medicineName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id='medicineName'
                          type='text'
                          placeholder='Medicine Name'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='manufacturer'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id='manufacturer'
                          type='text'
                          placeholder='Manufacturer Company'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Add a brief description of the medicine'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type='submit'
                className='w-full font-semibold'
                variant='default'
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant='link'>
            <a href='/admin/medicines'>Go back</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
