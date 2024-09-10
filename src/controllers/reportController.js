import ReportService from '../services/reportService.js';

class ReportController {
  async getSalesReport(req, res) {
    try {
      const report = await ReportService.getSalesReport();
      res.status(200).json(report);
    } catch (error) {
      console.error( 'Error generating sales report:', error.message );
      res.status( 500 ).json( {message: 'Server Error' } );
    }
  }
}

export default new ReportController();