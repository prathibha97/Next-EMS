# Organization Management System

This is an organization management system designed to streamline various administrative tasks within a company. It includes comprehensive features for employee management, project management, client management, payroll management, and leave management. The system is built with modern technologies including Next.js 14, MongoDB, Prisma, Tailwind CSS, and Redux Toolkit.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Employee Management:** Add, update, and remove employee records; manage employee roles and departments.
- **Project Management:** Create and track projects; assign tasks to employees; monitor project progress.
- **Client Management:** Maintain client information; track interactions and communications; manage client projects.
- **Payroll Management:** Calculate and manage employee payroll; generate payslips; track payroll expenses.
- **Leave Management:** Manage employee leave requests; approve or deny leave; track leave balances and history.

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **ORM:** Prisma
- **State Management:** Redux Toolkit

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/prathibha97/Next-EMS.git
   cd Next-EMS

2. **Clone the repository:**
   ```sh
    npm install

3. **Set up environment variables:** Create a .env.local file in the root directory and add the following environment variables:
    ```sh
    NEXT_PUBLIC_URL=
    NEXTAUTH_SECRET=
    DATABASE_URL=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    PUSHER_APP_ID= 
    NEXT_PUBLIC_PUSHER_APP_KEY=
    PUSHER_SECRET=
    PUSHER_CLUSTER=
    RESEND_API_KEY=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_REDIRECT_URL=
    GOOGLE_CALENDAR_API_KEY=
    NEXT_PUBLIC_MEETING_REDIRECT_URL=
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

4. **Start the development server:**
    ```sh
    npm run dev

The app should now be running on http://localhost:3000.

## Usage

Once the server is running, you can access the following features:

- **Employee Management:** Manage employee records, roles, and departments.
- **Project Management:** Create and manage projects, assign tasks, and track progress.
- **Client Management:** Maintain client information, track interactions, and manage client-related projects.
- **Payroll Management:** Calculate payroll, generate payslips, and track payroll expenses.
- **Leave Management:** Manage employee leave requests, approve or deny leave, and track leave balances and history.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.