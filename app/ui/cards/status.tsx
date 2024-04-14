import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CardStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-500 text-white': status === 'pendiente',
          'bg-green-500 text-white': status === 'pagado',
        },
      )}
    >
      {status === 'pendiente' ? (
        <>
          Pendiente
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'pagado' ? (
        <>
          Pagado
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      
    </span>
  );
}
