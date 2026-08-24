# RoomFinder

A full-stack room rental platform built for the local Nepal market. Landlords can list rooms, while tenants can search, save, and book rooms.

## Features

- Search and filter room listings
- Wishlist saved rooms
- Room booking and availability tracking
- Landlord and tenant roles
- User profiles
- Image uploads with Cloudinary
- Payment integration planned for a future release

## Tech Stack

### Frontend

- Next.js 15
- Clerk

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Clerk
- Zod
- Cloudinary

## Project Structure

```text
RoomFinder/
├── client/              # Next.js frontend
└── server/              # Express backend
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        └── routes/
