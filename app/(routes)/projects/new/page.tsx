'use client';
import { useCreateProjectMutation } from '@/app/redux/services/projectApi';
import ActionButton from '@/components/buttons/action-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import {
  ProjectFormSchema,
  ProjectFormValues,
} from '@/lib/validation/project-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Client, Employee } from '@prisma/client';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Checked = DropdownMenuCheckboxItemProps['checked'];
interface AddProjectPageProps {}

const AddProjectPage: FC<AddProjectPageProps> = ({}) => {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [assignees, setAssignees] = useState<Employee[]>([]);
  const [checkedEmployees, setCheckedEmployees] = useState<
    Record<string, Checked>
  >(
    assignees.reduce((acc, person) => {
      // @ts-ignore
      acc[person.id] = false; // Initialize all employees as unchecked
      return acc;
    }, {})
  );
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader');

  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/clients`
      );
      setClients(data);
    };

    getClients();
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/employees`
      );
      setAssignees(data);
    };
    getEmployees();
  }, []);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: '',
      clientId: '',
      designLink: '',
      employees: [],
      endDate: format(new Date(), 'yyyy-MM-dd'),
      startDate: '',
      status: 'ACTIVE',
      nftBaseDesignCount: '',
      nftCollectionSize: '',
      nftTraitCount: '',
      projectScope: '',
      specialNotes: '',
      category: '',
    },
  });

  const [createProject, { isLoading: isCreateProjectLoading }] =
    useCreateProjectMutation();

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

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      setIsLoading(true);

      const hasFileChanged = files.length > 0;
      if (hasFileChanged) {
        const uploadRes = await startUpload(files);
        if (uploadRes && uploadRes[0].url) {
          values.projectScope = uploadRes[0].url;
        }
      }

      await createProject({
        name: values.name,
        clientId: values.clientId,
        designLink: values.designLink,
        employees: Object.keys(checkedEmployees).filter(
          (key) => checkedEmployees[key]
        ),
        endDate: new Date(values.endDate),
        startDate: new Date(),
        status: 'ACTIVE',
        nftBaseDesignCount: parseInt(values.nftBaseDesignCount),
        nftCollectionSize: parseInt(values.nftCollectionSize),
        nftTraitCount: parseInt(values.nftTraitCount),
        projectScope: values.projectScope,
        specialNotes: values.specialNotes,
        category: values.category,
      }).unwrap();
      toast({
        title: 'Project created successfully',
      });
      form.reset();
      router.push('/projects');
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast({
        title: 'Something went wrong!',
        description: 'Failed to create new project, please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeCheckboxChange = (employeeId: string) => {
    setCheckedEmployees((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };

  const selectedCategory = form.watch('category');

  return (
    <div className="bg-white dark:bg-black/60 p-5 rounded-lg w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <div className="flex flex-col md:flex-row justify-between w-full md:space-x-8 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter Project Name"
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Project Category</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project category to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NFT">NFT</SelectItem>
                      <SelectItem value="Digital Arts">Digital Arts</SelectItem>
                      <SelectItem value="Graphic Design">
                        Graphic Design
                      </SelectItem>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Social Media Marketing">
                        Social Media Marketing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full md:space-x-8 gap-3">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Client to Display" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Project Deadline</FormLabel>
                  <Input {...field} type="date" className="w-full" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedCategory === 'NFT' && (
            <div className="flex justify-between w-full space-x-8">
              <FormField
                control={form.control}
                name="nftBaseDesignCount"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>NFT Base Design Count</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter NFT Base Design Count"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nftTraitCount"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>NFT Trait Count</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter NFT Trait Count"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex justify-between w-full space-x-8">
            {selectedCategory === 'NFT' && (
              <FormField
                control={form.control}
                name="nftCollectionSize"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>NFT Collection Size</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter NFT Collection Size"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Controller
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    'w-full',
                    selectedCategory === 'NFT' && 'w-full'
                  )}
                >
                  <FormLabel>Assignees</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Input
                        placeholder="Select a Client to Display"
                        className="w-full"
                        value={Object.keys(checkedEmployees).filter(
                          (key) => checkedEmployees[key]
                        )}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Select Employee</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {assignees.map((person) => (
                        <DropdownMenuCheckboxItem
                          checked={checkedEmployees[person.name]}
                          onCheckedChange={() =>
                            handleEmployeeCheckboxChange(person.name)
                          }
                          key={person.id}
                          {...field}
                        >
                          {person.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="designLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Design Link</FormLabel>
                <Input
                  {...field}
                  placeholder="https://figma.com/design"
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectScope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Project Scope</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  placeholder="Upload project Scope"
                  onChange={(e) => handleFileUpload(e, field.onChange)}
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Notes</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Enter any special notes here..."
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <ActionButton
              isLoading={isCreateProjectLoading || isLoading}
              type="submit"
              onClick={() => onSubmit}
              label="Create Project"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectPage;
