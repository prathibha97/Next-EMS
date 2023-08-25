'use client';
import ActionButton from '@/components/buttons/action-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import {
  HRSettingsFormSchema,
  HRSettingsFormValues,
} from '@/lib/validation/hr-settings-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface HRSettingsFormProps {}

const HRSettingsForm: FC<HRSettingsFormProps> = ({}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader');
  const form = useForm<HRSettingsFormValues>({
    resolver: zodResolver(HRSettingsFormSchema),
    defaultValues: {
      employeeType: 'Permanent',
      relatedUser: 'Prathibha Ratnayake',
      idCopy: '',
      resumeCopy: '',
      passbookCopy: '',
    },
  });

 const handleFileUpload = (
   e: ChangeEvent<HTMLInputElement>,
   fieldChange: (value: string) => void
 ) => {
   e.preventDefault();

   if (e.target.files && e.target.files.length > 0) {
     const newFiles = Array.from(e.target.files);

     const validFiles = newFiles.filter((file) => file.type.includes('pdf'));

     if (validFiles.length === 0) return; // No valid PDF files

     setFiles((prevFiles) => [...prevFiles, ...validFiles]);

     const fileDataUrls: string[] = [];

     validFiles.forEach((file) => {
       const fileReader = new FileReader();
       fileReader.onload = (event) => {
         const fileDataUrl = event.target?.result?.toString() || '';
         fileDataUrls.push(fileDataUrl);

         if (fileDataUrls.length === validFiles.length) {
           fieldChange(fileDataUrls.join(','));
         }
       };
       fileReader.readAsDataURL(file);
     });
   }
 };


  const onSubmit = async (values: HRSettingsFormValues) => {
    // Perform save action here using data
    setIsLoading(true);
    try {
      const hasFileChanged = files.length > 0;

      if (hasFileChanged) {
        const uploadRes = await startUpload(files);
        console.log(uploadRes);
        if (uploadRes && uploadRes[0].fileUrl) {
          values.idCopy = uploadRes[0].fileUrl;
        }
        if (uploadRes && uploadRes[1].fileUrl) {
          values.resumeCopy = uploadRes[1].fileUrl;
        }
        if (uploadRes && uploadRes[2].fileUrl) {
          values.passbookCopy = uploadRes[2].fileUrl;
        }
      }
      setIsLoading(false);
      toast({
        title: 'Success',
        description: 'Employee details updated successfully',
      });
      // TODO: Perform save action here using data

    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant:'destructive'
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between'>
            {/* Status */}
            <div>
              <h2 className='text-lg font-semibold'>Status</h2>
              <Separator className='mt-1 mb-3' />
              <div className='flex flex-col gap-y-4'>
                <span>
                  Employee Type :{' '}
                  <FormField
                    name='employeeType'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className='text-sm text-gray-600' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>

                <span>
                  Related User:{' '}
                  <FormField
                    name='relatedUser'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className='text-sm text-gray-600' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-y-3'>
              ID Card Copy:{' '}
              <FormField
                control={form.control}
                name='idCopy'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-4'>
                    <FormControl className='text-base-semibold text-gray-400'>
                      <Input
                        type='file'
                        accept='.pdf'
                        placeholder='Upload ID Card'
                        onChange={(e) => handleFileUpload(e, field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              Resume Copy:{' '}
              <FormField
                control={form.control}
                name='resumeCopy'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-4'>
                    <FormControl className='text-base-semibold text-gray-400'>
                      <Input
                        type='file'
                        accept='.pdf'
                        placeholder='Upload Resume'
                        onChange={(e) => handleFileUpload(e, field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              Passbook Copy:{' '}
              <FormField
                control={form.control}
                name='passbookCopy'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-4'>
                    <FormControl className='text-base-semibold text-gray-400'>
                      <Input
                        type='file'
                        accept='.pdf'
                        placeholder='Upload Bank Passbook'
                        onChange={(e) => handleFileUpload(e, field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='mt-4'>
            <ActionButton
              isLoading={isLoading}
              type='submit'
              onClick={() => onSubmit}
              label='Save'
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default HRSettingsForm;
