import { Client, Employee, EmployeeProject, LeaveBalance, Payroll, Project } from '@prisma/client';
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

export type EmployeeWithLeaveBalance = Employee & {
  leaveBalance: LeaveBalance;
};

export type ProjectWithClientWithAssignees = Project & {
  client: Client;
} & {
  projectAssignees: EmployeeProject;
};