export default function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
      <h2>
        <a href="#" className="font-bold text-2x">
          Fábio Valentim
        </a>
      </h2>
      <p>
        <strong>E-mail:</strong>&nbsp;maitabom@gmail.com
      </p>
      <p>
        <strong>Telefone:</strong>&nbsp;+33933930292
      </p>
      <button type="button" className="bg-red-500 px-4 rounded text-white mt-2 self-end">Excluir</button>
    </article>
  );
}
