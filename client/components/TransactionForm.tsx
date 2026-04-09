import { useState } from "react";
import { createTransaction } from "@/services/api";

export default function TransactionForm({ refresh }: any) {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    await createTransaction({
      payee,
      amount: Number(amount),
      date: new Date(),
      meta_data: {
        source: "frontend"
      },
      organization_id: "d7804a85-764d-47ab-afdf-73537061c7e8"
    });

    refresh();
  };

  return (
    <div>
      <input placeholder="Payee" onChange={(e) => setPayee(e.target.value)} />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}