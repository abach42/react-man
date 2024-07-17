import { Close, Save } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Superhero } from "./Superhero";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import SuperheroContext from "./SuperheroContext";
import ErrorMessage from "../../error/ErrorMessage";
import { PutReceiver } from "../../api/PutReceiver";
import { SuperheroSingleCommand } from "../../api/SuperheroSingleCommand";
import { SuperheroConvertInvoker } from "../../api/SuperheroConvertInvoker";
import AuthContext from "../login/AuthContext";

enum Gender {
  Male = "Male",
  Female = "Female",
}

const SuperheroEdit: React.FC = () => {
  const { authRef } = useContext(AuthContext);
  const [[superhero] = []] = useContext(SuperheroContext);
  const [error, setError] = useState<string | null>(null);
  const [, setSuperheroes] = useContext(SuperheroContext);

  const { control, register, handleSubmit, reset } = useForm<Superhero>({
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

  useEffect(() => {
    reset(superhero);
  }, [superhero, reset]);

  if (!superhero) {
    return <ErrorMessage message={"no superhero 🦸"} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  async function onSubmit(formData: Superhero) {
    await handleSave(formData);
    handleClose();
  }

  const handleSave = async (formData: Superhero) => {
    try {
      const token = authRef.current;
      const receiver = new PutReceiver(formData);
      const command = new SuperheroSingleCommand(receiver, token, superhero.id);
      const invoker = new SuperheroConvertInvoker(command);
      const updatedValue = await invoker.invoke();
      setSuperheroes(updatedValue);
    } catch (error: any) {
      setError(
        `${error.message || "An api error occurred"} ${
          error.response?.status ?? ""
        }`
      );
    }
  };

  function handleClose() {
    navigate("/list");
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default SuperheroEdit;
