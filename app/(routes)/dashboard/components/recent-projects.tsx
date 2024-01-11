import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export function RecentProjects() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            // src="https://avatar.vercel.sh/personal.png"
            src="/icons/account.png"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Management System</p>
          <p className="text-sm text-muted-foreground">Spiria Digital</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <Separator />
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            // src="https://avatar.vercel.sh/personal.png"
            src="/icons/account.png"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ABC Project</p>
          <p className="text-sm text-muted-foreground">ABC Company</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <Separator />
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            // src="https://avatar.vercel.sh/personal.png"
            src="/icons/account.png"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ABC Project</p>
          <p className="text-sm text-muted-foreground">ABC Company</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <Separator />
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            // src="https://avatar.vercel.sh/personal.png"
            src="/icons/account.png"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ABC Project</p>
          <p className="text-sm text-muted-foreground">ABC Company</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <Separator />
    </div>
  );
}
