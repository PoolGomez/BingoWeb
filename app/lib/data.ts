import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CardsTable,
  CardForm,
  Sorteo,
  TicketsTable,
  TicketForm,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

//sorteo
export async function fetchSorteo() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching sorteo data...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql<Sorteo>`SELECT * FROM cards ORDER BY RANDOM() LIMIT 1`;

    console.log('Data fetch completed after 5 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sorteo data.');
  }
}


export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

// export async function fetchCardData() {
//   noStore();
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

export async function fetchCardsData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const cardCountPromise = sql`SELECT COUNT(*) FROM cards`;
    const cardPaidCountPromise = sql`SELECT COUNT(*) FROM cards where status = 'pagado'`;
    const cardPendingCountPromise = sql`SELECT COUNT(*) FROM cards where status = 'pendiente'`;
    const cardStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'pagado' THEN amount ELSE 0 END) AS "pagado",
         SUM(CASE WHEN status = 'pendiente' THEN amount ELSE 0 END) AS "pendiente"
         FROM cards`;

    const data = await Promise.all([
      cardCountPromise,
      cardPaidCountPromise,
      cardPendingCountPromise,
      cardStatusPromise,
    ]);

    const numberOfCards = Number(data[0].rows[0].count ?? '0');
    const numberOfCardsPaid = Number(data[1].rows[0].count ?? '0');
    const numberOfCardsPending = Number(data[2].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidCards = formatCurrency(data[3].rows[0].pagado ?? '0');
    const totalPendingCards = formatCurrency(data[3].rows[0].pendiente ?? '0');
    const totalCards = formatCurrency(Number(data[3].rows[0].pendiente ?? '0') + Number(data[3].rows[0].pagado ?? '0') );

    return {
      numberOfCards,
      numberOfCardsPaid,
      numberOfCardsPending,
      totalPaidCards,
      totalPendingCards,
      totalCards
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


//cards - tarjetas

export async function fetchCardsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM cards
    WHERE
      number ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
      amount::text ILIKE ${`%${query}%`} OR
      observation ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
export async function fetchFilteredCards(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const cards = await sql<CardsTable>`
      SELECT
        id,
        number,
        name,
        amount,
        observation,
        status
      FROM cards
      WHERE
        name ILIKE ${`%${query}%`} OR
        number ILIKE ${`%${query}%`} OR
        amount::text ILIKE ${`%${query}%`} OR
        observation ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY number DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return cards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cards.');
  }
}
export async function fetchCardById(id: string) {
  noStore();
  try {
    const data = await sql<CardForm>`
      SELECT
        id,
        number,
        name,
        amount,
        observation,
        status
      FROM cards
      WHERE id = ${id};
    `;

    const card = data.rows.map((c) => ({
      ...c,
      // Convert amount from cents to dollars
      amount: c.amount / 100,
    }));
    // console.log(card); // Card is an empty array []
    return card[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card.');
  }
}


//tickets

export async function fetchTicketsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tickets
    WHERE
      number ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
      amount::text ILIKE ${`%${query}%`} OR
      description ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
export async function fetchFilteredTickets(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tickets = await sql<TicketsTable>`
      SELECT
        id,
        number,
        name,
        amount,
        description,
        status
      FROM tickets
      WHERE
        name ILIKE ${`%${query}%`} OR
        number ILIKE ${`%${query}%`} OR
        amount::text ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY number DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tickets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tickets.');
  }
}
export async function fetchTicketById(id: string) {
  noStore();
  try {
    const data = await sql<TicketForm>`
      SELECT
        id,
        number,
        name,
        amount,
        description,
        status
      FROM tickets
      WHERE id = ${id};
    `;

    const ticket = data.rows.map((c) => ({
      ...c,
      // Convert amount from cents to dollars
      amount: c.amount / 100,
    }));
    // console.log(ticket); // Ticket is an empty array []
    return ticket[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket.');
  }
}
export async function fetchTicketsData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const ticketCountPromise = sql`SELECT COUNT(*) FROM tickets`;
    const ticketPaidCountPromise = sql`SELECT COUNT(*) FROM tickets where status = 'pagado'`;
    const ticketPendingCountPromise = sql`SELECT COUNT(*) FROM tickets where status = 'pendiente'`;
    const ticketStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'pagado' THEN amount ELSE 0 END) AS "pagado",
         SUM(CASE WHEN status = 'pendiente' THEN amount ELSE 0 END) AS "pendiente"
         FROM tickets`;

    const data = await Promise.all([
      ticketCountPromise,
      ticketPaidCountPromise,
      ticketPendingCountPromise,
      ticketStatusPromise,
    ]);

    const numberOfTickets = Number(data[0].rows[0].count ?? '0');
    const numberOfTicketsPaid = Number(data[1].rows[0].count ?? '0');
    const numberOfTicketsPending = Number(data[2].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidTickets = formatCurrency(data[3].rows[0].pagado ?? '0');
    const totalPendingTickets = formatCurrency(data[3].rows[0].pendiente ?? '0');
    const totalTickets = formatCurrency(Number(data[3].rows[0].pendiente ?? '0') + Number(data[3].rows[0].pagado ?? '0') );
    return {
      numberOfTickets,
      numberOfTicketsPaid,
      numberOfTicketsPending,
      totalPaidTickets,
      totalPendingTickets,
      totalTickets
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket data.');
  }
}