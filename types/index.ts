import { Card, Client, Department, Employee, EmployeeProject, LeaveBalance, List, Payroll, Project, Task, TaskWork } from '@prisma/client';
import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type EmployeeWithPayroll = Employee & {
  payroll: Payroll;
};

export type EmployeeWithDepartment = Employee & {
  employeeDepartment: Department;
};

export type EmployeeWithLeaveBalance = Employee & {
  leaveBalance: LeaveBalance;
};

export type ProjectWithClientWithAssigneesWithTasks = Project & {
  client: Client;
} & {
  projectAssignees: EmployeeProject;
} & {
  tasks: Task[];
};

export type TaskWithProject = Task & {
  project: Project;
}

export type TaskWorkWithTaskWithProjectWithClient = TaskWork & {
  task: Task & {
    project: Project & {
      client: Client;
    };
  },
  employee: Employee
};

export type LIstWithCards = List & {
  cards: Card[];
};

export type CardWithList = Card & {
  list: List;
};