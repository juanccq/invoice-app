import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe( 'InvoiceController', () => {
  describe( 'POST /api/invoices', () => {
    it( 'should return 401 if authorization toke is missing', async () => {
      const mockInvoiceData = {
        customer: 'John Doe',
        items: [{ product: '60d9c3e8f0f1a34d78f9a1d9', quantity: 2, price: 100 }],
        totalAmount: 200,
        createdBy: '60d9c3e8f0f1a34d78f9a1d9'
      };

      // Send a POST request without the Authorization header
      const res = await request( app )
        .post( '/api/invoice' )
        .send( mockInvoiceData );

      // Assertions
      expect( res.statusCode ).toBe( 401 );
      expect( res.body.message ).toEqual( 'Access denied. No token provided' );
    } );

    it( 'should return 400 if required fields are missing', async () => {
      const invalidInvoiceData = {
        // Missing required fields like customer
        items: [{ product: '60d9c3e8f0f1a34d78f9a1d9', quantity: 2, price: 100 }],
        totalAmount: 200
      };

      // Send a POST request with invalid data
      const res2 = await request( app )
        .post( '/api/invoice' )
        .send( invalidInvoiceData )
        .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRmNjlhNzBkNjlhZTJlMjEwNGMzY2QiLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImlhdCI6MTcyNjE0ODg3MCwiZXhwIjoxNzI2MjM1MjcwfQ.jjjY-ybEY2exkfYzfSM5IFtkIZ5T4D4sYZUTsPl9OIk' );
        
      // Assertions
      expect( res2.statusCode ).toBe( 400 );
      expect( res2.body.message ).toContain( 'Invoice validation failed' );
    } );
  } );
} );