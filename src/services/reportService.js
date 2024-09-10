import Invoice from '../models/Invoice.js';
import Product from '../models/Product.js';

class ReportService {
  async getSalesReport() {
    const salesReport = await Invoice.aggregate( [
      // Unwind the items array to deconstruct each item in the invoice
      { $unwind: '$items' },

      // Group by product and calculate the total quantity sold and total revenue for each product
      {
        $group: {
          _id: '$items.product',
          totalQuantitySold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: [ '$items.quantity', '$items.price' ] } }
        },
      },

      // Lookup to join with the Product collection to get product details
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },

      // Unwind productDetails to get each product's details
      { $unwind: '$productDetails' },

      // Project the final output fields
      {
        $project: {
          _id: 0,
          productName: '$productDetails.name',
          totalQuantitySold: 1,
          totalRevenue: 1,
        },
      },
    ] );

    return salesReport;
  }
}

export default new ReportService();