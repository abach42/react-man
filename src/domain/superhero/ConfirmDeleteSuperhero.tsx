import { Close, DeleteForever } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteReceiver } from "../../api/DeleteReceiver";
import { SuperheroConvertInvoker } from "../../api/SuperheroConvertInvoker";
import { SuperheroSingleCommand } from "../../api/SuperheroSingleCommand";
import AuthContext from "../login/AuthContext";
import SuperheroContext from "./SuperheroContext";
import ErrorMessage from "../../error/ErrorMessage";

const ConfirmDeleteSuperhero: React.FC = () => {
  const { authRef } = useContext(AuthContext);
  const [[superhero] = []] = useContext(SuperheroContext);
  const navigate = useNavigate();

  if (!superhero) {
    return <ErrorMessage message={'no superhero 🦸'} />;
  }

  function handleDelete() {
    (async () => {
      const token = authRef.current;
      const deleteReceiver = new DeleteReceiver();
      const deleteCommand = new SuperheroSingleCommand(
        deleteReceiver,
        token,
        superhero.id
      );
      const deleteInvoker = new SuperheroConvertInvoker(deleteCommand);
      await deleteInvoker.invoke();
      handleClose();
    })();
  }

  function handleClose() {
    navigate("/list"); 
  }

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Superheld löschen?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Sind Sie sicher, dass Sie den Superhelden <strong>{superhero.alias}</strong> mit der ID {superhero.id} löschen möchten?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              <Close />
              Abbrechen
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              <DeleteForever />
              Löschen
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfirmDeleteSuperhero;
