<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  
</script>

<Table hoverable={true}>
  <TableHead class="bg-gray-300 hover:bg-none">
    <TableHeadCell>Signature</TableHeadCell>
    <TableHeadCell>Time and Date</TableHeadCell>
    <TableHeadCell>Fees</TableHeadCell>
    <TableHeadCell>Fee Payer</TableHeadCell> 
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    <TableBodyRow class="bg-gray-500 hover:bg-opacity-25">
      <TableBodyCell class="text-gray-200">Apple MacBook Pro 17</TableBodyCell>
      <TableBodyCell class="text-gray-200">Sliver</TableBodyCell>
      <TableBodyCell class="text-gray-200">Laptop</TableBodyCell>
      <TableBodyCell class="text-gray-200">$2999</TableBodyCell>
    </TableBodyRow>
  </TableBody>
</Table>