import { Employee, LeaveBalance, Payroll } from '@prisma/client';
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
