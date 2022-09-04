import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";
import { createProductItem } from "../../utils/generadorProductos.js";

class MockApi extends ContenedorMemoria {
  constructor() {
    super("products");
    this.populate(5);
  }

  populate(qty = 50) {
    const mockedItems = [];
    for (let i = 1; i <= qty; i++) {
      const newItem = this.createItem(this.resource);
      const savedItem = this.save(newItem);
      mockedItems.push(savedItem);
    }
    return mockedItems;
  }

  createItem(resource) {
    const newItems = {
      products: createProductItem(),
    };
    return newItems[resource];
  }
}

export default MockApi;
