import { useContext } from "react";
import SuperheroContext from "./SuperheroContext";
import SuperheroListItem from "./SuperheroListItem";

const SuperheroList: React.FC = () => {
  const [superheroes] = useContext(SuperheroContext);

  if (superheroes.length === 0) {
    return <></>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Alias</th>
          <th>Geburtsdatum</th>
          <th>Geschlecht</th>
          <th>Scheinbarer Job</th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {superheroes.map((superhero) => (
          <SuperheroListItem key={superhero.id} superhero={superhero} />
        ))}
      </tbody>
    </table>
  );
};

export default SuperheroList;
