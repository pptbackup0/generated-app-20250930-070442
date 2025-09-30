import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, FileText, IndianRupee, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useFinancialsStore } from '@/store/financialsStore';
import { TransactionForm, TransactionFormValues } from '@/components/financials/TransactionForm';
import { UtilityReadingForm, UtilityReadingFormValues } from '@/components/financials/UtilityReadingForm';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
export function FinancialsPage() {
  const { transactions, addTransaction, generateBillForUnit } = useFinancialsStore();
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const landlordTransactions = transactions.filter(t => t.landlord_id === 1);
  const handleAddTransaction = (data: TransactionFormValues) => {
    addTransaction({
      ...data,
      amount: Number(data.amount),
      paid_date: data.paid_date.toISOString(),
    });
    toast.success('Transaction added successfully!');
    setIsTransactionOpen(false);
  };
  const handleGenerateBill = (data: UtilityReadingFormValues) => {
    generateBillForUnit(data.unit_id, data.electricity_reading, data.water_reading);
    toast.success(`Bill generated successfully for unit ${data.unit_id}!`);
    setIsBillingOpen(false);
  };
  const chartData = [
    { name: 'Jan', income: 40000, expense: 24000 },
    { name: 'Feb', income: 30000, expense: 13980 },
    { name: 'Mar', income: 50000, expense: 9800 },
    { name: 'Apr', income: 27800, expense: 39080 },
    { name: 'May', income: 18900, expense: 48000 },
    { name: 'Jun', income: 23900, expense: 38000 },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Financials</h1>
        <div className="flex gap-2">
          <Dialog open={isBillingOpen} onOpenChange={setIsBillingOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Generate Bill</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader><DialogTitle>Generate Monthly Bill</DialogTitle></DialogHeader>
              <UtilityReadingForm onSubmit={handleGenerateBill} onCancel={() => setIsBillingOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isTransactionOpen} onOpenChange={setIsTransactionOpen}>
            <DialogTrigger asChild>
              <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader><DialogTitle>Add New Transaction</DialogTitle></DialogHeader>
              <TransactionForm onSubmit={handleAddTransaction} onCancel={() => setIsTransactionOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
              <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A log of all your income and expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landlordTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{format(new Date(tx.paid_date!), 'PPP')}</TableCell>
                  <TableCell>
                    <Badge variant={['income', 'rent'].includes(tx.transaction_type) ? 'default' : 'destructive'} className="capitalize flex items-center gap-1 w-fit">
                      {['income', 'rent'].includes(tx.transaction_type) ? <ArrowUpCircle className="h-3 w-3" /> : <ArrowDownCircle className="h-3 w-3" />}
                      {tx.transaction_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">₹{tx.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{tx.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}