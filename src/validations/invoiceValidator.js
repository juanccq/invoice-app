import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const invoiceSchema = Joi.object( {
  invoiceNumber: Joi.string().required().label( 'Invoice Number' ),
  customer: Joi.string().required().label( 'Customer Name' ),
  items: Joi.array().items(
    Joi.object( {
      product: Joi.string().regex( objectIdPattern ).required().label('Product ID'),
      quantity: Joi.number().min(1).required().label( 'Quantity' ),
      price: Joi.number().min(1).required().label( 'Price' )
    } )
  ).min(1).required().label( 'Items' ),
  totalAmount: Joi.number().required().label( 'Total Amount' ),
} ).custom( ( value, helpers ) => {
  // Calculate the total from the items
  const calculatedTotal = value.items.reduce( (sum, item ) => sum + ( item.price * item.quantity ), 0 );

  // check if the totalamount matches the calculated total
  if( calculatedTotal !== value.totalAmount ) {
    return helpers.message( 'Total amount does not match the sum of item prices.' );
  }  

  return value;
}, 'Total Amount Validation' );

const validateInvoice = ( data ) => {
  console.log('data val', data);
  
  return invoiceSchema.validate( data );
};

export { validateInvoice };