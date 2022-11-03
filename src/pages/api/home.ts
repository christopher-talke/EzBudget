// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { DashboardData } from '../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    function generateDate(date: Date, offset: number, type: number) {
        if (type < 0) return new Date(date.setDate(date.getDate() - offset));
        return new Date(date.setDate(date.getDate() + offset));
    }

    const paycycleLength = 14;
    const targetStart = generateDate(new Date(), paycycleLength, -1);
    const targetEnd = generateDate(new Date(), paycycleLength, 1);

    const results = await prisma.paycycles.findFirst({
        where: {
            start_date: {
                gte: targetStart,
            },
            end_date: {
                gte: targetEnd,
            },
        },
        include: {
            budget: {
                include: {
                    accounts: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
        },
    });

    const { budget: e_budget, ...rest } = results as any;
    const { accounts, ...budget } = e_budget;

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        let amount = 0;
        for (let j = 0; j < account.items.length; j++) {
            const item = account.items[j];
            amount += item.amount;
        }
        account.balance = amount;
    }

    res.status(200).json({
        ...rest,
        budgetDetails: budget,
        budget: {
            income: {
                balance: 233000,
                meta: {
                    previous_balance: 233000,
                    future_balance: 0,
                },
            },
            expenses: {
                balance: 220099,
                meta: {
                    previous_balance: 220099,
                    future_balance: 0,
                },
            },
            balance: {
                balance: 12901,
                meta: {
                    previous_balance: 12901,
                    future_balance: 0,
                },
            },
        },
        actual: {
            income: {
                balance: 233000,
                meta: {
                    previous_balance: 233000,
                    future_balance: 0,
                },
            },
            expenses: {
                balance: 170065,
                meta: {
                    previous_balance: 170065,
                    future_balance: 0,
                },
            },
            balance: {
                balance: 62935,
                meta: {
                    previous_balance: 62935,
                    future_balance: 0,
                },
            },
        },
        accounts,
    });
}
