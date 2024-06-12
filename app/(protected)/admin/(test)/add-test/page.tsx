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
import { TestSchema } from "@/schemas"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { addTest } from "@/actions/add-test"

const AddMedicine = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      testName: "",
      details: "",
    },
  })

  const onSubmit = (values: z.infer<typeof TestSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      addTest(values).then((data) => {
        setError(data.Error)
        setSuccess(data.Success)
      })
    })

    form.reset()
  }

  return (
    <div className='py-8 px-12'>
      <Card>
        <CardHeader>
          <CardTitle>Add Test</CardTitle>
          <CardDescription>Fill the form to add a new test</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='testName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id='testName'
                          type='text'
                          placeholder='Test Name'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='details'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Add a brief description of the test'
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
                className='w-full font-semibold shadow-md active:translate-y-[0.12rem] duration-300 hover:text-white hover:bg-gray-900'
                variant='outline'
              >
                Add Test
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant='link'>
            <a href='/admin/tests'>Go back</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddMedicine
