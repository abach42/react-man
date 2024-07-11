import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Delete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  function handleDelete() {
    // Send delete request here (logic moved)
    (async () => {
      let url = "http://localhost:3001/superheroes";
      let method = "DELETE";

      url += `/${id}`;

      await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
      });
      navigate("/list"); // Redirect after successful deletion
    })();
  }

  function handleCancel() {
    navigate("/list"); // Redirect to list on cancel
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
              Sind Sie sicher, dass Sie den Superhero mit der ID {id} löschen
              möchten?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Abbrechen
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Löschen
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Delete;
