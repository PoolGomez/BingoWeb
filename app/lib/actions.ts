'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
// import { authConfig } from '@/auth.config';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'],{
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
          };
    }
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string,prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    
    if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
    };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
            `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
    
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
    
}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}
export async function logout(){
  await signOut();
}

//REGISTER
const FormSchemaUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password2: z.string(),
});
const CreateUser = FormSchemaUser.omit({ id: true});
export type StateUser = {
  errors?:  {
    name?: string[];
    email?: string[];
    password?: string[];
    password2?: string[];
  };
  message?: string | null;
}
export async function register(prevState: StateUser, formData: FormData){
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    password2: formData.get('password2'),
  });
  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo registrar'
    }
  }
  const {name, email, password, password2} = validatedFields.data;
  //validar contraseñas
  if(password !== password2){
    return {
      // errors: validatedFields.error.flatten().fieldErrors,
      message: 'Contraseñas no coinciden'
    }
  }
  
  
  try {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name},  ${email}, ${hashedPassword})
    `;
  } catch (error) {
      // If a database error occurs, return a more specific error.
      console.log('error create : ' + error);
      if(error == 'NeonDbError: duplicate key value violates unique constraint "users_email_key"'){
        return {
          message: 'El correo ya existe intente con otro',
        };  
      }else{
        return {
          message: 'Error de base de datos: No se pudo registrar.',
        };
      }
  }
  redirect('/login');
}

//CARDS
const FormSchemaCard = z.object({
  id: z.string(),
  number: z.string()
    .min(1,{
      message: 'El numero es obligatorio'
    })
    .max(8,{
      message: 'Máximo 8 digitos'
    }),
  name: z.string(),
  amount: z.coerce.number().gt(0, { message: 'Ingrese una cantidad superior a S/0.' }),
  observation: z.string(),
  status: z.enum(['pendiente', 'pagado'],{
      invalid_type_error: 'Seleccione el estado de la tarjeta.',
  }),
});
const CreateCard = FormSchemaCard.omit({ id: true});
const UpdateCard = FormSchemaCard.omit({ id: true});
export type StateCard = {
  errors?: {
    number?: string[];
    name?: string[];
    amount?: string[];
    observation?: string[];
    status?: string[];
  };
  message?: string | null;
};
export async function deleteCard(id: string) {
  // throw new Error('Failed to Delete Card');
  try {
      await sql`DELETE FROM cards WHERE id = ${id}`;
      revalidatePath('/dashboard/cards');
      return { message: 'Deleted Card' };
  } catch (error) {
      return { message: 'Database Error: Failed to Delete Card.' };
  }  
}
export async function createCard(prevState: StateCard, formData: FormData) {
  // console.log(authConfig)
  // Validate form fields using Zod
  const validatedFields = CreateCard.safeParse({
      number: formData.get('number'),
      name: formData.get('name'),
      amount: formData.get('amount'),
      observation: formData.get('observation'),
      status: formData.get('status'),
    });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
      return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo registrar la tarjeta.',
      };
  }
  // Prepare data for insertion into the database
  const { number, name, amount, observation, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
      await sql`
          INSERT INTO cards (number, name, amount, observation, status)
          VALUES (${number}, ${name},  ${amountInCents}, ${observation}, ${status})
      `;
  } catch (error) {
      // If a database error occurs, return a more specific error.
      console.log('error create : ' + error);
      if(error == 'NeonDbError: duplicate key value violates unique constraint "cards_number_key"'){
        return {
          message: 'La tarjeta con ese numero ya existe',
        };  
      }else{
        return {
          message: 'Error de base de datos: No se pudo registrar la tarjeta.',
        };
      }
  }
  // Revalidate the cache for the invoices page and redirect the user.
  // if(formData.get('origin') === 'venta'){
  //   redirect('/dashboard/vender');
  // }else{
    revalidatePath('/dashboard/cards');
    // redirect('/dashboard/cards');
  // }

  return {
    message: 'Se registro correctamente la tarjeta',
  }; 

}
export async function updateCard(id: string,prevState: StateCard, formData: FormData) {
  const validatedFields = UpdateCard.safeParse({
      number: formData.get('number'),
      name: formData.get('name'),
      amount: formData.get('amount'),
      observation: formData.get('observation'),
      status: formData.get('status'),
  });
  
  if (!validatedFields.success) {
  return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Card.',
  };
  }

  const { number, name, amount, observation, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
      await sql`
          UPDATE cards
          SET number = ${number}, name = ${name}, amount = ${amountInCents}, observation = ${observation}, status = ${status}
          WHERE id = ${id}
          `;
  } catch (error) {
      return { message: 'Database Error: Failed to Update Card.' };
  }
  
 
  revalidatePath('/dashboard/cards');
  redirect('/dashboard/cards');
}

