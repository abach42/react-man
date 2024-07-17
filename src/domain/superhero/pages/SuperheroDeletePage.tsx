import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ConfirmDeleteSuperhero from "../ConfirmDeleteSuperhero";
import SuperheroLoader from "../SuperheroLoader";
import SuperheroSingle from "../SupherheroSingle";

const SuperheroDeletePage: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const idOrNull: string | null = params.id ?? null;
  
  return (
    <>
  
      <SuperheroLoader id={idOrNull}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ConfirmDeleteSuperhero />
          
        </Box>
        <br />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuperheroSingle />
        </Box>
      </SuperheroLoader>
    </>
  );
};

export default SuperheroDeletePage;
