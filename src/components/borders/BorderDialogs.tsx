import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { BorderData } from '../../api/fetchBorders';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type BorderFormValues = {
  name: string;
};

type BorderFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BorderFormValues & { id?: string }) => Promise<void>;
  isSubmitting: boolean;
  border?: BorderData | null;
};

export const BorderFormDialog = ({ isOpen, onClose, onSubmit, isSubmitting, border }: BorderFormDialogProps) => {
  const isEditMode = !!border;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BorderFormValues>({
    defaultValues: {
      name: border?.name || '',
    },
  });

  // Update form when border changes
  useEffect(() => {
    if (border) {
      reset({ name: border.name });
    } else {
      reset({ name: '' });
    }
  }, [border, reset]);

  const submitHandler: SubmitHandler<BorderFormValues> = (data) => {
    if (isEditMode && border?.id) {
      onSubmit({ ...data, id: border.id });
    } else {
      onSubmit(data);
    }
  };

  const title = isEditMode ? 'Border bewerken' : 'Nieuwe border toevoegen';
  const buttonText = isEditMode
    ? isSubmitting
      ? 'Opslaan...'
      : 'Opslaan'
    : isSubmitting
      ? 'Toevoegen...'
      : 'Toevoegen';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </DialogTitle>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mt-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Naam
                    </label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Naam is verplicht' })}
                      placeholder="Naam van de border"
                      autoFocus
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={onClose}>
                      Annuleren
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {buttonText}
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

type DeleteBorderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
  borderName?: string;
};

export const DeleteBorderDialog = ({ isOpen, onClose, onConfirm, isDeleting, borderName }: DeleteBorderDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Border verwijderen
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Weet je zeker dat je de border "{borderName}" wilt verwijderen? Dit kan niet ongedaan worden
                    gemaakt.
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={onClose}>
                    Annuleren
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={onConfirm}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Verwijderen...' : 'Verwijderen'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
