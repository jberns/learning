import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { WishList } from "./models/WishList";

const wishList = WishList.create({
  items: [
    {
      name: "Machine Gun Preacher",
      price: 7.35,
      image:""
    },
    {
      name: "Lego Mindstorms EV3",
      price: 349.95,
      image:""
    },
  ],
});

test('renders learn react link', () => {
  render(<App wishList={wishList} />);
  const linkElement = screen.getByText(/WishList/i);
  expect(linkElement).toBeInTheDocument();
});
