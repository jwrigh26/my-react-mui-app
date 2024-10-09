import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function InvoiceTotals({ totals }) {
  const { invoices, creditMemos, payments, refunds, totalDue } = totals;

  const theme = useTheme();

  return (
    <TableContainer
      sx={{
        p: 2,
        backgroundColor: theme.palette.grey.light,
        maxWidth: 650,
        margin: 'auto',
        borderRadius: 1,
        boxShadow: 'none',
      }}
    >
      <Table padding="none" sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              colSpan={2}
              sx={{ fontWeight: 'bold', ...theme.typography.subtitle2 }}
            >
              Total Balance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <InvoiceTableCell align="left">Invoices</InvoiceTableCell>
            <InvoiceTableCell align="right" data-testid="invoice-total">
              {invoices.formattedTotal}
            </InvoiceTableCell>
          </TableRow>
          <TableRow>
            <InvoiceTableCell align="left">Credit Memos</InvoiceTableCell>
            <InvoiceTableCell align="right" data-testid="credit-memos-total">
              {creditMemos.formattedTotal}
            </InvoiceTableCell>
          </TableRow>
          <TableRow>
            <InvoiceTableCell align="left">
              Payments & Deposits
            </InvoiceTableCell>
            <InvoiceTableCell align="right" data-testid="payments-total">
              {payments.formattedTotal}
            </InvoiceTableCell>
          </TableRow>
          <TableRow>
            <InvoiceTableCell align="left">Refunds</InvoiceTableCell>
            <InvoiceTableCell align="right" data-testid="refunds-total">
              {refunds.formattedTotal}
            </InvoiceTableCell>
          </TableRow>
        </TableBody>
        <tfoot style={{ border: 'none' }}>
          <TableRow sx={{ borderTop: 1, borderColor: theme.palette.grey[800] }}>
            <InvoiceTableCell
              align="left"
              sx={{ fontWeight: 'bold', fontSize: '1.1em' }}
            >
              Amount Due
            </InvoiceTableCell>
            <InvoiceTableCell
              align="right"
              data-testid="total-due"
              sx={{ fontWeight: 'bold', fontSize: '1.1em' }}
            >
              {totalDue.formattedTotal}
            </InvoiceTableCell>
          </TableRow>
        </tfoot>
      </Table>
    </TableContainer>
  );
}

InvoiceTotals.propTypes = {
  totals: PropTypes.shape({
    invoices: PropTypes.shape({
      total: PropTypes.number,
      formattedTotal: PropTypes.string,
    }),
    creditMemos: PropTypes.shape({
      total: PropTypes.number,
      formattedTotal: PropTypes.string,
    }),
    payments: PropTypes.shape({
      total: PropTypes.number,
      formattedTotal: PropTypes.string,
    }),
    refunds: PropTypes.shape({
      total: PropTypes.number,
      formattedTotal: PropTypes.string,
    }),
    totalDue: PropTypes.shape({
      total: PropTypes.number,
      formattedTotal: PropTypes.string,
    }),
  }).isRequired,
};

const InvoiceTableCell = styled((props) => <TableCell {...props} />)(
  ({ _theme }) => ({
    border: 0,
  })
);
