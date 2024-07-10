import { render, screen } from "@testing-library/react";
import SuperheroListItem from "./SuperheroListItem";
import { Superhero } from "./Superhero"; // Assuming Superhero interface is defined elsewhere
import '@testing-library/jest-dom'


describe("SuperheroListItem", () => {
  it("renders superhero details and edit link", () => {
    const mockSuperhero: Superhero = {
      id: 1,
      realName: "Clark Kent",
      alias: "Superman",
      dateOfBirth: "1938-06-01",
      gender: "Male",
      occupation: "Reporter",
      originStory: "foobar",
      user: { role: "ADMIN", email: "foo@bar.com" },
    };

    render(
      <table>
        <tbody>
          <SuperheroListItem key={1} superhero={mockSuperhero} />
        </tbody>
      </table>
    );

    expect(screen.getByText(mockSuperhero.realName)).toBeInTheDocument();
    expect(screen.getByText(mockSuperhero.alias)).toBeInTheDocument();
    expect(screen.getByText(mockSuperhero.dateOfBirth)).toBeInTheDocument();
    expect(screen.getByText(mockSuperhero.gender)).toBeInTheDocument();
    expect(screen.getByText(mockSuperhero.occupation)).toBeInTheDocument();
    expect(screen.getByText(mockSuperhero.user.role)).toBeInTheDocument();
  });
});
