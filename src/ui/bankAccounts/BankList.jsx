import BankCard from "../cards/BankCard";

const accountData = [
  {
    id: "1",
    bankName: "Bank Audi - Savings Account",
    accountNumber: "123",
    branchCode: "255",
    iban: "EG4567890987656789",
    address: ["Address Line 1", "Address Line 2"],
    location: "Alexandria, Somuha",
    imageUrl: "/path-to-image.png",
  },
  {
    id: "2",
    bankName: "Bank Audi - Savings Account",
    accountNumber: "123",
    branchCode: "255",
    iban: "EG4567890987656789",
    address: ["Address Line 1", "Address Line 2"],
    location: "Alexandria, Somuha",
    imageUrl: "/path-to-image.png",
  },
  {
    id: "3",
    bankName: "Bank Audi - Savings Account",
    accountNumber: "123",
    branchCode: "255",
    iban: "EG4567890987656789",
    address: ["Address Line 1", "Address Line 2"],
    location: "Alexandria, Somuha",
    imageUrl: "/path-to-image.png",
  },
];

export default function BankList() {
  return (
    <section className="container">
      <section className="row g-3 mb-4">
        {accountData.map((account) => (
          <section className="col-12" key={account.id}>
            <BankCard account={account} />
          </section>
        ))}
      </section>
    </section>
  );
}
