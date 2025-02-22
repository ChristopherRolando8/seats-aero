# Seats.aero Award Flight Search

## Overview
The **Seats.aero Award Flight Search** is a Next.js frontend application that integrates with the [Seats.aero API](https://seats.aero/) to search for award flight miles availability. The application provides filtering and sorting options to help users find the best flights based on their preferences.

## Features
- **Real-time Search**: Fetches available award flights based on user input.
- **Filtering Options**:
  - Airline
  - Travel date range
  - Cabin class
  - Departure and arrival airports
  - Number of stops
- **Sorting Options**:
  - Price (Ascending/Descending)
  - Departure Time
  - Arrival Time
- **Modern UI**: Designed with TailwindCSS for a clean and responsive experience.
- **Caching Strategy**: Optimized data fetching using Axios to reduce API calls.
- **No Authentication Required**: Users can search for flights without signing in.

## Tech Stack
- **Framework**: Next.js (React)
- **State Management**: `useState`
- **HTTP Client**: Axios
- **Validation**: Zod
- **Styling**: TailwindCSS

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/ChristopherRolando8/seats-aero.git
cd seats-aero
```

### Install Dependencies
```bash
npm install  # or yarn install
```

### Environment Variables
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_SEATS_AERO_API_URL=<API_ENDPOINT>
```

### Run the Application
```bash
npm run dev  # or yarn dev
```

## Project Structure
```
seats-aero/
│-- public/               # Static assets
│-- src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (API calls, state management)
│   ├── pages/            # Next.js pages
│   ├── styles/           # TailwindCSS styles
│   ├── utils/            # Helper functions
│-- .env.local.example    # Environment variable example
│-- next.config.js        # Next.js configuration
│-- package.json          # Dependencies and scripts
```

## API Integration
The application fetches award flight data from the Seats.aero API using Axios. Example API call:
```typescript
import axios from 'axios';

const fetchFlights = async (filters) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SEATS_AERO_API_URL}/flights`, { params: filters });
  return response.data;
};
```

## Future Enhancements
- Implement pagination for large search results.
- Improve more filter and sort.
- Enhance UI/UX with animations and interactive components.
- Add dark mode support.

## Contributions
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

