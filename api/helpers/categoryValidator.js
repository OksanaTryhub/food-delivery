const validCategories = [
  "Salads",
  "Rolls",
  "Deserts",
  "Sandwiches",
  "Cakes",
  "Pure Veg",
  "Pasta",
  "Noodles",
];

const categoryValidator = {
  validator: function (value) {
    return validCategories.includes(value);
  },
  message: (props) =>
    `${
      props.value
    } is not a valid category. Valid categories are: ${validCategories.join(
      ", "
    )}.`,
};

export { categoryValidator, validCategories };
