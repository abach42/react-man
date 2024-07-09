import { useContext } from "react";
import SuperheroContext from "./SuperheroContext";
import SuperheroListItem from "./SuperheroListItem";
import { Superhero } from "./Superhero";

const SuperheroList: React.FC = () => {
    const [superheroes, ] = useContext(SuperheroContext);

    if (superheroes.length === 0) {
        return <div>Keine Held:innen gefunden</div>;
    }

    const handleSuperheroClick = (superhero: Superhero) => {
        return (
            <div>foo</div>
        );
    };
    
    return (
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alias</th>
            <th>Geburtsdatum</th>
            <th>Geschlecht</th>
            <th>Scheinbarer Job</th>
            <th>Nutzer:innen Gruppe</th>
          </tr>
        </thead>
        <tbody>
          {superheroes.map((superhero) => (
            <SuperheroListItem key={superhero.id} superhero={superhero} handleClick={handleSuperheroClick}/>
          ))}
        </tbody>
      </table>
    );
}

export default SuperheroList;