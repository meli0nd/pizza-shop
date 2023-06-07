import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PizzaInfo: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: '',
    title: '',
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getPizza() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://647049e63de51400f7240675.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (e) {
        alert("Произошла ошибка при запросе на сервер");
      } finally {
        setIsLoading(false);
      }
    }

    getPizza();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <h1>
            <b>LOADING...</b>
          </h1>
        </div>
      ) : (
        <div>
          <h1>{pizza.title}</h1>
          <h2>{pizza.price} руб. </h2>
          <img src={pizza.imageUrl} alt="" />
        </div>
      )}
    </>
  );
};

export default PizzaInfo;
