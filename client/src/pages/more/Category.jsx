import React from "react";
import Feature from "../../components/Feature";

const Category = ({ name, features }) => {
  return (
    <div className="">
      <h2 className="mx-auto mb-1 text-lg text-gray-500">{name}</h2>
      <section className="flex flex-col gap-2">
        {features.map((feature) => (
          <Feature title={feature} />
        ))}
      </section>
    </div>
  );
};

export default Category;
