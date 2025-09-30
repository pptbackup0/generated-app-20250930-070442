import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useFinancialsStore } from '@/store/financialsStore';
import { useAuthStore } from '@/store/authStore';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
export function BillsPage() {
  const user = useAuthStore((state) => state.user);
  const { getTransactionsByTenantId } = useFinancialsStore();
  // Assuming the logged-in user is a tenant and has an ID.
  // In a real app, you'd get the ID from the user object. Using a mock ID for now.
  const tenantId = 101; 
  const transactions = getTransactionsByTenantId(tenantId);
  const getStatusVariant = (status: 'pending' | 'paid' | 'overdue' | 'cancelled') => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bills</CardTitle>
        <CardDescription>Here is a list of all your past and current bills.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill For</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium capitalize">{transaction.transaction_type}</div>
                  <div className="text-sm text-muted-foreground">{transaction.notes}</div>
                </TableCell>
                <TableCell>
                  {transaction.due_date ? format(new Date(transaction.due_date), 'PPP') : 'N/A'}
                </TableCell>
                <TableCell>
                  ₹{transaction.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(transaction.status)} className="capitalize">
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}