# MediEase

MediEase is a web application that helps users to find the best doctors and hospitals in their area. It also provides a platform for users to book appointments with doctors and hospitals.

## Running the project locally

To run the project locally, you need to have Node.js installed on your machine. You can download Node.js from [here](https://nodejs.org/en). You will also need postgresql installed on your machine. You can download postgresql from [here](https://www.postgresql.org/).

### Installing the dependencies

After installing Node.js and postgresql, you need to install the dependencies of the `package.json` file.

```bash
npm install
```

### Setting up the environment variables

You need to create a `.env` file in the root directory of the project. You can copy the contents of the `.env.example` file and paste it in the .env file.

- Replace the `DATABASE_URL` with the connection string of your postgresql database.
- Replace the `JWT_SECRET` with a random string. This will be used to sign the JWT tokens.
- Replace the `HUGGINGFACE_API_KEY` with the API key for the Huggingface API. You can get the API key by signing up on the Huggingface website.
- Replace the `RESEND_API_KEY` with the API key for the Resend API. You can get the API key by signing up on the Resend website.

### Setting up the database

First, You need to create a `.env` file in the root directory of the project. You can copy the contents of the `.env.example` file and paste it in the .env file. You need to replace the `DATABASE_URL` with the connection string of your postgresql database. For more information on how to create a connection string, you can check the [Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql) on how to set up a postgresql database.

Once you have set up the connection string, you can run the following commands to create and push the database schema:

```bash
npx prisma generate

npx prisma db push
```

All the models are defined in the `schema.prisma` file in the `/prisma` directory. You can modify the models in the `schema.prisma` file and run the above commands to update the database schema. The corresponding schemas for hook-form zod validation are defined in the `/schemas` directory within the `index.ts` file.

### Running the development server

After setting up the database, you can run the following command to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Features

### Create an Admin User

On startup, the application will render the Landing page. From there one can login to an existing account. But to create an Admin user, one must first need to go to the `/auth/register` route and create an account. After creating an account, one can go to the `/auth/login` route and login to the admin account.

### Admin Dashboard

After logging in as an admin, one can access the admin dashboard by clicking on the `Admin Dashboard` button in the profile page. The admin dashboard provides the following functionalities:

- Add, edit, delete users (Patients, Doctors, Admins)
- But one admin cannot delete another admin.
- Add doctor availability
- Add, Edit, Delete medcinies
- Add, Edit, Delete tests
- Approve or Reject reimbursement requests

### Patient Dashboard

After logging in as a patient, one can access the patient dashboard by clicking on the `Patient Dashboard` button in the profile page. The patient dashboard provides the following functionalities:

- Book an appointment with a doctor
- View all the appointments
- View all the doctors
- Request for reimbursement
- View all the reimbursement requests
- See their total due reimbursement amount

### Doctor Dashboard

After logging in as a doctor, one can access the doctor dashboard by clicking on the `Doctor Dashboard` button in the profile page. The doctor dashboard provides the following functionalities:

- View all the appointments
- Prescribe medicines and tests to patients

## Contributers

- [Ahmed Alfey Sani](https://github.com/AASani29)
- [Shefayat E- Shams Adib](https://github.com/Shefwef)
- [Hasin Mahtab Alvee](https://github.com/hasin023)