//TICKETS
const FormSchemaTicket = z.object({
  id: z.string(),
  number: z.string().min(1,{ message: "Numero es requerido"}),
  name: z.string(),
  amount: z.coerce.number().gt(0, { message: 'Ingrese una cantidad superior a S/0.' }),
  description: z.string(),
  observation: z.string(),
  status: z.enum(['pendiente', 'pagado'],{
      invalid_type_error: 'Seleccione el estado del ticket.',
  }),
  status2: z.enum(['pendiente', 'atendido']),
  // status2: z.enum(['pendiente', 'atendido'],{
  //   invalid_type_error: 'Seleccione si ticket fue atendido.',
  // }),
});
const CreateTicket = FormSchemaTicket.omit({ status2: true, id: true});
const UpdateTicket = FormSchemaTicket.omit({ id: true});
export type StateTicket = {
  errors?: {
    number?: string[];
    name?: string[];
    amount?: string[];
    description?: string[];
    observation?: string[];
    status?: string[];
    status2?: string[];
  };
  message?: string | null;
};
export async function deleteTicket(id: string) {
  // throw new Error('Failed to Delete Ticket');
  try {
      await sql`DELETE FROM tickets WHERE id = ${id}`;
      revalidatePath('/dashboard/tickets');
      return { message: 'Deleted Ticket' };
  } catch (error) {
      return { message: 'Database Error: Failed to Delete Ticket.' };
  }  
}
export async function atenderTicket(id:string){
  try {
    await sql`UPDATE tickets SET status2='atendido' WHERE id = ${id}`;
    revalidatePath('/dashboard/atender');
    return { message: 'Ticket Atendido' };
  } catch (error) {
      return { message: 'Database Error: Failed to Ticket Atendido.' };
  } 
}
export async function createTicket(prevState: StateTicket, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateTicket.safeParse({
      number: formData.get('number'),
      name: formData.get('name'),
      amount: formData.get('amount'),
      description: formData.get('description'),
      status: formData.get('status'),
      observation: formData.get('observation'),
      // status2: formData.get('status2'),
    });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
      return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo registrar el ticket.',
      };
  }
  // Prepare data for insertion into the database
  const { number, name, amount, description, status, observation } = validatedFields.data;
  const amountInCents = amount * 100;

  // Insert data into the database
  try {
      await sql`
          INSERT INTO tickets (number, name, amount, description, observation, status, status2)
          VALUES (${number}, ${name},  ${amountInCents}, ${description}, ${observation}, ${status}, 'pendiente')
      `;
  } catch (error) {
      // If a database error occurs, return a more specific error.
      // console.log('error create : ' + error);
      if(error == 'NeonDbError: duplicate key value violates unique constraint "tickets_number_key"'){
        return {
          message: 'El Ticket con ese numero ya existe',
        };  
      }else{
        return {
          message: 'Error de base de datos: No se pudo registrar el ticket.',
        };
      }
      
  }
  // Revalidate the cache for the invoices page and redirect the user.
  if(formData.get('origin') === 'venta'){
    redirect('/dashboard/vender');
  }else{
    revalidatePath('/dashboard/tickets');
    redirect('/dashboard/tickets');
  }
  
}

export async function updateTicket(id: string,prevState: StateTicket, formData: FormData) {
  const validatedFields = UpdateTicket.safeParse({
      number: formData.get('number'),
      name: formData.get('name'),
      amount: formData.get('amount'),
      description: formData.get('description'),
      observation: formData.get('observation'),
      status: formData.get('status'),
      status2: formData.get('status2'),
  });
  
  if (!validatedFields.success) {
  return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Ticket.',
  };
  }
  const { number, name, amount, description, observation,status, status2 } = validatedFields.data;
  const amountInCents = amount * 100;
  try {
      await sql`
          UPDATE tickets
          SET number = ${number}, name = ${name}, amount = ${amountInCents}, description = ${description}, observation = ${observation}, status = ${status}, status2 = ${status2}
          WHERE id = ${id}
          `;
  } catch (error) {
      return { message: 'Database Error: Failed to Update Ticket.' };
  }
  revalidatePath('/dashboard/tickets');
  redirect('/dashboard/tickets');
}