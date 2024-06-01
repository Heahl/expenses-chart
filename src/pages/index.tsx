import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
// Local Components
import Bar from "../components/Bar";

export type BalanceDataProps = {
  day: string;
  amount: number;
};

export default function Home() {
  const [balanceData, setBalanceData] = useState<BalanceDataProps[]>([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data: BalanceDataProps[]) => {
        setBalanceData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalExpenses = balanceData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return (
    <>
      <Head>
        <title>Expenses Chart</title>
        <meta name="description" content="expenses-chart-component" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream font-dmSans">
        {/* Component Container */}
        <div className="flex w-1/2 min-w-[480px] flex-col gap-6">
          {/* Component Header */}
          <div className="flex h-28 w-full items-center justify-between rounded-xl bg-soft-red p-8">
            <div className="flex h-full flex-col justify-center gap-1 text-very-pale-orange">
              <h4 className="text-lg">My balance</h4>
              <h2 className="text-3xl font-bold">$ 921.48</h2>
            </div>
            <Image
              className="h-12 w-auto"
              src={"/images/logo.svg"}
              height={100}
              width={100}
              alt="Logo"
            />
          </div>
          {/* Component Content */}
          <div className="flex h-[600px] w-full flex-col rounded-xl bg-very-pale-orange px-6 py-8">
            <h1 className="text-3xl font-bold">Spending - Last 7 days</h1>
            {/* Bars */}
            <div className="flex h-[350px] w-full justify-between">
              {balanceData.map((item, index) => (
                <Bar
                  key={item.day}
                  day={item.day}
                  amount={item.amount}
                  index={index}
                  highestAmount={Math.max(
                    ...balanceData.map((item) => item.amount),
                  )}
                />
              ))}
            </div>
            {/* Separator */}
            <div className="mt-8 rounded-full border-b-2 border-medium-brown/25" />
            {/* Total Expenses */}
            <div className="mt-8 flex justify-between">
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-xl text-medium-brown">Total this week</p>
                <h3 className="text-5xl font-bold text-dark-brown">
                  ${totalExpenses}
                </h3>
              </div>
              <div className="flex h-full flex-col items-end justify-end">
                <h3 className="text-xl font-bold text-dark-brown">+2.4%</h3>
                <p className="text-xl text-medium-brown">from last month</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
