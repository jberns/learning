import React from "react";

import { DestinationCard } from "./components/DestinationCard";
import { destinations } from "./data/popularDestinations";

export default function App() {
  return (
    <div>
      <div className='grid bg-gray-100 lg:grid-cols-2 2xl:grid-cols-5'>
        <div className='max-w-md px-8 py-12 mx-auto center sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2'>
          <div className='xl:max-w-xl'>
            <img className='h-10' src='/img/logo-brand.svg' alt='Workcation' />
            <img
              className='object-center mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover lg:hidden'
              src='/img/beach-work.jpeg'
              alt='Woman working on the beach'
            />
            <h1 className='mt-6 text-2xl font-semibold tracking-tight text-gray-900 font-headline sm:mt-8 sm:text-3xl lg:text-3xl xl:text-4xl'>
              You can work from anywhere.
              <br className='inline' />
              <span className='text-brand'> Take advantage of it.</span>
            </h1>
            <p className='mt-2 text-gray-600 sm:mt-4 sm:text-xl'>
              Workcation helps you find work-friendly rentals in beautiful
              locations so you can enjoy some nice weather even when you're not
              on vacation.
            </p>
            <div className='mt-4 space-x-1 sm:mt-6'>
              <a
                className='btn btn-primary shadow-lg hover:-translate-y-0.5     transition
      transform'
                href='#'
              >
                Book your escape
              </a>
              <a className='btn btn-secondary' href='#'>
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className='relative hidden lg:block 2xl:col-span-3'>
          <img
            className='absolute inset-0 object-cover object-center w-full h-full'
            src='/img/beach-work.jpeg'
            alt='Woman working on the beach'
          />
        </div>
      </div>

      <div className='max-w-md px-8 py-8 mx-auto sm:max-w-xl lg:max-w-6xl lg:px-12'>
        <h2 className='text-xl text-gray-800'>Popular destinations</h2>
        <p className='text-sm text-gray-600'>
          A selection of great work-friendly cities with lots to see and explore
        </p>
        <div className='grid gap-6 mt-6 lg:grid-cols-2 xl:grid-cols-3'>
          {destinations.map((destination) => (
            <DestinationCard
              destination={destination}
              key={destination.city}
            ></DestinationCard>
          ))}
        </div>
      </div>
    </div>
  );
}
