import { model, Schema } from "mongoose";

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El role es obligatorio"],
  },
});

export const role = model("Role", RoleSchema);
