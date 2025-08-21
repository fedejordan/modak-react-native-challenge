# Modak React Native Challenge App

A React Native app built with TypeScript, Expo, and Zustand for state management. The app integrates with the [DummyJSON - Products API](https://dummyjson.com/products) to provide a catalog of products.

## Features

- **Browse Products**: View a list of products with title, price, and thumbnail.
- **Filter & Sort**: Filter by category and sort by price or rating.
- **Product Details**: View detailed product information (description, brand, stock).
- **Deep Linking**: Open the app to a specific category or product by ID.
- **Native Module**: Add product purchase reminders to the calendar (iOS).
- **Push Notifications**: Receive updates or reminders.

## Tech Stack

- **React Native CLI** with **Expo Prebuild**
- **TypeScript** for type safety
- **Zustand** for state management
- **Clean Architecture**: Decoupled UI and data fetching

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/fedejordan/modak-react-native-challenge.git
   cd modak-react-native-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Prebuild the app:
   - Run the following command to generate the native iOS and Android directories:
     ```bash
     expo prebuild
     ```

4. Run the app:
   - Start the development server: `expo start`
   - iOS: Open the project in Xcode and run it on a simulator or device.
   - Android: Open the project in Android Studio and run it on a simulator or device.

5. Use deep links:
   ```
   modak-rn-challenge://product/{productId}
   modak-rn-challenge://category/{categoryName}
   ```

## Project Structure

- **`src/components`**: Reusable UI components
- **`src/data`**: API clients, mappers, repositories
- **`src/domain`**: Business logic and models
- **`src/screens`**: App screens
- **`src/stores`**: Zustand state management

## API Endpoints

- **Categories**: `/products/categories`
- **Products**: `/products`
- **Product Details**: `/products/{id}`

## Bonus Features

- Deep linking

## Demo Videos

Here are some demo videos showcasing the app's features:

- **Deep Link to Category**: [Watch Video](#)
- **Deep Link to Product**: [Watch Video](#)
- **Reminder Event in Calendar**: [Watch Video](#)
- **Local Notification**: [Watch Video](#)
