import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const createSale = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    // Check items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Check payment method
    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    let totalAmount = 0;
    const saleItems = [];

    // Check every product
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      // Calculate total
      totalAmount += product.price * item.quantity;

      // Sale item
      saleItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Minus stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      product.stock = product.stock - item.quantity;

      await product.save();
    }

    // Create receipt number
    const receiptNumber = `POS-${Date.now()}`;

    // Create sale
    const sale = await Sale.create({
      items: saleItems,
      totalAmount,
      paymentMethod,
      receiptNumber,
    });

    res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    console.log("CREATE SALE ERROR:", error);

    res.status(500).json({
      message: "Failed to create sale",
      error: error.message,
    });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sales",
      error: error.message,
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    await Sale.findByIdAndDelete(id);

    res.status(200).json({
      message: "Sale deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete sale",
      error: error.message,
    });
  }
};