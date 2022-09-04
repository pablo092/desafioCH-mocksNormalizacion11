import { faker } from '@faker-js/faker';
faker.locale = "es";

function createProductItem() {
  return {
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(),
    fotoUrl: faker.image.avatar(),
  };
}

export { createProductItem };
