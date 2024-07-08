import { Superhero } from "./Superhero";

type SuperheroProps = {
    superhero: Superhero;
}

const SuperheroListItem: React.FC<SuperheroProps> = ({ superhero }) => {
    return (
        <tr>
            <td>{superhero.realName}</td>
            <td>{superhero.alias}</td>
            <td>{superhero.dateOfBirth}</td>
            <td>{superhero.gender}</td>
            <td>{superhero.occupation}</td>
            <td>{superhero.user.role}</td>
        </tr>
    );
};

export default SuperheroListItem;