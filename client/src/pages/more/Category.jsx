import React from "react";
import Feature from "../../components/Feature";

const Category = ({ categoryName, features }) => {
  console.log(features[0].name);

  return (
    <div className="">
      <h2 className="mx-auto mb-1 text-lg text-gray-500">{categoryName}</h2>
      <section className="flex flex-col gap-2">
        {features.map((feature) => (
          <Feature title={feature.name} action={feature.action} />
        ))}
      </section>
    </div>
  );
};

export default Category;
