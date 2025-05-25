import Loader from "../loader/loader";


export default function BalanceCard({ balance }: { balance?: { amount: number; locked: number } }) {
    return (
      <div className="w-full h-72 flex flex-col space-y-6 bg-white p-4 max-w-md items-center rounded-md mt-10 md:mt-0 md:ml-4 shadow-lg border border-gray-600">
        <h1 className="text-2xl font-bold text-black">Balance</h1>
  
        {!balance ? (
            <Loader />
        ) : (
          <>
            <div className="w-full flex justify-between px-4 border-t border-b border-gray-600 py-2 text-black">
              <span className="text-lg">Unlocked Balance:</span>
              <span className="font-semibold">₹{balance.amount.toLocaleString()}</span>
            </div>
  
            <div className="w-full flex justify-between px-4 border-b border-gray-600 py-2 text-black">
              <span className="text-lg">Locked Balance:</span>
              <span className="font-semibold">₹{balance.locked.toLocaleString()}</span>
            </div>
  
            <div className="w-full flex justify-between px-4 border-t border-gray-600 pt-4 text-black">
              <span className="text-lg font-bold">Total Balance:</span>
              <span className="text-lg font-bold">
                ₹{(balance.amount + balance.locked).toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
  