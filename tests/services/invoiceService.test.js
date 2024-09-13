import { describe, it, expect, vi } from 'vitest';
import InvoiceService from '../../src/services/invoiceService.js';
import Invoice from '../../src/models/Invoice.js';

vi.mock( '../../src/models/Invoice.js' );

describe( 'InvoiceService', () => {
  describe( 'createInvoice', () => {
    it( 'should create a new invoice', async () => {
      // Mock data
      const mockInvoiceData = {
        invoiceNumber: 3,
        customer: 'John Doe',
        items: [{ product: '66e03d4c3cbff96a9bc59414', quantity: 2, price: 100 }],
        totalAmount: 200,
        createdBy: '66df69a70d69ae2e2104c3cd'
      };


      // Moch Invoice model's save method
      Invoice.mockImplementation( () => ({
        save: vi.fn().mockResolvedValue(mockInvoiceData),
      }));

      // Call the service method
      const result = await InvoiceService.createInvoice( mockInvoiceData );

      // Expectations
      expect( await result.save() ).toEqual(mockInvoiceData);
      expect( Invoice ).toHaveBeenCalledWith( expect.objectContaining( mockInvoiceData ));
    });

    it( 'should throw an error if the invoice data is invalid', async () => {
      // Mock a validation error
      Invoice.mockImplementation( () => ( {
        save: vi.fn().mockRejectedValue( new Error( 'Validation Error: Missing customer name' ) ),
      } ) );

      await expect( InvoiceService.createInvoice( {} ) ).rejects.toThrow( 'Validation Error: Missing customer name' );
    } );
  } );

  describe( 'getInvoiceById', () => {
    it( 'should return the invoice for the given ID', async () => {
      const mockInvoiceData = {
        _id: '60d9c3e8f0f1a34d78f9a1d9',
        customer: 'John Doe',
        items: [{ product: '60d9c3e8f0f1a34d78f9a1d9', quantity: 2, price: 100 }],
        totalAmount: 200,
        createdBy: '60d9c3e8f0f1a34d78f9a1d9'
      };

      // Mock the findby method to return the mockInvoiceData
      Invoice.findById.mockResolvedValue( mockInvoiceData );

      // Call the service method
      const result = await InvoiceService.getInvoiceById( '60d9c3e8f0f1a34d78f9a1d9' );

      // Asertions
      expect( result ).toEqual( mockInvoiceData );
      expect( Invoice.findById ).toHaveBeenCalledWith( '60d9c3e8f0f1a34d78f9a1d9' );
    } );

    it( 'should throw and error if the invoice is not found', async () => {
      // Mock findById to return null
      Invoice.findById.mockResolvedValue( null );

      // Assertions
      await expect( InvoiceService.getInvoiceById( 'non-existent-id' ) ).rejects.toThrow('Invoice not found');
      expect( Invoice.findById ).toHaveBeenCalledWith( 'non-existent-id' );
    } );
  } );

  describe( 'updateInvoice', () => {
    it( 'should update the invoice and return the updated document', async () => {
      const mockInvoiceData = {
        _id: '60d9c3e8f0f1a34d78f9a1d9',
        customer: 'John Doe',
        items: [{ product: '60d9c3e8f0f1a34d78f9a1d9', quantity: 2, price: 100 }],
        totalAmount: 200,
        updatedBy: '60d9c3e8f0f1a34d78f9a1d9'
      };

      // Mock the findByIdAndUpdate method
      Invoice.findByIdAndUpdate.mockResolvedValue( mockInvoiceData );

      // Call the service method
      const result = await InvoiceService.updateInvoice( '60d9c3e8f0f1a34d78f9a1d9', { totalAmount: 250} );

      // Assertions
      expect( result ).toEqual( mockInvoiceData );
      expect( Invoice.findByIdAndUpdate ).toHaveBeenCalledWith(
        '60d9c3e8f0f1a34d78f9a1d9',
        { totalAmount: 250 },
        { new: true }
      );
    } );
  } );
} );