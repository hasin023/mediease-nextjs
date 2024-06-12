import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const DoctorDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="shadow-2xl bg-white rounded-lg">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-2xl font-semibold text-center text-[#5cb8af]">
            Doctors Dashboard
          </CardTitle>

          <CardDescription className="text-gray-500 mt-2 text-center">
            Welcome to the doctors dashboard. Here you can view and manage
            appointments and prescribe medications to patients.
          </CardDescription>
          <Image
            className="width-full mx-auto"
            src="/Doctors.jpg"
            alt="doctorsdashboard"
            height={1000}
            width={500}
          />
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Card className="shadow-lg bg-blue-50 rounded-lg">
            <CardHeader className="border-b p-4">
              <CardTitle className="text-lg font-semibold">
                View Appointments
              </CardTitle>
              <CardDescription className="text-gray-500 mt-2">
                View and manage appointments scheduled with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                You can view and manage appointments scheduled with you by
                patients.
              </p>
            </CardContent>
            <CardFooter className="p-4 flex justify-end">
              <Link href="/doctor/appointments">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-blue-600 text-blue-600 hover:text-white font-semibold shadow-md"
                >
                  View Appointments
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg bg-green-50 rounded-lg">
            <CardHeader className="border-b p-4">
              <CardTitle className="text-lg font-semibold">
                Provide Referral
              </CardTitle>
              <CardDescription className="text-gray-500 mt-2">
                Provide referral to patients for their treatment.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                You can provide referral to patients for their treatment to
                other doctors.
              </p>
            </CardContent>
            <CardFooter className="p-4 flex justify-end">
              <Link href="/doctor/referrals">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-green-600 text-green-600 hover:text-white font-semibold shadow-md"
                >
                  Provide Referral
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-end">
          <Link href="/profile">
            <Button
              variant="link"
              size="default"
              className="text-blue-600 hover:text-blue-800"
            >
              View Profile &rarr;
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
