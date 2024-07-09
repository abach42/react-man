import SuperheroList from "./SuperheroList";
import SuperheroLoader from "./SuperheroLoader";

const SuperheroListPage: React.FC = () => {
  return (
    <>
      <h1>List of superheroes</h1>
      <SuperheroLoader id={null} />
      <SuperheroList />
    </>
  );
};

export default SuperheroListPage;
