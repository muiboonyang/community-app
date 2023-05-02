import React from "react";
import HomepageCarousel from "../components/HomepageCarousel";
// import Button from "react-bootstrap/Button";
// import styles from "./Home.module.css";

const Home = () => {
  // const seedTask = async () => {
  //   try {
  //     await fetch(`/seedtask`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteTasks = async () => {
  //   try {
  //     await fetch(`/delete/alltask`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const seedUser = async () => {
  //   try {
  //     await fetch(`/seeduser`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteUsers = async () => {
  //   try {
  //     await fetch(`/delete/alluser`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <br />
      <div className="carousel">
        <HomepageCarousel />
      </div>

      {/* <div className={styles.buttons}>
        <Button onClick={seedTask} variant="dark" type="submit" size="sm">
          Seed Tasks
        </Button>{" "}
        <Button onClick={deleteTasks} variant="danger" type="submit" size="sm">
          Delete Tasks
        </Button>{" "}
        <Button onClick={seedUser} variant="dark" type="submit" size="sm">
          Seed Users
        </Button>{" "}
        <Button onClick={deleteUsers} variant="danger" type="submit" size="sm">
          Delete Users
        </Button>
      </div> */}
    </>
  );
};

export default Home;
