import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyers: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: " Not process ",
      enum: [
        " Not process ",
        " Processing ",
        " Shipped ",
        " Despatched ",
        " Arriving shortly ",
        " Delievered ",
        " Canceled ",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderSchema);
