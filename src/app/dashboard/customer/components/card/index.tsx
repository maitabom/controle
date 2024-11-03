import CardCustomerProperties from "./properties";

export default function CardCustomer({ customer }: CardCustomerProperties) {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
      <h2>
        <a href="#" className="font-bold text-2x">
          {customer.name}
        </a>
      </h2>
      <p>
        <strong>E-mail:</strong>&nbsp;{customer.email}
      </p>
      <p>
        <strong>Telefone:</strong>&nbsp;{customer.phone}
      </p>
      <button
        type="button"
        className="bg-red-500 px-4 rounded text-white mt-2 self-end"
      >
        Excluir
      </button>
    </article>
  );
}
