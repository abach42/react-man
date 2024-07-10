import { useContext } from "react";
import SuperheroContext from "./SuperheroContext";

const SuperheroSingle: React.FC = () => {
  const [[superhero] = []] = useContext(SuperheroContext);

  if (!superhero) {
    return <></>;
  }

  return (
    <div>
      <em>Name</em> {superhero.realName} <br />
      <em>Alias</em> {superhero.alias} <br />
      <em>Geburtsdatum</em> {superhero.dateOfBirth} <br />
      <em>Geschlecht</em> {superhero.gender} <br />
      <em>Scheinbarer Job</em> {superhero.occupation} <br />
      <em>Lebensgeschichte</em> {superhero.originStory} <br />
      <em>Nutzer:innen Gruppe</em> {superhero.user.role} <br />
      <em>Nutzer:innen E-Mail:innenden</em> {superhero.user.email} <br />
    </div>
  );
};

export default SuperheroSingle;
