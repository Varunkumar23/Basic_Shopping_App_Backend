const { Product } = require("../../../models/product_schema");

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product...", data);

    Object.keys(data).forEach((key)=>{
      if(data[key]==null || data[key]==""){
        delete data.key;
      }
    })

    let newProduct = await Product.create(data);
    res.status(201).json({
      isSuccess: true,
      message: `Product created`,
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError" || err.code == "11000") {
      res
        .status(400)
        .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
    }
    console.log("🔴 Error in createProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      isSuccess: true,
      message: "Product list fetched!",
      data: {
        products: allProducts,
      },
    });
  } catch (err) {
    console.log("Error in getAllProducts", err.message);
    res
      .status(501)
      .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;

    const newProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
      runValidators: true,
    });
    if (newProduct === null) {
      res.status(400);
      res.json({
        isSuccess: false,
        message: "Invalid ProductId",
        data: {},
      });
    }
    res.status(200).json({
      isSuccess: true,
      message: "Product Updated!",
      data: {
        products: newProduct,
      },
    });
  } catch (err) {
    console.log("Error in updateProductController", err.message);
    res
      .status(501)
      .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
  }
};

const deleteProductController=async(req,res)=>{
try{
    const {productId}=req.params;
        console.log("delete product...",productId);
        const removedProduct=await Product.findByIdAndDelete(productId);

        if (!removedProduct) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
        data: {},
      });
    }
        res.status(200).json({
            isSuccess:true,
            message:"Product deleted Successfully",
            data:{
                product:removedProduct,
            }
        })
}catch (err) {
    console.log("Error in deleteProductController", err.message);
    res
      .status(404)
      .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
  }
}

module.exports = {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteProductController,
};
