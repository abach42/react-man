import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import SuperheroContext from "./SuperheroContext";
import { Superhero } from "./Superhero";
import dayjs from "dayjs";
import { Pagination } from "@mui/material";
import { usePage } from "./PageContext";
import SuperheroListItem from "./SuperheroListItem";

const SuperheroList: React.FC = () => {
  const [superheroes] = useContext(SuperheroContext);
  const [filter, setFilter] = useState("");


  const headers = {
    realName: "Name",
    alias: "Alias",
    dateOfBirth: "Geburtsdatum",
    gender: "Geschlecht",
    occupation: "Scheinbarer Job",
  };

  const [sort, setSort] = useState<{
    orderBy: keyof Superhero;
    order: "asc" | "desc";
  }>({
    orderBy: "realName",
    order: "asc",
  });

  if (superheroes.length === 0) {
    return <></>;
  }

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
              {Object.entries(headers).map(([key, header]) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={sort.orderBy === key}
                    direction={sort.order}
                    onClick={() =>
                      setSort({
                        orderBy: key as keyof Superhero,
                        order: sort.order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
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
                  superhero.alias
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  dayjs(superhero.dateOfBirth)
                    .format("DD.MM.YYYY")
                    .includes(filter)
                );
              })
              .sort((a, b) => {
                const compareResult = a[sort.orderBy]
                  .toString()
                  .localeCompare(b[sort.orderBy].toString());
                return sort.order === "asc" ? compareResult : -compareResult;
              })
              .map((superhero) => (
                <SuperheroListItem key={superhero.id} superhero={superhero} />
              ))}
          </TableBody>
        </Table>
        <PaginationControls />
      </Paper>
    </>
  );
};

const PaginationControls: React.FC = () => {
  const { page, setPage, pageMeta } = usePage();

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  if (!pageMeta) return null;

  return (
    <Pagination
      count={pageMeta.totalPages}
      page={page}
      onChange={handleChangePage}
      sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
    />
  );
};

export default SuperheroList;
