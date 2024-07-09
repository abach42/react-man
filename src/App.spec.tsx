import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const cases = [
  {
    description: "should render the List",
    initialEntries: ["/list"],
    expectedQueryByTest: "List of superheroes",
  },
  {
    description: "should provide a default route that points to /list",
    initialEntries: ["/"],
    expectedQueryByTest: "List of superheroes",
  },
  {
    description: "should render the NotFound component for invalid paths",
    initialEntries: ["/xxx"],
    expectedQueryByTest: "Ups ... Etwas ist schiefgelaufen",
  },
];

describe.each(cases)(
  "App",
  ({ description, initialEntries, expectedQueryByTest }) => {
    it(description, () => {
      render(
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      );

      const expectText = expect(screen.queryByText(expectedQueryByTest));
      expectText.toBeInTheDocument();
    });
  }
);
