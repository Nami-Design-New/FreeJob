import BankCard from "../cards/BankCard";
export default function BankList({ banks }) {
  return (
    <section className="container">
      <section className="row g-3 mb-4">
        {banks.map((bank) => (
          <section className="col-12" key={bank.id}>
            <BankCard bank={bank} />
          </section>
        ))}
      </section>
    </section>
  );
}
