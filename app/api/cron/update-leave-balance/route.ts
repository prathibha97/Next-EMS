import updateLeaveBalances from '@/lib/leaveBalanceUpdater';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Update leave balances
    await updateLeaveBalances();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Leave balances updated successfully.',
    });
  } catch (error: any) {
    // Handle errors and provide an error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update leave balances.',
        error: error.message, // Include the error message for debugging
      },
      { status: 500 }
    ); // Use a proper HTTP status code for server errors
  }
}
