import React from "react";
import Feature from "../../components/Feature";

const Category = ({ categoryName, features }) => {
  return (
    <div className="w-full">
      <h2 className="mb-1 text-lg text-gray-500">{categoryName}</h2>
      <section className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <Feature key={index} title={feature.name} action={feature.action} />
        ))}
      </section>
    </div>
  );
};

export default Category;
