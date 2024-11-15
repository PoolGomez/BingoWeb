import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-react'
import React, { Dispatch, ReactElement, SetStateAction } from 'react'

export default function DialogCreateForm({open, setOpen, children}:{open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, children: ReactElement}) {

    const newCard = () =>{
        alert("nueva tarjeta");
    }

    const sameOwner = () => {
        alert("mismo dueño");
    }
    const finish = () => {
        alert("finish")
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            ¿Esta seguro que desea eliminar esta categoria?
          </DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer, se eliminara tambien los productos
            asociados a esta categoria
          </DialogDescription>
        </DialogHeader>

        {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}

        <DialogFooter className="sm:justify-center">
          <Button
            variant="destructive"
            // disabled={isPending}
            onClick={newCard}
          >
            {/* {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            registrar otra vez mismos datos
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={sameOwner}>
            registrar otra vez con nuevos datos
            </Button>
          </DialogClose>

          <Button onClick={finish}>
            Terminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
