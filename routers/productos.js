import express from "express";
import MockApi from "../daos/productos/MockApi.js";

class ProductosRouter extends express.Router {
  constructor() {
    super();

    const apiProductos = new MockApi();

    this.post("/popular", async (req, res, next) => {
      try {
        res.json(apiProductos.populate(req.query.cant));
      } catch (error) {
        next(error);
      }
    });

    this.get("/", async (req, res, next) => {
      try {
        // res.json(apiProductos.getAll());
        res.render("index", { productos: apiProductos.getAll() });
      } catch (error) {
        next(error);
      }
    });

    this.get("/:id", async (req, res, next) => {
      try {
        res.json(apiProductos.getById(req.params.id));
      } catch (error) {
        next(error);
      }
    });

    this.post("/", async (req, res, next) => {
      try {
        res.json(apiProductos.save(req.body));
      } catch (error) {
        next(error);
      }
    });

    this.put("/:id", async (req, res, next) => {
      try {
        res.json(apiProductos.update({ ...req.body, id: req.params.id }));
      } catch (error) {
        next(error);
      }
    });

    this.delete("/:id", async (req, res, next) => {
      try {
        res.json(apiProductos.delete(req.params.id));
      } catch (error) {
        next(error);
      }
    });

    this.use((err, req, res, next) => {
      const erroresNoEncontrado = [
        "Error al listar: elemento no encontrado",
        "Error al actualizar: elemento no encontrado",
        "Error al borrar: elemento no encontrado",
      ];

      if (erroresNoEncontrado.includes(err.message)) {
        res.status(404);
      } else {
        res.status(500);
      }
      res.json({ message: err.message });
    });
  }
}

export default ProductosRouter;
