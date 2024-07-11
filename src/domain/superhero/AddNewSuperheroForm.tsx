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
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Superhero } from "./Superhero";
import { useForm, Controller } from "react-hook-form";
import { Close, Save } from "@mui/icons-material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

enum Gender {
  Male = "Male",
  Female = "Female",
}

const AddNewSuperheroForm: React.FC = () => {
  const { control, register, handleSubmit, reset, setValue } =
    useForm<Superhero>({
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
  const [isLoading, setIsLoading] = useState(id ? true : false);

  //todo move to SuperheroLoader
  useEffect(() => {
    if (id) {
      (async () => {
        await fetch(`http://localhost:3001/superheroes/${id}`)
          .then((response) => response.json())
          .then((data) => {
            reset(data);
            setValue("gender", data.gender);
            setValue("dateOfBirth", data.dateOfBirth);
          });
        setIsLoading(false);
      })();
    }
  }, [id, reset, setValue, isLoading]);

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

  return isLoading ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Real Name"
                {...register("realName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Alias" {...register("alias")} />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Date of Birth"
                        value={field.value !== "" ? dayjs(field.value) : null}
                        slotProps={{
                          field: { clearable: true, onClear: () => true },
                        }}
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue !== null) {
                            field.onChange(newValue.format("YYYY-MM-DD"));
                          }
                        }}
                        openTo="year"
                        views={["year", "month", "day"]}
                        format="DD.MM.YYYY"
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
              <TextField
                fullWidth
                label="Occupation"
                {...register("occupation")}
              />
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: "10px" }}
              >
                <Save /> Speichern
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
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
