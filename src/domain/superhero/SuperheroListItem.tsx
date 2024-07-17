import { Delete, Edit, ZoomIn } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Superhero } from "./Superhero";

type SuperheroProps = {
  superhero: Superhero;
};

const SuperheroListItem: React.FC<SuperheroProps> = ({ superhero }) => {
  return (
    <TableRow>
      <TableCell>{superhero.realName}</TableCell>
      <TableCell>{superhero.alias}</TableCell>
      <TableCell>{dayjs(superhero.dateOfBirth).format("DD.MM.YYYY")}</TableCell>
      <TableCell>{superhero.gender}</TableCell>
      <TableCell>{superhero.occupation}</TableCell>
      <TableCell>
        <IconButton
          color="primary"
          aria-label="edit"
          component={Link}
          to={`/superhero/${superhero.id}`}
        >
          <ZoomIn />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="edit"
          component={Link}
          to={`/edit/${superhero.id}`}
        >
          <Edit />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="delete"
          component={Link}
          to={`/delete/${superhero.id}`}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SuperheroListItem;
