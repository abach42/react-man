import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Superhero } from "./Superhero";
import { useForm } from "react-hook-form";

const Form: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Superhero>({
    defaultValues: {
      realName: "",
      alias: "",
      dateOfBirth: "",
      gender: "",
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
        .then((data) => reset(data));
    }
  }, [id, reset]);

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
    <div
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <div id="form-dialog-title">
          {id ? "Superheld bearbeiten" : "Neuen Superhelden anlegen"}
        </div>
        <div id="form-dialog-description">
          <div>
            realName:
            <input {...register("realName")} />
          </div>
          <div>
            alias:
            <input {...register("alias")} />
          </div>
          <div>
            dateOfBirth:
            <input {...register("dateOfBirth")} />
          </div>
          <div>
            gender:
            <input {...register("gender")} />
          </div>
          <div>
            occupation:
            <input {...register("occupation")} />
          </div>
          <div>
            originStory:
            <input {...register("originStory")} />
          </div>
          <div>
            email:
            <input {...register("user.email")} />
          </div>
        </div>
        <div>
          <Button color="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button color="primary" type="submit">
            Speichern
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
