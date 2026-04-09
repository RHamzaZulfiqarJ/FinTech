export default function TransactionTable({ data }: any) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Payee</th>
          <th>Amount</th>
          <th>Metadata</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t: any) => (
          <tr key={t.id}>
            <td>{t.payee}</td>
            <td>{t.amount}</td>
            <td>{JSON.stringify(t.meta_data)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}