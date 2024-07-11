import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import SuperheroContext from "./SuperheroContext";
import SuperheroListItem from "./SuperheroListItem";

const SuperheroList: React.FC = () => {
  const [superheroes] = useContext(SuperheroContext);
  const [filter, setFilter] = useState("");

  if (superheroes.length === 0) {
    return <></>;
  }

  console.log(filter);

  return (
    <>
      <Paper sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Filtern nach Name, Alias oder Job"
          value={filter}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFilter(event.currentTarget.value)
          }
        />
      </Paper>
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
            {superheroes
              .filter((superhero) => {
                return (
                  superhero.realName
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  superhero.occupation
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  superhero.alias.toLowerCase().includes(filter.toLowerCase())
                );
              })
              .map((superhero) => (
                <SuperheroListItem key={superhero.id} superhero={superhero} />
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default SuperheroList;
