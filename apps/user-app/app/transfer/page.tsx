"use client";
import { useState } from "react";
import CheckSession from "../component/CheckSession";
import { useForm } from "react-hook-form";

export default function Transfer(){
    const [formData,setFormData]=useState({
        amount:0,
        Bank:""
    });

    const transactions = [
        { id: 1, amount: 2000, type: "Deposit", date: "2025-05-22" },
        { id: 2, amount: 1500, type: "Withdrawal", date: "2025-05-21" },
        { id: 3, amount: 3000, type: "Transfer", date: "2025-05-20" },
      ];

    const totalbanks:string[]=["HDFC","AXIS","ICICI"]
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:");
      };



    return(
        <>
        <CheckSession>
        <div className="w-full flex flex-col justify-between md:flex-row p-4 items-start">
  
  {/* Left: Form */}
  <form onSubmit={onSubmit} className="w-full h-72 md:h-96 flex flex-col space-y-6 md:space-y-8 bg-white p-4 max-w-xl items-center rounded-md mt-10 md:mt-0 md:mr-4 shadow-lg border border-gray-600">
    <h1 className="text-2xl font-bold mb-6 text-black">Add Money</h1>
    <input type="number" placeholder="Amount" name="amount" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black"  />
    <select value={formData.Bank} name="Bank" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black">
      <option value="" disabled className="text-black">Select Bank</option>
      {totalbanks.map((bank: string, index: number) => (
        <option value={bank} key={index}>{bank}</option>
      ))}
    </select>
    <button type="submit" className="w-full bg-blue-500 text-white px-4 md:mt-8 mt-2 py-2 rounded hover:bg-blue-600">
      Submit
    </button>
  </form>

  {/* Right: Balance */}
  <div className="w-full h-72 flex flex-col space-y-6 bg-white p-4 max-w-md items-center rounded-md mt-10 md:mt-0 md:ml-4 shadow-lg border border-gray-600">
    <h1 className="text-2xl font-bold text-black">Balance</h1>
    <div className="w-full flex justify-between px-4 border-t border-b border-gray-600 py-2 text-black">
      <span className="text-lg">Unlocked Balance:</span>
      <span className="font-semibold">₹10,000</span>
    </div>
    <div className="w-full flex justify-between px-4 border-b border-gray-600 py-2 text-black">
      <span className="text-lg">Locked Balance:</span>
      <span className="font-semibold">₹2,000</span>
    </div>
    <div className="w-full flex justify-between px-4 border-t border-gray-600 pt-4 text-black">
      <span className="text-lg font-bold">Total Balance:</span>
      <span className="text-lg font-bold">₹12,000</span>
    </div>
  </div>

</div>





        <div className="w-full flex flex-col md:flex-row-reverse pr-4 pl-4">
                
        <div className="w-full shadow-lg h-80 flex flex-col space-y-6 h-72 bg-white p-4 max-w-md items-center rounded-md my-10 overflow-y-auto border border-gray-600"> 
        <h1 className="text-2xl font-bold mb-6 text-black">Transanction</h1>

                        
                {transactions.map((tx) => (
            <div
            key={tx.id}
            className="w-full flex justify-between items-center text-black"
            >
            <div className="flex flex-col">
                <span className="font-semibold">{tx.type}</span>
                <span className="text-sm text-gray-600">{tx.date}</span>
            </div>
            <div className="text-right font-bold">₹{tx.amount}</div>
            </div>
        ))}
                


        </div>
            
        </div>
        </CheckSession>
        </>
    )
}



























































