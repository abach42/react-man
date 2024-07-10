// SuperheroListPage.test.tsx
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import React from "react";
import { Superhero } from "./Superhero";
import SuperheroListPage from "./SuperheroListPage";

// Mock SuperheroLoader to avoid external data fetching
jest.mock("./SuperheroLoader", () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});


const mockSuperheroes: Superhero[] = [
    {
      id: 1,
      realName: "Superman",
      alias: "Clark Kent",
      dateOfBirth: "1938-06-01",
      gender: "Male",
      occupation: "Reporter",
      originStory: "foo",
      user: {
        role: "ADMIN",
        email: "john.doe@example.com",
      },
    },
    {
      id: 2,
      realName: "Wonder Woman",
      alias: "Diana Prince",
      dateOfBirth: "1941-10-21",
      gender: "Female",
      occupation: "Ambassador",
      originStory: "foo",
      user: {
        role: "ADMIN",
        email: "john.doe@example.com",
      },
    },
  ];

  const MockSuperheroContext = React.createContext([mockSuperheroes, jest.fn()]);

  describe.skip("SuperheroListPage", () => {
    test("renders the page with the list of superheroes", () => {
      render(
        <MockSuperheroContext.Provider value={[mockSuperheroes, jest.fn()]}>
            <SuperheroListPage />
        </MockSuperheroContext.Provider>
      );
  
      expect(screen.getByText("List of superheroes")).toBeInTheDocument();
      expect(screen.getByText(/Superman/i)).toBeInTheDocument();
      expect(screen.getByText(/Wonder Woman/i)).toBeInTheDocument();
    });
  });
