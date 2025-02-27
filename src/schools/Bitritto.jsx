import Button from "../components/Button";

const Bitritto = ({ props }) => {
  return (
    <>
      <h1>Bitritto</h1>
      <Button
        label="INIZIA"
        onClick={() => props.history.push("/EscapeToTheFuture/modugno")}
      />
    </>
  );
};

export default Bitritto;
