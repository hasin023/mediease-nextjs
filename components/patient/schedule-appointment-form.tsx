"use client"

import { useState, useTransition } from "react"

import "react-datepicker/dist/react-datepicker.css"
import "react-calendar/dist/Calendar.css"
import DatePicker from "react-datepicker"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { AppointmentSchema } from "@/schemas"
import Link from "next/link"
import { scheduleAppointment } from "@/actions/schedule-appointment"

const weekdays = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
]

const ScheduleAppointmentForm = ({ doctors, patient }: any) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const [filteredDoctors, setFilteredDoctors] = useState<any[]>(doctors)
  const [selectedWeekday, setSelectedWeekday] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const isSelectedWeekday = (date: any) => {
    if (!selectedWeekday) return true

    const weekdayIndex = weekdays.findIndex(
      (weekday) => weekday.name === selectedWeekday
    )

    if (weekdayIndex === -1) return true

    const day = date.getDay()
    const adjustedIndex = (weekdayIndex + 1) % 7
    return day === adjustedIndex
  }

  const filterAvailableTime = (time, doctor) => {
    const doctorAvailability = doctor.DoctorAvailability.find(
      (availability: any) => availability.weekday === selectedWeekday
    )

    if (!doctorAvailability) return false

    const start = new Date(
      0,
      0,
      0,
      doctorAvailability.startTime.getHours(),
      doctorAvailability.startTime.getMinutes()
    )
    const end = new Date(
      0,
      0,
      0,
      doctorAvailability.endTime.getHours(),
      doctorAvailability.endTime.getMinutes()
    )
    const selectedTime = new Date(0, 0, 0, time.getHours(), time.getMinutes())

    return selectedTime >= start && selectedTime <= end
  }

  const handleWeekdayChange = (weekday: string) => {
    setSelectedWeekday(weekday)
    const filteredDoctors = doctors.filter((doctor: any) => {
      const doctorWeekdays = doctor.DoctorAvailability.map(
        (availability: any) => availability.weekday
      )
      return doctorWeekdays.includes(weekday)
    })
    setFilteredDoctors(filteredDoctors)
  }

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      patientId: patient.id,
    },
  })

  const onSubmit = (values: z.infer<typeof AppointmentSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      scheduleAppointment(values).then((data) => {
        setError(data.Error)
        setSuccess(data.Success)
      })
    })

    form.reset()
  }

  return (
    <div className='py-8 px-12'>
      <Card className='shadow-lg bg-slate-50'>
        <CardHeader>
          <CardTitle>Make Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='weekday'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleWeekdayChange(value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select Weekday' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {weekdays.map((weekday: any) => (
                              <SelectItem key={weekday.id} value={weekday.name}>
                                {weekday.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='doctorId'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setSelectedDoctor(
                              filteredDoctors.find(
                                (doctor) => doctor.id === value
                              )
                            )
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select Doctor' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredDoctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='reason'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Reason for this appointment'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormControl className='border-2 bg-transparent rounded-md p-2 text-sm w-full'>
                        <DatePicker
                          placeholderText='Select Appointment Time'
                          isClearable
                          selected={field.value}
                          onChange={field.onChange}
                          showTimeSelect
                          popperPlacement='bottom-start'
                          timeIntervals={15}
                          timeCaption='Time'
                          dateFormat='MMMM d, yyyy h:mm aa'
                          fixedHeight
                          filterDate={isSelectedWeekday}
                          filterTime={(time: any) =>
                            selectedDoctor
                              ? filterAvailableTime(time, selectedDoctor)
                              : true
                          }
                        />
                      </FormControl>
                      <FormMessage />
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
                Schedule Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant='link'>
            <Link href='/patient'>Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ScheduleAppointmentForm
