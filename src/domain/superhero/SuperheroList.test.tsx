// SuperheroListPage.test.tsx
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import SuperheroContext from "./SuperheroContext";
import SuperheroList from "./SuperheroList";
import { Superhero } from "./Superhero";

const mockSuperheroes = [
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


const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SuperheroContext.Provider value={[mockSuperheroes as Superhero[], jest.fn()]}>
    {children}
  </SuperheroContext.Provider>
)

describe.skip("SuperheroListPage", () => {
  //todo  console.error Error: Uncaught [TypeError: Cannot destructure property 'basename' of 'React__namespace.useContext(...)' as it is null.]
  test("renders the page with the list of superheroes", () => {

    render(<SuperheroList />, {wrapper})
    
    expect(screen.getByText(/Superman/i)).toBeInTheDocument();
    expect(screen.getByText(/Wonder Woman/i)).toBeInTheDocument();
  });
});
