import Loader from "../loader/loader";


export default function BalanceCard({ balance }: { balance?: { amount: number; locked: number } }) {
    return (
      <div className="w-full h-72 flex flex-col space-y-6 bg-white p-4 max-w-screen items-center rounded-2xl mt-10 md:mt-0 shadow-md">
      <h1 className="text-2xl font-semibold text-[#002970]">Balance</h1>
    
      {!balance ? (
        <Loader />
      ) : (
        <div className="w-full space-y-4 text-black">
          {/* Unlocked Balance */}
          <div className="flex justify-between items-center border-b pb-2 px-2">
            <span className="text-base text-gray-600">Unlocked Balance</span>
            <span className="text-lg font-medium text-[#00baf2]">
              ₹{balance.amount.toLocaleString()}
            </span>
          </div>
    
          {/* Locked Balance */}
          <div className="flex justify-between items-center border-b pb-2 px-2">
            <span className="text-base text-gray-600">Locked Balance</span>
            <span className="text-lg font-medium text-[#ffae00]">
              ₹{balance.locked.toLocaleString()}
            </span>
          </div>
    
          {/* Total Balance */}
          <div className="flex justify-between items-center pt-3 px-2">
            <span className="text-base font-semibold text-[#002970]">Total Balance</span>
            <span className="text-lg font-bold text-[#002970]">
              ₹{(balance.amount + balance.locked).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
    
    );
  }
  