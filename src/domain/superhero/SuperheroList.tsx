import { useContext } from "react";
import SuperheroContext from "./SuperheroContext";
import SuperheroListItem from "./SuperheroListItem";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const SuperheroList: React.FC = () => {
  const [superheroes] = useContext(SuperheroContext);

  if (superheroes.length === 0) {
    return <></>;
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Alias</TableCell>
            <TableCell>Geburtsdatum</TableCell>
            <TableCell>Geschlecht</TableCell>
            <TableCell>Scheinbarer Job</TableCell>
            <TableCell colSpan={1}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {superheroes.map((superhero) => (
            <SuperheroListItem key={superhero.id} superhero={superhero} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SuperheroList;
