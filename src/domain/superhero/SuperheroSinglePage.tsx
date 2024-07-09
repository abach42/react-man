import { Link, useParams } from "react-router-dom";
import SuperheroLoader from "./SuperheroLoader";
import SuperheroSingle from "./SupherheroSingle";

const SuperheroSinglePage: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const id = params.id ? Number(params.id) : null;

  return (
    <>
      <h1>Superheld:in</h1>
      <SuperheroLoader id={id} >
              <SuperheroSingle />
      </SuperheroLoader>

      <p>
        <Link to="/">Weiter zur Startseite</Link>
      </p>
    </>
  );
};

export default SuperheroSinglePage;
