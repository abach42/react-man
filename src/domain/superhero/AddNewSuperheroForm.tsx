import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Superhero } from "./Superhero";
import { useForm, Controller } from "react-hook-form";
import { Close, Save } from "@mui/icons-material";

enum Gender {
  Male = "Male",
  Female = "Female",
}

const AddNewSuperheroForm: React.FC = () => {
  const { control, register, handleSubmit, reset, setValue } = useForm<Superhero>({
    defaultValues: {
      realName: "",
      alias: "",
      dateOfBirth: "",
      gender: Gender.Male,
      occupation: "",
      originStory: "",
      user: {
        email: "",
        role: "USER",
      },
    },
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/superheroes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          reset(data);
          setValue("gender", data.gender);
        });
    }
  }, [id, reset, setValue]);

  async function handleSave(formData: Superhero) {
    let url = "http://localhost:3001/superheroes";
    let method = "POST";

    if (formData.id) {
      method = "PUT";
      url += `/${formData.id}`;
    }

    await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { "content-type": "application/json" },
    });
    handleClose();
  }

  function handleClose() {
    navigate("/list");
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Real Name" {...register("realName")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Alias" {...register("alias")} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Date of Birth" {...register("dateOfBirth")} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select label="Gender" {...field}>
                      <MenuItem value={Gender.Male}>Male</MenuItem>
                      <MenuItem value={Gender.Female}>Female</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Occupation" {...register("occupation")} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Origin Story"
                multiline
                minRows={4}
                {...register("originStory")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" {...register("user.email")} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" sx={{ marginRight: "10px" }}>
                <Save /> Speichern
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                <Close /> Abbrechen
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewSuperheroForm;
