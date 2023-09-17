"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// data table import starts here
import { Payment, columns } from "./columns";
import { DataTable } from "./leaves-data-table";
// data table import ends here

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 pt-4 px-10 text-center">Casual Leave</div>

          <div className="p-2 text-2xl font-bold text-center">2/7</div>
          <div className="p-4">
            <Progress value={28} />
          </div>
        </div>

        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 pt-4 text-center">Annual Leave</div>

          <div className="p-2 text-2xl font-bold text-center">6/7</div>
          <div className="p-4">
            <Progress value={85} />
          </div>
        </div>

        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 pt-4 text-center">Medical Leave</div>

          <div className="p-2 text-2xl font-bold text-center">4/7</div>
          <div className="p-4">
            <Progress value={57} />
          </div>
        </div>
        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 px-8 pt-4 text-center">Leave 1</div>

          <div className="p-2 text-2xl font-bold text-center">2/4</div>
          <div className="p-4">
            <Progress value={50} />
          </div>
        </div>
        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 px-8 pt-4 text-center">Leave 2</div>

          <div className="p-2 text-2xl font-bold text-center">2/6</div>
          <div className="p-4">
            <Progress value={33} />
          </div>
        </div>
        <div className="bg-white drop-shadow-lg rounded-md">
          <div className="p-2 px-8 pt-4 text-center">No Pay</div>

          <div className="p-2 text-2xl font-bold text-center">1/6</div>
          <div className="p-4">
            <Progress value={16} />
          </div>
        </div>

        {/* <Card className="bg-white drop-shadow-lg">
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default page;
