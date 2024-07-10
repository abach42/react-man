import { Edit, ZoomIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Superhero } from "./Superhero";

type SuperheroProps = {
  superhero: Superhero;
};

const SuperheroListItem: React.FC<SuperheroProps> = ({ superhero }) => {
  return (
    <tr>
      <td>{superhero.realName}</td>
      <td>{superhero.alias}</td>
      <td>{superhero.dateOfBirth}</td>
      <td>{superhero.gender}</td>
      <td>{superhero.occupation}</td>
      <td>
        <IconButton
          aria-label="edit"
          component={Link}
          to={`/superhero/${superhero.id}`}
        >
          <ZoomIn />
        </IconButton>
      </td>
      <td>
        <IconButton
          aria-label="edit"
          component={Link}
          to={`/edit/${superhero.id}`}
        >
          <Edit />
        </IconButton>
      </td>
    </tr>
  );
};

export default SuperheroListItem;
