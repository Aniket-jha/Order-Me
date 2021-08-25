import { useEffect, useState } from "react";
import classes from "./Available.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealItem/MealsItem";

export default function Available() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://starwars-basic-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
      console.log(data);
      const loadedMeals = [];
      for (const mealsKey in data) {
        loadedMeals.push({
          id: mealsKey,
          name: data[mealsKey].name,
          description: data[mealsKey].description,
          price: data[mealsKey].price,
        });
      }
      console.log(loadedMeals);
      setMeals(loadedMeals);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let mealsList = meals.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (isLoading) {
    mealsList = <p>Loading...</p>;
  }
  if (error) {
    mealsList = <p>{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
