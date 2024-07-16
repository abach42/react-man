import { Cake, Email, Group, HistoryEdu, Wc, Work } from "@mui/icons-material"; // Use Material Icons
import { Avatar, CardHeader, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import { useContext } from "react";
import SuperheroContext from "../SuperheroContext";

const SuperheroSingle: React.FC = () => {
  const [[superhero] = []] = useContext(SuperheroContext);

  if (!superhero) {
    return <></>;
  }

  const letter = superhero.alias.charAt(0).toUpperCase();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {letter}
          </Avatar>
        }
        title={superhero.alias}
        subheader={superhero.realName}
      />
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              <Cake /> {dayjs(superhero.dateOfBirth).format("DD.MM.YYYY")}
            </Typography>
            <Typography variant="body2" align="left">
              <Wc /> {superhero.gender}
            </Typography>
            <Typography variant="body2" align="left">
              <Work /> {superhero.occupation}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              <HistoryEdu /> {superhero.originStory}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="left">
              <Group /> {superhero.user.role}
            </Typography>
            {superhero.user.email && (
              <Typography variant="body2" align="left">
                <Email /> {superhero.user.email}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SuperheroSingle;
