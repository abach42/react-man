import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Delete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        let url = "http://localhost:3001/superheroes";
        let method = "DELETE";

        url += `/${id}`;

        await fetch(url, {
          method,
          headers: { "content-type": "application/json" },
        });
        handleClose();
      })();
    }
  }, []);

  function handleClose() {
    navigate('/list');
  }

  return <>Id {id} gelöscht</>;
};

export default Delete;
