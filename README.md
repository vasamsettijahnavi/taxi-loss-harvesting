<<<<<<< HEAD
# Tax Loss Harvesting Tool

A responsive React application that helps users visualize and optimize their cryptocurrency tax strategy through tax loss harvesting.

![Tax Loss Harvesting Tool](screenshots/main-view.png)

## Live Demo

[View the live demo](https://your-vercel-deployment-url.vercel.app)

## Features

- **Capital Gains Visualization**: View pre-harvesting and post-harvesting capital gains
- **Holdings Management**: Browse and select cryptocurrency holdings for tax loss harvesting
- **Real-time Calculations**: See immediate updates to capital gains as you select assets
- **Tax Savings Estimation**: Calculate potential tax savings from harvesting strategies
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **View All Functionality**: Toggle between viewing a subset or all holdings

## Screenshots

### Desktop View
![Desktop View](screenshots/desktop-view.png)

### Mobile View
![Mobile View](screenshots/mobile-view.png)

### Selection and Tax Savings
![Tax Savings](screenshots/tax-savings.png)

## Technologies Used

- **Next.js**: React framework for building the application
- **Tailwind CSS**: For styling and responsive design
- **TypeScript**: For type safety and better developer experience
- **React Hooks**: For state management and side effects

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/your-username/tax-loss-harvesting-tool.git
   cd tax-loss-harvesting-tool
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

## Project Structure

\`\`\`
tax-loss-harvesting-tool/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main page component
├── components/           # React components
│   ├── capital-gains-card.tsx
│   ├── holdings-table.tsx
│   └── tax-loss-harvesting.tsx
├── lib/                  # Utility functions and types
│   ├── api.ts            # API mock functions
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── mock-data/        # Mock data for API responses
│       ├── capital-gains.json
│       └── holdings.json
├── public/               # Static assets
├── next.config.mjs       # Next.js configuration
└── README.md             # Project documentation
\`\`\`

## Assumptions

1. **Mock API Data**: The application uses mock API data to simulate backend responses. In a real-world scenario, these would be replaced with actual API calls.
2. **Currency Format**: All monetary values are displayed in Indian Rupees (₹).
3. **Calculation Logic**: The tax savings calculation assumes that reducing capital gains directly translates to tax savings.
4. **Asset Selection**: When a user selects an asset, the entire holding amount is considered for tax loss harvesting.

## Future Improvements

- Add authentication for user-specific data
- Implement filtering and sorting options for the holdings table
- Add historical data visualization
- Provide tax optimization recommendations
- Support for multiple currencies and tax jurisdictions

## License

[MIT](LICENSE)
\`\`\`

Let's create a package.json file:
=======
# taxi-loss-harvesting
>>>>>>> 048c5c1b2b0e11b9be7266d0e7ba2b919926fb10
