# LeaseFlow - Modern Property Management

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/pptbackup0/generated-app-20250930-070442)

LeaseFlow is a visually stunning, intuitive, and comprehensive property management platform, reimagined as a modern clone of 'my rent work'. It's designed for landlords and tenants in the Indian market, providing effortless management of properties, units (flats), tenants, and finances. The application features role-based access control, automated utility billing, detailed tenant onboarding, and a dynamic dashboard for real-time insights. Built on a robust serverless-first architecture using Cloudflare Workers and Durable Objects, it features intelligent runtime detection to seamlessly switch to a local Node.js and SQLite environment for development, ensuring a consistent and powerful experience across all environments.

## Key Features

-   **Role-Based Access:** Distinct interfaces and permissions for Landlords and Tenants.
-   **Comprehensive Property Management:** Full CRUD for properties and individual units (flats).
-   **India-Specific Features:** Fields for floor numbers, Aadhar, and configurable utility services (Electricity, Water, Maintenance) with custom rates.
-   **Automated Utility Billing:** System to input meter readings and automatically generate monthly bills.
-   **Detailed Tenant Onboarding:** Collect comprehensive tenant details including photo, permanent address, and advance payments.
-   **Financial Tracking:** Ledger for landlords to track income and expenses, and for tenants to view their payment history.
-   **Maintenance Hub:** Track and manage maintenance requests with status and priority assignments.
-   **Dynamic Dashboards:** At-a-glance overview of key metrics for both landlords and tenants.
-   **Smart Environment Detection:** Seamlessly switches between a production Cloudflare Workers environment and a local Node.js/SQLite setup for development.

## Technology Stack

-   **Frontend:** React, Vite, TypeScript
-   **Backend:** Hono on Cloudflare Workers
-   **Styling:** Tailwind CSS, shadcn/ui
-   **State Management:** Zustand
-   **Routing:** React Router
-   **Forms:** React Hook Form & Zod
-   **Database:** Cloudflare D1 (Production) / SQLite (Local)
-   **Storage:** Cloudflare Durable Objects
-   **UI Components:** Lucide React, Framer Motion, Recharts

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd leaseflow_property_management
    ```

2.  **Install dependencies using Bun:**
    ```bash
    bun install
    ```

3.  **Set up the local database:**
    The project uses a local SQLite database for development. Run the following command to set up the schema.
    ```bash
    bun run db:setup:local
    ```
    *This command requires Wrangler to be logged in. Run `wrangler login` if you haven't already.*

### Running the Application

To start the development server, which includes the Vite frontend and the Hono backend running locally with SQLite persistence, use:

```bash
bun run dev:local
```

The application will be available at `http://localhost:3000`.

## Smart Environment Configuration

The application is designed to run seamlessly in both cloud (Cloudflare) and local environments without any code changes.

-   **Cloudflare (Production):** When deployed, the application automatically uses Cloudflare D1 for its database and Durable Objects for state management.
-   **Node.js (Local):** When running locally, it falls back to a local SQLite database file (`./wrangler/state/d1/DB.sqlite`), providing a consistent development experience.

This is achieved through a unified database abstraction layer and runtime environment detection.

## Available Scripts

-   `bun run dev`: Starts the development server connected to a remote DevTools instance.
-   `bun run dev:local`: Starts the development server using a local SQLite database for persistence. **(Recommended for local development)**
-   `bun run build`: Builds the frontend application for production.
-   `bun run deploy`: Deploys the application to your Cloudflare account.
-   `bun run db:setup`: Applies the database schema to your production Cloudflare D1 database.
-   `bun run db:setup:local`: Applies the database schema to your local SQLite database.

## Deployment

This project is configured for one-click deployment to Cloudflare Workers.

1.  **Build the project:**
    ```bash
    bun run build
    ```

2.  **Deploy using Wrangler:**
    Make sure you are logged into your Cloudflare account via the Wrangler CLI (`wrangler login`). Then, run:
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/pptbackup0/generated-app-20250930-070442)

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.