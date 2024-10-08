import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import SuperheroLoader from "../SuperheroLoader";
import SuperheroList from "../SuperheroList";

const SuperheroListPage: React.FC = () => {
  return (
    <>
      <h1 color="primary">List of superheroes</h1>

      <SuperheroLoader id={null}>
        <SuperheroList />
      </SuperheroLoader>

      <Fab color="primary" aria-label="Add" component={Link} to="/new">
        <Add />
      </Fab>
    </>
  );
};

export default SuperheroListPage;
