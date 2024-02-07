'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useUpdateClientMutation } from '@/app/redux/services/clientApi';
import ActionButton from '@/components/buttons/action-button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  ClientFormSchema,
  ClientFormValues,
} from '@/lib/validation/client-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Client } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface EditClientDialogProps {
  client: Client | null;
}

const EditClientDialog: FC<EditClientDialogProps> = ({ client }) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clientId = client?.id || '';

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: client?.name,
      email: client?.email,
      address: client?.address || undefined,
      phone: client?.phone || undefined,
    },
  });

  const [updateClient, { isLoading: isUpdateClientLoading }] =
    useUpdateClientMutation();

  const onSubmit = async (values: ClientFormValues) => {
    await updateClient({
      body: {
        ...values,
      },
      clientId,
    }).unwrap();
    try {
      toast({
        title: 'Client updated successfully',
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Something went wrong!',
        description: 'Failed to update client details, please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!isMounted) return null;

  return (
    <div className="mb-5">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button>Edit Client</Button>
        </DialogTrigger>
        <DialogContent className="p-5 rounded-md">
          <DialogHeader>
            <DialogTitle className="mx-16 md:mx-48 pt-10 text-xl">
              Edit client information
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Client Name"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Client Email"
                      className="w-full"
                      type="email"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Address</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Client Address"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Contact Number</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Client Contact Number"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <ActionButton
                  isLoading={isUpdateClientLoading}
                  type="submit"
                  onClick={() => onSubmit}
                  label="Edit client"
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditClientDialog;
