"use client";
import { useEffect, useState } from "react";
import CheckSession from "../component/CheckSession";
import { useForm } from "react-hook-form";
import { AddMoney, getBalances, getTrx } from "../api/lib/actions/action";
import BalanceCard from "../component/balanceCard/balanceCard";
import toast from "react-hot-toast";


export default function Transfer(){
    const [formData,setFormData]=useState({
        amount:0,
        Bank:""
    });
    const [transactions,setTransaction]=useState<Array<any>>([]);
    const [balance,setBalance]=useState<any>(null);

   async function fetchData(){
    const res=await getTrx();
    const bal= await getBalances();
    console.log(bal);
    setBalance(bal);    
    setTransaction(res);
    return res;
   } 

    

    useEffect(()=>{
      fetchData();
    },[]);


    const totalbanks:string[]=["HDFC","AXIS","ICICI"]
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
          if(formData.Bank=="" || formData.amount==0){
            toast.error(`Fill the form with correct data`);
            throw "Empty data";
          }
      const res= await AddMoney(formData.Bank,formData.amount);
        window.location.reload();
      }catch(err){
        console.log(err);
      }

      };



    return(
        <>
       <CheckSession>
  <div className="w-full flex flex-col md:flex-row justify-between gap-6 p-6 bg-[#f5f7fa] min-h-md">
    {/* Left: Add Money Form */}
    <form
      onSubmit={onSubmit}
      className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-6"
    >
      <h1 className="text-2xl font-semibold text-[#002970]">Add Money</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        name="amount"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
      />
      <select
        value={formData.Bank}
        name="Bank"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
      >
        <option value="" disabled>
          Select Bank
        </option>
        {totalbanks.map((bank: string, index: number) => (
          <option value={bank} key={index}>
            {bank}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-[#00baf2] text-white py-3 rounded-md hover:bg-[#018ac3] transition mt-10"
      >
        Submit
      </button>
    </form>

    {/* Right: Balance Card */}
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      <BalanceCard balance={balance || undefined} />

      {/* Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-h-[22rem] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-[#002970] mb-4">Transactions</h2>

        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border-b py-3 text-black last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="font-medium">{tx.status}</span>
                <span className="text-sm text-gray-500">
                  {tx.startTime.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </span>
              </div>
              <div className="text-right font-semibold text-[#00baf2]">
                ₹{tx.amount}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No Recent Transactions</div>
        )}
      </div>
    </div>
  </div>
</CheckSession>
        </>
    )
}



























































